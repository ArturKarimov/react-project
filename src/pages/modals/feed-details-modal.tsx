import React from 'react';
import {Modal} from "../../components/modal/modal";
import {useHistory} from "react-router-dom";
import FeedDetails from "../../components/modal/feed-details/feed-details";

const FeedDetailsModal = () => {
    const history = useHistory();

    const onClose = () => {
        history.goBack()
    }

    return (
        <Modal width={720} height={718} onClose={onClose}>
            <FeedDetails/>
        </Modal>
    );
};

export default FeedDetailsModal;