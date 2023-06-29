import { ButtonGroup, Button, Header } from "rsuite";
import "rsuite/dist/rsuite.min.css";

function MyButtons(props) {
    return(
        <div>
            <ButtonGroup style={{ margin: "20px" }} vertical>
                <Button    style={{ margin: "10px" }} onClick={props.onTextClick}  > Text   </Button>
                <Button    style={{ margin: "10px" }} onClick={props.onVisualClick}> Visual </Button>
            </ButtonGroup>
        </div>
    )
}

export default MyButtons;