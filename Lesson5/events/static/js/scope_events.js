angular.module('myApp', []).

controller('Characters', function($scope){
	$scope.names = ['Harmish', 'Prashant', 'Mayank', 'Robin'];
	$scope.currentName = names[0];
	
	$scope.changeName = function() {
		$scope.currentName = this.name;
		$scope.$broadcast('CharacterChanged', this.name);
	};
	
	$scope.$on('CharacterDeleted', function(event, removeName){
		var i = $scope.names.indexOf(removeName);
		$scope.names.splice(i, 1);
		$scope.currentName = $scope.names[0];
		$scope.$broadcast('CharacterChanged', $scope.currentName);
	});
}).

controller('Character', function($scope){
	$scope.info = {
		'Harmish' : {weapon : 'C', race : 'Linux'},
		'Prashant' : {weapon : 'Java', race : 'AT&T'},
		'Mayank' : {weapon : 'C++', race : 'Nokia'},
		'Robin' : {weapon : 'Nikotin', race : 'Masala'}	
	};
	$scope.currentInfo = $scope.info.Harmish;
	
	$scope.$on('CharacterChanged', function(event, newCharacter){
		$scope.currentInfo = $scope.info[newCharacter];
	});
	
	$scope.deleteChar = function() {
		delete $scope.info[$scope.currentName];
		$scope.$emit('CharacterDeleted', $scope.currentName);
	};
});