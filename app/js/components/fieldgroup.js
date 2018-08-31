import React from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel, Col} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
    <Col componentClass={label} smOffset={2} sm={3}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      </Col>
    </FormGroup>
  );
}

export default FieldGroup;