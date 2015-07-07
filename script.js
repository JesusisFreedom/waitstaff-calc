/**
 * Created by austinadams on 7/7/15.
 */

angular.module('waitStaffCalc', ['ngMessages'])
  .controller('FormCtrl', ['$scope', function ($scope) {
    //Decimal Validation Pattern
    $scope.decimalPat = /^\d+(\.\d+)?$/;
    //Initial Error Class State
    $scope.fieldError = 'has-nothing';
    //Price Object Model
    var mealPriceTemplate = {
      subtotal: 0.00,
      tip: 0.00,
      total: 0.00
    };
    $scope.resetForm = function(){
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
        $scope.currentMeal = Object.create(mealPriceTemplate);
        $scope.currentMeal.subtotal = ($scope.mealPrice * (tax / 100)) + meal;
        $scope.currentMeal.tip = ($scope.mealPrice * (tip / 100));
        $scope.currentMeal.total = $scope.currentMeal.subtotal + $scope.currentMeal.tip;
        $scope.priceData.meals.push($scope.currentMeal);
        $scope.resetForm();
      }
    };

    $scope.currentMeal = Object.create(mealPriceTemplate);

    $scope.priceData = {
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
    };

  }])
;