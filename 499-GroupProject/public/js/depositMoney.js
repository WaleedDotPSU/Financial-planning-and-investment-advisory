var g_walletBalance = parseFloat(localStorage.getItem("g_walletBalance")) || 0.0;

function updateBalance() {
    let depositAmount = parseFloat(document.getElementById("deposit-amount").value);

    g_walletBalance += depositAmount;

    localStorage.setItem("g_walletBalance", g_walletBalance);

    let balanceElement = document.getElementById("walletBalance");
    balanceElement.innerText = "Wallet Balance: " + g_walletBalance.toFixed(2) + " ريال";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("walletBalance").innerText = "Wallet Balance: " + g_walletBalance.toFixed(2) + " ريال";
});
