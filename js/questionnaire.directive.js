module.directive('chordChart', function($window, Answer) {
	return {
		restrict: 'EA',
		template: "<svg width='100' height='100'></svg>",
		replace: true,
		link: function(scope, elem, attrs) {
			scope.$watch(attrs.chartIndice, function() {
				var indice = scope[attrs.chartIndice];
				var width = parseInt(parseFloat(attrs.chartWidth) * Math.min(window.screen.width, window.screen.height));
				var rotateStatus = attrs.rotateStatus;
				if(indice === 0){
					return;
				}
				if(attrs['chartData']){
					var data = scope[attrs.chartData]();
				}
				else{
					var data = {'angle':parseFloat(attrs.angle), 'scale':parseFloat(attrs.scale)};
				}
				var d3 = $window.d3;
				var rawSvg = elem[0];
				var svg = d3.select(rawSvg);
				svg.select('*').remove();				
				drawChrod(svg, width, parseFloat(data.angle)*Math.PI*2, parseFloat(data.scale), rotateStatus);
			});
		}
	};
});
var drawChrod = function(svg, w, angle, scale, rotateStatus) {
	svg.attr('width', w)
		.attr('height', w);
	var padding = 30;
	var m = parseFloat(parseInt((w/2) - padding) / 1000);
	var data = {
		'ex-r': 1000,
		'in-r': 1000 * scale
	};
	// console.log(data['in-r']/data['ex-r']);
	var rotate = Math.random()*360;
	if(rotateStatus != 'yes'){
		rotate = 10;
	}
	var g = svg.append('g')
		.attr('transform', 'translate('+(w/2)+','+(w/2)+') rotate('+rotate+')scale('+m+','+m+')');
	var inner = g.append('circle')
		.attr('r', data['in-r'])
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('fill', 'none')
		.attr('stroke', 'red')
		.attr('stroke-width', 0);
	var ex = g.append('circle')
		.attr('r', data['ex-r'])
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('fill', 'none')
		.attr('stroke', 'red')
		.attr('stroke-width', 0);
	var d = 'M' + inner.attr('cx') + ',' + (inner.attr('cy') - inner.attr('r'));
	d += 'A' + inner.attr('r') + ',' + inner.attr('r') + ',0,0,1,';
	d += (Math.sin(angle) * parseInt(inner.attr('r')) + parseInt(inner.attr('cx'))) + ',' + (-Math.cos(angle) * parseInt(inner.attr('r')) + parseInt(inner.attr('cy')));
	d += 'L' + (Math.sin(angle) * parseInt(ex.attr('r')) + parseInt(ex.attr('cx'))) + ',' + (-Math.cos(angle) * parseInt(ex.attr('r')) + parseInt(ex.attr('cy')));
	d += 'A' + ex.attr('r') + ',' + ex.attr('r') + ',0,0,0,';
	d += ex.attr('cx') + ',' + (ex.attr('cy') - ex.attr('r'));
	var d1 = 'M' + inner.attr('cx') + ',' + (inner.attr('cy') - inner.attr('r'));
	d1 += 'A' + inner.attr('r') + ',' + inner.attr('r') + ',0,1,0,';
	d1 += (Math.sin(angle) * parseInt(inner.attr('r')) + parseInt(inner.attr('cx'))) + ',' + (-Math.cos(angle) * parseInt(inner.attr('r')) + parseInt(inner.attr('cy')));
	d1 += 'L' + (Math.sin(angle) * parseInt(ex.attr('r')) + parseInt(ex.attr('cx'))) + ',' + (-Math.cos(angle) * parseInt(ex.attr('r')) + parseInt(ex.attr('cy')));
	d1 += 'A' + ex.attr('r') + ',' + ex.attr('r') + ',0,1,1,';
	d1 += ex.attr('cx') + ',' + (ex.attr('cy') - ex.attr('r'));
	g.append('path')
		.attr('fill', 'black')
		.attr('d', d);
	g.append('path')
		.attr('fill', 'white')
		.attr('d', d1);
}