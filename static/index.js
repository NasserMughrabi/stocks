// @author: Nasser Mughrabi 2022
let stockID = -1;

document.addEventListener('DOMContentLoaded', function () {

    fetchPopStocks();
    document.querySelector('#AAPL').addEventListener('click', ()=> fetchStockData('AAPL'));
    document.querySelector('#TSLA').addEventListener('click', ()=>  fetchStockData('TSLA'));
    document.querySelector('#AMZN').addEventListener('click',  ()=> fetchStockData('AMZN'));
    document.querySelector('#AMD').addEventListener('click', ()=> fetchStockData('AMD'));
    document.querySelector('#NVDA').addEventListener('click', ()=> fetchStockData('NVDA'));
    document.querySelector('#GOOGL').addEventListener('click', ()=> fetchStockData('GOOGL'));
    document.querySelector('#MSFT').addEventListener('click', ()=> fetchStockData('MSFT'));

    document.querySelector('form').onsubmit = function() {
        
        let stock = document.querySelector('#stock').value;
        if(stock){
            stock = stock.toUpperCase();
        }else {
            stock = 'AAPL';
        }
        
        fetchStockData(stock);
        return false;
    }
});

function fetchStockData(stock){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'realstonks.p.rapidapi.com',
            'X-RapidAPI-Key': 'b55775101cmshf7a0fdee78a5340p11b6b4jsnc627709db9a2'
        }
    };


    fetch(`https://realstonks.p.rapidapi.com/${stock}`, options)
        .then(response => response.json())
        .then(data => {
            // call this function every two seconds
            display_stock_data(data, stock);
        })
        .catch(err => console.error(err));

    return false;
}

function fetchPopStocks(){
    var popStocks = new Array('AAPL', 'TSLA', 'AMZN', 'AMD', 'NVDA', 'GOOGL', 'MSFT');
    popStocks.forEach( popStock => {
        fetchStockData(popStock);
    });
}


function display_stock_data(stockData, stockName){
    
    const price = stockData.price.toFixed(2);
    const change_percentage = stockData.change_percentage;
    const change_point = stockData.change_point;
    const total_vol = stockData.total_vol;

    const current_stock_color = decide_color(change_point);
    // if the color is green, add plus to the start of the percentage and point numbers
    let plus = '';
    if(current_stock_color === '#01AE32'){ // if color is green
        plus = '+';
    }

    document.querySelector('#name-ticker').innerHTML = stockName;
    document.querySelector('#price').innerHTML = price;
    document.querySelector('#percentage').innerHTML = 'Percentage:  ' + plus + change_percentage + '%';
    document.querySelector('#points').innerHTML = 'Points: ' + plus + change_point;
    document.querySelector('#volume').innerHTML = 'Volume: ' + total_vol;
    document.querySelector('#market-ticker-div').innerHTML = 'Market > ' + stockName;

    document.querySelector(`#${stockName}-price`).innerHTML = price;
    document.querySelector(`#${stockName}-perc`).innerHTML = plus + change_percentage + '%';
    document.querySelector(`#${stockName}-points`).innerHTML = plus + change_point;
    document.querySelector(`#${stockName}-volume`).innerHTML = total_vol;
    
    document.querySelector('#price').style.color = current_stock_color;
}

function decide_color(dataAttribute){
    if(dataAttribute > 0){
        return '#01AE32';
    } else if (dataAttribute === 0){
        return 'white';
    }else {
        return '#FF506A'
    }
}
