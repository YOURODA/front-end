import React, { forwardRef, Component } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from "@material-ui/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


class CreateCor extends Component {
  constructor(props) {
    super(props);

    this.state = {
        checked:[1],
        secondList:[],
        selectedSecond:0
    };
  }
  onCsvData = () => { };
  milisToMinutesAndSeconds = mil => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };

  setList= ()=>{
    const {seconds} =this.props
    let secondList = new Array(seconds).join('0').split('').map(parseFloat)
    this.b = secondList.map((index,value)=> value)
    console.log(seconds)
  }

  componentDidMount() {
    this.setList()
  }

  handleToggle  = (value) => () => {
    console.log(value)
    this.setState({selectedSecond:value})
  };

  render() {
    const {selectedSecond}=this.state
    this.props.setCsvData(this.state.data);
    console.log(this.b)
    return (
        <div >
        <Grid container spacing={3}>
            <Grid item xs={4}>
            <List >
            {this.b?.map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                <>
                    <ListItem key={value} role={undefined} dense button >
                        <Button disabled={selectedSecond===value} onClick={this.handleToggle(value)} >
                            <ListItemText id={labelId} primary={`${value + 0}. second`} />
                        </Button> 
                    </ListItem>
                    <Divider />
                </>
                );
            })}
            </List>
            </Grid>
            <Grid item xs={8}>
                <Paper >xs=8</Paper>
            </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    durationStamps: state.durationStamps,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCsvData: csvData => dispatch({ type: actionTypes.CSV_DATA, csvData })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCor);
