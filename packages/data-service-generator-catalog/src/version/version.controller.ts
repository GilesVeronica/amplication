import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { VersionService } from "./version.service";
import { VersionControllerBase } from "./base/version.controller.base";
import { GetCodeGeneratorVersionInput } from "./GetCodeGeneratorVersionInput";
import { Public } from "../decorators/public.decorator";
import * as errors from "../errors";
import { Version } from "./base/Version";

@swagger.ApiTags("versions")
@common.Controller("versions")
export class VersionController extends VersionControllerBase {
  constructor(
    protected readonly service: VersionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @Public()
  @common.Post("/code-generator-version")
  @swagger.ApiOkResponse({ type: [Version] })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async getCodeGeneratorVersion(
    @common.Body() params: GetCodeGeneratorVersionInput
  ): Promise<Version> {
    return this.service.getCodeGeneratorVersion(params);
  }
}
