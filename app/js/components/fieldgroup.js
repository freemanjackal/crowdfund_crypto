import React from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel, Col} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
    <div className="col-sm-12">
    <Col componentClass={label} sm={7}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      </Col>
      </div>
    </FormGroup>
  );
}

export default FieldGroup;