function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1]);
        }
    }
}

function color(level, data) {
    return (parseFloat(data.s) + 0.5) < level ? '#001048' : '#9e005f';
}

function getFromStore(key) {
    var response;
    $.ajax({
        async: true,
        type: 'GET',
        url: "https://api.sherpamarketing.co.uk/jsa/" + key,
        dataType: 'json',
        success: function (data) {
            display(data);
        },
        error: function (e) {
            error(e);
        }
    });
    return response;
}

function display(results) {
    chart(results);
    text(results);
}

function text(results) {
    var overallAverageScore = 0;
    Object.keys(modelData.pillars).forEach(function(key) {
        var pillarData = modelData.pillars[key];
        $('#' + key + '-average').css('width', pillarData.average + '%');
        var nextSteps = $('#' + key + '-next-steps');
        var nextStepCount = 0;
        for (var i = 0; i < pillarData.resources.length; ++i) {
            var resource = pillarData.resources[i];
            if (nextStepCount < 3 && ((1 << (resource.index - 1)) & results.m[key].i) === 0) {
                nextSteps.append($('<li>' + resource.label + '</li>'));
                nextStepCount++;
            }
        }

        $('#' + key + '-progress').css('width', results.m[key].s + '%');
        overallAverageScore += parseFloat(results.m[key].s);
        if (nextStepCount === 0) {
            nextSteps.append($('<li>You are doing all the right things. Keep refining and optimising for continued Channel success.</li>'));
        }
    });

    $('#overall-score').text((overallAverageScore / 7 / 20).toFixed(1));
}

function chart(results) {
    // console.log(results);
    var datasets = [];
    datasets.push({
        data: [results.m.plan.s, results.m.resource.s, results.m.recruit.s, results.m.enable.s, results.m.engage.s, results.m.grow.s, results.m.measure.s],
        backgroundColor: ['#9e005f', '#9e005f','#9e005f', '#9e005f','#9e005f', '#9e005f','#9e005f']
    });

    var data = {
        datasets: datasets,
        labels: ['plan', 'resource', 'recruit', 'enable', 'engage', 'grow', 'measure']
    };

    var options = {
        borderAlign: 'inner',
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        scale: {
            ticks: {
                display: false,
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 20
            },
            angleLines: {
                display: true,
                color: '#ced2f5',
                lineWidth: 1
            },
            gridLines: {
                display: true,
                drawBorder: true,
                color: '#ced2f5'
            }
        }
    };

    new Chart($('#chart'), {
        type: 'polarArea',
        data: data,
        options: options
    });
}

function error(e) {
    console.error(e);
    document.location.href = 'https://interactive.sherpamarketing.co.uk/channel-growth-model/';
}

$(function() {
    try {
        var paramK = getUrlParameter('k');
        if (paramK !== undefined) {
            getFromStore(paramK);
        } else {
            display(JSON.parse(atob(getUrlParameter('d'))));
        }

    } catch (e) {
        error(e)
    }
});
