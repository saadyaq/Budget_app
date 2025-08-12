import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, TrendingUp, TrendingDown, DollarSign, Calendar, Tag, Filter } from 'lucide-react';

const BudgetManager = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([
    'Alimentation', 'Transport', 'Logement', 'Loisirs', 'Santé', 'Éducation', 'Autres'
  ]);
  const [budgets, setBudgets] = useState({});
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Alimentation',
    date: new Date().toISOString().split('T')[0]
  });
  const [newBudget, setNewBudget] = useState({
    category: 'Alimentation',
    amount: ''
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [filterCategory, setFilterCategory] = useState('all');

  // Calculs des totaux
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Ajouter une transaction
  const addTransaction = () => {
    if (newTransaction.description && newTransaction.amount) {
      const transaction = {
        id: Date.now(),
        ...newTransaction,
        amount: parseFloat(newTransaction.amount)
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({
        description: '',
        amount: '',
        type: 'expense',
        category: 'Alimentation',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  // Supprimer une transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Ajouter/modifier un budget
  const setBudget = () => {
    if (newBudget.category && newBudget.amount) {
      setBudgets({
        ...budgets,
        [newBudget.category]: parseFloat(newBudget.amount)
      });
      setNewBudget({ category: 'Alimentation', amount: '' });
    }
  };

  // Calculer les dépenses par catégorie
  const expensesByCategory = categories.reduce((acc, category) => {
    acc[category] = transactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
    return acc;
  }, {});

  // Filtrer les transactions
  const filteredTransactions = filterCategory === 'all' 
    ? transactions 
    : transactions.filter(t => t.category === filterCategory);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestionnaire de Budget</h1>
          <p className="text-gray-600">Suivez vos finances personnelles en temps réel</p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex space-x-1">
            {['overview', 'transactions', 'budgets'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'overview' && 'Vue d\'ensemble'}
                {tab === 'transactions' && 'Transactions'}
                {tab === 'budgets' && 'Budgets'}
              </button>
            ))}
          </div>
        </div>

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Cartes de résumé */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8" />
                  <div className="text-right">
                    <p className="text-green-100">Revenus</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <TrendingDown className="w-8 h-8" />
                  <div className="text-right">
                    <p className="text-red-100">Dépenses</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
                  </div>
                </div>
              </div>

              <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-2xl p-6 text-white shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8" />
                  <div className="text-right">
                    <p className="text-blue-100">Solde</p>
                    <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dépenses par catégorie */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Dépenses par Catégorie</h2>
              <div className="space-y-4">
                {categories.map(category => {
                  const spent = expensesByCategory[category];
                  const budget = budgets[category] || 0;
                  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
                  
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{category}</span>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-800">
                            {formatCurrency(spent)}
                          </span>
                          {budget > 0 && (
                            <span className="text-sm text-gray-500 ml-2">
                              / {formatCurrency(budget)}
                            </span>
                          )}
                        </div>
                      </div>
                      {budget > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Transactions */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Formulaire d'ajout */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Ajouter une Transaction</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Description"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Montant"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="expense">Dépense</option>
                  <option value="income">Revenu</option>
                </select>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={addTransaction}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Ajouter la Transaction</span>
              </button>
            </div>

            {/* Filtre */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Liste des transactions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Historique des Transactions</h2>
              <div className="space-y-3">
                {filteredTransactions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Aucune transaction trouvée</p>
                ) : (
                  filteredTransactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                          <h3 className="font-medium text-gray-800">{transaction.description}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Tag className="w-4 h-4" />
                              <span>{transaction.category}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(transaction.date)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                        </span>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Budgets */}
        {activeTab === 'budgets' && (
          <div className="space-y-6">
            {/* Formulaire de budget */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Définir un Budget</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Montant du budget"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({...newBudget, amount: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={setBudget}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Définir Budget
                </button>
              </div>
            </div>

            {/* Liste des budgets */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Budgets Actuels</h2>
              <div className="space-y-6">
                {Object.entries(budgets).map(([category, budget]) => {
                  const spent = expensesByCategory[category];
                  const remaining = budget - spent;
                  const percentage = (spent / budget) * 100;
                  
                  return (
                    <div key={category} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium text-gray-800">{category}</h3>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {formatCurrency(spent)} / {formatCurrency(budget)}
                          </div>
                          <div className={`text-sm font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {remaining >= 0 ? 'Reste' : 'Dépassé de'} {formatCurrency(Math.abs(remaining))}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full transition-all ${
                            percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {percentage.toFixed(1)}% utilisé
                      </div>
                    </div>
                  );
                })}
                {Object.keys(budgets).length === 0 && (
                  <p className="text-gray-500 text-center py-8">Aucun budget défini</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetManager;