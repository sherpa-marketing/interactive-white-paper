var overallAverageScore = 0;
Object.keys(modelData.pillars).forEach(function(key) {
    var pillarData = modelData.pillars[key];
    $('#' + key + '-average').css('width', pillarData.average + '%');
    var nextSteps = $('#' + key + '-next-steps');
    var nextStepCount = 0;
    for (var i = 0; i < pillarData.resources.length; ++i) {
        var resource = pillarData.resources[i];
        var input = $('#' + key + '-' + resource.position + '-input');
        var label = $('#' + key + '-' + resource.position + '-label');
        input.attr('data-index', resource.index);
        input.attr('data-score', resource.score);
        input.attr('value', resource.label);
        label.text(resource.label);

        if (typeof results !== "undefined") {
            if (nextStepCount < 3 && ((1 << (resource.index - 1)) & results.m[key].i) === 0) {
                nextSteps.append($('<li>' + resource.label + '</li>'));
                nextStepCount++;
            }
        }
    }

    if (typeof results !== "undefined") {
        $('#' + key + '-progress').css('width', results.m[key].s + '%');
        console.log(results.m[key].s)
        overallAverageScore += parseFloat(results.m[key].s);
    }
});
console.log(overallAverageScore);
$('#overall-score').text((overallAverageScore / 7 / 20).toFixed(1));