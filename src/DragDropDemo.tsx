import React from 'react'
import './App.css'

export default class DragDropDemo extends React.Component{

    state = {
        Task:[
            { Name:'One', Category:'WIP', BgColor:'Red'},
            { Name:'Two', Category:'Completed', BgColor:'Yellow'},
            { Name:'Three', Category:'WIP', BgColor:'Red'}
        ],

        CompletedList:[],
        WorkInProgress:[]
    }

    onDragOver = (event:any)=>{
        event.preventDefault();
    }

    onDragStart = (event:any, name:string)=>{
        event.dataTransfer.setData("id", name);
    }
    onDrop = (event:any, status:string)=>{
        let Tasks = event.dataTransfer.getData("id");
        let _tasks = this.state.Task.filter(t=>{
            if(t.Name== Tasks){
                t.Category = status;
                t.BgColor= t.Category == "WIP"? "Red":"Yellow"
            }
            return t;
        });

        this.setState({
            ...this.state,
            _tasks
        });


        var tasks:any = {
            WIP:[],
            Completed:[]
        }

        this.state.Task.forEach(t=>{
            if(t.Category == "WIP"){
                tasks.WIP.push(t.Name)
            }
            else{
                tasks.Completed.push(t.Name)
            }
        })

        this.setState({
            CompletedList:tasks.Completed,
            WorkInProgress:tasks.WIP
        })
        
    }

    componentDidMount = ()=>{
        var tasks:any = {
            WIP:[],
            Completed:[]
        }

        this.state.Task.forEach(t=>{
            if(t.Category == "WIP"){
                tasks.WIP.push(t.Name)
            }
            else{
                tasks.Completed.push(t.Name)
            }
        })

        this.setState({
            CompletedList:tasks.Completed,
            WorkInProgress:tasks.WIP
        })

        
    }
    render(){
        console.log("CL-->",this.state.CompletedList)
        console.log("WIP-->",this.state.WorkInProgress)

        var Task:any = {
            WIP:[],
            Completed:[]
        }
        
        this.state.Task.forEach(t => {
            Task[t.Category].push(
                <div className="draggable"
                        draggable 
                        key={t.Name} 
                        style={{backgroundColor:t.BgColor}}
                        onDragStart={(event:any)=>this.onDragStart(event, t.Name)}>
                   <span>{t.Name}</span>
                </div>
            )
        });

        var completed_list = this.state.CompletedList.map(m=>{
            return <li>{m}</li>;
        })

        var work_inProgress = this.state.WorkInProgress.map(m=>{
            return <li>{m}</li>;
        })

        return(
            <div className="container-drag">
                <div className="test-header">
                    <h2>Drag and Drop Sample</h2>
                </div>
                <div className="wip"
                    onDragOver={(event)=>this.onDragOver(event)}
                    onDrop={(event)=>this.onDrop(event,"WIP")}>
                    <span className="wip">WIP</span>
                    {Task.WIP}
                </div>
                <div className="droppable" 
                        onDragOver={(event)=>this.onDragOver(event)}
                        onDrop={(event)=> this.onDrop(event, "Completed")}>
                    <span className="Completed">Completed</span>
                    {Task.Completed}
                </div>
                <div className="list-data">
                        <h5>Completed list</h5>
                        <ul>
                            { completed_list }
                        </ul>
                        
                </div>
                <div className="list-data">
                        <h5>Work inprogress</h5>
                        <ul>
                            { work_inProgress }
                        </ul>
                        
                </div>
            </div>
        )
    }

}