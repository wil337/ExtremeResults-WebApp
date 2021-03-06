import angular from "angular";

import "../core/core.module";
import "../entryList/entryList.module";
import { ReflectionsController } from "./reflections.controller";
import { CreateReflectionService } from "./createReflection/createReflection.service";
import { CreateReflectionController } from "./createReflection/createReflection.controller";
import { createReflectionComponent } from "./createReflection/createReflection.directive";

angular.module('xr.reflections', ['xr.core', 'xr.entryList', 'ngMessages'])
    .service('CreateReflectionService', CreateReflectionService)
    .controller('CreateReflectionController', CreateReflectionController)
    .component('xrCreateReflection', createReflectionComponent)
    .controller('ReflectionsController', ReflectionsController);
