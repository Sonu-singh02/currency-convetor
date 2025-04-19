document.getElementById('converter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    
    if (amount && fromCurrency && toCurrency) {
        convertCurrency(amount, fromCurrency, toCurrency);
    } else {
        alert('Please fill in all fields.');
    }
});

function convertCurrency(amount, fromCurrency, toCurrency) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                document.getElementById('result').innerText = 'Currency not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('result').innerText = 'Error converting currency.';
        });
}