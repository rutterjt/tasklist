/**
 * Curried function to update individual values of a formData state object (a object stored in a form's state, of which each key/value pair represents the name/value of a form input).
 *
 * Returns a function that accepts a key prop, which is a string containing the name of a formData key. This function returns another function that accepts a value prop, which represents the value of the associated key. When called, this final function calls the setter function and only updates the given key/value pair, leaving all other values on the setter alone.
 *
 * @param {function} setter - The state setter for the whole formData state.
 */
export const updateFormData = (setter) => (key) => (value) => {
  setter((prev) => {
    return {
      ...prev,
      [key]: value,
    };
  });
};
