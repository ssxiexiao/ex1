function Seq() {
	var seq = [];
	for (var i = 0; i < 5; i++) {
		seq.push([i * 0.245, 0.04]);
		seq.push([i * 0.245, 0.10]);
		seq.push([i * 0.245, 0.15]);
		seq.push([i * 0.245, 0.19]);
		seq.push([i * 0.245, 0.22]);
		seq.push([i * 0.245, 0.24]);
		seq.push([i * 0.245, 0.25]);
		seq.push([i * 0.245, 0.26]);
		seq.push([i * 0.245, 0.28]);
		seq.push([i * 0.245, 0.31]);
		seq.push([i * 0.245, 0.35]);
		seq.push([i * 0.245, 0.40]);
		seq.push([i * 0.245, 0.46]);
	}
	return seq;
}

function randomizeSeq(d) {
	var seq = d;
	for (var i = 0; i < 1000; i++) {
		var a = parseInt(Math.random() * seq.length);
		var b = parseInt(Math.random() * seq.length);
		var t = [seq[a][0], seq[a][1]];
		seq[a] = [seq[b][0], seq[b][1]];
		seq[b] = t;
	}
	return seq;
}

var module = angular.module('questionnaire', []);