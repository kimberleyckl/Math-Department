// Chien-Li LIN, 955333969, clin834

const home_clicked = () => {
    document.getElementById("home_page").style.display = "block";
    document.getElementById("staff_page").style.display = "none";
    document.getElementById("course_page").style.display = "none";
    document.getElementById("info_page").style.display = "none";
    document.getElementById("home_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("staff_tab").style.backgroundColor = "transparent";
    document.getElementById("course_tab").style.backgroundColor = "transparent";
    document.getElementById("info_tab").style.backgroundColor = "transparent";
}

const staff_clicked = () => {
    document.getElementById("home_page").style.display = "none";
    document.getElementById("staff_page").style.display = "block";
    document.getElementById("course_page").style.display = "none";
    document.getElementById("info_page").style.display = "none";
    document.getElementById("home_tab").style.backgroundColor = "transparent";
    document.getElementById("staff_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("course_tab").style.backgroundColor = "transparent";
    document.getElementById("info_tab").style.backgroundColor = "transparent";
}

const course_clicked = () =>{
    document.getElementById("home_page").style.display = "none";
    document.getElementById("staff_page").style.display = "none";
    document.getElementById("course_page").style.display = "block";
    document.getElementById("info_page").style.display = "none";
    document.getElementById("home_tab").style.backgroundColor = "transparent";
    document.getElementById("staff_tab").style.backgroundColor = "transparent";
    document.getElementById("course_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("info_tab").style.backgroundColor = "transparent";
}

const info_clicked = () =>{
    document.getElementById("home_page").style.display = "none";
    document.getElementById("staff_page").style.display = "none";
    document.getElementById("course_page").style.display = "none";
    document.getElementById("info_page").style.display = "block";
    document.getElementById("home_tab").style.backgroundColor = "transparent";
    document.getElementById("staff_tab").style.backgroundColor = "transparent";
    document.getElementById("course_tab").style.backgroundColor = "transparent";
    document.getElementById("info_tab").style.backgroundColor = "antiquewhite";    
}

const staffFetch = fetch('https://dividni.com/cors/CorsProxyService.svc/proxy?url=https://unidirectory.auckland.ac.nz/rest/search?orgFilter=MATHS ');
const staffPromise = staffFetch.then((response) => response.json());
staffPromise.then((data) => {
    const staff = data.list;
    const numOfStaff = data.totalListSize;
    staff.forEach(process);
});

const process = (person) =>{
//container
    let container = document.createElement("div");
    container.className ="container";
    container.innerHTML = "<hr/><hr/>"
//left box
    const upi = person.profileUrl[1];
    let div1 = document.createElement("div");
    div1.className = "staffleft";
// name
    if ('title' in person){
        let title = person.title;
        div1.innerHTML = 
            "<div class ='staffName'><a href='https://unidirectory.auckland.ac.nz/people/profile/"+ 
            upi +"'>"+person.title + " " + person.names+"</a></div>";
    }
    else{
        div1.innerHTML = "<div class ='staffName'>" + person.names+"</div>";
    }
// job title
    let job = document.createElement("div");
    job.innerHTML = '<div class="staffjob">' + person.jobtitles + '</div>'+
        "<div> UPI: " + upi + "</div>"
    div1.appendChild(job);
// phone number & add us
    const vcardFetch =
        fetch('https://dividni.com/cors/CorsProxyService.svc/proxy?url=https://unidirectory.auckland.ac.nz/people/vcard/'+upi);              
        const vcardPromise = vcardFetch.then((response) => {
            if (response.status >=400 ){
                let phone = document.createElement("div");
                phone.innerHTML = "<div>TEL: Not available</div>"
                div1.appendChild(phone)
            }
            else{return response.text()}
            });
        vcardPromise.then((data) => {
            let phone = document.createElement("div");
            const a = data;
            const b =a.split('\n');
            b.forEach((line)=>{
                if (line.slice(0,3)== "TEL"){
                    let phone = document.createElement("div");
                    let numIndex = line.indexOf("+");
                    phone.innerHTML = 
                        "<div>TEL:<a href='tel:"+ line.slice(numIndex) +"'>"+ line.slice(numIndex) +"</a></div>\n"+
                        "<a href = https://dividni.com/cors/CorsProxyService.svc/proxy?url=https://unidirectory.auckland.ac.nz/people/vcard/"+
                        upi+">Add me to your Address Book</a>"
                    div1.appendChild(phone)
                }
            })                    
        });
// img
    let img = document.createElement('div');
    if ('imageId' in person){
        const imgid= person.imageId;
        img.innerHTML = '<img src="https://dividni.com/cors/CorsProxyService.svc/proxy?url=https://unidirectory.auckland.ac.nz/people/imageraw/'+upi+'/'+imgid+'/biggest"></img>';
    }
    else{
        img.innerHTML = "<img src='https://www.cs.auckland.ac.nz/courses/compsci335s2c/lectures/mano/qz/MathLogo.svg'>"
    }
    div1.appendChild(img);
// email
    let email = document.createElement("div");
    person.emailAddresses.forEach((item) =>{
        email.innerHTML= "<div>EMAIL: <a href ='mailto: "+ item+ "'>"+item+"</a></div>";
    })
    div1.appendChild(email);
    container.appendChild(div1); 
// right box
    let div2 = document.createElement("div");
    div2.className = "staffDetails";
    div2.innerHTML ="<div>Other details</div>";
    
    Object.keys(person).forEach(key =>{
        let div3 = document.createElement("div");
        div3.innerHTML= "<u class='underLine'>" + key +"</u> "+ person[key];
        div2.appendChild(div3);
    })
    container.appendChild(div2); 
    const staffList = document.getElementById('staffList');
    staffList.appendChild(container);
}


// fetch
    const course = document.getElementById('course');
    const courseFetch = fetch('https://api.test.auckland.ac.nz/service/courses/v2/courses?subject=MATHS&year=2020&size=500');
    const coursePromise = courseFetch.then((response) => response.json());
    coursePromise.then((things) => {
        const courseDetail = things.data;
        const numOfCourse = things.total;
        courseDetail.forEach(processc)
    });


    const processc = (c) => {
// put in different stage
        let stage;
        if (c.level == '1'){
            stage = document.getElementById('stage1');
        }
        else if (c.level == '2'){
            stage = document.getElementById('stage2');
        }
        else if (c.level == '3'){
            stage = document.getElementById('stage3');
        }        
        else if (c.level == '7'){
            stage = document.getElementById('postgraduate');
        }        
        else{
             stage = document.getElementById('other');
        }        
        let div = document.createElement("div");
        div.className = 'paper'
//title
        let title = document.createElement("div");
        title.className = 'paperTitle';
        title.innerHTML = c.subject + c.catalogNbr + "<br/>" + c.titleLong + "<br/>" ;
        div.appendChild(title);
//description
        let description = document.createElement("div");
        description.className = 'paperDescription';

        description.innerHTML =  c.description + "<br/>";
        
        div.appendChild(description);
//rqrmnt
        let rqrmnt= document.createElement("div");
        rqrmnt.className = 'rqrmnt';
        if(c.rqrmntDescr == '.'||c.rqrmntDescr == 'undefined'){
            console.log(c.subject + c.catalogNbr + c.rqrmntDescr)
            rqrmnt.innerHTML ="<hr/>";
        }
        else{           
            rqrmnt.innerHTML = c.rqrmntDescr + "<br/><hr/>";
            
        }
        div.appendChild(rqrmnt);
        div.setAttribute('onclick','timetable(' + c.catalogNbr + ')')
        stage.appendChild(div)

    }


    

// timetable
const timetable = (n) =>{
    const timetableFetch = fetch('https://api.test.auckland.ac.nz/service/classes/v1/classes?year=2020&subject=MATHS&size=500&catalogNbr='+n);
    const timetablePromise = timetableFetch.then((response) => response.text());
    timetablePromise.then((data) => {
        console.log(data)
        alert(data)
    });
}





const infoFetch= fetch("https://cws.auckland.ac.nz/qz20/Quiz2020ChartService.svc/g",{
    headers: { 
        "Accept": "application/json" 
    },
});
const infoPromise = infoFetch.then((response) => response.json());
infoPromise.then((data) => {
// create svg
    // const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // svg1.setAttribute("viewBox", "0 0 400 300");
    // svg1.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    // svg1.setAttribute("xmlns","http://www.w3.org/2000/svg")
// symbol - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol 
    // let full = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
    // full.setAttribute("id", "full");
    // full.setAttribute("class", "icon");
    // // full.setAttribute("height", "30");
    // full.setAttribute("viewBox", "0 0 400 334");
    // let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // path1.setAttribute("d","M195.083 13.357 C 155.599 14.240,116.551 28.209,85.250 52.650 L 82.917 54.472 77.083 48.676 C 70.927 42.559,69.949 41.744,67.264 40.490 C 51.251 33.013,34.125 48.036,39.513 64.833 C 40.788 68.809,41.805 70.168,48.676 77.083 L 54.472 82.917 52.650 85.250 C 6.781 143.993,0.434 225.132,36.600 290.417 C 40.050 296.646,42.329 299.118,46.565 301.230 C 60.057 307.955,75.667 298.355,75.667 283.333 C 75.667 279.026,74.959 276.681,72.106 271.534 C 26.856 189.889,67.396 88.127,156.333 60.109 C 163.475 57.859,176.941 54.833,179.813 54.833 C 179.950 54.833,180.000 58.461,180.000 68.250 C 180.000 81.235,179.990 81.667,179.689 81.667 C 179.518 81.667,178.224 81.896,176.814 82.177 C 113.956 94.696,72.109 153.756,81.169 217.167 C 90.527 282.662,151.496 328.240,217.167 318.832 C 269.767 311.296,311.231 269.851,318.819 217.225 C 320.981 202.230,320.222 186.196,316.658 171.566 C 305.469 125.630,267.906 90.156,221.708 81.895 L 220.000 81.589 220.000 68.211 C 220.000 57.620,220.043 54.833,220.208 54.834 C 222.179 54.838,233.093 57.090,238.833 58.677 C 313.324 79.273,358.928 153.634,343.565 229.449 C 340.627 243.950,335.172 258.536,327.667 271.963 C 325.068 276.612,324.333 279.118,324.333 283.333 C 324.333 297.873,339.056 307.498,352.444 301.710 C 356.686 299.876,359.772 296.902,362.541 291.978 C 399.622 226.035,393.632 144.525,347.350 85.250 L 345.528 82.917 351.324 77.083 C 358.121 70.243,359.085 68.974,360.382 65.167 C 366.015 48.633,349.387 33.280,333.353 40.211 C 330.251 41.553,329.555 42.116,323.083 48.526 L 317.083 54.469 314.887 52.753 C 283.743 28.423,244.001 14.094,205.750 13.405 C 203.275 13.360,200.950 13.307,200.583 13.286 C 200.217 13.265,197.742 13.297,195.083 13.357 M207.083 120.435 C 244.223 123.654,274.515 152.755,279.234 189.750 C 285.334 237.565,248.150 279.845,200.000 279.845 C 148.966 279.845,110.950 232.476,122.014 182.674 C 130.707 143.546,167.038 116.965,207.083 120.435 M195.849 180.344 C 181.455 183.447,175.155 200.402,184.024 212.171 C 192.270 223.115,209.134 222.537,216.777 211.049 C 220.423 205.570,221.049 198.071,218.377 191.890 C 214.702 183.388,204.939 178.384,195.849 180.344")
    // path2.setAttribute("d","M203.058 186.903 C 193.647 189.186,195.319 203.333,205.000 203.333 C 209.498 203.333,213.333 199.498,213.333 195.000 C 213.333 189.703,208.198 185.656,203.058 186.903")
    // // path2.setAttribute('fill','#ffffff');
    // full.appendChild(path1);
    // full.appendChild(path2);
    // svg1.appendChild(full);
    
    // clippath
    let svg1 = document.getElementById('svg1');
// <use xlink:href="#full" x="40"  y="190" style="opacity:1.0" />
    data.forEach((n) => {
        let use= document.createElement("use");
        use.setAttribute("xlink:href","#full");
        use.setAttribute("x", "100");
        use.setAttribute("y", "190");
        use.setAttribute("style","opacity:1.0");
        svg1.appendChild(use)
        console.log(n)
        // let b = document.createElementNS("http://www.w3.org/2000/svg", "use");
        // b.setAttribute("xlink:href","#full");
        // b.setAttribute("x", "40");
        // b.setAttribute("y", "190");
        // // b.setAttribute("style","opacity:1.0");
        // svg1.appendChild(b)

    });
    const info = document.getElementById("info");
    info.appendChild(svg1);
});


window.onload = home_clicked;
