 var employeePromise = d3.json("classData.json");

            var sucessFCN = function(student)
                {
                    
                    console.log("Data Collected", student);
                    var getGrade = function(quiz){
                            return (quiz.grade/quiz.max)*100;
                    }
                   
                    
                    var meanQuiz = function(student){
                        return d3.mean(student.quizes.map(getGrade)); };
                    var meanHW = function(student){
                        return d3.mean(student.homework.map(getGrade));};
                    var meanTest = function(student){
                        return d3.mean(student.test.map(getGrade));};
                    var finalGrade = function(student){
                        final= 0.20 * meanQuiz(student) +  0.15 * meanHW(student) + 0.30 * meanTest(student) + 0.35 * getGrade(student.final[0])
                        return final
                    }
                
                  
                                                       
                   var drawTable = function(student)
                   {
                    var row = d3.select("#studentTable tbody")
                            .selectAll("tr")
                            .data(student)
                            .enter()
                                .append("tr")
                                .attr("class",function(student){
                            if (finalGrade(student).toFixed(2)>70){
                                return "pass";
                            }
                            else{
                                return "fail";
                            }
                                })
                            
                    
                       row.append("td")
                            .append("img")
                            .attr("src", function(student)
                                  {
                                   var pic = "imgs/" + student.picture;
                                   return pic;})
                        row.append("td")
                            .text(function(student)
                                  {
                            return meanQuiz(student).toFixed(2)})
                        row.append("td")
                            .text(function(student)
                                  {return meanHW(student).toFixed(2)})
                        row.append("td")
                            .text(function(student)
                                  {
                            
                            return meanTest(student).toFixed(2)})
                        row.append("td")
                            .text(function(student)
                                  {
                            return getGrade(student.final[0]).toFixed(2)})
                   
                        row.append("td")
                            .text(function(student)
                                  {
                            return finalGrade(student).toFixed(2);})
                            .attr("class",function(student){
                            
                        })
                       
                   
                           
                   }
                   
                    var clearTable = function()
                    {
                    d3.selectAll("#studentTable tbody tr")
                        .remove();
                    }
                    var initHeaders = function(student)
                    {
                        d3.select("#Final")
                        .on("click",function()
                        { console.log("clicked");
                            student.sort(function(a,b)
                            {
                                if( getGrade(a.final[0]) > getGrade(b.final[0])) {return 1}
                                else if (getGrade(a.final[0]) < getGrade(b.final[0])) {return -1}
                                else { return 0;}
                            });
                            clearTable();
                            drawTable(student);
                        });
                        d3.select("#HW")
                        .on("click",function()
                        { console.log("clicked");
                            student.sort(function(a,b)
                            {
                                if(meanHW(a) > meanHW(b)) {return 1}
                                else if(meanHW(a) < meanHW(b)) {return -1}
                                else { return 0;}
                            });
                            clearTable();
                            drawTable(student);
                        });
                        d3.select("#test")
                        .on("click",function()
                        { console.log("clicked");
                            student.sort(function(a,b)
                            {
                                if(meanTest(a) > meanTest(b)) {return 1}
                                else if(meanTest(a) < meanTest(b)) {return -1}
                                else { return 0;}
                            });
                            clearTable();
                            drawTable(student);
                        });
                        d3.select("#quiz")
                        .on("click",function()
                        { console.log("clicked");
                            student.sort(function(a,b)
                            {
                                if(meanQuiz(a) > meanQuiz(b)) {return 1}
                                else if(meanQuiz(a) < meanQuiz(b)) {return -1}
                                else { return 0;}
                            });
                            clearTable();
                            drawTable(student);
                        });
                        d3.select("#FinalGrade")
                        .on("click",function()
                        { console.log("clicked");
                            student.sort(function(a,b)
                            {
                                if(finalGrade(a) > finalGrade(b)) {return 1}
                                else if(finalGrade(a) < finalGrade(b)) {return -1}
                                else { return 0;}
                            });
                            clearTable();
                            drawTable(student);
                        });
                    }
                    var initButtons = function(student){
                        d3.select("#clear")
                            .on("click",function(){
                            clearTable()
                            drawTable(student)
                            initHeaders(student)
                            });
                        d3.select("#failing")
                            .on("click",function(){
                            var filtered = student.filter(function(student)
                            {
                                if(finalGrade(student).toFixed(2)<70)
                                    {return true}
                                else
                                    {return false}
                            })
                            clearTable()
                            console.log(filtered)
                            drawTable(filtered);
                            initHeaders(filtered);
                            })
                        d3.select("#passing")
                            .on("click",function(){
                            var filtered = student.filter(function(student)
                            {
                                if(finalGrade(student).toFixed(2)>=70)
                                    {return true}
                                else
                                    {return false}
                            })
                            clearTable()
                            drawTable(filtered)
                            initHeaders(filtered);  
                            
                            
                        })
                        
                    
                     
                    
                }
                     drawTable(student)
                     initHeaders(student)
                     initButtons(student)

            }

            var failFCN = function(errorMsg)
                {
                    console.log("Something went wrong", errorMsg);
                };

            employeePromise.then(sucessFCN,failFCN);