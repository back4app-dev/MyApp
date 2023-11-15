Parse.Cloud.beforeLogin(async (request) => {
  const user = request.object;

  if (user.get("disabled")) {
    throw new Error(
      "Your account has been disabled. Please contact an Administrator."
    );
  }

  if (user.get("deleted")) {
    throw new Error(
      "Your account was permanently deleted. You can not log in."
    );
  }
});

Parse.Cloud.beforeSave(Parse.User, async (request) => {
  const user = request.object;

  if (!user.existed()) {
    const requiredProperties = ["username", "email"];
    const missingProperties = requiredProperties.filter(
      (property) => !user.has(property)
    );

    if (missingProperties.length > 0) {
      throw new Parse.Error(
        Parse.Error.VALIDATION_ERROR,
        `The following properties are required: ${missingProperties.join(", ")}`
      );
    }
  }
});

Parse.Cloud.beforeDelete(Parse.User, async (request) => {
  const user = request.object;
  console.log("Deleting user: " + user.id);
});
