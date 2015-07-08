/**
 * Created by austinadams on 7/7/15.
 */

angular.module('waitStaffCalc', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: 'home.html'
      })
      .when("/new-meal", {
        templateUrl: 'new-meal.html',
        controller: "FormCtrl"
      })
      .when("/my-earnings", {
        templateUrl: 'my-earnings.html',
        controller: "EarningsCtrl"
      })
      .otherwise("/");
  }])
  .value('priceData', {
    meals: [],
    totalMeals: function () {
      return this.meals.length;
    },
    totalTips: function () {
      var meals = this.meals,
        totals = 0;
      meals.map(function (v, i) {
        totals += v.tip;
      });
      return totals;
    },
    avgTips: function () {
      var meals = this.meals,
        totals = 0;
      meals.map(function (v, i) {
        totals += v.tip;
      });
      return meals.length > 0 ? totals / meals.length : 0.00;
    }
  })
  .value('currentMeal', {})
  .value('mealPriceTemplate', {
    subtotal: 0.00,
    tip: 0.00,
    total: 0.00
  })
  .controller('FormCtrl', ['$scope', 'priceData', 'currentMeal', 'mealPriceTemplate', function ($scope, priceData, currentMeal, mealPriceTemplate) {
    //Decimal Validation Pattern
    $scope.decimalPat = /^\d+(\.\d+)?$/;
    //Initial Error Class State
    $scope.fieldError = 'has-nothing';
    $scope.resetForm = function () {
      $scope.mealPrice = "0.00";
      $scope.tip = "0.00";
      $scope.tax = "0.00";
      $scope.inputForm.$setPristine();

    };
    //On Submit Set error class to a real error class
    $scope.calculateForm = function () {
      $scope.fieldError = 'has-error';
      if ($scope.inputForm.$valid) {
        var tax = parseFloat($scope.tax),
          meal = parseFloat($scope.mealPrice),
          tip = parseFloat($scope.tip);
        //Reset Current Meal
        currentMeal = Object.create(mealPriceTemplate);
        currentMeal.subtotal = ($scope.mealPrice * (tax / 100)) + meal;
        currentMeal.tip = ($scope.mealPrice * (tip / 100));
        currentMeal.total = currentMeal.subtotal + currentMeal.tip;
        priceData.meals.push(currentMeal);
        $scope.resetForm();
      }
    };
    $scope.currentMeal = Object.create(mealPriceTemplate);
  }])
  .controller('EarningsCtrl', ['$scope', 'priceData', 'currentMeal', function ($scope, priceData, currentMeal) {
    $scope.currentMeal = currentMeal;
    $scope.priceData = priceData;
  }]);
