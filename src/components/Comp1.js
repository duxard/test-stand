import React from 'react';

const Comp1 = () => {
  return (
    <div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="Placeholder" id="email" type="email" class="validate" />
              <label for="email">Email</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Comp1;
