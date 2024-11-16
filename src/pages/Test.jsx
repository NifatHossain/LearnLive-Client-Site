import React from 'react';

const Test = () => {
    
    
    const savePersonDescriptor = (person) => {
        // const registeredPersons = JSON.parse(localStorage.getItem('registeredPersons')) || [];
        // registeredPersons.push(person);
        // localStorage.setItem('registeredPersons', JSON.stringify(registeredPersons));
       
        
            axiosPublic.post('/addUser',person)
            .then((result)=>{
                    if(result.data.insertedId){
                    
                    signUp(person.email, person.password)
                    .then(result=>{
                        const user= result.user;
                        console.log(user)
                        const image= 'https://i.ibb.co.com/VY9Bfbt/Basic-Ui-28186-29.jpg'
                        updateUserInfo(person.name,image)
                        .then(()=>{
                            toast.success('Successfully Registered')
                            stopCamera();
                            navigate('/allCourses')
                        })
                        .catch(error=>{
                            console.log(error.message)
                            toast.error('failed to signUp')
                        })
                    })
                    .catch(error=>{
                        console.log(error.message)
                        toast.error('failed to signUp')
                    })
                    
                }
                else{
                    toast.error(result.data.message)
                    console.log(result.data.message)
                    }
            })
            .catch((error)=>{
                console.log(error)
                toast.error("failed to save in database")
            })
        }
        
    return (
        <div class="w-full">
            <div class="relative right-0">
                <ul class="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100" data-tabs="tabs" role="list">
                <li class="z-30 flex-auto text-center">
                    <a class="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-inherit"
                    data-tab-target="" role="tab" aria-selected="true" aria-controls="dashboard">
                    Dashboard
                    </a>
                </li>
                <li class="z-30 flex-auto text-center">
                    <a class="z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-600 bg-inherit"
                    data-tab-target="" role="tab" aria-selected="false"  aria-controls="profile">
                    Profile
                    </a>
                </li>
                <li class="z-30 flex-auto text-center">
                    <a class="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                    data-tab-target="" role="tab" aria-selected="false" aria-controls="settings">
                    Settings
                    </a>
                </li>
                </ul>
            
                <div data-tab-content="" class="p-5">
                <div id="dashboard" role="tabpanel">
                    <p class="text-slate-400 font-light">
                    Because it&apos;s about motivating the doers. Because I&apos;m
                    here to follow my dreams and inspire other people to follow their
                    dreams, too.
                    </p>
                </div>
                <div class="hidden opacity-0" id="profile" role="tabpanel">
                    <p class="text-slate-400 font-light">
                    The reading of all good books is like a conversation with the
                    finest minds of past centuries.
                    </p>
                </div>
                <div class="hidden opacity-0" id="settings" role="tabpanel">
                    <p class="text-slate-400 font-light">
                    Comparing yourself to others is the thief of joy.
                    </p>
                </div>
                </div>
            </div>
        </div>

    );
};

export default Test;