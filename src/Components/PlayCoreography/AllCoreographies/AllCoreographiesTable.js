import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import { Grid, Card } from '@material-ui/core';
const useStyles = (theme) => ({
    root: {
        flexGrow: 2,
        padding: '10px',
        textAlign: 'center',
    },
    formTop: {
        paddingTop: '17px',
    },
    dialogPaper: {
        minHeight: '30vh',
        maxHeight: '50vh',
    },
    palette: {
        primary: '#ff1744',
        secondary: '#2196f3',
    },
    color: {
        color: '#FF935C',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 550,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
});
class AllCoreographiesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyDialog: [],
        };
    }
    handleChange = (event) => {
        this.setState({
            selectedApplicationId: event.target.value.id,
            selectedApplicationNames: event.target.value,
        });
    };
    handleChangeMenu = (event) => {
        this.setState({
            selectedMenuIds: event.target.value.menuId,
            selectedMenuName: event.target.value,
            selectedMenu: event.target,
        });
    };
    addUser(e) {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                    <Card>
                        <MaterialTable
                            tableRef={this.tableRef}
                            title=" "
                            columns={[
                                { title: 'User Name', field: 'conversationId' },
                                { title: 'Track Name', field: 'userName' ? 'userName' : '-' },
                                { title: 'Coreography', field: 'platform' },
                                {
                                    title: 'Coreography Date',
                                    field: 'endTime',
                                },
                            ]}
                            // data={
                            //     this.props.dialog.length > 0
                            //         ? this.props.dialog
                            //         : this.state.emptyDialog
                            // }
                            options={{
                                pageSize: 10,
                                search: false,
                                exportDelimiter: ',\t',
                                exportButton: false,
                                exportFileName: 'Rapor',
                                headerStyle: { backgroundColor: '#EAEDED' },
                            }}
                            // onRowClick={(evt, selectedRow) => {
                            //     this.setState({
                            //         selectedRow,
                            //         openEditDialog: true,
                            //         takeUsersMenuNames: [],
                            //     });
                            //     this.apiService
                            //         .getMessageWithSessionId(selectedRow.id)
                            //         .then((response) => {
                            //             this.props.setPopUp(true);
                            //             this.props.setDialogMessage(response.data);
                            //         });
                            // }}
                            localization={{
                                body: {
                                    emptyDataSourceMessage: 'Gösterilecek kayıt yok',
                                    editRow: {
                                        deleteText: 'Kullanıcıyı silmek istediğinize emin misiniz?',
                                        saveTooltip: 'Kaydet',
                                        cancelTooltip: 'İptal',
                                    },
                                    editTooltip: 'Değiştir',
                                    deleteTooltip: 'Sil',
                                },
                                toolbar: {
                                    searchTooltip: 'Arama',
                                    searchPlaceholder: 'Arama',
                                    exportName: 'Çıktı al',
                                },
                                header: {
                                    actions: 'İşlemler',
                                },
                                pagination: {
                                    labelRowsSelect: 'satır',
                                    labelDisplayedRows: '{count} satırdan {from}-{to} arası',
                                    firstTooltip: 'İlk Sayfa',
                                    previousTooltip: 'Önceki Sayfa',
                                    nextTooltip: 'Sonraki Sayfa',
                                    lastTooltip: 'Son Sayfa',
                                },
                            }}
                        />
                    </Card>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        popUpAll: state.popUpAll,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        // setDialogMessage: (dialogMessage) =>
        //     dispatch({ type: actionTypes.DIALOG_MESSAGE, dialogMessage }),
        // setPopUp: (popUp) => dispatch({ type: actionTypes.POPUP, popUp }),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(AllCoreographiesTable));
