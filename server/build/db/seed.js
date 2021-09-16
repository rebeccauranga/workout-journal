"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
var uuid_1 = require("uuid");
var models_1 = require("../models");
var exercises = [
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.LowerBody,
        name: "Squats",
        description: "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent of a squat, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.LowerBody,
        name: "Barbell deadlifts",
        description: "The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground. It is one of the three powerlifting exercises, along with the squat and bench press.",
        videoURL: "https://youtu.be/tNn7AlPITOw",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.LowerBody,
        name: "Barbell hip thrusts",
        description: "A barbell hip thrust is a lower-body strength training exercise defined by lifting your lower back and torso with your knees bent and your upper body resting on a bench. With proper form, the barbell hip thrust works muscle groups across your entire lower body, particularly the gluteal muscles.",
        videoURL: "https://youtu.be/LM8XHLYJoYs",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.LowerBody,
        name: "Bulgarian split squats",
        description: "A type of single-leg squat, the Bulgarian split squat is sure to deliver big benefits to your lower body. With one leg behind you and elevated off of the ground, this exercise targets many of the same muscles as a traditional squat, but with an emphasis on the quads.",
        videoURL: "https://youtu.be/2C-uNgKwPLE",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.LowerBody,
        name: "Lunges",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.LowerBody,
        name: "Curtsy lunges",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.LowerBody,
        name: "Dumbbell Romanian Deadlifts",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.LowerBody,
        name: "Leg extension",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.UpperBody,
        name: "Rows",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.UpperBody,
        name: "Bicep curls",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.UpperBody,
        name: "Lat pulldowns",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.UpperBody,
        name: "Shoulder press",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.UpperBody,
        name: "Chest press",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.Cardio,
        name: "Running",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.Cardio,
        name: "Walking",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
    {
        id: (0, uuid_1.v4)(),
        category: models_1.ExerciseCategory.Cardio,
        name: "Elliptical",
        description: "A lunge can refer to any position of the human body where one leg is positioned forward with knee bent and foot flat on the ground while the other leg is positioned behind.",
        videoURL: "https://youtu.be/U3HlEF_E9fo",
    },
];
function seedExercises(exercises) {
    var _this = this;
    exercises.forEach(function (_a) {
        var id = _a.id, category = _a.category, name = _a.name, description = _a.description, videoURL = _a.videoURL;
        return __awaiter(_this, void 0, void 0, function () {
            var sql, values, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "INSERT INTO exercises(id, category, name, description, video_url) VALUES($1, $2, $3, $4, $5) RETURNING *";
                        values = [id, category, name, description, videoURL];
                        return [4 /*yield*/, config_1.default.query(sql, values)];
                    case 1:
                        res = _b.sent();
                        console.log(res.rows[0]);
                        return [2 /*return*/];
                }
            });
        });
    });
}
seedExercises(exercises);
