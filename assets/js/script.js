const users={
 test:{
  password:"test",
  name:"Attorney Name",
  signature:"assets/img/sign_placeholder.png"
 },
   tanmoy:{
  password:"Tanmoy1887",
  name:"Gil Colson",
  signature:"assets/img/sign_gil_colson.png"
 }, 
    zeke:{
  password:"962546Zeke",
  name:"Zeke Sen",
  signature:"assets/img/sign_zeke.png"
 },
    caspian_drake:{
  password:"notgaycaspian",
  name:"Caspian Drake",
  signature:"assets/img/sign_caspain_drake.png"
 }
};

loginBtn.onclick=()=>{
const u=username.value,p=password.value;
if(users[u]&&users[u].password===p){
 loggedAs.textContent=users[u].name;
 pvAttorney.textContent=users[u].name;
 pvAttorney2.textContent=users[u].name;
 attorneySign.src=users[u].signature;
 loginPanel.classList.add("hidden");
 formPanel.classList.remove("hidden");
}else alert("Invalid credentials");
};

logoutBtn.onclick=()=>location.reload();

updatePreview.onclick=()=>{

pvName.textContent=appName.value;
pvName2.textContent=appName.value;
pvCid.textContent=appCid.value;
pvDob.textContent = formatDateDMY(appDob.value);
pvAddress.textContent=appAddress.value;
pvPhone.textContent=appPhone.value;
pvEmail.textContent=appEmail.value;
pvPurpose.textContent=appPurpose.value;

pvBank.textContent=formatMoney(bankBal.value)||0;
pvSaving.textContent=formatMoney(savingBal.value)||0;
pvCash.textContent=formatMoney(cashBal.value)||0;
pvAssets.textContent=formatMoney(otherAssets.value)||0;

pvTotalLiquid.textContent=formatMoney(
Number(bankBal.value||0)+
Number(savingBal.value||0)+
Number(cashBal.value||0)+
Number(otherAssets.value||0));

pvPrimaryIncome.textContent=primaryIncome.value;
pvSecondaryIncome.textContent=secondaryIncome.value;
pvOtherIncome.textContent=otherIncome.value;
pvTotalIncome.textContent=formatMoney(totalIncome.value)||0;

pvLoanDebt.textContent=formatMoney(liabilities.value)||0;
pvOtherLiabilities.textContent=formatMoney(otherLiabilities.value)||0;
pvTotalLiabilities.textContent=formatMoney(
Number(liabilities.value||0)+Number(otherLiabilities.value||0));

pvInitialInvestment.textContent=formatMoney(initialInvestment.value)||0;
pvMonthlyBudget.textContent=formatMoney(monthlyBudget.value)||0;
pvFundingSource.textContent=fundingSource.value;

pvBusinessExp.textContent=businessExp.value;
pvFinancialConduct.textContent=financialConduct.value;

pvAttorneyDate.textContent = formatDateDMY(attorneyDate.value);
pvApplicantDate.textContent=formatDateDMY(appDate.value);
};

appSignature.onchange=e=>{
const f=e.target.files[0];
if(!f)return;
const r=new FileReader();
r.onload=()=>appSignPreview.src=r.result;
r.readAsDataURL(f);
};

downloadPNG.onclick = () => {
  const original = document.getElementById("statementContainer");

  // Clone the document
  const clone = original.cloneNode(true);

  // Prepare clone for capture
  clone.style.transform = "none";
  clone.style.position = "fixed";
  clone.style.left = "-99999px";
  clone.style.top = "0";
  clone.style.opacity = "1";

  document.body.appendChild(clone);

  html2canvas(clone, {
    scale: 0.6,                 // your tuned quality
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
