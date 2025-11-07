"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitmoji3D = void 0;
var __selfType = requireType("./Bitmoji 3D");
function component(target) {
    target.getTypeName = function () { return __selfType; };
    if (target.prototype.hasOwnProperty("getTypeName"))
        return;
    Object.defineProperty(target.prototype, "getTypeName", {
        value: function () { return __selfType; },
        configurable: true,
        writable: true
    });
}
// Bitmoji3D.ts
const EventModule_1 = require("./Modules/EventModule");
const Scene_Object_Helpers_Module_1 = require("./Modules/Scene Object Helpers Module");
var BitmojiOwnerType;
(function (BitmojiOwnerType) {
    BitmojiOwnerType[BitmojiOwnerType["NONE"] = -1] = "NONE";
    BitmojiOwnerType[BitmojiOwnerType["ME"] = 0] = "ME";
    BitmojiOwnerType[BitmojiOwnerType["FRIENDBYINDEX"] = 1] = "FRIENDBYINDEX";
    BitmojiOwnerType[BitmojiOwnerType["AI"] = 2] = "AI";
})(BitmojiOwnerType || (BitmojiOwnerType = {}));
let Bitmoji3D = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var Bitmoji3D = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.bitmojiType = this.bitmojiType;
            this.friendsComponent = this.friendsComponent;
            this.friendIndex = this.friendIndex;
            this.mixamoAnimation = this.mixamoAnimation;
            this.autoDownload = this.autoDownload;
            this.renderOrder = this.renderOrder;
            this.castShadow = this.castShadow;
            this.autoMention = this.autoMention;
            this.remoteMediaModule = require('LensStudio:RemoteMediaModule');
            this.bitmojiModule = require('LensStudio:BitmojiModule');
            this.materialHolder = this.materialHolder;
            this.printDebug = this.printDebug;
            this.thisObject = this.sceneObject;
            this.avatar = null;
            this.bitmojiJoints = {};
            this.bitmojiMeshes = {};
            this.bitmojiGltfAsset = null;
            this.user = undefined;
            this.isLoading = false;
            this.loaderPrefab = this.loaderPrefab;
            this.loaderObject = null;
            this.mixamoBitmojiMap = {
                "ROOT": "Hips",
                "C_spine0001_bind_JNT": "Spine",
                "C_spine0003_bind_JNT": "Spine1",
                "C_neck0001_bind_JNT": "Neck",
                "C_head_bind_JNT": "Head",
                "R_clavicle_bind_JNT": "RightShoulder",
                "R_armUpper0001_bind_JNT": "RightArm",
                "R_armLower0001_bind_JNT": "RightForeArm",
                "R_hand0001_bind_JNT": "RightHand",
                "L_clavicle_bind_JNT": "LeftShoulder",
                "L_armUpper0001_bind_JNT": "LeftArm",
                "L_armLower0001_bind_JNT": "LeftForeArm",
                "L_hand0001_bind_JNT": "LeftHand",
                "L_legUpper0001_bind_JNT": "LeftUpLeg",
                "L_legLower0001_bind_JNT": "LeftLeg",
                "L_foot0001_bind_JNT": "LeftFoot",
                "L_foot0002_bind_JNT": "LeftToeBase",
                "R_legUpper0001_bind_JNT": "RightUpLeg",
                "R_legLower0001_bind_JNT": "RightLeg",
                "R_foot0001_bind_JNT": "RightFoot",
                "R_foot0002_bind_JNT": "RightToeBase",
            };
            this.onDownloaded = new EventModule_1.EventWrapper();
            this.onDownloadFailed = new EventModule_1.EventWrapper();
        }
        __initialize() {
            super.__initialize();
            this.bitmojiType = this.bitmojiType;
            this.friendsComponent = this.friendsComponent;
            this.friendIndex = this.friendIndex;
            this.mixamoAnimation = this.mixamoAnimation;
            this.autoDownload = this.autoDownload;
            this.renderOrder = this.renderOrder;
            this.castShadow = this.castShadow;
            this.autoMention = this.autoMention;
            this.remoteMediaModule = require('LensStudio:RemoteMediaModule');
            this.bitmojiModule = require('LensStudio:BitmojiModule');
            this.materialHolder = this.materialHolder;
            this.printDebug = this.printDebug;
            this.thisObject = this.sceneObject;
            this.avatar = null;
            this.bitmojiJoints = {};
            this.bitmojiMeshes = {};
            this.bitmojiGltfAsset = null;
            this.user = undefined;
            this.isLoading = false;
            this.loaderPrefab = this.loaderPrefab;
            this.loaderObject = null;
            this.mixamoBitmojiMap = {
                "ROOT": "Hips",
                "C_spine0001_bind_JNT": "Spine",
                "C_spine0003_bind_JNT": "Spine1",
                "C_neck0001_bind_JNT": "Neck",
                "C_head_bind_JNT": "Head",
                "R_clavicle_bind_JNT": "RightShoulder",
                "R_armUpper0001_bind_JNT": "RightArm",
                "R_armLower0001_bind_JNT": "RightForeArm",
                "R_hand0001_bind_JNT": "RightHand",
                "L_clavicle_bind_JNT": "LeftShoulder",
                "L_armUpper0001_bind_JNT": "LeftArm",
                "L_armLower0001_bind_JNT": "LeftForeArm",
                "L_hand0001_bind_JNT": "LeftHand",
                "L_legUpper0001_bind_JNT": "LeftUpLeg",
                "L_legLower0001_bind_JNT": "LeftLeg",
                "L_foot0001_bind_JNT": "LeftFoot",
                "L_foot0002_bind_JNT": "LeftToeBase",
                "R_legUpper0001_bind_JNT": "RightUpLeg",
                "R_legLower0001_bind_JNT": "RightLeg",
                "R_foot0001_bind_JNT": "RightFoot",
                "R_foot0002_bind_JNT": "RightToeBase",
            };
            this.onDownloaded = new EventModule_1.EventWrapper();
            this.onDownloadFailed = new EventModule_1.EventWrapper();
        }
        onAwake() {
            this.createEvent("OnDestroyEvent").bind(this.onDestroy.bind(this));
            this.createEvent("OnStartEvent").bind(this.onStart.bind(this));
            this.createEvent("SnapRecordStartEvent").bind(this.onSnapCapture.bind(this));
            this.createEvent("SnapImageCaptureEvent").bind(this.onSnapCapture.bind(this));
        }
        onStart() {
            if (this.autoDownload && this.bitmojiType !== BitmojiOwnerType.NONE && !this.isLoading) {
                this.downloadAvatar();
            }
        }
        async downloadAvatar() {
            try {
                const user = await this.getSnapchatUser();
                await this.downloadAvatarForUser(user);
            }
            catch (e) {
                this.onDownloadFailedCallback(e);
            }
        }
        async downloadAvatarForUser(snapchatUser) {
            if (this.isLoading) {
                this.debugPrint("Warning", "Loading in process");
                return;
            }
            if (this.avatar) {
                this.debugPrint("Warning", "Bitmoji avatar exists, deleting existing one.");
                this.onDestroy();
            }
            this.isLoading = true;
            this.setLoaderEnabled(true);
            this.user = snapchatUser;
            const options = this.createOptions(snapchatUser);
            try {
                const bitmoji3DResource = await this.getBitmojiResource(options);
                const gltfAsset = await this.downloadGLTFAsset(bitmoji3DResource);
                const sceneObject = await this.instantiateGLTFAssetAsync(gltfAsset);
                this.onDownloadSucceeded(sceneObject, gltfAsset);
            }
            catch (e) {
                this.onDownloadFailedCallback(e);
            }
        }
        createOptions(snapchatUser) {
            let options = Bitmoji3DOptions.create();
            if (snapchatUser != null) {
                options.user = snapchatUser;
            }
            const components = this.thisObject.getComponents("Component.ScriptComponent");
            // Filter components that match the Bitmoji3DAvatarOverride interface
            components
                .filter(component => typeof component.modifyBitmoji3DOptions === 'function')
                .forEach((component) => {
                if (component.enabled) {
                    component.modifyBitmoji3DOptions(options);
                }
            });
            return options;
        }
        async getSnapchatUser() {
            return new Promise((resolve, reject) => {
                switch (this.bitmojiType) {
                    case BitmojiOwnerType.ME:
                        resolve(null);
                        break;
                    case BitmojiOwnerType.FRIENDBYINDEX:
                        if (this.friendsComponent && this.friendsComponent.friends) {
                            this.friendsComponent.friends().then((users) => {
                                const friend = this.friendWithIndexExists(users, this.friendIndex);
                                if (friend != null) {
                                    resolve(friend);
                                }
                                else {
                                    reject(`Friend with index ${this.friendIndex} doesn't exist for this user`);
                                }
                            }).catch(() => {
                                reject('Failed to fetch user');
                            });
                        }
                        else {
                            global.userContextSystem.getAllFriends((users) => {
                                const friend = this.friendWithIndexExists(users, this.friendIndex);
                                if (friend != null) {
                                    resolve(friend);
                                }
                                else {
                                    reject(`Friend with index ${this.friendIndex} doesn't exist for this user`);
                                }
                            });
                        }
                        break;
                    case BitmojiOwnerType.AI:
                        global.userContextSystem.getMyAIUser((user) => {
                            resolve(user);
                        });
                        break;
                }
            });
        }
        friendWithIndexExists(friends, index) {
            const usersWithBitmoji = friends.filter(user => user.hasBitmoji);
            return usersWithBitmoji.length > index ? friends[index] : null;
        }
        getBitmojiResource(options) {
            return new Promise((resolve, reject) => {
                try {
                    if (options != null) {
                        this.bitmojiModule.requestBitmoji3DResourceWithOptions(options, resolve);
                    }
                    else {
                        this.bitmojiModule.requestBitmoji3DResource(resolve);
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        }
        downloadGLTFAsset(bitmoji3DResource) {
            return new Promise((resolve, reject) => {
                this.remoteMediaModule.loadResourceAsGltfAsset(bitmoji3DResource, resolve, reject);
            });
        }
        instantiateGLTFAssetAsync(gltfAsset) {
            return new Promise((resolve, reject) => {
                this.bitmojiGltfAsset = gltfAsset;
                const settings = GltfSettings.create();
                settings.convertMetersToCentimeters = true;
                settings.optimizeGeometry = true;
                settings.storeTriangleOrder = true;
                gltfAsset.tryInstantiateAsync(this.thisObject, this.materialHolder, resolve, reject, this.onLoadingUpdate, settings);
            });
        }
        onDownloadFailedCallback(e) {
            this.debugPrint("Error downloading", e);
            this.onDownloadFailed.trigger();
            this.isLoading = false;
            this.setLoaderEnabled(false);
        }
        autoMentionCurrentUserIfNeeded() {
            if (this.autoMention && this.user !== null && this.user !== undefined) {
                SnapData.addUserMention(this.user);
            }
        }
        onDownloadSucceeded(sceneObject, gltfAsset) {
            if (this.avatar) {
                this.onDestroy();
            }
            this.bitmojiGltfAsset = gltfAsset;
            this.avatar = sceneObject;
            this.processAvatar().then(() => {
                this.autoMentionCurrentUserIfNeeded();
                this.isLoading = false;
                this.debugPrint("Info", "Bitmoji avatar downloaded.");
                this.onDownloaded.trigger(this.avatar);
                this.setLoaderEnabled(false);
            });
        }
        onLoadingUpdate(status) {
            // debugPrint("Loading", status.toFixed(2));
        }
        async processAvatar() {
            this.bitmojiMeshes = {};
            this.bitmojiJoints = {};
            this.buildJointMap(this.bitmojiJoints, this.avatar);
            const layer = this.thisObject.layer;
            Object.values(this.bitmojiMeshes).forEach(rmv => {
                rmv.sceneObject.layer = layer;
                rmv.meshShadowMode = this.castShadow ? MeshShadowMode.Caster : MeshShadowMode.None;
                rmv.setRenderOrder(this.renderOrder);
            });
            if (this.mixamoAnimation) {
                this.remap();
                this.addScaleCompensation();
            }
            this.avatar.setParent(this.thisObject);
            // apply overrides 
            const components = this.thisObject.getComponents("Component.ScriptComponent");
            const isBitmoji3DAvatarOverride = (component) => {
                return typeof component.modifyBitmoji3DAvatar === 'function' && component.enabled;
            };
            // Filter components that match the Bitmoji3DAvatarOverride interface
            const filtered = components.filter(isBitmoji3DAvatarOverride);
            for (const comp of filtered) {
                try {
                    await comp.modifyBitmoji3DAvatar(this);
                }
                catch (error) {
                    this.debugPrint("Error", error.message);
                }
            }
        }
        remap() {
            for (const joint in this.bitmojiJoints) {
                if (this.mixamoBitmojiMap[joint]) {
                    this.bitmojiJoints[joint].name = this.mixamoBitmojiMap[joint];
                }
            }
        }
        addScaleCompensation() {
            const bmRoot = this.bitmojiJoints["ROOT"];
            const so = global.scene.createSceneObject("Hips_SSC_Mixamo");
            so.setParent(bmRoot.getParent());
            so.getTransform().setLocalScale(vec3.one().uniformScale(0.01));
            const scale = bmRoot.getTransform().getLocalScale();
            bmRoot.getTransform().setLocalScale(scale.uniformScale(100));
            bmRoot.setParent(so);
        }
        buildJointMap(m, root) {
            for (let i = 0; i < root.getChildrenCount(); i++) {
                const child = root.getChild(i);
                const rmv = child.getComponent("RenderMeshVisual");
                if (rmv) {
                    this.bitmojiMeshes[child.name] = rmv;
                }
                m[child.name] = child;
                this.buildJointMap(m, child);
            }
        }
        setLoaderEnabled(isEnabled) {
            isEnabled = isEnabled && !global.scene.isRecording();
            if (this.loaderPrefab && !isNull(this.loaderPrefab) && (!this.loaderObject || isNull(this.loaderObject))) {
                this.loaderObject = this.loaderPrefab.instantiate(this.thisObject);
                this.setLoaderLayer(this.thisObject.layer);
            }
            if (this.loaderObject && !isNull(this.loaderObject)) {
                this.loaderObject.enabled = isEnabled;
            }
        }
        setLoaderLayer(layerSet) {
            if (this.loaderObject) {
                this.loaderObject.layer = layerSet;
                const targetCamera = (0, Scene_Object_Helpers_Module_1.getFirstCameraIntersecting)(layerSet);
                if (targetCamera != null) {
                    const lookAtComponent = this.loaderObject.getComponent("LookAtComponent");
                    lookAtComponent.target = targetCamera.sceneObject;
                }
            }
        }
        debugPrint(prefix, message) {
            if (this.printDebug) {
                print(`${prefix}: ${message}`);
            }
        }
        onSnapCapture() {
            this.setLoaderEnabled(false);
        }
        onDestroy() {
            if (!isNull(this.avatar)) {
                this.avatar.destroy();
            }
            if (!isNull(this.loaderObject)) {
                this.loaderObject.destroy();
            }
            this.bitmojiJoints = {};
            this.bitmojiMeshes = {};
            this.bitmojiGltfAsset = {};
        }
        download() {
            this.downloadAvatar();
        }
        getUser() {
            return this.user;
        }
        getExtras() {
            return this.bitmojiGltfAsset ? this.bitmojiGltfAsset.extras : null;
        }
        getAvatar() {
            return this.avatar;
        }
        getRenderOrder() {
            return this.renderOrder;
        }
        setRenderOrder(v) {
            this.renderOrder = v;
            Object.values(this.bitmojiMeshes).forEach(rmv => {
                rmv.setRenderOrder(this.renderOrder);
            });
            if (!isNull(this.loaderObject)) {
                this.loaderObject.getComponent("RenderMeshVisual").setRenderOrder(this.renderOrder);
            }
        }
        setShadowsEnabled(v) {
            this.castShadow = v;
            Object.values(this.bitmojiMeshes).forEach(rmv => {
                rmv.meshShadowMode = this.castShadow ? MeshShadowMode.Caster : MeshShadowMode.None;
            });
        }
        getShadowsEnabled() {
            return this.castShadow;
        }
        setRenderLayer(v) {
            if (!isNull(this.thisObject)) {
                this.thisObject.layer = v;
                Object.values(this.bitmojiMeshes).forEach(rmv => {
                    rmv.sceneObject.layer = v;
                });
            }
            if (!isNull(this.loaderObject)) {
                this.setLoaderLayer(v);
            }
        }
        getRenderLayer() {
            return this.thisObject.layer;
        }
    };
    __setFunctionName(_classThis, "Bitmoji3D");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Bitmoji3D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Bitmoji3D = _classThis;
})();
exports.Bitmoji3D = Bitmoji3D;
//# sourceMappingURL=Bitmoji%203D.js.map