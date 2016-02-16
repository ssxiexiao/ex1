module.factory('Answer', function($http) {
	var url = './write.php';
	var service = {
		answers: [],
		datas: [],
		times: [],
		personInfo: {},
		feedback: '',
		favourite: -1,
		accurate: -1,
		skillLevel: '',
		upload:false,
		addAnswer: function(answer, time, indice) {
			service.answers[indice] = answer;
			service.times[indice] += time;
		},
		updateInfo: function(info) {
			service.personInfo = info;
		},
		postAnswer: function() {
			var postData = {
				'personInfo': service.personInfo,
				'datas': service.datas,
				'answers': service.answers,
				'times': service.times,
				'feedback': service.feedback,
				'favourite': service.favourite,
				'accurate': service.accurate,
				'skillLevel': service.skillLevel
			};
			console.log(postData);
			$http({
				url: url,
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: postData
			}).success(function(data){
				if(data === 'Success.'){
					service.upload = true;
				}
				alert(data);
			})
			.error(function(data,header,config,status){
				alert(header);
			});

		}
	};
	var s1 = Seq();
	s1 = randomizeSeq(s1);
	var s2 = Seq();
	s2 = randomizeSeq(s2);
	var s = s1.concat(s2);
	service.datas = s;
	for(var i = 0; i < service.datas.length; i++){
		service.answers.push(-1);
		service.times.push(0);
	}
	return service;
});