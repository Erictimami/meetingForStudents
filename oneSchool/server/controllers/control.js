// var mongoose = require('mongoose');
// require('../models/model.js');
// var review = mongoose.model('review'); 
// var restaurant = mongoose.model('restaurant');
var bcrypt = require("bcryptjs"); // use the require into the file where you gonna use it;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'oneSchoolDB'
});
module.exports = {
    // findAllSessions: function(request, response){
    //     connection.query("SELECT * FROM Users JOIN Sessions ON Sessions.creator_id = Users.id", function(error, rows, fields){
    //         if(error){
    //             console.log('Error in the query');
    //             response.json({message: 'Error', Error: error});
    //         } else{
    //             console.log('Successful query');
    //             response.json({message: 'Success', data: rows});
    //         }
    //     })
    // },

    findAllSessions: function(request, response){
        connection.query("SELECT * FROM Users JOIN Sessions ON Sessions.creator_id = Users.id LEFT JOIN Users_in_Sessions ON Users_in_Sessions.Sessions_id = Sessions.id", function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                response.json({message: 'Success', data: rows});
            }
        })
    },
    findAllSessions_2: function(request, response){
        connection.query("SELECT * FROM Users JOIN Sessions ON Sessions.creator_id = Users.id JOIN Users_in_Sessions ON Users_in_Sessions.Sessions_id = Sessions.id", function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                response.json({message: 'Success', data: rows});
            }
        })
    },
    findMessageForSession: function(request, response){
        connection.query("SELECT * FROM Messages JOIN Users_in_Sessions ON Messages.Users_in_Sessions_Sessions_id = Users_in_Sessions.Sessions_id JOIN Users ON Users_in_Sessions.Users_id = Users.id WHERE Messages.Users_in_Sessions_Sessions_id = ?", request.params.id, function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                response.json({message: 'Success', data: rows});
            }
        })
    },
    createMessage: function(request, response){
        console.log('#######CreateMessage########',request.body);
        console.log('param id: '+request.params.id);
        if(request.body.message.length < 3){
            response.json({message: 'A minimum of 2 caracters is required', Error: "Error"});
            console.log("A minimum length of inputs is required");
            response.end();
            return
        }
        //let post = {address_1: request.body.address_1, address_2: request.body.address_2, city: request.body.city, state: request.body.state, zip_code: request.body.zip_code, country: request.body.country, sujects_study: request.body.sujects_study, level: request.body.level, num_persons: request.body.num_persons, date_study: request.body.date_study, time_starting: request.body.time_starting, creator_id: request.body.id };
        var today = new Date(); 
        var dd = today.getDate();
        console.log('Date: '+today);
        let post = {message: request.body.message, Users_in_Sessions_Sessions_id: request.params.session_id, Users_in_Sessions_Users_id: request.params.id, created_at: today};
        console.log("post: "+ post);
        console.log("request.body in creation Message: "+request.body);
        connection.query("INSERT INTO Messages SET ?;", post, function(error, rows, fields){ 
            if(error){
                console.log('Error in the query: '+error);
                response.json({message: 'Invalid Input(s)', Error: error});
            } else{
                console.log('Successful query creation of message');
                response.json({message: 'Success', data: rows});
            }
        })
    },
    // findAllSessions: function(request, response){
    //     connection.query("SELECT * FROM Sessions", function(error, rows, fields){
    //         if(error){
    //             console.log('Error in the query');
    //             response.json({message: 'Error', Error: error});
    //         } else{
    //             console.log('Successful query');
    //             //parse with your rows/fields
    //             // response.send('Eric is happy!!!');
    //             // response.send(rows[0]);
    //             response.json({message: 'Success', data: rows});
    //         }
    //     })
    // },
    findAllUsers: function(request, response){
        connection.query("SELECT * FROM Users", function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                response.json({message: 'Success', data: rows});
            }
        })
    },
    findMySessions: function(request, response){
        console.log('request.params.id: '+request.params.id)
        connection.query("SELECT * FROM Sessions WHERE creator_id = ?", request.params.id, function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                response.json({message: 'Success', data: rows});
            }
        })
    },
    findRequests: function(request, response){
        console.log('request.params.id: '+request.params.user_id)
        connection.query("SELECT * FROM Users JOIN Users_in_Sessions ON Users_in_Sessions.Users_id = Users.id JOIN Sessions ON Users_in_Sessions.Sessions_id = Sessions.id WHERE Sessions.creator_id = ?", request.params.user_id, function(error, rows, fields){
            if(error){
                console.log('Error in the query: '+error);
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                response.json({message: 'Success', data: rows});
            }
        })
    },
    findOneSession: function(request, response){
        connection.query("SELECT * FROM Sessions WHERE id = ?;", request.params.id, function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                response.json({message: 'Success', data: rows});
            }
        })
    },
    findOneUser: function(request, response){
        connection.query("SELECT * FROM Users WHERE id = ?;", request.body.user_id, function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                response.json({message: 'Success', data: rows});
            }
        })
    },
    findOneUsername: function(request, response){
        console.log('Control.js begin: username '+request.params.username+' password '+ request.body.password);
        connection.query("SELECT * FROM Users WHERE username = ?;", request.params.username, function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                console.log('Control.js middle: username '+request.params.username+' password'+ request.body.password);
                if(bcrypt.compareSync(request.body.password, rows[0].password)){
                    //passwords match
                    console.log('Password valid control.js')
                    response.json({message: 'Success', data: rows});
                } else{
                    //passwords don't match
                    console.log('Password invalid control.js')
                    response.json({message: 'username or password invalid'});
                }
            }
        })
    },
    findUsers_in_Sessions: function(request, response){
        connection.query("SELECT * FROM Users_in_Sessions", function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'Error', Error: error});
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                response.json({message: 'Success', data: rows});
            }
        })
    },
    createUser: function(request, response){
        console.log('#######CreateUser########',request.body)
        // 1- check the length of all inputs
        if(request.body.first_name.length < 2 || request.body.last_name.length <2 || request.body.username.length < 2 || request.body.email.length < 8 || request.body.school.length < 2 || request.body.grade.length < 2 || request.body.gender.length > 2){
            response.json({message: 'A minimum length of inputs is required', Error: 'error'});
            console.log("1111111");
            response.end();
            return
        }

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(request.body.email)){
            response.json({message: 'Invalid email', Error: 'error'});
            console.log("22222222");
            response.end();
            return
        }

        connection.query("SELECT * FROM Users WHERE username = ?;", request.body.username, function(error, rows, fields){
            if(rows[0] != null){
                console.log('This username already used');
                response.json({message: 'This username already used', Error: 'error'});   
                response.end();
                return
            }
        })

        connection.query("SELECT * FROM Users WHERE email = ?;", request.body.email, function(error, rows, fields){
            if(rows[0] != null){
                console.log('This email already used');
                response.json({message: 'This email already used', Error: 'error'});   
                response.end();
                return
            }
        })

        let hash = bcrypt.hashSync(request.body.password, 10);

        // 2- regex email
        // 3- check the existing username and email in the db. if it's already used, redirect to register
        // 4- hash the password
        // 5- save into db
        // let hash = b-c-r-ypt.hashSync(request.body.password, 10);

        var today = new Date(); 
        var dd = today.getDate();
        console.log('Date: '+today);
        let post = {first_name: request.body.first_name, last_name: request.body.last_name, username: request.body.username, email: request.body.email, password: hash, date_birth: request.body.date_birth, phone: request.body.phone, school: request.body.school, grade: request.body.grade, gender: request.body.gender, created_at: today};
        console.log(post);
        connection.query("INSERT INTO Users SET ?;", post, function(error, rows, fields){
            if(error){
                console.log('Error in the query '+error);
                response.json({message: 'Error', Error: error});
            } else{
                    console.log('Successful query: ');
                    connection.query("SELECT * FROM Users WHERE username = ?;", request.body.username, function(error, rows, fields){
                    response.json({message: 'Success', data: rows});
                })
                //response.json({message: 'Success'});
            }
        })
    },

    createSession: function(request, response){
        console.log('#######CreateSession########',request.body);
        console.log('param id: '+request.params.id);
        // || request.body.date_study == null || request.body.time_starting == null
        if(request.body.address_1.length < 6 || request.body.city.length <2 || request.body.state.length < 2 || request.body.zip_code.length < 5 || request.body.country.length < 2 || request.body.sujects_study.length < 2 || request.body.level.length < 2 || request.body.num_persons < 2){
            response.json({message: 'A minimum length of inputs is required', Error: "Error"});
            console.log("A minimum length of inputs is required");
            response.end();
            return
        }
        var today = new Date(); 
        var dd = today.getDate();
        console.log('Date: '+today);
        //let post = {address_1: request.body.address_1, address_2: request.body.address_2, city: request.body.city, state: request.body.state, zip_code: request.body.zip_code, country: request.body.country, sujects_study: request.body.sujects_study, level: request.body.level, num_persons: request.body.num_persons, date_study: request.body.date_study, time_starting: request.body.time_starting, creator_id: request.body.id };
        let post = {address_1: request.body.address_1, address_2: request.body.address_2, city: request.body.city, state: request.body.state, zip_code: request.body.zip_code, country: request.body.country, sujects_study: request.body.sujects_study, level: request.body.level, num_persons: request.body.num_persons, creator_id: request.params.id, created_at: today };
        console.log("request.body in creation session: "+request.body);
        connection.query("INSERT INTO Sessions SET ?;", post, function(error, rows, fields){ 
            if(error){
                console.log('Error in the query: '+error);
                response.json({message: 'Invalid Input(s)', Error: error});
            } else{
                console.log('Success check id Session in control.js: '+ rows.insertId);
                let post = {Users_id: request.params.id, Sessions_id: rows.insertId, user_status: true};
                console.log(post);
                connection.query("INSERT INTO Users_in_Sessions SET ?;", post, function(error, rows, fields){
                    if(error){
                        console.log('Error in the query: '+error);
                        response.json({message: "Request to session: Error"})
                    } else{
                        console.log('Successful query');
                        response.json({message: "Request to session: Success"})
                    }
                })
            }
        })
    },
    // updateUser: function(request, response){
    //     console.log('request.params.id', request.params.id)
    //     connection.query("UPDATE Users SET column1 = value1, column2 = value2, ... ", function(error, rows, fields){
    //         if(error){
    //             console.log('Error in the query');
    //         } else{
    //             console.log('Successful query');
    //             //parse with your rows/fields
    //             // response.send('Eric is happy!!!');
    //             // response.send(rows[0]);
    //             response.json({data:rows[0]})
    //         }
    //     })
    // },
    updateSession: function(request, response){
        // || request.body.date_study == null || request.body.time_starting == null
        if(request.body.address_1.length < 6 || request.body.city.length <2 || request.body.state.length < 2 || request.body.zip_code.length < 5 || request.body.country.length < 2 || request.body.sujects_study.length < 2 || request.body.level.length < 2 || request.body.num_persons < 2){
            response.json({message: 'A minimum length of inputs is required', Error: "Error"});
            console.log("A minimum length of inputs is required");
            response.end();
            return
        }
        var today = new Date(); 
        var dd = today.getDate();
        console.log('Date: '+today);
        let post = {address_1: request.body.address_1, address_2: request.body.address_2, city: request.body.city, state: request.body.state, zip_code: request.body.zip_code, country: request.body.country, sujects_study: request.body.sujects_study, level: request.body.level, num_persons: request.body.num_persons, updated_at: today};
        console.log('request.params.id', request.params.id)
        connection.query("UPDATE Sessions SET ? WHERE id = ?;", [post, request.params.id], function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                response.json({message: 'A minimum length of inputs is required', Error: "Error"});
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                response.json({message: 'Success'})
            }
        })
    },
    // removeUser: function(request, response){
    //     console.log('request.params.id', request.params.id)
    //     connection.query("DELETE FROM Users WHERE id = ...", function(error, rows, fields){
    //         if(error){
    //             console.log('Error in the query');
    //         } else{
    //             console.log('Successful query');
    //             //parse with your rows/fields
    //             // response.send('Eric is happy!!!');
    //             // response.send(rows[0]);
    //             response.json({data:rows[0]})
    //         }
    //     })
    // },
    // requestToSession: function(request, response){
    //     console.log('request.params.id user in control.js', request.params.id)
    //     console.log('request.params.id session in control.js', request.params.session_id)
    //     let post = {User_id: request.params.id, Session_id: request.params.session_id, user_status: false};
    //     console.log(post);
    //     connection.query("INSERT INTO Users_in_Sessions SET ?;", post, function(error, rows, fields){
    //         if(error){
    //             console.log('Error in the query');
    //             response.json({message: "Request to session: Error"})
    //         } else{
    //             console.log('Successful query');
    //             response.json({message: "Request to session: Success"})
    //         }
    //     })
    // },
    requestToSession: function(request, response){
        console.log('id user in control.js', request.body.User_id)
        console.log('id session in control.js', request.body.Session_id)
        let post = {Users_id: Number(request.body.User_id), Sessions_id: request.body.Session_id, user_status: 0};
        console.log(post);
        connection.query("INSERT INTO Users_in_Sessions SET ?;", post, function(error, rows, fields){
            if(error){
                console.log('Error in the query: '+error);
                response.json({message: "Request to session: Error"})
            } else{
                console.log('Successful query');
                response.json({message: "Request to session: Success"})
            }
        })
    },

    AcceptToSession: function(request, response){
        console.log('id user in control.js', request.body.User_id)
        console.log('id session in control.js', request.body.Session_id)
        // let post = {Users_id: Number(request.body.User_id), Sessions_id: request.body.Session_id, user_status: 0};
        // console.log(post);
        connection.query("UPDATE Users_in_Sessions SET ? WHERE Users_id = ? AND Sessions_id = ?;", [{user_status: true}, Number(request.body.User_id), request.body.Session_id], function(error, rows, fields){
            if(error){
                console.log('Error in the query: '+error);
                response.json({message: "Accept to session: Error"})
            } else{
                console.log('Successful query');
                response.json({message: "Accept to session: Success"})
            }
        })
    },
    acceptRequest: function(request, response){
        console.log('id user in control.js', request.body.User_id)
        console.log('id session in control.js', request.body.Session_id)
        // let post = {Users_id: Number(request.body.User_id), Sessions_id: request.body.Session_id, user_status: 0};
        // console.log(post);
        connection.query("UPDATE Users_in_Sessions SET ? WHERE Users_id = ? AND Sessions_id = ?;", [{user_status: true}, Number(request.body.User_id), request.body.Session_id], function(error, rows, fields){
            if(error){
                console.log('Error in the query: '+error);
                response.json({message: "Accept to session: Error"})
            } else{
                console.log('Successful query');
                response.json({message: "Accept to session: Success"})
            }
        })
    },

    removeSession: function(request, response){
        console.log('request.params.id user in control.js', request.params.id)
        console.log('request.params.id session in control.js', request.params.session_id)
        connection.query("DELETE FROM Messages WHERE Users_in_Sessions_Users_id = ? AND Users_in_Sessions_Sessions_id = ? ;", [request.params.id, request.params.session_id], function(error, rows, fields){
            if(error){
                console.log('Error in the query during deleting messages: '+error);
                response.json({message: "leaving session Error"})
            } else{
                connection.query("DELETE FROM Users_in_Sessions WHERE users_id = ? AND Sessions_id = ? ;", [request.params.id, request.params.session_id], function(error, rows, fields){
                    if(error){
                        console.log('Error in the query during leaving session: '+error);
                        response.json({message: "leaving session Error"})
                    } else{
                        connection.query("DELETE FROM Sessions WHERE id = ?;", request.params.id, function(error, rows, fields){
                            if(error){
                                console.log('Error in the query during deleting Session: '+error);
                                response.json({message: "Delete session Error"})
                            } else{
                                console.log('Successful query');
                                response.json({message: "Delete session Success"})
                            }
                        })
                    }
                })
            }
        })
    },
    
    leaveSession: function(request, response){
        console.log('request.params.id user in control.js', request.params.id)
        console.log('request.params.id session in control.js', request.params.session_id)
        connection.query("DELETE FROM Users_in_Sessions WHERE users_id = ? AND Sessions_id = ? ;", [request.params.id, request.params.session_id], function(error, rows, fields){
            if(error){
                console.log('Error in the query: '+error);

                response.json({message: "Delete session Error"})
            } else{
                console.log('Successful query');
                response.json({message: "Delete session Success"})
            }
        })
    },

    testEric: function(request, response){
        connection.query("SELECT * FROM Users", function(error, rows, fields){
            if(error){
                console.log('Error in the query');
            } else{
                console.log('Successful query');
                //parse with your rows/fields
                // response.send('Eric is happy!!!');
                // response.send(rows[0]);
                response.json({data:rows[0]})
            }
        })
    },
    // updateSecondary: function(request, response){
    //     console.log('control.js updateSecondary request.params', request.params);
    //     review.findOne({_id: request.params.id2}, function(err, result){
    //         if (err){
    //             console.log('control.js updateSecondary Error during find', err);
    //             response.json({message: 'Error', error: err});
    //         }
    //         else{
    //             // console.log('control.js createSecondary success result first', result);
    //             result.comment = request.body.comment;
    //             result.reviewer = request.body.reviewer;
    //             result.rate = request.body.rate;
    //             console.log('control.js updateSecondary request.params.id ', request.params.id);
    //             result.save(function(err, result2){
    //                 if(err){
    //                     console.log('control.js updateSecondary error during save', err);
    //                     response.json({message: 'Error', error: err});
    //                 }
    //                 else{
    //                     console.log('control.js updateSecondary request.body', request.body);
    //                     //the $ sign means the first element reached gonna be update, but here It's not very important
    //                     restaurant.update({}, {$pull: {reviews: result}}, function(err, result3){
    //                         if(err){
    //                             console.log('control.js updateSecondary error during save', err);
    //                             response.json({message: 'Error', error: err});
    //                         }
    //                         else{
    //                             console.log('control.js createSecondary success result snd+++', result);
    //                             restaurant.findByIdAndUpdate(request.params.id, {$push: {reviews: result}}, function(err, result4){
    //                                 if(err){
    //                                     console.log('control.js createSecondary error during pushing', err);
    //                                     response.json({message: 'Error ', error: err});
    //                                 }
    //                                 else{
    //                                     // console.log('control.js createSecondary success', result4);
                                        
    //                                     response.json({message: 'Success', data: result4});
    //                                 }
    //                             })
    //                         }
    //                     })
    //                     // restaurant.updateOne({_id: request.params.id}, {$set: {"restaurant.$.review.reviewer": request.body.reviewer, "restaurant.$.review.comment": request.body.comment, "restaurant.$.review.rate": request.body.rate}}, function(err, result3){
    //                     //     if(err){
    //                     //         console.log('control.js updateSecondary error during updating inside the primary', err);
    //                     //         response.json({message: 'Error', error: err});
    //                     //     }
    //                     //     else{
    //                     //         console.log(result3)
    //                     //         response.json({message: 'Success++++', data: result3});
    //                     //     }
    //                     // })
    //                 }
    //             })
    //         }
    //     });
    // },

    // removeSecondary: function(request, response){
    //     restaurant.remove({_id: request.params.id2}, function(err, result){
    //         if (err){
    //             console.log('control.js removeSecondary Error', err);
    //             response.json({message: 'Error', error: err});
    //         }
    //         else{
    //             response.json({message: 'Success', data: result})
    //         }
    //     })
    // }
}