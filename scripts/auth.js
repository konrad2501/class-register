// Status uzytkownika
auth.onAuthStateChanged(user => {
    if (user) 
    {
        // Pobierz dane z bazy
        db.collection('block').onSnapshot(e => {
            setupBlock(e.docs);
            setupUI(user);
        }, error => {
            console.log(error.message);
        });   
        
        db.collection('users').onSnapshot(e => {
            setUserInfo(user);
            setupChat(user);
            //setupNameSurname(e.docs);
            setupHideStudent(e.docs);
        }, error => {
            console.log(error.message);
        }); 
        db.collection('list').doc('group-list').onSnapshot(doc => {
            setupGroup(doc.data().group);
        }, error => {
            console.log(error.message);
        }); 

        db.collection('list').doc('grade-list').onSnapshot(doc => {
            setupMark(doc.data().grade);
        }, error => {
            console.log(error.message);
        }); 

        db.collection('list').doc('subject-list').onSnapshot(doc => {
            sessionStorage.setItem("subject",JSON.stringify(doc.data().subject));
            setupSubject(doc.data().subject);
        }, error => {
            console.log(error.message);
        }); 

        db.collection('hashes').doc('hash-collection').onSnapshot(doc => {
            const size = doc.data().collection.length;
            const prevHash = doc.data().collection[size-1];
            sessionStorage.setItem("lastHash",JSON.stringify(prevHash));
        });

    } 
    else 
    {
        db.collection('list').doc('subject-list').onSnapshot(doc => {
            setupSubject(doc.data().subject);
        }, error => {
            console.log(error.message);
        }); 

        db.collection('list').doc('group-list').onSnapshot(doc => {
            setupHideGroup(doc.data().group);
        }, error => {
            console.log(error.message);
        }); 
        
        setupBlock([]); 
        setupUI();
        //setUserInfo();
    }
})

// Przechowywanie danych w pamieci przegladarki
const setUserInfo = (user) => {
    db.collection('users').doc(user.uid).get().then(doc => {
        const {name, surname, subject} = doc.data();
        const setNameAndSurname = name + " " + surname;
        const temp = subject;
        const gr = doc.data().group;
        sessionStorage.setItem("user",JSON.stringify(setNameAndSurname));
        sessionStorage.setItem("uid",JSON.stringify(user.uid));

        sessionStorage.setItem("selectSubject",JSON.stringify(temp));
    });
}

// // Tworzenie bloków
// const createForm = document.querySelector('#create-form');
// createForm.addEventListener('submit', (e) => {

//                     const dt = new Date();
//                     const date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear() + " - " + (dt.getHours()) + ":" + (dt.getMinutes()) + ":" + (dt.getSeconds());
//                     const timestamp = Date.now();
//                     const blockTimestamp = date + " (" + timestamp + ")";
//                     const blockTeacher = JSON.parse(sessionStorage.getItem("user"));

//                     // const blockTimestamp = "01/01/2021 - 00:00:00" + " (" + timestamp + ")";
//                     // const blockTeacher = "GENESIS";
//                     // const blockPrevHash = 0;

//                     const blockPrevHash = JSON.parse(sessionStorage.getItem("lastHash"));
//                     const blockSubject = createForm.blockSubject.value;
//                     const blockMark = createForm.blockMark.value;
//                     const blockGroup = createForm.blockGroup.value;
//                     const blockStudent = createForm.blockStudent.value;
//                     const blockNote = createForm.blockNote.value;

//                     const block = new Block(blockTimestamp,blockTeacher,blockSubject,blockMark,blockStudent,blockPrevHash);
//                     const blockHash = block.hash;

//                     // Funkcja sprawdzajaca przed dodaniem kolejnego bloku czy prevhash==curhash
//                     // sortowanie wedlug daty i pobieranie kolejno wszystkich danych od poczatku
//                     // sprawdzanie czy utworzony hash jest rowny z wartoscia prevhash z glownego lancucha
//                     // jezeli prawda oznacza ze dane sie zgadzaja, nie wprowadzono zadnych edycji
//                     // rozpoczynamy od Genesis czy Genesis hash == prevHash nastepnego bloku
//                     // dlugosc petli == block.length-1, przed ostatni blok hash == prevhash ostatniego, koniec
//                     // jesli poprawnie przeszlo wszystkie bloki pozwala stworzyc kolejny 
                    
//                     db.collection('block').get().then(doc => {
//                         const data = doc.docs;
//                         let timestamp2 = [];
//                         let sortTimestamp = [];
//                         let time = "";
            
//                         data.forEach(element => {
//                             const ts = element.data().timestamp;
//                             const split1 = ts.split("(");
//                             const cut = split1[1];
//                             const split2 = cut.split(")");
//                             timestamp2.push(split2[0]);
//                             sortTimestamp = timestamp2.sort();
//                         });
                        
//                         let x = sortTimestamp.length-1;


//                         data.forEach(ele => {
//                             data.forEach(el => {
//                                 const ts = el.data().timestamp;
//                                 const split1 = ts.split("(");
//                                 const cut = split1[1];
//                                 const split2 = cut.split(")");
//                                 time = split2[0];
//                                 let checkBlockTimestamp = ts;
//                                 let checkBlockTeacher = el.data().teacher;
//                                 let checkBlockSubject = el.data().subject;
//                                 let checkBlockMark = el.data().mark;
//                                 let checkBlockStudent = el.data().student;
//                                 let checkPrevHash = el.data().previousHash;
//                                 let checkHash = el.data().hash;


//                                 if(sortTimestamp[x] == time) 
//                                 {  
//                                     let checkBlock = new Block(checkBlockTimestamp,checkBlockTeacher,checkBlockSubject,checkBlockMark,checkBlockStudent,checkPrevHash);
//                                     let checkBlockHash = checkBlock.hash;

//                                     if(time == '1637262639079')
//                                     {
//                                         checkBlockHash = "9a151b387c907e4549c74e569899688c621f695deb87e077bf5d96903de62e41";
//                                     }
//                                     if(checkBlockHash == checkHash)
//                                     {
//                                         if(time != '1637262639079')
//                                         {
//                                             x-=1;
//                                         }
//                                     }
//                                 }
//                             }); 

//                             if(x==0)
//                             {
//                                 let isCorrect = true;
//                                 sessionStorage.setItem("isCorrect",JSON.stringify(isCorrect));
//                             }

//                         });

//                         // kazdy element sortTimestamp i pobieramy prevhash od bloku po genesis do ostatniego
//                         // rownoczesnie przechodzimy kazdy blok po kolei posortowany i sprawdzamy hash z tym wyzej prevhash, najlepiej pobierac wszystkie dane od poczatku i tworzyc nowy hash tak jak przy dodawaniu bloku
//                     });


//                     if(JSON.parse(sessionStorage.getItem("isCorrect")))
//                     { 
//                         e.preventDefault();

//                         if(blockSubject == "")
//                         {
//                             //createForm.querySelector('.error').innerHTML = 'Uzupełnij wszystkie dane';
//                             document.getElementById('createAlert').innerHTML = "Uzupełnij wszystkie dane";
//                         }
//                         else if(blockMark == "")
//                         {
//                             document.getElementById('createAlert').innerHTML = "Uzupełnij wszystkie dane";
//                         }
//                         else if(blockGroup == "")
//                         {
//                             document.getElementById('createAlert').innerHTML = "Uzupełnij wszystkie dane";
//                         }
//                         else if(blockStudent == "")
//                         {
//                             document.getElementById('createAlert').innerHTML = "Uzupełnij wszystkie dane";
//                         }
//                         else
//                         {
//                             db.collection('hashes').doc('hash-collection').update({
//                                 collection: firebase.firestore.FieldValue.arrayUnion(blockHash)
//                         });

                        
//                         db.collection('block').doc(blockHash).set({
//                             hash: blockHash,
//                             previousHash: blockPrevHash,
//                             timestamp: blockTimestamp,
//                             teacher: blockTeacher,
//                             subject: blockSubject,
//                             mark: blockMark,
//                             group: blockGroup,
//                             student: blockStudent,
//                             note: blockNote,
//                             key: 0
    
//                             // hash: blockHash,
//                             // previousHash: blockPrevHash,
//                             // timestamp: blockTimestamp,
//                             // teacher: "KONRAD",//blockTeacher,
//                             // subject: null ,//blockSubject,
//                             // mark: 0, //blockMark,
//                             // group: null, //blockGroup,
//                             // student: null, //blockStudent,
//                             // note: null, //blockNote,
//                             // key: 0

//                         }).then(() => {
//                         // Zamknij okno tworzenia i resetuj formularz
//                         const modal = document.querySelector('#modal-create');
//                         M.Modal.getInstance(modal).close();
//                         createForm.reset();
//                         }).catch(err => {
//                             console.log(err.message);
//                         });
    
//                         db.collection('users').get().then(doc => {
    
//                             doc.forEach(element => {
//                                 const checkName = element.data().name;
//                                 const checkSurname = element.data().surname;
//                                 const checkData = checkName + " " + checkSurname;
    
//                                 if(checkData == blockStudent)
//                                 {
//                                     db.collection('block').doc(blockHash).update({
//                                         key: element.data().key
//                                     });
//                                 }
//                             });
//                         });
//                     }

//                     }
//                     else
//                     {
//                         alert("Wystąpił błąd podczas tworzenia łańcucha bloków. Prawdopodobnie dane w łańcuchu zostały sfałszowane.");
//                     }
                    
// });


// Wyszukiwanie 
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('click', (e) => {

    const hashOrKey = searchForm['search'].value;
    let x = 0;
    if(hashOrKey != "")
    {    
        db.collection('block').get().then(doc => {
            let div = '';
            const data = doc.docs;
            data.forEach(element => {
                
                const key = element.data().key;
                const hash = element.data().hash;

                if(hashOrKey == key || hashOrKey == hash)
                {   
                    // <div>Hash: ${element.data().hash}</div>
                    // <div>Previous hash: ${element.data().previousHash}</div>
                    const html = `
                    <div>Nauczyciel: ${element.data().teacher}</div>
                    <div>Timestamp: ${element.data().timestamp}</div>
                    <div>Grupa: ${element.data().group}</div>
                    <div>Przedmiot: ${element.data().subject}</div>
                    <div>Ocena: ${element.data().mark}</div>
                    <div><hr></div>
                    `;
                    const searchHash = document.querySelector('.search-hash');
                    div += html;
                }
            });
            const searchHash = document.querySelector('.search-hash');
            searchHash.innerHTML = div;
        }); 
    }
});

// Dodawanie uprawnien
const addPerm = document.querySelector('#add-form');
addPerm.addEventListener('click', (e) => {
    const userInfo = addPerm['adminAdd'].value;
    let uid = JSON.parse(sessionStorage.getItem("uid"));

    // const notAuth = document.querySelector('.add-admin');
    // notAuth.innerHTML = "<b>You don't have the privileges</b>";

    db.collection('users').doc(uid).get().then(doc => {

        let isAdmin = doc.data().isAdmin;
        
        let flag = false;
        let userID = '';
        if(isAdmin == true)
        {
            db.collection('users').get().then(doc2 => {
                const data = doc2.docs;
                data.forEach(element => {
                    
                    const setUserInfo = element.data().name + " " + element.data().surname;
                    if(setUserInfo == userInfo)
                    {
                        userID = element.id;
                        flag = true;
                    }
                })
                if(flag)
                {
                    const resultAdd = document.querySelector('.add-admin');
                    resultAdd.innerHTML = "Nadano uprawnienia " + "<b>" + userInfo + "</b> ";
                    db.collection('users').doc(userID).update({
                        isAdmin: true
                    });
                    const modal = document.querySelector('#modal-add');
                    setTimeout(function(){ addPerm.reset(); }, 2000);
                    setTimeout(function(){ M.Modal.getInstance(modal).close(); }, 2000);
                } 
                else
                {
                    const resultAdd = document.querySelector('.add-admin');
                    resultAdd.innerHTML = "<b>"+ userInfo +"</b>" + " nie znaleziono... ";
                    const modal = document.querySelector('#modal-add');
                    setTimeout(function(){ M.Modal.getInstance(modal).close(); }, 2000);
                }
            })
        }
        else
        {
            const resultAdd = document.querySelector('.add-admin');
            resultAdd.innerHTML = "<b>Nie masz wystarczających uprawnień.</b>";
        }
    });
});


// Rejestracja
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
   
  // Pobierz dane wprowadzone przez uzytkownika
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    
    const name = signupForm['signup-name'].value;
    const surname = signupForm['signup-surname'].value;
    const isAdmin = false;
    const result = [];

    let check = signupForm['hideBlockGroup'].value;
    if(check == "admin")
    {
        const subject1 = signupForm['signup-subject1'].value;
        const subject2 = signupForm['signup-subject2'].value;
        const subject3 = signupForm['signup-subject3'].value;

        if(subject1!="" && subject2!="" && subject3!="")
        {
            result.push(subject1);
            result.push(subject2);
            result.push(subject3);
        }
        else if(subject1!="" && subject2!="")
        {
            result.push(subject1);
            result.push(subject2);
        }
        else if(subject1!="")
        {
            result.push(subject1);
        }
        else
        {
            result.push("");
        }
    }
    else
    {
        result.push("null");
    }

    const key = CryptoJS.SHA256(name + surname).toString(CryptoJS.enc.Hex);
    const mode = "bright";

  // Rejestracja uzytkownika w bazie
    auth.createUserWithEmailAndPassword(email, password).then(credential => {
        return db.collection('users').doc(credential.user.uid).set({
            name: name,
            surname: surname,
            group: signupForm['hideBlockGroup'].value,
            key: key,
            isAdmin: isAdmin,
            subject: result,
            mode: mode
        });  
    }).then(()=> {
        // Zamknij okno rejestracji i resetuj formularz
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(error => {
        signupForm.querySelector('.error').innerHTML = error.message;
    });
});

// Wylogowanie
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {

    if (confirm('Czy na pewno chcesz się wylogować?')) { 
        e.preventDefault(); 
        auth.signOut();
        location.reload();
    } 
});

// Logowanie
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Pobierz dane wprowadzone przez uzytkownika
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

  // Logowanie uzytkownika
    auth.signInWithEmailAndPassword(email, password).then((credential) => {
        //console.log(credential.user);
        // Zamknij okno logowania i resetuj formularz
        const modal = document.querySelector('#modal-login');
        loginForm.querySelector('.error').innerHTML = '';
        setTimeout(function(){ location.reload(); }, 500);
        setTimeout(function(){ M.Modal.getInstance(modal).close(); }, 500);
        setTimeout(function(){ loginForm.reset(); }, 500);
    }).catch(error => {
        loginForm.querySelector('.error').innerHTML = error.message;
    });
});
