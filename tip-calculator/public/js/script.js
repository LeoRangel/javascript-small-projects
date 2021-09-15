
document.querySelector('#tip-form').onchange = function () {

    var bill = Number(document.getElementById('billTotal').value);

    var tip = document.getElementById('tipInput').value;
    document.getElementById('tipOutput').innerHTML = `${tip}%`;

    var tipValue = bill * (tip / 100)
    var finalBill = bill + tipValue

    var tipAmount = document.querySelector('#tipAmount')
    var totalBillWithTip = document.querySelector('#totalBillWithTip')

    // Converts a number into a string and add exactly 2 digits digits after the decimal (,00)
    tipAmount.value = tipValue.toFixed(2);
    totalBillWithTip.value = finalBill.toFixed(2);

    //Show Results
    document.getElementById('results').style.display = 'block'
}
