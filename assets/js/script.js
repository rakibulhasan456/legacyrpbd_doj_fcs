const users = {
    test: { password: "test", name: "Attorney Name"},
    tanmoy: { password: "Tanmoy1887", name: "Gil Colson"},
    zeke: { password: "962546Zeke", name: "Zeke Sen"},
    atif: { password: "blacklegit4040", name: "Atif Ayan"},
    caspian_drake: { password: "notgaycaspian", name: "Caspian Drake"},
    killermax: { password: "Zxcvbnm@123", name: "Johnny Paul"}
};

// --- LOGIN LOGIC ---
loginBtn.onclick = () => {
    const u = username.value, p = password.value;
    if (users[u] && users[u].password === p) {
        loggedAs.textContent = users[u].name;
        pvAttorney.textContent = users[u].name;
        pvAttorney2.textContent = users[u].name;
        
        // Auto-set Attorney Signature as Font Text
        pvAttorneySigText.textContent = users[u].name;
        
        loginPanel.classList.add("hidden");
        formPanel.classList.remove("hidden");
    } else alert("Invalid credentials");
};

logoutBtn.onclick = () => location.reload();

// --- SIGNATURE METHOD TOGGLE ---
const sigRadios = document.querySelectorAll('input[name="sigMethod"]');
const typeSigArea = document.getElementById('typeSigArea');
const uploadSigArea = document.getElementById('uploadSigArea');

sigRadios.forEach(radio => {
    radio.onchange = () => {
        if (radio.value === 'type') {
            typeSigArea.classList.remove('hidden');
            uploadSigArea.classList.add('hidden');
        } else {
            typeSigArea.classList.add('hidden');
            uploadSigArea.classList.remove('hidden');
        }
    };
});

// --- MAIN PREVIEW UPDATE LOGIC (Fixed & Merged) ---
updatePreview.onclick = () => {
    // 1. Basic Applicant Info
    pvName.textContent = appName.value;
    pvName2.textContent = appName.value;
    pvCid.textContent = appCid.value;
    pvDob.textContent = formatDateDMY(appDob.value);
    pvAddress.textContent = appAddress.value;
    pvPhone.textContent = appPhone.value;
    pvEmail.textContent = appEmail.value;
    pvPurpose.textContent = appPurpose.value;

    // 2. Liquid Funds & Calculations
    pvBank.textContent = formatMoney(bankBal.value) || 0;
    pvSaving.textContent = formatMoney(savingBal.value) || 0;
    pvCash.textContent = formatMoney(cashBal.value) || 0;
    pvAssets.textContent = formatMoney(otherAssets.value) || 0;

    const totalLiquid = Number(bankBal.value || 0) + Number(savingBal.value || 0) + 
                        Number(cashBal.value || 0) + Number(otherAssets.value || 0);
    pvTotalLiquid.textContent = formatMoney(totalLiquid);

    // 3. Income
    pvPrimaryIncome.textContent = primaryIncome.value;
    pvSecondaryIncome.textContent = secondaryIncome.value;
    pvOtherIncome.textContent = otherIncome.value;
    pvTotalIncome.textContent = formatMoney(totalIncome.value) || 0;

    // 4. Liabilities
    pvLoanDebt.textContent = formatMoney(liabilities.value) || 0;
    pvOtherLiabilities.textContent = formatMoney(otherLiabilities.value) || 0;
    pvTotalLiabilities.textContent = formatMoney(Number(liabilities.value || 0) + Number(otherLiabilities.value || 0));

    // 5. Investment & Background
    pvInitialInvestment.textContent = formatMoney(initialInvestment.value) || 0;
    pvMonthlyBudget.textContent = formatMoney(monthlyBudget.value) || 0;
    pvFundingSource.textContent = fundingSource.value;
    pvBusinessExp.textContent = businessExp.value;
    pvFinancialConduct.textContent = financialConduct.value;

    // 6. Dates
    pvAttorneyDate.textContent = formatDateDMY(attorneyDate.value);
    pvApplicantDate.textContent = formatDateDMY(appDate.value);

    // 7. Applicant Signature Logic (Type vs Upload)
    const method = document.querySelector('input[name="sigMethod"]:checked').value;
    if (method === 'type') {
        pvAppSigText.textContent = appTypeSignature.value;
        pvAppSigText.classList.remove('hidden');
        appSignPreview.classList.add('hidden');
    } else {
        pvAppSigText.classList.add('hidden');
        appSignPreview.classList.remove('hidden');
    }
};

// --- FILE HANDLER ---
appSignature.onchange = e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => appSignPreview.src = r.result;
    r.readAsDataURL(f);
};

// --- DOWNLOAD PNG ---
downloadPNG.onclick = () => {
    const original = document.getElementById("statementContainer");
    const clone = original.cloneNode(true);
    clone.style.transform = "none";
    clone.style.position = "fixed";
    clone.style.left = "-99999px";
    clone.style.top = "0";
    clone.style.opacity = "1";
    document.body.appendChild(clone);

    html2canvas(clone, {
        scale: 0.6,
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "Financial_Capability_Statement.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
        document.body.removeChild(clone);
    });
};

// --- UTILS ---
function formatDateDMY(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatMoney(value) {
    if (value === "" || value === null) return "";
    return Number(value).toLocaleString("en-US");
}

document.addEventListener("wheel", function (e) {
    if (document.activeElement.type === "number") {
        document.activeElement.blur();
    }
});