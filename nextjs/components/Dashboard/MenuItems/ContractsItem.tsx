import {Contract, Contract_Status, Submission_Review, UserRole} from "../../../types/resolvers";
import {DashboardItems} from "../../../pages/dashboard";
import Stack from "@mui/joy/Stack";
import ContractItemCard from "../../Cards/ContractItemCard";
import ContractStatusAutocomplete from "../../AutoCompletes/ContractStatusAutocomplete";
import Typography from '@mui/joy/Typography';
import {
    AcceptCancelContractControlButtons
} from "../../Buttons/DashBoardControlButtons/AcceptCancelContractControlButtons";
import {
    RequestProjectSubmissionReviewControlButtons
} from "../../Buttons/DashBoardControlButtons/RequestProjectSubmissionReviewControlButtons";
import {CancelPayContractControlButtons} from "../../Buttons/DashBoardControlButtons/CancelPayContractControlButtons";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {currentComponentContext} from "../DashBoardWrapper";

import {Divider} from "@mui/joy";
import {Collapse} from "@mantine/core";
import CollapseButton from "../../Buttons/CollapseButton";


function ContractItemDetails(props: { submission: Array<Submission_Review> }) {
    return <>{JSON.stringify(props.submission)}</>;
}

export const ContractsItem = (props: {
    contracts: Array<Contract>,
    setContracts: Dispatch<SetStateAction<Contract[]>>
    userRole: UserRole
}) => {

    const [query, setQuery] = useState<string | null>("")
    const {currentComponent} = useContext(currentComponentContext)
    const [open, setOpen] = useState<boolean>(false)
    const filteredContracts = query ? props.contracts.filter(contract => contract.status.split("_").join(" ").toLowerCase() === query) : props.contracts;

    if (!props.contracts) return <></>;
    if (currentComponent === DashboardItems.Contracts) {
        return (
            <Stack spacing={2}>
                <ContractStatusAutocomplete changeHandler={(event, value) => setQuery(() => value)}/>
                {filteredContracts.length == 0 && <Typography level="h3">No contracts found</Typography>}
                {filteredContracts.map((contract) =>
                    <>

                        <ContractItemCard
                            key={contract._id.toString()} contract={contract}>

                            <Stack spacing={2} sx={{width: "100%"}}>
                            {/*freelancer only*/}
                            {props.userRole === UserRole.Freelancer && contract.status === Contract_Status.Pending &&
                                <AcceptCancelContractControlButtons contract={contract}
                                                                    setContracts={props.setContracts}/>}
                            {props.userRole === UserRole.Freelancer && contract.status === Contract_Status.Completed &&
                                <RequestProjectSubmissionReviewControlButtons currentContract={contract}
                                                                              setContracts={props.setContracts}/>}
                            {/*client only*/}
                            {props.userRole === UserRole.Client && (contract.status === Contract_Status.Pending || contract.status === Contract_Status.Accepted) &&
                                <CancelPayContractControlButtons contract={contract}
                                                                 setContracts={props.setContracts}/>}


                        <CollapseButton onClick={() => setOpen(prv => !prv)} open={open}/>

                        <Collapse in={open}>
                            <Divider sx={{margin: "10px"}}/>
                            <ContractItemDetails submission={contract.submission_reviews}/>
                        </Collapse>


                            </Stack>
                    </ContractItemCard>

                    </>
                )}


            </Stack>
        )
    }

    return <></>;
}