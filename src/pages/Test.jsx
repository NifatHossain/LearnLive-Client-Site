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
        <div>
            
        </div>
    );
};

export default Test;