module.controller('questionnaireController', function($scope, Answer) {
	$scope.personInfo = {
		'age': '',
		'gender': '',
		'education': '',
		'researchField': '',
		'hand': '',
		'device':'',
		'name':'',
		'department':''
	};
	$scope.status = ['personInfo', 'train', 'userstudy', 'question', 'end'];
	$scope.statusId = 0;
	$scope.error = {
		'CN':['','输入不能为空', '必须是0到100的整数'],
		'EN':['',"input cannot be empty", 'must be an integer between 0 and 100']
	};
	$scope.errorStatus = 0;
	$scope.trainingIndice = 0;
	$scope.trainingNumber = 10;
	$scope.trainingNextCounter = 0;
	$scope.trainingAnswer = '';
	$scope.dataVisible = 0;
	$scope.trainingData = 0;
	$scope.questionIndice = 0;
	$scope.latestQuestionIndice = 0;
	$scope.questionNumber = Answer.datas.length;
	$scope.answer = '';
	$scope.questionPartNumber = 5;
	$scope.questionPartIndice = 0;
	$scope.partBegin = true;
	$scope.startDate = undefined;
	$scope.endDate = undefined;
	$scope.feedback = '';
	$scope.choices = [0, 0.245, 0.49, 0.735, 0.98];
	$scope.skillLevels = {
		'CN':['非常不熟练', '不熟练', '一般', '熟练', '非常熟练'],
		'EN':['very well','well','normal','bad','very bad']
	};
	$scope.favourite = -1;
	$scope.skillLevel = '';
	$scope.accurate = -1;

	$scope.$watch('answer', function() {
		var reg = new RegExp('^\\d+$');
		if ($scope.answer === '' || $scope.answer === null){
			$scope.errorStatus = 1;
		}
		else if (!reg.test($scope.answer) || $scope.answer > 100 || $scope.answer < 0){
			$scope.errorStatus = 2;
		}
		else{
			$scope.errorStatus = 0;
			// console.log($scope.answer);
		}
	});
	$scope.$watch(function(){ return Answer.upload;}, function(){
		if(Answer.upload === true){
			$scope.statusId = 5;
		}
	});
	$scope.start = function(){
		$scope.statusId += 1;
		$scope.trainingIndice = 1;
	};
	$scope.trainingNext = function() {
		$scope.trainingNextCounter += 1;
		if($scope.trainingNextCounter === 1){
			$scope.showAnswer();
		}
		if($scope.trainingNextCounter === 2){
			$scope.trainingNextCounter = 0;
			$scope.trainingIndice += 1;
			$scope.trainingAnswer = '';
			$scope.dataVisible = 0;
		}
	};
	$scope.showAnswer = function() {
		$scope.dataVisible = 1;
	};
	$scope.trainingComplete = function() {
		$scope.trainingNextCounter += 1;
		if($scope.trainingNextCounter === 1){
			$scope.showAnswer();
		}
		if($scope.trainingNextCounter === 2){
			$scope.trainingNextCounter = 0;
			$scope.statusId += 1;
			$scope.trainingAnswer = '';
			$scope.dataVisible = 0;
		}
	};
	$scope.getTrainingData = function() {
		var data = {
			'scale': Math.random() * 0.96,
			'angle': 1+parseInt(Math.random() * 49)
		};
		$scope.trainingData = data.angle;
		data.angle /= 100;
		return data;
	};
	$scope.transition = function() {
		$scope.questionIndice = 1;
		$scope.latestQuestionIndice = 1;
		$scope.questionPartIndice = 1;
		$scope.statusId += 1;
		$scope.startDate = new Date();
	};
	$scope.startPart = function(){
		$scope.partBegin = false;
		if (Answer.answers[$scope.questionIndice - 1] != -1)
			$scope.answer = Answer.answers[$scope.questionIndice - 1];
		else
			$scope.answer = '';
		$scope.startDate = new Date();
	};
	$scope.userstudyPrev = function() {
		if($scope.questionIndice === 1)
			return;
		if($scope.latestQuestionIndice > $scope.questionIndice)
			return;
		$scope.endDate = new Date();
		Answer.addAnswer($scope.answer, $scope.endDate.getTime() - $scope.startDate.getTime(), $scope.questionIndice - 1);
		$scope.questionIndice -= 1;
		$scope.questionPartIndice = parseInt(($scope.questionIndice-1)/($scope.questionNumber/$scope.questionPartNumber)) + 1;
		if (Answer.answers[$scope.questionIndice - 1] != -1)
			$scope.answer = Answer.answers[$scope.questionIndice - 1];
		else
			$scope.answer = '';
		$scope.startDate = new Date();
	};
	$scope.userstudyNext = function() {
		if ($scope.errorStatus != 0) {
			return;
		}
		$scope.errorStatus = 0;
		$scope.endDate = new Date();
		Answer.addAnswer($scope.answer, $scope.endDate.getTime() - $scope.startDate.getTime(), $scope.questionIndice - 1);
		// console.log(Answer.answers);
		// console.log(Answer.times);
		$scope.questionIndice += 1;
		$scope.latestQuestionIndice = Math.max($scope.latestQuestionIndice, $scope.questionIndice);
		$scope.questionPartIndice = parseInt(($scope.questionIndice-1)/($scope.questionNumber/$scope.questionPartNumber)) + 1;
		if(($scope.latestQuestionIndice-1) % ($scope.questionNumber/$scope.questionPartNumber) === 0){
			$scope.partBegin = true;
			// console.log(1111);
		}
		else{
			$scope.partBegin = false;
		}
		if (Answer.answers[$scope.questionIndice - 1] != -1)
			$scope.answer = Answer.answers[$scope.questionIndice - 1];
		else
			$scope.answer = '';
		$scope.startDate = new Date();
	};
	$scope.userstudyComplete = function() {
		if ($scope.errorStatus != 0)
			return;
		else if($scope.answer === '') {
			$scope.errorStatus = 1;
			return;
		}
		$scope.errorStatus = 0;
		$scope.endDate = new Date();
		Answer.addAnswer($scope.answer, $scope.endDate.getTime() - $scope.startDate.getTime(), $scope.questionIndice - 1);
		$scope.answer = '';
		$scope.statusId += 1;
	};
	$scope.getUserstudyData = function() {
		var data = {
			'scale': Answer.datas[$scope.questionIndice - 1][0],
			'angle': Answer.datas[$scope.questionIndice - 1][1]
		};
		return data;
	};
	$scope.verify = function(){
		// if($scope.feedback === '')
		// 	return false;
		// if($scope.favourite === -1)
		// 	return false;
		// if($scope.accurate === -1)
		// 	return false;
		// if($scope.skillLevel === '')
		// 	return false;
		// for(var p in $scope.personInfo){
		// 	if(p != 'name' && $scope.personInfo[p] === '')
		// 		return false;
		// }
		return true;
	};
	$scope.questionComplete = function() {
		if(!$scope.verify()){
			alert($scope.error[$scope.LANG][1]);
			return;
		}
		Answer.feedback = $scope.feedback;
		Answer.favourite = $scope.favourite;
		Answer.accurate = $scope.accurate;
		Answer.skillLevel = $scope.skillLevel;
		Answer.personInfo = $scope.personInfo;
		Answer.postAnswer();
	};
	$scope.keydown = function($event) {
		if($event.keyCode === 13){
			if($scope.statusId === 1){
				if($scope.trainingIndice < $scope.trainingNumber){
					$scope.trainingNext();
				}
				else{
					$scope.trainingComplete();
				}
			}
			else if($scope.statusId === 2){
				$scope.transition();
			}
			else if($scope.statusId === 3 && $scope.partBegin != true){
				if($scope.questionIndice < $scope.questionNumber){
					$scope.userstudyNext();
				}
				else{
					$scope.userstudyComplete();
				}				
			}
			else if($scope.statusId === 3 && $scope.partBegin === true){
				$scope.startPart();
			}
		}
		return;
	}
});