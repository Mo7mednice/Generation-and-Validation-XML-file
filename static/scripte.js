const form = document.getElementById('xmlForm');
const fileNameInput = document.getElementById('fileName');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const genderSelect = document.getElementById('gender');
const countryInput = document.getElementById('country');
const xmlDataTextarea = document.getElementById('xmlData');
const messageDiv = document.getElementById('message');


document.getElementById('xmlForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const email = emailInput.value;
    const age = ageInput.value;
    const gender = genderSelect.value;
    const country = countryInput.value;
    const xmlData = xmlDataTextarea.value;


    // Create XML content
    var xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<person>\n';
    xmlContent += '    <firstName>' + firstName + '</firstName>\n';
    xmlContent += '    <lastName>' + lastName + '</lastName>\n';
    xmlContent += '    <age>' + age + '</age>\n';
    xmlContent += '    <email>' + email + '</email>\n';
    xmlContent += '    <gender>' + gender + '</gender>\n';
    xmlContent += '    <country>' + country + '</country>\n';
    xmlContent += '    <xmlData>' + xmlData + '</xmlData>\n';
    xmlContent += '</person>';

    // Trigger the file download
    downloadXml(xmlContent);
    alert('XML file downloaded successfully!');
    fileNameInput.value = '';
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    ageInput.value = '';
    genderSelect.value = 'male';
    countryInput.value = '';
    xmlDataTextarea.value = '';
});

function downloadXml(xmlContent) {
    const fileName = fileNameInput.value;
    var blob = new Blob([xmlContent], { type: 'text/xml' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download =  fileName + '.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
