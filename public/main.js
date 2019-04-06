const form = document.getElementById('vote-form');

form.addEventListener("submit", (e)=>{
    const val = document.querySelector('input[name=os]:checked').value;
    const data ={ os: val };

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type':'application/json'
        })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))  


    e.preventDefault();
});

//chart
let dataPoints = [
    {label : 'Windows',y:0},
    {label : 'ubuntu',y:0},
    {label : 'MacOs',y:0},
    {label : 'kubuntu',y:0},
];

const chartContainer = document.querySelector('#chartContainer');
if(chartContainer){
    var chart = new CanvasJS.Chart("chartContainer",{
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Os Type"
        },
        data:[
            {
                type:"column",
                dataPoints:dataPoints
            }
        ]
    });
    chart.render();
    
    Pusher.logToConsole = true;

    var pusher = new Pusher('e16f298cc4293c836e8b', {
      cluster: 'ap2',
      forceTLS: true
    });

    var channel = pusher.subscribe('poll');
    channel.bind('os-vote', function(data) {
        dataPoints = dataPoints.map(x => {
            if(x.label == data.os){
                x.y += data.points;
                return x;
            }else{
                return x;
            }
        });
        chart.render();
    });
}


