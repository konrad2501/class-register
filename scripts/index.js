const blockchain = document.querySelector('.blocks');
const loggedOut = document.querySelectorAll('.logged-out');
const loggedIn = document.querySelectorAll('.logged-in');
const loggedInIsAdmin = document.querySelectorAll('.logged-in-isAdmin');
const accountDetails = document.querySelector('.account-details');
const blockStudent = document.getElementById('blockStudent'); 
const blockMark = document.getElementById('blockMark');
const blockSubject = document.getElementById('blockSubject'); 
const blockGroup = document.getElementById('blockGroup');
const hideBlockGroup = document.getElementById('hideBlockGroup'); 
const hideBlockStudent = document.getElementById('hideBlockStudent'); 
const studentList = document.querySelector('.student-list');
const adminGroup = document.querySelector('.admin-group');
const studentsGroup = document.querySelector('.check-students-group');
const sendMessage = document.querySelector("#send-message"); 
const sendMessage2 = document.querySelector("#send-message2"); 
const sendMessage3 = document.querySelector("#send-message3"); 


const chb = document.getElementById('check');
chb.addEventListener('change', (event) => {

    if(true)
    {
        const body = document.body;
        body.classList.toggle("dark-container");

        const userId = JSON.parse(sessionStorage.getItem("uid"));
        if(userId!="")
        {
            const dark = "dark";
            const bright = "bright";

            db.collection('users').doc(userId).get().then(doc => {
                const currMode = doc.data().mode;
                if(currMode == "bright")
                {
                    db.collection('users').doc(userId).update({
                        mode: dark
                    });
                }
                else
                {
                    db.collection('users').doc(userId).update({
                        mode: bright
                    });
                }
            });
        }
    }
});

// Wczytywanie i wyświetlenie danych
const setupGroup = (doc) => {
    let html = '<option value="" disabled selected>Wybierz grupę</option>';
    const size = doc.length;
    for(var i=1; i<size; i++)
    {
        const data = doc[i];
        const opt = `<option value="${data}">${data}</option>`;
        html += opt;
    }
    blockGroup.innerHTML = html;
};

const setupMark = (doc) => {
    let html = '<option value="" disabled selected>Wybierz ocenę</option>';
    const size = doc.length;
    for(var i=0; i<size; i++)
    {
        const data = doc[i];
        const opt = `<option value="${data}">${data}</option>`;
        html += opt;
    }
    blockMark.innerHTML = html;
};

const setupSubject = (doc) => {
    let html = '<option value="" disabled selected>Wybierz przedmiot</option>';
    const size = doc.length;
    let option = '';
    let curList = '';
    let curOption = ''; 
    let listofsub = '';
    let allSub = '';

    for(var i=0; i<size; i++)
    {
        let data = doc[i];

        if(data == "math") data="matematyka";
        if(data == "science") data="fizyka";
        if(data == "english") data="angielski";
        if(data == "polish") data="polski";
        if(data == "history") data="historia";
        if(data == "informatics") data="informatyka";
        if(data == "database") data="bazy danych";
        if(data == "computer_network") data="sieci komputerowe";
        if(data == "physical_education") data="wf";
        if(data == "computer_graphics") data="grafika komputerowa";
        let opt = `<option value="${data}">${data}</option>`;
        allSub+=opt;
    }
    sessionStorage.setItem("allSubPl",JSON.stringify(allSub));

    const curSubject = JSON.parse(sessionStorage.getItem("selectSubject"));
    // const size = curSubject.length;

    for(var i=0; i<curSubject.length; i++)
    {   
        let data = curSubject[i];
        let curdata = data;
        const opt = `<option value="${data}">${data}</option>`;

        // if(curdata == "math") curdata="matematyka";
        // if(curdata == "science") curdata="fizyka";
        // if(curdata == "english") curdata="angielski";
        // if(curdata == "polish") curdata="polski";
        // if(curdata == "history") curdata="historia";
        // if(curdata == "informatics") curdata="informatyka";
        // if(curdata == "database") curdata="bazy danych";
        // if(curdata == "computer_network") curdata="sieci komputerowe";
        // if(curdata == "physical_education") curdata="wf";
        // if(curdata == "computer_graphics") curdata="grafika komputerowa";

        const optPL = `<option value="${curdata}">${curdata}</option>`;
        option += opt;
        //curList += optPL;

        if(curSubject[0]!=undefined && curSubject[1]!=undefined && curSubject[2]!=undefined)
        {
            if((curSubject[0].search(data)>=0) || (curSubject[1].search(data)>=0) || (curSubject[2].search(data)>=0))
            {
            const opt = `<option value="${data}">${data}</option>`;
            curOption += opt;
            listofsub += data + ", ";
            //listofsubpl += curdata + ", ";
            }
        }
        else if(curSubject[0]!=undefined && curSubject[1]!=undefined)
        {
            if((curSubject[0].search(data)>=0) || (curSubject[1].search(data)>=0))
            {
            const opt = `<option value="${data}">${data}</option>`;
            curOption += opt;
            listofsub += data + ", ";
            //listofsubpl += curdata + ", ";
            }
        }
        else if(curSubject[0]!=undefined)
        {
            if((curSubject[0].search(data)>=0))
            {
            const opt = `<option value="${data}">${data}</option>`;
            curOption += opt;
            listofsub += data + " ";
            //listofsubpl += curdata + ", ";
            }
        }
    }
    sessionStorage.setItem("subjectList",JSON.stringify(option)); //option
    sessionStorage.setItem("listofsubjects",JSON.stringify(listofsub));

    blockSubject.innerHTML = html+curOption;
};

const setupChat = (user) => {

    db.collection('users').doc(user.uid).get().then(doc => {
        const currGroup = doc.data().group;
        const {name, surname} = doc.data();
        const setNameAndSurname = name + " " + surname;

        if(doc.data().isAdmin == true)
        {
          db.collection('chat1A').onSnapshot(doc => {
            let html = '';
            let msg = '';
                doc.forEach(element => {
                    const user = element.data().user;
                    const message = element.data().message;
            
                    if(setNameAndSurname == user)
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:left; background-color:DodgerBlue; border-radius: 50px 50px 50px 10px;'> " + message + "</li>";
                    }
                    else
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:right; background-color:gray; border-radius: 50px 50px 10px 50px;'> " + user + " :  " + message + "</li>";
                    }
                    html+=msg;
                })
                document.getElementById("messages").innerHTML = html;
            });
        

            db.collection('chat1B').onSnapshot(doc => {
                let html = '';
                let msg = '';
                doc.forEach(element => {
                    const user = element.data().user;
                    const message = element.data().message;
                
                    if(setNameAndSurname == user)
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:left; background-color:DodgerBlue; border-radius: 50px 50px 50px 10px;'> " + message + "</li>";
                    }
                    else
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:right; background-color:gray; border-radius: 50px 50px 10px 50px;'> " + user + " :  " + message + "</li>";
                    }
                    html+=msg;
                })
                document.getElementById("messages2").innerHTML = html;
            });
        

            db.collection('chat2A').onSnapshot(doc => {
                let html = '';
                let msg = '';
                doc.forEach(element => {
                    const user = element.data().user;
                    const message = element.data().message;
                    
                    if(setNameAndSurname == user)
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:left; background-color:DodgerBlue; border-radius: 50px 50px 50px 10px;'> " + message + "</li>";
                    }
                    else
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:right; background-color:gray; border-radius: 50px 50px 10px 50px;'> " + user + " :  " + message + "</li>";
                    } 
                    html+=msg;
                })
                document.getElementById("messages3").innerHTML = html;
            });
        
        }

        if(currGroup == "1A")
        {
            db.collection('chat1A').onSnapshot(doc => {
                let html = '';
                let msg = '';
                doc.forEach(element => {
                    const user = element.data().user;
                    const message = element.data().message;
                    if(setNameAndSurname == user)
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:left; background-color:DodgerBlue; border-radius: 50px 50px 50px 10px;'> " + message + "</li>";
                    }
                    else
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:right; background-color:gray; border-radius: 50px 50px 10px 50px;'> " + user + " :  " + message + "</li>";
                    }
                    html+=msg;
                })
                document.getElementById("messages").innerHTML = html;
            });
        }
        else if(currGroup == "1B")
        {
            db.collection('chat1B').onSnapshot(doc => {
                let html = '';
                let msg = '';
                doc.forEach(element => {
                    const user = element.data().user;
                    const message = element.data().message;
                    if(setNameAndSurname == user)
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:left; background-color:DodgerBlue; border-radius: 50px 50px 50px 10px;'> " + message + "</li>";
                    }
                    else
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:right; background-color:gray; border-radius: 50px 50px 10px 50px;'> " + user + " :  " + message + "</li>";
                    }
                    html+=msg;
                })
                document.getElementById("messages").innerHTML = html;
            });
        }
        else if(currGroup == "2A")
        {
            db.collection('chat2A').onSnapshot(doc => {
                let html = '';
                let msg = '';
                doc.forEach(element => {
                    const user = element.data().user;
                    const message = element.data().message;
                    if(setNameAndSurname == user)
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:left; background-color:DodgerBlue; border-radius: 50px 50px 50px 10px;'> " + message + "</li>";
                    }
                    else
                    {
                        msg = "<li style='color:white; margin-top:5px; height:40px; width:60%; float:right; background-color:gray; border-radius: 50px 50px 10px 50px;'> " + user + " :  " + message + "</li>";
                    } 
                    html+=msg;
                })
                document.getElementById("messages").innerHTML = html;
            });
        }
    });
    
}

sendMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    const timestamp = Date.now() + "0";
    const chatText = document.getElementById("chat-text");
    const message = chatText.value;
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const userId = JSON.parse(sessionStorage.getItem("uid"));
    chatText.value = "";
    db.collection('users').doc(userId).get().then(doc => {
        let currGroup = doc.data().group;
        if(currGroup == "1A" && message != "")
        {
            db.collection('chat1A').doc(timestamp).set({
                user: userInfo,
                message: message
            }).catch(err => {
                console.log(err.message);
            });
        }
        else if(currGroup == "1B" && message != "")
        {
            db.collection('chat1B').doc(timestamp).set({
                user: userInfo,
                message: message
            }).catch(err => {
                console.log(err.message);
            });
        }
        else if(currGroup == "2A" && message != "")
        {
            db.collection('chat2A').doc(timestamp).set({
                user: userInfo,
                message: message
            }).catch(err => {
                console.log(err.message);
            });
        }
        else if(currGroup == "admin" && chatText != undefined && message != "")
        {
            db.collection('chat1A').doc(timestamp).set({
                user: userInfo,
                message: message
            }).catch(err => {
                console.log(err.message);
            });
        }
    });
});

sendMessage2.addEventListener("submit", (e) => {
    e.preventDefault();
    const timestamp = Date.now() + "0";
    const chatText2 = document.getElementById("chat-text2");
    const message2 = chatText2.value;
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const userId = JSON.parse(sessionStorage.getItem("uid"));
    chatText2.value = "";
    db.collection('users').doc(userId).get().then(doc => {
        let currGroup = doc.data().group;
        if(currGroup == "admin" && chatText2 != undefined && message2 != "")
        {
            db.collection('chat1B').doc(timestamp).set({
                user: userInfo,
                message: message2
            }).catch(err => {
                console.log(err.message);
            });
        }
    });
});

sendMessage3.addEventListener("submit", (e) => {
    e.preventDefault();
    const timestamp = Date.now() + "0";
    const chatText3 = document.getElementById("chat-text3");
    const message3 = chatText3.value;
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const userId = JSON.parse(sessionStorage.getItem("uid"));
    chatText3.value = "";
    db.collection('users').doc(userId).get().then(doc => {
        let currGroup = doc.data().group;
        if(currGroup == "admin" && chatText3 != undefined && message3 != "")
        {
            db.collection('chat2A').doc(timestamp).set({
                user: userInfo,
                message: message3
            }).catch(err => {
                console.log(err.message);
            });
        }
    });
});

adminGroup.addEventListener('change', (event) => {
    if(event.target.value == "admin")
    {   
        let html1 = '<option value="" disabled selected>Wybierz przedmiot 1</option>';
        let html2 = '<option value="" disabled selected>Wybierz przedmiot 2</option>';
        let html3 = '<option value="" disabled selected>Wybierz przedmiot 3</option>';

        const subjectList = JSON.parse(sessionStorage.getItem("allSubPl"));

        const result1 = document.querySelector('.subject1');
        result1.innerHTML = '<div class="input-field"><label for="signup-subject1"></label><select id="signup-subject1" style="display: block;">' + html1 + subjectList + ' </select></div>';
        
        const result2 = document.querySelector('.subject2');
        result2.innerHTML = '<div class="input-field"><label for="signup-subject2"></label><select id="signup-subject2" style="display: block;">' + html2 + subjectList + ' </select></div>';
            
        const result3 = document.querySelector('.subject3');
        result3.innerHTML = '<div class="input-field"><label for="signup-subject3"></label><select id="signup-subject3" style="display: block;">' + html3 + subjectList + ' </select></div>';
    }
});

studentsGroup.addEventListener('change', (event) => {

    blockStudent.style.display = "block";

    if(event.target.value == "1A")
    {
        blockStudent.innerHTML = JSON.parse(sessionStorage.getItem("group1A"));
    }
    else if(event.target.value == "1B")
    {
        blockStudent.innerHTML = JSON.parse(sessionStorage.getItem("group1B"));
    }
    else if(event.target.value == "2A")
    {
        blockStudent.innerHTML = JSON.parse(sessionStorage.getItem("group2A"));
    }
});


const setupHideGroup = (doc) => {
    let html = '<option value="" disabled selected>Wybierz grupę</option>';
    const size = doc.length;
    for(var i=0; i<size; i++)
    {
        const data = doc[i];
        const opt = `<option value="${data}">${data}</option>`;
        html += opt;
        
    }
    hideBlockGroup.innerHTML = html;
};


const setupHideStudent = (data) => {
    let group1A = '<option value="" disabled selected>Wybierz studenta</option>';
    let group1B = '<option value="" disabled selected>Wybierz studenta</option>';
    let group2A = '<option value="" disabled selected>Wybierz studenta</option>';
    data.forEach(element => {
        const getRole = element.data().isAdmin;
        if(!getRole)
        {
            const data = element.data();
            const opt = `<option>${data.name} ${data.surname}</option>`;

            if(element.data().group == "1A")
                group1A += opt;
            else if(element.data().group == "1B")
                group1B += opt;  
            else if(element.data().group == "2A")
                group2A += opt;  
            
        }
    });    
    sessionStorage.setItem("group1A",JSON.stringify(group1A));
    sessionStorage.setItem("group1B",JSON.stringify(group1B));
    sessionStorage.setItem("group2A",JSON.stringify(group2A));

    
};

// const setupNameSurname = (data) => {
//     let html = '<option value="" disabled selected>Wybierz studenta</option>';
//     data.forEach(element => {
//         const getRole = element.data().isAdmin;
//         if(!getRole)
//         {
//             const data = element.data();
//             const opt = `<option>${data.name} ${data.surname}</option>`;
//             html += opt;
//         }
//     });
//     blockStudent.innerHTML = html;
// };

const setupUI = (user) => {
    if(user)
    {
        // Informacje o uzytkowniku
        db.collection('users').doc(user.uid).get().then(doc => {
            let code = '';
            const html = `<div>Zalogowany jako ${user.email}</div>
            <div>Imię i nazwisko: ${doc.data().name} ${doc.data().surname}</div>
            <div>Klucz publiczny: ${doc.data().key}</div>
            <hr>`;

            const key = doc.data().key;


            if(doc.data().mode == "dark")
            {
                const body = document.body;
                body.classList.toggle("dark-container");
            }

            if(doc.data().isAdmin == false)
            {
                db.collection('block').get().then(doc => {
                    const data = doc.docs;
    
                    const math = [];
                    const science = [];
                    const polish = [];
                    const english = [];
                    const history = [];
                    const informatics = [];
                    const database = [];
                    const computer_network = [];
                    const physical_education = [];
                    const computer_graphics = [];
                    
                    data.forEach(element => {
                        if(key == element.data().key)
                        {
                            if(element.data().subject == "math" || element.data().subject == "matematyka")
                            {
                                math.push(element.data().mark);
                            }
                            if(element.data().subject == "science" || element.data().subject == "fizyka")
                            {
                                science.push(element.data().mark);
                            }
                            if(element.data().subject == "polish" || element.data().subject == "polski")
                            {
                                polish.push(element.data().mark);
                            }
                            if(element.data().subject == "english" || element.data().subject == "angielski")
                            {
                                english.push(element.data().mark);
                            }
                            if(element.data().subject == "history" || element.data().subject == "historia")
                            {
                                history.push(element.data().mark);
                            }
                            if(element.data().subject == "informatics" || element.data().subject == "informatyka")
                            {
                                informatics.push(element.data().mark);
                            }
                            if(element.data().subject == "database" || element.data().subject == "bazy danych")
                            {
                                database.push(element.data().mark);
                            }
                            if(element.data().subject == "computer_network" || element.data().subject == "sieci komputerowe")
                            {
                                computer_network.push(element.data().mark);
                            }
                            if(element.data().subject == "physical_education" || element.data().subject == "wf")
                            {
                                physical_education.push(element.data().mark);
                            }
                            if(element.data().subject == "computer_graphics"  || element.data().subject == "grafika komputerowa")
                            {
                                computer_graphics.push(element.data().mark);
                            }
                            
                        }
                })

                if(math == '') math.push('-');
                if(science == '') science.push('-');
                if(polish == '') polish.push('-');
                if(english == '') english.push('-');
                if(history == '') history.push('-');
                if(informatics == '') informatics.push('-');
                if(database == '') database.push('-');
                if(computer_network == '') computer_network.push('-');
                if(physical_education == '') physical_education.push('-');
                if(computer_graphics == '') computer_graphics.push('-');


                    const divBlock = `
                        <table class="striped">
                        <thead><tr><th>Przedmiot</th> <th>Ocena</th></tr></thead>
                        <tbody><tr><td>Fizyka: </td> <td>${science}</td></tr>
                        <tr><td>Matematyka: </td> <td>${math}</td></tr>
                        <tr><td>Angielski: </td> <td>${english}</td></tr>
                        <tr><td>Polski: </td> <td>${polish}</td></tr>
                        <tr><td>Historia: </td> <td>${history}</td></tr>
                        <tr><td>Informatyka: </td> <td>${informatics}</td></tr>
                        <tr><td>Bazy danych: </td> <td>${database}</td></tr>
                        <tr><td>Sieci komputerowe: </td> <td>${computer_network}</td></tr>
                        <tr><td>WF: </td> <td>${physical_education}</td></tr>
                        <tr><td>Grafika komputerowa: </td> <td>${computer_network}</td></tr>
                        </tbody>
                        </table>
                        `;

                code = html+divBlock;
                accountDetails.innerHTML = code;
    
            })
            }

            else
            { 
                // przechodzic przez liste uzytkownikow, pomijac admina
                db.collection('users').get().then(doc => {

                    var temp='';
                    var group1A = '';
                    var group1B = '';
                    var group2A = '';
                    let result='';

                    doc.forEach(element => {

                        const isAdmin = element.data().isAdmin;
                        const user = element.data().name + " " + element.data().surname;
                        
                        db.collection('block').get().then(doc => {
                            const data = doc.docs;
            
                            const math = [];
                            const science = [];
                            const polish = [];
                            const english = [];
                            const history = [];
                            const informatics = [];
                            const database = [];
                            const computer_network = [];
                            const physical_education = [];
                            const computer_graphics = [];



                                data.forEach(element => {
                                    const blockUser = element.data().student; 
                                    if(user == blockUser)
                                    {
                                        if(element.data().subject == "math" || element.data().subject == "matematyka")
                                        {
                                            math.push(element.data().mark);
                                        }
                                        if(element.data().subject == "science" || element.data().subject == "fizyka")
                                        {
                                            science.push(element.data().mark);
                                        }
                                        if(element.data().subject == "polish" || element.data().subject == "polski")
                                        {
                                            polish.push(element.data().mark);
                                        }
                                        if(element.data().subject == "english" || element.data().subject == "angielski")
                                        {
                                            english.push(element.data().mark);
                                        }
                                        if(element.data().subject == "history" || element.data().subject == "historia")
                                        {
                                            history.push(element.data().mark);
                                        }
                                        if(element.data().subject == "informatics" || element.data().subject == "informatyka")
                                        {
                                            informatics.push(element.data().mark);
                                        }
                                        if(element.data().subject == "database" || element.data().subject == "bazy danych")
                                        {
                                            database.push(element.data().mark);
                                        }
                                        if(element.data().subject == "computer_network" || element.data().subject == "sieci komputerowe")
                                        {
                                            computer_network.push(element.data().mark);
                                        }
                                        if(element.data().subject == "physical_education" || element.data().subject == "wf")
                                        {
                                            physical_education.push(element.data().mark);
                                        }
                                        if(element.data().subject == "computer_graphics" || element.data().subject == "grafika komputerowa")
                                        {
                                            computer_graphics.push(element.data().mark);
                                        }
                                    }
                                })

                                if(math == '') math.push('-');
                                if(science == '') science.push('-');
                                if(polish == '') polish.push('-');
                                if(english == '') english.push('-');
                                if(history == '') history.push('-');
                                if(informatics == '') informatics.push('-');
                                if(database == '') database.push('-');
                                if(computer_network == '') computer_network.push('-');
                                if(physical_education == '') physical_education.push('-');
                                if(computer_graphics == '') computer_graphics.push('-');

                                if(isAdmin == false)
                                {
                                    const bodyBlock = `<tr><th>${user}</th><th>${element.data().group}</th><td>${math}</td><td>${science}</td><td>${english}</td><td>${polish}</td><td>${history}</td><td>${informatics}</td><td>${database}</td><td>${computer_network}</td><td>${computer_graphics}</td><td>${physical_education}</td></tr>`;               
                                    //temp += bodyBlock;
                                    if(element.data().group=="1A")
                                    {
                                        group1A += bodyBlock;
                                    }
                                    else if(element.data().group=="1B")
                                    {
                                        group1B += bodyBlock;
                                    }
                                    else if(element.data().group=="2A")
                                    {
                                        group2A += bodyBlock;
                                    }


                                    //console.log(temp);
                                    sessionStorage.setItem("1A",JSON.stringify(group1A));
                                    sessionStorage.setItem("1B",JSON.stringify(group1B));
                                    sessionStorage.setItem("2A",JSON.stringify(group2A));
                                }    
                        })
                    })

                    //const students = JSON.parse(sessionStorage.getItem("grades"));
                    const g1A = JSON.parse(sessionStorage.getItem("1A"));
                    const g1B = JSON.parse(sessionStorage.getItem("1B"));
                    const g2A = JSON.parse(sessionStorage.getItem("2A"));
                    const students = g1A + g1B + g2A;

                    const headerBlock = `
                        <table class="striped">
                        <thead><tr><th>Student</th><th>Grupa</th><th>Matematyka</th><th>Fizyka</th><th>Angielski</th><th>Polski</th><th>Historia</th><th>Informatyka</th><th>Bazy danych</th><th>Sieci komputerowe</th><th>Grafika komputerowa</th><th>WF</th></tr></thead>
                        <tbody>
                        `;   
                    const footerBlock = `
                        </tbody>
                        </table>
                        `;
                        result = headerBlock+ students + footerBlock;
                        const curSubject = JSON.parse(sessionStorage.getItem("listofsubjects"));

                        // let textSplit = curSubject.split(", ");
                        // let translate = '';
                        // for(let i=0; i<3;i++)
                        // {
                        //     if(textSplit[i] == "math") translate+="matematyka,";
                        //     if(textSplit[i] == "science") translate+="fizyka,";
                        //     if(textSplit[i] == "english") translate+="angielski,";
                        //     if(textSplit[i] == "polish") translate+="polski,";
                        //     if(textSplit[i] == "history") translate+="historia,";
                        //     if(textSplit[i] == "informatics") translate+="informatyka,";
                        //     if(textSplit[i] == "database") translate+="bazy danych,";
                        //     if(textSplit[i] == "computer_network") translate+="sieci komputerowe,";
                        //     if(textSplit[i] == "physical_education") translate+="wf,";
                        //     if(textSplit[i] == "computer_graphics") translate+="grafika komputerowa,";
                        // }

                        let text = "Nauczyciel - Lista wykładanych przedmiotów: " + curSubject;
                        accountDetails.innerHTML = html + text; // informacje o zalogowanym uzytkowniku 
                        studentList.innerHTML = result;
                });
            }
        })

        // Elementy UI
        loggedIn.forEach(link => link.style.display = 'block');
        loggedOut.forEach(link => link.style.display = 'none');

        db.collection('users').doc(user.uid).get().then(doc => {
            const isAdmin = doc.data().isAdmin;
            if(isAdmin == true)
            {
                loggedInIsAdmin.forEach(link => link.style.display = 'block');
            }
            else
            {
                loggedIn.forEach(link => link.style.display = 'block');
            }
        })
    }
    else
    {   
        // if(JSON.parse(sessionStorage.getItem("darkMode")))
        // {
        //     const body = document.body;
        //     body.classList.toggle("dark-container");
        // }
            
        // Ukryte informacje o uzytkowniku
        accountDetails.innerHTML = '';
        // Elementy UI
        loggedIn.forEach(link => link.style.display = 'none');
        loggedOut.forEach(link => link.style.display = 'block');
    }
}

// Wyświetlenie elementów
const setupBlock = (data) => {
    
    if(data.length)
    {
        let html = '';
        let timestamp = [];
        let sortTimestamp = [];
        let time = "";

        let group1 = '<h1>Grupa 1A</h1> <hr>';
        let group2 = '<h1><br><br>Grupa 1B</h1> <hr>';
        let group3 = '<h1><br><br>Grupa 2A</h1> <hr>';

        data.forEach(element => {
        
        const ts = element.data().timestamp;
        const split1 = ts.split("(");
        const cut = split1[1];
        const split2 = cut.split(")");
        timestamp.push(split2[0]);
        
        sortTimestamp = timestamp.sort();

        // const block = element.data();
        // const li = `
        //     <li>
        //         <div class="collapsible-header grey lighten-4">Hash: ${block.hash}</div>
        //         <div class="collapsible-body white">Previous hash: ${block.previousHash}</div>
        //         <div class="collapsible-body white">Timestamp: ${block.timestamp}</div>
        //         <div class="collapsible-body white">Teacher: ${block.teacher}</div>
        //         <div class="collapsible-body white">Subject: ${block.subject}</div>
        //         <div class="collapsible-body white">Mark: ${block.mark}</div>
        //         <div class="collapsible-body white">Group: ${block.group}</div>
        //         <div class="collapsible-body white">Student: ${block.student}</div>
        //         <div class="collapsible-body white">Public key: ${block.key}</div>
        //     </li>
        // `;
    });

    let size = data.length;
    let x = sortTimestamp.length-1;

    const userUID = JSON.parse(sessionStorage.getItem("uid"));
    db.collection('users').doc(userUID).get().then(doc => {
        const isAdmin = doc.data().isAdmin;
        if(isAdmin == true)
        {
        //const curSub = doc.data().subject;
        // let sub1 = '';
        // let sub2 = '';
        // let sub3 = '';

        // if(curSub.length == 3)
        // {
        //     sub1 = curSub[0];
        //     sub2 = curSub[1];
        //     sub3 = curSub[2];
        // }
        // else if(curSub.length == 2)
        // {
        //     sub1 = curSub[0];
        //     sub2 = curSub[1];
        // }
        // else if(curSub.length == 1)
        // {
        //     sub1 = curSub[0];
        // }
        // && ( (sub1==sub) || (sub2==sub) || (sub3==sub))
            while(size!=1)
            {
                data.forEach(el => {
                    const ts = el.data().timestamp;
                    const split1 = ts.split("(");
                    const cut = split1[1];
                    const split2 = cut.split(")");
                    time = split2[0];
                    
        
                    if(sortTimestamp[x] == time) 
                    {   
                        const condition = el.data();
                        let currentGroup = el.data().group;
                        let icon = '';
                        let curSubject = condition.subject;

                        if(condition.subject == "math" || condition.subject == "matematyka")
                        {
                            icon = '<span class="material-icons"> calculate </span>';
                            curSubject = 'matematyka';
                        }
                        else if(condition.subject == "science" || condition.subject == "fizyka")
                        {
                            icon = '<span class="material-icons"> science </span>';
                            curSubject = 'fizyka';
                        }
                        else if(condition.subject == "english" || condition.subject == "angielski")
                        {
                            icon = '<span class="material-icons"> explicit </span>';
                            curSubject = 'angielski';
                        }
                        else if(condition.subject == "polish" || condition.subject == "polski")
                        {
                            icon = '<span class="material-icons"> language </span>';
                            curSubject = 'polski';
                        }
                        else if(condition.subject == "history" || condition.subject == "historia")
                        {
                            icon = '<span class="material-icons"> account_balance </span>';
                            curSubject = 'historia';
                        }
                        else if(condition.subject == "informatics" || condition.subject == "informatyka")
                        {
                            icon = '<span class="material-icons"> laptop </span>';
                            curSubject = 'informatyka';
                        }
                        else if(condition.subject == "database" || condition.subject == "bazy danych")
                        {
                            icon = '<span class="material-icons"> storage </span>';
                            curSubject = 'bazy danych';
                        }
                        else if(condition.subject == "computer_network" || condition.subject == "sieci komputerowe")
                        {
                            icon = '<span class="material-icons"> settings_ethernet </span>';
                            curSubject = 'sieci komputerowe';
                        }
                        else if(condition.subject == "physical_education" || condition.subject == "wf")
                        {
                            icon = '<span class="material-icons"> directions_run </span>';
                            curSubject = 'wf';
                        }
                        else if(condition.subject == "computer_graphics" || condition.subject == "grafika komputerowa")
                        {
                            icon = '<span class="material-icons"> gif </span>';
                            curSubject = 'grafika komputerowa';
                        }

                        if(currentGroup == "1A")
                        {
                            // if(condition.subject == "math")
                            // {
                            //     icon = '<span class="material-icons"> calculate </span>';
                            //     curSubject = 'matematyka';
                            // }
                            // else if(condition.subject == "science")
                            // {
                            //     icon = '<span class="material-icons"> science </span>';
                            //     curSubject = 'fizyka';
                            // }
                            // else if(condition.subject == "english")
                            // {
                            //     icon = '<span class="material-icons"> explicit </span>';
                            //     curSubject = 'angielski';
                            // }
                            // else if(condition.subject == "polish")
                            // {
                            //     icon = '<span class="material-icons"> language </span>';
                            //     curSubject = 'polski';
                            // }
                            // else if(condition.subject == "history")
                            // {
                            //     icon = '<span class="material-icons"> account_balance </span>';
                            //     curSubject = 'historia';
                            // }
                            // else if(condition.subject == "informatics")
                            // {
                            //     icon = '<span class="material-icons"> laptop </span>';
                            //     curSubject = 'informatyka';
                            // }
                            // else if(condition.subject == "database")
                            // {
                            //     icon = '<span class="material-icons"> storage </span>';
                            //     curSubject = 'bazy danych';
                            // }
                            // else if(condition.subject == "computer_network")
                            // {
                            //     icon = '<span class="material-icons"> settings_ethernet </span>';
                            //     curSubject = 'sieci komputerowe';
                            // }
                            // else if(condition.subject == "physical_education")
                            // {
                            //     icon = '<span class="material-icons"> directions_run </span>';
                            //     curSubject = 'wf';
                            // }
                            // else if(condition.subject == "computer_graphics")
                            // {
                            //     icon = '<span class="material-icons"> gif </span>';
                            //     curSubject = 'grafika komputerowa';
                            // }
                            const li = `
                            <li>
                            <div class="collapsible-header"><table><tr><td>Student: ${condition.student} (${condition.hash})</td><td style="text-align:right;"><b>${curSubject}</b> ${icon}</td></tr></table></div>
                            <div class="collapsible-body">Hash: ${condition.hash}</div>
                            <div class="collapsible-body">Poprzedni hash: ${condition.previousHash}</div>
                            <div class="collapsible-body">Nauczyciel: ${condition.teacher}</div>
                            <div class="collapsible-body">Timestamp: ${condition.timestamp}</div>
                            <div class="collapsible-body">Ocena: ${condition.mark}</div>
                            <div class="collapsible-body">Klucz publiczny: ${condition.key}</div>
                            <div class="collapsible-body">Notatka: ${condition.note}</div>
                            </li>
                            `;
                            size-=1;
                            x-=1;
                            group1 += li;
                        }
                        else if(currentGroup == "1B")
                        {
                            // if(condition.subject == "math")
                            // {
                            //     icon = '<span class="material-icons"> calculate </span>';
                            //     curSubject = 'matematyka';
                            // }
                            // else if(condition.subject == "science")
                            // {
                            //     icon = '<span class="material-icons"> science </span>';
                            //     curSubject = 'fizyka';
                            // }
                            // else if(condition.subject == "english")
                            // {
                            //     icon = '<span class="material-icons"> explicit </span>';
                            //     curSubject = 'angielski';
                            // }
                            // else if(condition.subject == "polish")
                            // {
                            //     icon = '<span class="material-icons"> language </span>';
                            //     curSubject = 'polski';
                            // }
                            // else if(condition.subject == "history")
                            // {
                            //     icon = '<span class="material-icons"> account_balance </span>';
                            //     curSubject = 'historia';
                            // }
                            // else if(condition.subject == "informatics")
                            // {
                            //     icon = '<span class="material-icons"> laptop </span>';
                            //     curSubject = 'informatyka';
                            // }
                            // else if(condition.subject == "database")
                            // {
                            //     icon = '<span class="material-icons"> storage </span>';
                            //     curSubject = 'bazy danych';
                            // }
                            // else if(condition.subject == "computer_network")
                            // {
                            //     icon = '<span class="material-icons"> settings_ethernet </span>';
                            //     curSubject = 'sieci komputerowe';
                            // }
                            // else if(condition.subject == "physical_education")
                            // {
                            //     icon = '<span class="material-icons"> directions_run </span>';
                            //     curSubject = 'wf';
                            // }
                            // else if(condition.subject == "computer_graphics")
                            // {
                            //     icon = '<span class="material-icons"> gif </span>';
                            //     curSubject = 'grafika komputerowa';
                            // }
                            const li = `
                            <li>
                            <div class="collapsible-header"><table><tr><td>Student: ${condition.student} (${condition.hash})</td><td style="text-align:right;"><b>${curSubject}</b> ${icon}</td></tr></table></div>
                            <div class="collapsible-body">Hash: ${condition.hash}</div>
                            <div class="collapsible-body">Poprzedni hash: ${condition.previousHash}</div>
                            <div class="collapsible-body">Nauczyciel: ${condition.teacher}</div>
                            <div class="collapsible-body">Timestamp: ${condition.timestamp}</div>
                            <div class="collapsible-body">Ocena: ${condition.mark}</div>
                            <div class="collapsible-body">Klucz publiczny: ${condition.key}</div>
                            <div class="collapsible-body">Notatka: ${condition.note}</div>
                            </li>
                            `;
                            size-=1;
                            x-=1;
                            group2 += li;
                            
                        }
                        else if(currentGroup == "2A")
                        {
                            // if(condition.subject == "math")
                            // {
                            //     icon = '<span class="material-icons"> calculate </span>';
                            //     curSubject = 'matematyka';
                            // }
                            // else if(condition.subject == "science")
                            // {
                            //     icon = '<span class="material-icons"> science </span>';
                            //     curSubject = 'fizyka';
                            // }
                            // else if(condition.subject == "english")
                            // {
                            //     icon = '<span class="material-icons"> explicit </span>';
                            //     curSubject = 'angielski';
                            // }
                            // else if(condition.subject == "polish")
                            // {
                            //     icon = '<span class="material-icons"> language </span>';
                            //     curSubject = 'polski';
                            // }
                            // else if(condition.subject == "history")
                            // {
                            //     icon = '<span class="material-icons"> account_balance </span>';
                            //     curSubject = 'historia';
                            // }
                            // else if(condition.subject == "informatics")
                            // {
                            //     icon = '<span class="material-icons"> laptop </span>';
                            //     curSubject = 'informatyka';
                            // }
                            // else if(condition.subject == "database")
                            // {
                            //     icon = '<span class="material-icons"> storage </span>';
                            //     curSubject = 'bazy danych';
                            // }
                            // else if(condition.subject == "computer_network")
                            // {
                            //     icon = '<span class="material-icons"> settings_ethernet </span>';
                            //     curSubject = 'sieci komputerowe';
                            // }
                            // else if(condition.subject == "physical_education")
                            // {
                            //     icon = '<span class="material-icons"> directions_run </span>';
                            //     curSubject = 'wf';
                            // }
                            // else if(condition.subject == "computer_graphics")
                            // {
                            //     icon = '<span class="material-icons"> gif </span>';
                            //     curSubject = 'grafika komputerowa';
                            // }
                            const li = `
                            <li>
                            <div class="collapsible-header"><table><tr><td>Student: ${condition.student} (${condition.hash})</td><td style="text-align:right;"><b>${curSubject}</b> ${icon}</td></tr></table></div>
                            <div class="collapsible-body">Hash: ${condition.hash}</div>
                            <div class="collapsible-body">Poprzedni hash: ${condition.previousHash}</div>
                            <div class="collapsible-body">Nauczyciel: ${condition.teacher}</div>
                            <div class="collapsible-body">Timestamp: ${condition.timestamp}</div>
                            <div class="collapsible-body">Ocena: ${condition.mark}</div>
                            <div class="collapsible-body">Klucz publiczny: ${condition.key}</div>
                            <div class="collapsible-body">Notatka: ${condition.note}</div>
                            </li>
                            `;
                            size-=1;
                            x-=1;
                            group3 += li;
                            
                        }
                    }
        
                    // if(sortTimestamp[x] == time) 
                    // {   
                    //     const condition = el.data();
                    //     let icon = '';

                    //     if(condition.subject == "math")
                    //     {
                    //         icon = '<span class="material-icons"> calculate </span>';
                    //     }
                    //     else if(condition.subject == "science")
                    //     {
                    //         icon = '<span class="material-icons"> science </span>';
                    //     }
                    //     else if(condition.subject == "english")
                    //     {
                    //         icon = '<span class="material-icons"> explicit </span>';
                    //     }
                    //     else if(condition.subject == "polish")
                    //     {
                    //         icon = '<span class="material-icons"> language </span>';
                    //     }
                    //     else if(condition.subject == "history")
                    //     {
                    //         icon = '<span class="material-icons"> account_balance </span>';
                    //     }
                    //     const li = `
                    //     <li>
                    //     <div class="collapsible-header grey lighten-4"><table><tr><td>Hash: ${condition.hash}</td><td style="text-align:right;"><b>${condition.subject}</b> ${icon}</td></tr></table></div>
                    //     <div class="collapsible-body white">Previous hash: ${condition.previousHash}</div>
                    //     <div class="collapsible-body white">Teacher: ${condition.teacher}</div>
                    //     <div class="collapsible-body white">Timestamp: ${condition.timestamp}</div>
                    //     <div class="collapsible-body white">Group: ${condition.group}</div>
                    //     <div class="collapsible-body white">Student: ${condition.student}</div>
                    //     <div class="collapsible-body white">Mark: ${condition.mark}</div>
                    //     <div class="collapsible-body white">Public key: ${condition.key}</div>
                    //     <div class="collapsible-body white">Note: ${condition.note}</div>
                    //     </li>
                    //     `;
                    //     size-=1;
                    //     x-=1;
                    //     html += li;
                    // }
                });   
            }
            html = group1 + group2 + group3;
        }
        else
        {
            // while(size!=0)
            // {
                data.forEach(el => {
                    const ts = el.data().timestamp;
                    const split1 = ts.split("(");
                    const cut = split1[1];
                    const split2 = cut.split(")");
                    time = split2[0];
                    let curSubject = '';
        
        
                    // if(sortTimestamp[x] == time) 
                    // {   
                        if(doc.data().key == el.data().key)
                        {
                             // <div class="collapsible-header yellow lighten-4">Hash: ${condition.hash}</div>

                            const condition = el.data();
                            curSubject = condition.subject;
                            if(condition.subject == "math" || condition.subject == "matematyka")
                            {
                                icon = '<span class="material-icons"> calculate </span>';
                                curSubject = 'matematyka';
                            }
                            else if(condition.subject == "science" || condition.subject == "fizyka")
                            {
                                icon = '<span class="material-icons"> science </span>';
                                curSubject = 'fizyka';
                            }
                            else if(condition.subject == "english" || condition.subject == "angielski")
                            {
                                icon = '<span class="material-icons"> explicit </span>';
                                curSubject = 'angielski';
                            }
                            else if(condition.subject == "polish" || condition.subject == "polski")
                            {
                                icon = '<span class="material-icons"> language </span>';
                                curSubject = 'polski';
                            }
                            else if(condition.subject == "history" || condition.subject == "historia")
                            {
                                icon = '<span class="material-icons"> account_balance </span>';
                                curSubject = 'historia';
                            }
                            else if(condition.subject == "informatics" || condition.subject == "informatyka")
                            {
                                icon = '<span class="material-icons"> laptop </span>';
                                curSubject = 'informatyka';
                            }
                            else if(condition.subject == "database" || condition.subject == "bazy danych")
                            {
                                icon = '<span class="material-icons"> storage </span>';
                                curSubject = 'bazy danych';
                            }
                            else if(condition.subject == "computer_network" || condition.subject == "sieci komputerowe")
                            {
                                icon = '<span class="material-icons"> settings_ethernet </span>';
                                curSubject = 'sieci komputerowe';
                            }
                            else if(condition.subject == "physical_education" || condition.subject == "wf")
                            {
                                icon = '<span class="material-icons"> directions_run </span>';
                                curSubject = 'wf';
                            }
                            else if(condition.subject == "computer_graphics" || condition.subject == "grafika komputerowa")
                            {
                                icon = '<span class="material-icons"> gif </span>';
                                curSubject = 'grafika komputerowa';
                            }
                            const li = `
                            <li>
                            <div class="collapsible-header"><table><tr><td>Hash: ${condition.hash}</td><td style="text-align:right;"><b>${curSubject}</b> ${icon}</td></tr></table></div>
                            <div class="collapsible-body">Nauczyciel: ${condition.teacher}</div>
                            <div class="collapsible-body">Timestamp: ${condition.timestamp}</div>
                            <div class="collapsible-body">Przedmiot: ${condition.subject}</div>
                            <div class="collapsible-body">Grupa: ${condition.group}</div>
                            <div class="collapsible-body">Student: ${condition.student}</div>
                            <div class="collapsible-body">Ocena: ${condition.mark}</div>
                            <div class="collapsible-body">Klucz publiczny: ${condition.key}</div>
                            <div class="collapsible-body">Notatka: ${condition.note}</div>
                            </li>
                            `;
                            size-=1;
                            x-=1;
                            html += li;
                        }
                        // else
                        // {
                        //     const condition = el.data();
                        //     if(condition.subject == "math")
                        //     {
                        //         icon = '<span class="material-icons"> calculate </span>';
                        //     }
                        //     else if(condition.subject == "science")
                        //     {
                        //         icon = '<span class="material-icons"> science </span>';
                        //     }
                        //     else if(condition.subject == "english")
                        //     {
                        //         icon = '<span class="material-icons"> explicit </span>';
                        //     }
                        //     else if(condition.subject == "polish")
                        //     {
                        //         icon = '<span class="material-icons"> language </span>';
                        //     }
                        //     else if(condition.subject == "history")
                        //     {
                        //         icon = '<span class="material-icons"> account_balance </span>';
                        //     }
                        //     const li = `
                        //     <li>
                        //     <div class="collapsible-header grey lighten-4"><table><tr><td>Hash: ${condition.hash}</td><td style="text-align:right;"><b>${condition.subject}</b> ${icon}</td></tr></table></div>
                        //     <div class="collapsible-body white">Previous hash: ${condition.previousHash}</div>
                        //     <div class="collapsible-body white">Timestamp: ${condition.timestamp}</div>
                        //     <div class="collapsible-body white">Subject: ${condition.subject}</div>
                        //     <div class="collapsible-body white">Group: ${condition.group}</div>
                        //     <div class="collapsible-body white">Mark: ${condition.mark}</div>
                        //     </li>
                        //     `;
                        //     size-=1;
                        //     x-=1;
                        //     html += li;
                        // }
                    //}
                });   
            //}
        }
        blockchain.innerHTML = html;
    })

    }
    else
    {
        db.collection('block').get().then(doc => {
            const data = doc.docs;
            let html = '';
            let timestamp = [];
            let sortTimestamp = [];
            let time = "";

        data.forEach(element => {
            const ts = element.data().timestamp;
            const split1 = ts.split("(");
            const cut = split1[1];
            const split2 = cut.split(")");
            timestamp.push(split2[0]);
            sortTimestamp = timestamp.sort();
        });

    let size = data.length;
    let x = sortTimestamp.length-1;
    while(size!=0)
    {
        data.forEach(el => {
            const ts = el.data().timestamp;
            const split1 = ts.split("(");
            const cut = split1[1];
            const split2 = cut.split(")");
            time = split2[0];

            
            if(sortTimestamp[x] == time) 
            {   
                const condition = el.data();
                const li = `
                <li>
                <div class="collapsible-header">Hash: ${condition.hash}</div>
                <div class="collapsible-body">Poprzedni hash: ${condition.previousHash}</div>
                <div class="collapsible-body">Timestamp: ${condition.timestamp}</div>
                <div class="collapsible-body">Przedmiot: ${condition.subject}</div>
                <div class="collapsible-body">Ocena: ${condition.mark}</div>
                </li>
                `;
                size-=1;
                x-=1;
                html += li;


                
            }
        });   
    }
        blockchain.innerHTML = html;
        
        //blockchain.innerHTML='<h5 class="center">Login to view blocks</h5>';
    });
    }
}

// Konfiguracja komponentów
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elem = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elem);

    var elems = document.querySelectorAll('select');
    M.FormSelect.getInstance(elems);
  
  });