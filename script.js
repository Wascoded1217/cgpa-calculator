// some javascript code goes here

const add = document.querySelector("#btn-add")
const course = document.querySelector('#courseCode');
const unitLoad = document.querySelector('#unitCourse');
const grade = document.querySelector('#grade');
const tBody = document.querySelector('#t_body');
const tFooter = document.querySelector('#t_foot');
const tableContainer = document.querySelector('#table-containers');
const calGp= document.querySelector('#cal-gp');
const clearData = document.querySelector('#btn-clear');
const gp_result = document.querySelector("#cgp-foot");


let gpAry = [];


add.addEventListener('click', () => {
    // console.log('add link')


    if (course.value === '' || unitLoad.value <= 0 || grade.selectedIndex === 0) {
        Swal.fire({
          title: 'Error!',
          text: 'Wrong input check and try again later',
          icon: 'error',
          confirmButtonText: 'Okay'
        })
    }
    else {
        const containerCourse = document.createElement('tr');
        const courseDiv = document.createElement('td');
        courseDiv.innerHTML = course.value;
        
        const unitDiv = document.createElement('td');
        unitDiv.innerHTML = unitLoad.value
        
        const gradeDiv = document.createElement('td');
        gradeDiv.innerHTML = grade.options[grade.selectedIndex].text;
        
        containerCourse.appendChild(courseDiv);
        containerCourse.appendChild(unitDiv);
        containerCourse.appendChild(gradeDiv);
        tBody.appendChild(containerCourse);
        tableContainer.classList.remove('table-display')
        calGp.classList.remove('display-btn')
        clearData.classList.remove('display-btn')
        gpAry.push({
            'unit': parseInt(unitLoad.value),
            'grade': parseInt(grade.options[grade.selectedIndex].value)
        });
        // console.log(tableContainer) 

        course.value = "";
        unitLoad.value = "";
        grade.selectedIndex = '0';
    }
});

// To calculate Gp
calGp.addEventListener('click', () => {
    let unitLoads = 0, productOfUnitLoadsAndGrade = 0, sumOfProductOfUnitLoadsAndGrades = 0;
    gpAry.forEach(result => {
        unitLoads += result.unit;
        productOfUnitLoadsAndGrade = parseInt(result.unit) * parseInt(result.grade);
        sumOfProductOfUnitLoadsAndGrades += productOfUnitLoadsAndGrade;
    });
 
    const gp_result = document.createElement('div');
    gp_result.className = 'cgp-footer';
    totalUnits = document.createElement('div');
    totalUnits.innerHTML = `Total Unit : <b> ${unitLoads} </b>`;
    // console.log(`Your total unit load is ${unitLoads}`)

    divGp = document.createElement('div');
    divGp.innerHTML = `GPA : <b> ${(sumOfProductOfUnitLoadsAndGrades / unitLoads).toFixed(2)} </b>`;
    // console.log(divGP)

    gp_result.appendChild(totalUnits);
    gp_result.appendChild(divGp);
    tFooter.innerHTML = '';
  if (tFooter.querySelector('tr') !== null) {
        tFooter.querySelector('tr').remove();
    }
    tFooter.appendChild(gp_result)
});

clearData.addEventListener('click', () => {
    gpAry = [];
    // console.log(gpAry)
    tBody.querySelectorAll('*').forEach((child) => child.remove());
     if (tFooter.querySelector('tr') !== null) {
        tFooter.querySelector('tr').remove();
    }
    tableContainer.classList.add('table-display');
    calGp.classList.add('display-btn');
    clearData.classList.add('display-btn');
});
 
