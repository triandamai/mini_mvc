import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@common': `${__dirname}/common`,
  '@services': `${__dirname}/services`,
  "@mvc-route":`${__dirname}/decorator/RouteDecorator`,
  "@mvc-validation":`${__dirname}/validation/ValidateRequest`,
  "@mvc-type":`${__dirname}/type/type`,
  "@mvc-model":`${__dirname}/model/BaseModel`,
  "@mvc-app":`${__dirname}/application`
});