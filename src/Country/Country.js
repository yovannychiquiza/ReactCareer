import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddCountryModal';
import {EditDepModal} from './EditCountryModal';

export class Country extends Component{

    constructor(props){
        super(props);
        this.state={countrys:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API_COUNTRY + 'countrycode')
        .then(response=>response.json())
        .then(data=>{
            this.setState({countrys:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(countryid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API_COUNTRY + 'countrycode',{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'},
                body:JSON.stringify([{
                    Code:countryid
                }])
            })
        }
    }
    render(){
        const {countrys, countryid,countryname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Code</th>
                        <th>Name</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countrys.map(country=>
                            <tr key={country.Code}>
                                <td>{country.Code}</td>
                                <td>{country.Name}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        countryid:country.Code,countryname:country.Name})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteDep(country.Code)}>
            Delete
        </Button>

        <EditDepModal show={this.state.editModalShow}
        onHide={editModalClose}
        countryid={countryid}
        countryname={countryname}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Country</Button>

                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}