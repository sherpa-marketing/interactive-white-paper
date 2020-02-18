function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function color(level, data) {
    return (parseFloat(data.s) + 0.5) < level ? '#001048' : '#9e005f';
}

try {
    var results = JSON.parse(atob(getUrlParameter('d')));

    var datasets = [];
    for (var i = 5; i > 0; --i) {
        datasets.push({
            data: [10, 10, 10, 10, 10, 10, 10],
            backgroundColor: [
                color(i, results.m.plan),
                color(i, results.m.resource),
                color(i, results.m.recruit),
                color(i, results.m.enable),
                color(i, results.m.engage),
                color(i, results.m.grow),
                color(i, results.m.measure)
            ]
        });
    }

    $(function() {
        var data = {
            datasets: datasets,
            labels: ['plan', 'resource', 'recruit', 'enable', 'engage', 'grow', 'measure']
        };

        var options = {
            cutoutPercentage: 20,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        };

        var chart = new Chart($('#chart'), {
            type: 'doughnut',
            data: data,
            options: options
        });
    });
} catch (e) {
    document.location.href = 'https://interactive.sherpamarketing.co.uk/channel-growth-model/';
}
