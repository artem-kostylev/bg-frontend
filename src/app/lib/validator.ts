import { required as vRequired, helpers } from "@vuelidate/validators";

export const required = helpers.withMessage("Поле обязательно для заполнения", vRequired);
