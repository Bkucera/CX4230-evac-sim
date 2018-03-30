/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/matter-js/build/matter.js":
/*!************************************************!*\
  !*** ./node_modules/matter-js/build/matter.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/**
* matter-js 0.14.1 by @liabru 2018-01-10
* http://brm.io/matter-js/
* License MIT
*/

/**
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
* The `Matter.Body` module contains methods for creating and manipulating body models.
* A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
* Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).

* @class Body
*/

var Body = {};

module.exports = Body;

var Vertices = _dereq_('../geometry/Vertices');
var Vector = _dereq_('../geometry/Vector');
var Sleeping = _dereq_('../core/Sleeping');
var Render = _dereq_('../render/Render');
var Common = _dereq_('../core/Common');
var Bounds = _dereq_('../geometry/Bounds');
var Axes = _dereq_('../geometry/Axes');

(function() {

    Body._inertiaScale = 4;
    Body._nextCollidingGroupId = 1;
    Body._nextNonCollidingGroupId = -1;
    Body._nextCategory = 0x0001;

    /**
     * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * Vertices must be specified in clockwise order.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {body} body
     */
    Body.create = function(options) {
        var defaults = {
            id: Common.nextId(),
            type: 'body',
            label: 'Body',
            parts: [],
            plugin: {},
            angle: 0,
            vertices: Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),
            position: { x: 0, y: 0 },
            force: { x: 0, y: 0 },
            torque: 0,
            positionImpulse: { x: 0, y: 0 },
            constraintImpulse: { x: 0, y: 0, angle: 0 },
            totalContacts: 0,
            speed: 0,
            angularSpeed: 0,
            velocity: { x: 0, y: 0 },
            angularVelocity: 0,
            isSensor: false,
            isStatic: false,
            isSleeping: false,
            motion: 0,
            sleepThreshold: 60,
            density: 0.001,
            restitution: 0,
            friction: 0.1,
            frictionStatic: 0.5,
            frictionAir: 0.01,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            },
            slop: 0.05,
            timeScale: 1,
            render: {
                visible: true,
                opacity: 1,
                sprite: {
                    xScale: 1,
                    yScale: 1,
                    xOffset: 0,
                    yOffset: 0
                },
                lineWidth: 0
            }
        };

        var body = Common.extend(defaults, options);

        _initProperties(body, options);

        return body;
    };

    /**
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     */
    Body.nextGroup = function(isNonColliding) {
        if (isNonColliding)
            return Body._nextNonCollidingGroupId--;

        return Body._nextCollidingGroupId++;
    };

    /**
     * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
     * There are 32 available. See `body.collisionFilter` for more information.
     * @method nextCategory
     * @return {Number} Unique category bitfield
     */
    Body.nextCategory = function() {
        Body._nextCategory = Body._nextCategory << 1;
        return Body._nextCategory;
    };

    /**
     * Initialises body properties.
     * @method _initProperties
     * @private
     * @param {body} body
     * @param {} [options]
     */
    var _initProperties = function(body, options) {
        options = options || {};

        // init required properties (order is important)
        Body.set(body, {
            bounds: body.bounds || Bounds.create(body.vertices),
            positionPrev: body.positionPrev || Vector.clone(body.position),
            anglePrev: body.anglePrev || body.angle,
            vertices: body.vertices,
            parts: body.parts || [body],
            isStatic: body.isStatic,
            isSleeping: body.isSleeping,
            parent: body.parent || body
        });

        Vertices.rotate(body.vertices, body.angle, body.position);
        Axes.rotate(body.axes, body.angle);
        Bounds.update(body.bounds, body.vertices, body.velocity);

        // allow options to override the automatically calculated properties
        Body.set(body, {
            axes: options.axes || body.axes,
            area: options.area || body.area,
            mass: options.mass || body.mass,
            inertia: options.inertia || body.inertia
        });

        // render properties
        var defaultFillStyle = (body.isStatic ? '#2e2b44' : Common.choose(['#006BA6', '#0496FF', '#FFBC42', '#D81159', '#8F2D56'])),
            defaultStrokeStyle = '#000';
        body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
        body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
        body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
        body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
    };

    /**
     * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
     * Prefer to use the actual setter functions in performance critical situations.
     * @method set
     * @param {body} body
     * @param {} settings A property name (or map of properties and values) to set on the body.
     * @param {} value The value to set if `settings` is a single property name.
     */
    Body.set = function(body, settings, value) {
        var property;

        if (typeof settings === 'string') {
            property = settings;
            settings = {};
            settings[property] = value;
        }

        for (property in settings) {
            value = settings[property];

            if (!settings.hasOwnProperty(property))
                continue;

            switch (property) {

            case 'isStatic':
                Body.setStatic(body, value);
                break;
            case 'isSleeping':
                Sleeping.set(body, value);
                break;
            case 'mass':
                Body.setMass(body, value);
                break;
            case 'density':
                Body.setDensity(body, value);
                break;
            case 'inertia':
                Body.setInertia(body, value);
                break;
            case 'vertices':
                Body.setVertices(body, value);
                break;
            case 'position':
                Body.setPosition(body, value);
                break;
            case 'angle':
                Body.setAngle(body, value);
                break;
            case 'velocity':
                Body.setVelocity(body, value);
                break;
            case 'angularVelocity':
                Body.setAngularVelocity(body, value);
                break;
            case 'parts':
                Body.setParts(body, value);
                break;
            default:
                body[property] = value;

            }
        }
    };

    /**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
     * @method setStatic
     * @param {body} body
     * @param {bool} isStatic
     */
    Body.setStatic = function(body, isStatic) {
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.isStatic = isStatic;

            if (isStatic) {
                part._original = {
                    restitution: part.restitution,
                    friction: part.friction,
                    mass: part.mass,
                    inertia: part.inertia,
                    density: part.density,
                    inverseMass: part.inverseMass,
                    inverseInertia: part.inverseInertia
                };

                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;

                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
            } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;

                delete part._original;
            }
        }
    };

    /**
     * Sets the mass of the body. Inverse mass, density and inertia are automatically updated to reflect the change.
     * @method setMass
     * @param {body} body
     * @param {number} mass
     */
    Body.setMass = function(body, mass) {
        var moment = body.inertia / (body.mass / 6);
        body.inertia = moment * (mass / 6);
        body.inverseInertia = 1 / body.inertia;

        body.mass = mass;
        body.inverseMass = 1 / body.mass;
        body.density = body.mass / body.area;
    };

    /**
     * Sets the density of the body. Mass and inertia are automatically updated to reflect the change.
     * @method setDensity
     * @param {body} body
     * @param {number} density
     */
    Body.setDensity = function(body, density) {
        Body.setMass(body, density * body.area);
        body.density = density;
    };

    /**
     * Sets the moment of inertia (i.e. second moment of area) of the body of the body. 
     * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
     * @method setInertia
     * @param {body} body
     * @param {number} inertia
     */
    Body.setInertia = function(body, inertia) {
        body.inertia = inertia;
        body.inverseInertia = 1 / body.inertia;
    };

    /**
     * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
     * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
     * They are then automatically translated to world space based on `body.position`.
     *
     * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
     * Vertices must form a convex hull, concave hulls are not supported.
     *
     * @method setVertices
     * @param {body} body
     * @param {vector[]} vertices
     */
    Body.setVertices = function(body, vertices) {
        // change vertices
        if (vertices[0].body === body) {
            body.vertices = vertices;
        } else {
            body.vertices = Vertices.create(vertices, body);
        }

        // update properties
        body.axes = Axes.fromVertices(body.vertices);
        body.area = Vertices.area(body.vertices);
        Body.setMass(body, body.density * body.area);

        // orient vertices around the centre of mass at origin (0, 0)
        var centre = Vertices.centre(body.vertices);
        Vertices.translate(body.vertices, centre, -1);

        // update inertia while vertices are at origin (0, 0)
        Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));

        // update geometry
        Vertices.translate(body.vertices, body.position);
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the parts of the `body` and updates mass, inertia and centroid.
     * Each part will have its parent set to `body`.
     * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
     * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
     * @method setParts
     * @param {body} body
     * @param [body] parts
     * @param {bool} [autoHull=true]
     */
    Body.setParts = function(body, parts, autoHull) {
        var i;

        // add all the parts, ensuring that the first part is always the parent body
        parts = parts.slice(0);
        body.parts.length = 0;
        body.parts.push(body);
        body.parent = body;

        for (i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== body) {
                part.parent = body;
                body.parts.push(part);
            }
        }

        if (body.parts.length === 1)
            return;

        autoHull = typeof autoHull !== 'undefined' ? autoHull : true;

        // find the convex hull of all parts to set on the parent body
        if (autoHull) {
            var vertices = [];
            for (i = 0; i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
            }

            Vertices.clockwiseSort(vertices);

            var hull = Vertices.hull(vertices),
                hullCentre = Vertices.centre(hull);

            Body.setVertices(body, hull);
            Vertices.translate(body.vertices, hullCentre);
        }

        // sum the properties of all compound parts of the parent body
        var total = Body._totalProperties(body);

        body.area = total.area;
        body.parent = body;
        body.position.x = total.centre.x;
        body.position.y = total.centre.y;
        body.positionPrev.x = total.centre.x;
        body.positionPrev.y = total.centre.y;

        Body.setMass(body, total.mass);
        Body.setInertia(body, total.inertia);
        Body.setPosition(body, total.centre);
    };

    /**
     * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
     * @method setPosition
     * @param {body} body
     * @param {vector} position
     */
    Body.setPosition = function(body, position) {
        var delta = Vector.sub(position, body.position);
        body.positionPrev.x += delta.x;
        body.positionPrev.y += delta.y;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.position.x += delta.x;
            part.position.y += delta.y;
            Vertices.translate(part.vertices, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
     * @method setAngle
     * @param {body} body
     * @param {number} angle
     */
    Body.setAngle = function(body, angle) {
        var delta = angle - body.angle;
        body.anglePrev += delta;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.angle += delta;
            Vertices.rotate(part.vertices, delta, body.position);
            Axes.rotate(part.axes, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
            if (i > 0) {
                Vector.rotateAbout(part.position, delta, body.position, part.position);
            }
        }
    };

    /**
     * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setVelocity
     * @param {body} body
     * @param {vector} velocity
     */
    Body.setVelocity = function(body, velocity) {
        body.positionPrev.x = body.position.x - velocity.x;
        body.positionPrev.y = body.position.y - velocity.y;
        body.velocity.x = velocity.x;
        body.velocity.y = velocity.y;
        body.speed = Vector.magnitude(body.velocity);
    };

    /**
     * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setAngularVelocity
     * @param {body} body
     * @param {number} velocity
     */
    Body.setAngularVelocity = function(body, velocity) {
        body.anglePrev = body.angle - velocity;
        body.angularVelocity = velocity;
        body.angularSpeed = Math.abs(body.angularVelocity);
    };

    /**
     * Moves a body by a given vector relative to its current position, without imparting any velocity.
     * @method translate
     * @param {body} body
     * @param {vector} translation
     */
    Body.translate = function(body, translation) {
        Body.setPosition(body, Vector.add(body.position, translation));
    };

    /**
     * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
     * @method rotate
     * @param {body} body
     * @param {number} rotation
     * @param {vector} [point]
     */
    Body.rotate = function(body, rotation, point) {
        if (!point) {
            Body.setAngle(body, body.angle + rotation);
        } else {
            var cos = Math.cos(rotation),
                sin = Math.sin(rotation),
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            });

            Body.setAngle(body, body.angle + rotation);
        }
    };

    /**
     * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
     * @method scale
     * @param {body} body
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} [point]
     */
    Body.scale = function(body, scaleX, scaleY, point) {
        var totalArea = 0,
            totalInertia = 0;

        point = point || body.position;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            // scale vertices
            Vertices.scale(part.vertices, scaleX, scaleY, point);

            // update properties
            part.axes = Axes.fromVertices(part.vertices);
            part.area = Vertices.area(part.vertices);
            Body.setMass(part, body.density * part.area);

            // update inertia (requires vertices to be at origin)
            Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
            Body.setInertia(part, Body._inertiaScale * Vertices.inertia(part.vertices, part.mass));
            Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });

            if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
            }

            // scale position
            part.position.x = point.x + (part.position.x - point.x) * scaleX;
            part.position.y = point.y + (part.position.y - point.y) * scaleY;

            // update bounds
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }

        // handle parent body
        if (body.parts.length > 1) {
            body.area = totalArea;

            if (!body.isStatic) {
                Body.setMass(body, body.density * totalArea);
                Body.setInertia(body, totalInertia);
            }
        }

        // handle circles
        if (body.circleRadius) { 
            if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
            } else {
                // body is no longer a circle
                body.circleRadius = null;
            }
        }
    };

    /**
     * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
     * @method update
     * @param {body} body
     * @param {number} deltaTime
     * @param {number} timeScale
     * @param {number} correction
     */
    Body.update = function(body, deltaTime, timeScale, correction) {
        var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);

        // from the previous step
        var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale,
            velocityPrevX = body.position.x - body.positionPrev.x,
            velocityPrevY = body.position.y - body.positionPrev.y;

        // update velocity with Verlet integration
        body.velocity.x = (velocityPrevX * frictionAir * correction) + (body.force.x / body.mass) * deltaTimeSquared;
        body.velocity.y = (velocityPrevY * frictionAir * correction) + (body.force.y / body.mass) * deltaTimeSquared;

        body.positionPrev.x = body.position.x;
        body.positionPrev.y = body.position.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;

        // update angular velocity with Verlet integration
        body.angularVelocity = ((body.angle - body.anglePrev) * frictionAir * correction) + (body.torque / body.inertia) * deltaTimeSquared;
        body.anglePrev = body.angle;
        body.angle += body.angularVelocity;

        // track speed and acceleration
        body.speed = Vector.magnitude(body.velocity);
        body.angularSpeed = Math.abs(body.angularVelocity);

        // transform the body geometry
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            Vertices.translate(part.vertices, body.velocity);
            
            if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
            }

            if (body.angularVelocity !== 0) {
                Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                    Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                }
            }

            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Applies a force to a body from a given world-space position, including resulting torque.
     * @method applyForce
     * @param {body} body
     * @param {vector} position
     * @param {vector} force
     */
    Body.applyForce = function(body, position, force) {
        body.force.x += force.x;
        body.force.y += force.y;
        var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
        body.torque += offset.x * force.y - offset.y * force.x;
    };

    /**
     * Returns the sums of the properties of all compound parts of the parent body.
     * @method _totalProperties
     * @private
     * @param {body} body
     * @return {}
     */
    Body._totalProperties = function(body) {
        // from equations at:
        // https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
        // http://output.to/sideway/default.asp?qno=121100087

        var properties = {
            mass: 0,
            area: 0,
            inertia: 0,
            centre: { x: 0, y: 0 }
        };

        // sum the properties of all compound parts of the parent body
        for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
            var part = body.parts[i],
                mass = part.mass !== Infinity ? part.mass : 1;

            properties.mass += mass;
            properties.area += part.area;
            properties.inertia += part.inertia;
            properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
        }

        properties.centre = Vector.div(properties.centre, properties.mass);

        return properties;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a body starts sleeping (where `this` is the body).
    *
    * @event sleepStart
    * @this {body} The body that has started sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a body ends sleeping (where `this` is the body).
    *
    * @event sleepEnd
    * @this {body} The body that has ended sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "body"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Body"
     */

    /**
     * An array of bodies that make up this body. 
     * The first body in the array must always be a self reference to the current body instance.
     * All bodies in the `parts` array together form a single rigid compound body.
     * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
     * Parts themselves should never be added to a `World`, only the parent body should be.
     * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
     *
     * @property parts
     * @type body[]
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * A self reference if the body is _not_ a part of another body.
     * Otherwise this is a reference to the body that this is a part of.
     * See `body.parts`.
     *
     * @property parent
     * @type body
     */

    /**
     * A `Number` specifying the angle of the body, in radians.
     *
     * @property angle
     * @type number
     * @default 0
     */

    /**
     * An array of `Vector` objects that specify the convex hull of the rigid body.
     * These should be provided about the origin `(0, 0)`. E.g.
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
     * The `Vector` objects are also augmented with additional properties required for efficient collision detection. 
     *
     * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
     * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
     *
     * @property vertices
     * @type vector[]
     */

    /**
     * A `Vector` that specifies the current world-space position of the body.
     *
     * @property position
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
     *
     * @property force
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
     *
     * @property torque
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
     *
     * @readOnly
     * @property speed
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
     *
     * @readOnly
     * @property angularSpeed
     * @type number
     * @default 0
     */

    /**
     * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property velocity
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property angularVelocity
     * @type number
     * @default 0
     */

    /**
     * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
     * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
     *
     * @property isStatic
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
     *
     * @property isSensor
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
     * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
     *
     * @property isSleeping
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
     * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
     *
     * @readOnly
     * @property motion
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
     *
     * @property sleepThreshold
     * @type number
     * @default 60
     */

    /**
     * A `Number` that defines the density of the body, that is its mass per unit area.
     * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
     * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
     *
     * @property density
     * @type number
     * @default 0.001
     */

    /**
     * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
     * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
     *
     * @property mass
     * @type number
     */

    /**
     * A `Number` that defines the inverse mass of the body (`1 / mass`).
     * If you modify this value, you must also modify the `body.mass` property.
     *
     * @property inverseMass
     * @type number
     */

    /**
     * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
     * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
     * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
     *
     * @property inertia
     * @type number
     */

    /**
     * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
     * If you modify this value, you must also modify the `body.inertia` property.
     *
     * @property inverseInertia
     * @type number
     */

    /**
     * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
     * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
     * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
     *
     *     Math.max(bodyA.restitution, bodyB.restitution)
     *
     * @property restitution
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means that the body may slide indefinitely.
     * A value of `1` means the body may come to a stop almost instantly after a force is applied.
     *
     * The effects of the value may be non-linear. 
     * High values may be unstable depending on the body.
     * The engine uses a Coulomb friction model including static and kinetic friction.
     * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
     *
     *     Math.min(bodyA.friction, bodyB.friction)
     *
     * @property friction
     * @type number
     * @default 0.1
     */

    /**
     * A `Number` that defines the static friction of the body (in the Coulomb friction model). 
     * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
     * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
     * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
     *
     * @property frictionStatic
     * @type number
     * @default 0.5
     */

    /**
     * A `Number` that defines the air friction of the body (air resistance). 
     * A value of `0` means the body will never slow as it moves through space.
     * The higher the value, the faster a body slows when moving through space.
     * The effects of the value are non-linear. 
     *
     * @property frictionAir
     * @type number
     * @default 0.01
     */

    /**
     * An `Object` that specifies the collision filtering properties of this body.
     *
     * Collisions between two bodies will obey the following rules:
     * - If the two bodies have the same non-zero value of `collisionFilter.group`,
     *   they will always collide if the value is positive, and they will never collide
     *   if the value is negative.
     * - If the two bodies have different values of `collisionFilter.group` or if one
     *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
     *
     * Each body belongs to a collision category, given by `collisionFilter.category`. This
     * value is used as a bit field and the category should have only one bit set, meaning that
     * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
     * different collision categories available.
     *
     * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
     * the categories it collides with (the value is the bitwise AND value of all these categories).
     *
     * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
     * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
     * are both true.
     *
     * @property collisionFilter
     * @type object
     */

    /**
     * An Integer `Number`, that specifies the collision group this body belongs to.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.group
     * @type object
     * @default 0
     */

    /**
     * A bit field that specifies the collision category this body belongs to.
     * The category value should have only one bit set, for example `0x0001`.
     * This means there are up to 32 unique collision categories available.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.category
     * @type object
     * @default 1
     */

    /**
     * A bit mask that specifies the collision categories this body may collide with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.mask
     * @type object
     * @default -1
     */

    /**
     * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
     * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
     * The default should generally suffice, although very large bodies may require larger values for stable stacking.
     *
     * @property slop
     * @type number
     * @default 0.05
     */

    /**
     * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
     *
     * @property timeScale
     * @type number
     * @default 1
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the body should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * Sets the opacity to use when rendering.
     *
     * @property render.opacity
     * @type number
     * @default 1
    */

    /**
     * An `Object` that defines the sprite properties to use when rendering, if any.
     *
     * @property render.sprite
     * @type object
     */

    /**
     * An `String` that defines the path to the image to use as the sprite texture, if any.
     *
     * @property render.sprite.texture
     * @type string
     */
     
    /**
     * A `Number` that defines the scaling in the x-axis for the sprite, if any.
     *
     * @property render.sprite.xScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that defines the scaling in the y-axis for the sprite, if any.
     *
     * @property render.sprite.yScale
     * @type number
     * @default 1
     */

     /**
      * A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
      *
      * @property render.sprite.xOffset
      * @type number
      * @default 0
      */

     /**
      * A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
      *
      * @property render.sprite.yOffset
      * @type number
      * @default 0
      */

    /**
     * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 0
     */

    /**
     * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.fillStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * An array of unique axis vectors (edge normals) used for collision detection.
     * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
     * They are constantly updated by `Body.update` during the simulation.
     *
     * @property axes
     * @type vector[]
     */
     
    /**
     * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
     *
     * @property area
     * @type string
     * @default 
     */

    /**
     * A `Bounds` object that defines the AABB region for the body.
     * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
     *
     * @property bounds
     * @type bounds
     */

})();

},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31}],2:[function(_dereq_,module,exports){
/**
* The `Matter.Composite` module contains methods for creating and manipulating composite bodies.
* A composite body is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`, therefore composites form a tree structure.
* It is important to use the functions in this module to modify composites, rather than directly modifying their properties.
* Note that the `Matter.World` object is also a type of `Matter.Composite` and as such all composite methods here can also operate on a `Matter.World`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Composite
*/

var Composite = {};

module.exports = Composite;

var Events = _dereq_('../core/Events');
var Common = _dereq_('../core/Common');
var Body = _dereq_('./Body');

(function() {

    /**
     * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} [options]
     * @return {composite} A new composite
     */
    Composite.create = function(options) {
        return Common.extend({ 
            id: Common.nextId(),
            type: 'composite',
            parent: null,
            isModified: false,
            bodies: [], 
            constraints: [], 
            composites: [],
            label: 'Composite',
            plugin: {}
        }, options);
    };

    /**
     * Sets the composite's `isModified` flag. 
     * If `updateParents` is true, all parents will be set (default: false).
     * If `updateChildren` is true, all children will be set (default: false).
     * @method setModified
     * @param {composite} composite
     * @param {boolean} isModified
     * @param {boolean} [updateParents=false]
     * @param {boolean} [updateChildren=false]
     */
    Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
        composite.isModified = isModified;

        if (updateParents && composite.parent) {
            Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
        }

        if (updateChildren) {
            for(var i = 0; i < composite.composites.length; i++) {
                var childComposite = composite.composites[i];
                Composite.setModified(childComposite, isModified, updateParents, updateChildren);
            }
        }
    };

    /**
     * Generic add function. Adds one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
     * @method add
     * @param {composite} composite
     * @param {} object
     * @return {composite} The original composite with the objects added
     */
    Composite.add = function(composite, object) {
        var objects = [].concat(object);

        Events.trigger(composite, 'beforeAdd', { object: object });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {

            case 'body':
                // skip adding compound parts
                if (obj.parent !== obj) {
                    Common.warn('Composite.add: skipped adding a compound body part (you must add its parent instead)');
                    break;
                }

                Composite.addBody(composite, obj);
                break;
            case 'constraint':
                Composite.addConstraint(composite, obj);
                break;
            case 'composite':
                Composite.addComposite(composite, obj);
                break;
            case 'mouseConstraint':
                Composite.addConstraint(composite, obj.constraint);
                break;

            }
        }

        Events.trigger(composite, 'afterAdd', { object: object });

        return composite;
    };

    /**
     * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Optionally searching its children recursively.
     * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
     * @method remove
     * @param {composite} composite
     * @param {} object
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the objects removed
     */
    Composite.remove = function(composite, object, deep) {
        var objects = [].concat(object);

        Events.trigger(composite, 'beforeRemove', { object: object });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {

            case 'body':
                Composite.removeBody(composite, obj, deep);
                break;
            case 'constraint':
                Composite.removeConstraint(composite, obj, deep);
                break;
            case 'composite':
                Composite.removeComposite(composite, obj, deep);
                break;
            case 'mouseConstraint':
                Composite.removeConstraint(composite, obj.constraint);
                break;

            }
        }

        Events.trigger(composite, 'afterRemove', { object: object });

        return composite;
    };

    /**
     * Adds a composite to the given composite.
     * @private
     * @method addComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @return {composite} The original compositeA with the objects from compositeB added
     */
    Composite.addComposite = function(compositeA, compositeB) {
        compositeA.composites.push(compositeB);
        compositeB.parent = compositeA;
        Composite.setModified(compositeA, true, true, false);
        return compositeA;
    };

    /**
     * Removes a composite from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @param {boolean} [deep=false]
     * @return {composite} The original compositeA with the composite removed
     */
    Composite.removeComposite = function(compositeA, compositeB, deep) {
        var position = Common.indexOf(compositeA.composites, compositeB);
        if (position !== -1) {
            Composite.removeCompositeAt(compositeA, position);
            Composite.setModified(compositeA, true, true, false);
        }

        if (deep) {
            for (var i = 0; i < compositeA.composites.length; i++){
                Composite.removeComposite(compositeA.composites[i], compositeB, true);
            }
        }

        return compositeA;
    };

    /**
     * Removes a composite from the given composite.
     * @private
     * @method removeCompositeAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the composite removed
     */
    Composite.removeCompositeAt = function(composite, position) {
        composite.composites.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a body to the given composite.
     * @private
     * @method addBody
     * @param {composite} composite
     * @param {body} body
     * @return {composite} The original composite with the body added
     */
    Composite.addBody = function(composite, body) {
        composite.bodies.push(body);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a body from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeBody
     * @param {composite} composite
     * @param {body} body
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBody = function(composite, body, deep) {
        var position = Common.indexOf(composite.bodies, body);
        if (position !== -1) {
            Composite.removeBodyAt(composite, position);
            Composite.setModified(composite, true, true, false);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.removeBody(composite.composites[i], body, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite.
     * @private
     * @method removeBodyAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBodyAt = function(composite, position) {
        composite.bodies.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a constraint to the given composite.
     * @private
     * @method addConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @return {composite} The original composite with the constraint added
     */
    Composite.addConstraint = function(composite, constraint) {
        composite.constraints.push(constraint);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a constraint from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraint = function(composite, constraint, deep) {
        var position = Common.indexOf(composite.constraints, constraint);
        if (position !== -1) {
            Composite.removeConstraintAt(composite, position);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.removeConstraint(composite.composites[i], constraint, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite.
     * @private
     * @method removeConstraintAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraintAt = function(composite, position) {
        composite.constraints.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes all bodies, constraints and composites from the given composite.
     * Optionally clearing its children recursively.
     * @method clear
     * @param {composite} composite
     * @param {boolean} keepStatic
     * @param {boolean} [deep=false]
     */
    Composite.clear = function(composite, keepStatic, deep) {
        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.clear(composite.composites[i], keepStatic, true);
            }
        }
        
        if (keepStatic) {
            composite.bodies = composite.bodies.filter(function(body) { return body.isStatic; });
        } else {
            composite.bodies.length = 0;
        }

        composite.constraints.length = 0;
        composite.composites.length = 0;
        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Returns all bodies in the given composite, including all bodies in its children, recursively.
     * @method allBodies
     * @param {composite} composite
     * @return {body[]} All the bodies
     */
    Composite.allBodies = function(composite) {
        var bodies = [].concat(composite.bodies);

        for (var i = 0; i < composite.composites.length; i++)
            bodies = bodies.concat(Composite.allBodies(composite.composites[i]));

        return bodies;
    };

    /**
     * Returns all constraints in the given composite, including all constraints in its children, recursively.
     * @method allConstraints
     * @param {composite} composite
     * @return {constraint[]} All the constraints
     */
    Composite.allConstraints = function(composite) {
        var constraints = [].concat(composite.constraints);

        for (var i = 0; i < composite.composites.length; i++)
            constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));

        return constraints;
    };

    /**
     * Returns all composites in the given composite, including all composites in its children, recursively.
     * @method allComposites
     * @param {composite} composite
     * @return {composite[]} All the composites
     */
    Composite.allComposites = function(composite) {
        var composites = [].concat(composite.composites);

        for (var i = 0; i < composite.composites.length; i++)
            composites = composites.concat(Composite.allComposites(composite.composites[i]));

        return composites;
    };

    /**
     * Searches the composite recursively for an object matching the type and id supplied, null if not found.
     * @method get
     * @param {composite} composite
     * @param {number} id
     * @param {string} type
     * @return {object} The requested object, if found
     */
    Composite.get = function(composite, id, type) {
        var objects,
            object;

        switch (type) {
        case 'body':
            objects = Composite.allBodies(composite);
            break;
        case 'constraint':
            objects = Composite.allConstraints(composite);
            break;
        case 'composite':
            objects = Composite.allComposites(composite).concat(composite);
            break;
        }

        if (!objects)
            return null;

        object = objects.filter(function(object) { 
            return object.id.toString() === id.toString(); 
        });

        return object.length === 0 ? null : object[0];
    };

    /**
     * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
     * @method move
     * @param {compositeA} compositeA
     * @param {object[]} objects
     * @param {compositeB} compositeB
     * @return {composite} Returns compositeA
     */
    Composite.move = function(compositeA, objects, compositeB) {
        Composite.remove(compositeA, objects);
        Composite.add(compositeB, objects);
        return compositeA;
    };

    /**
     * Assigns new ids for all objects in the composite, recursively.
     * @method rebase
     * @param {composite} composite
     * @return {composite} Returns composite
     */
    Composite.rebase = function(composite) {
        var objects = Composite.allBodies(composite)
                        .concat(Composite.allConstraints(composite))
                        .concat(Composite.allComposites(composite));

        for (var i = 0; i < objects.length; i++) {
            objects[i].id = Common.nextId();
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Translates all children in the composite by a given vector relative to their current positions, 
     * without imparting any velocity.
     * @method translate
     * @param {composite} composite
     * @param {vector} translation
     * @param {bool} [recursive=true]
     */
    Composite.translate = function(composite, translation, recursive) {
        var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            Body.translate(bodies[i], translation);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
     * @method rotate
     * @param {composite} composite
     * @param {number} rotation
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.rotate = function(composite, rotation, point, recursive) {
        var cos = Math.cos(rotation),
            sin = Math.sin(rotation),
            bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            });

            Body.rotate(body, rotation);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
     * @method scale
     * @param {composite} composite
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
        var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + dx * scaleX,
                y: point.y + dy * scaleY
            });

            Body.scale(body, scaleX, scaleY);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Returns the union of the bounds of all of the composite's bodies.
     * @method bounds
     * @param {composite} composite The composite.
     * @returns {bounds} The composite bounds.
     */
    Composite.bounds = function(composite) {
        var bodies = Matter.Composite.allBodies(composite),
            vertices = [];

        for (var i = 0; i < bodies.length; i += 1) {
            var body = bodies[i];
            vertices.push(body.bounds.min, body.bounds.max);
        }

        return Matter.Bounds.create(vertices);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a call to `Composite.add` is made, before objects have been added.
    *
    * @event beforeAdd
    * @param {} event An event object
    * @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.add` is made, after objects have been added.
    *
    * @event afterAdd
    * @param {} event An event object
    * @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.remove` is made, before objects have been removed.
    *
    * @event beforeRemove
    * @param {} event An event object
    * @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.remove` is made, after objects have been removed.
    *
    * @event afterRemove
    * @param {} event An event object
    * @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "composite"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage composites.
     *
     * @property label
     * @type string
     * @default "Composite"
     */

    /**
     * A flag that specifies whether the composite has been modified during the current step.
     * Most `Matter.Composite` methods will automatically set this flag to `true` to inform the engine of changes to be handled.
     * If you need to change it manually, you should use the `Composite.setModified` method.
     *
     * @property isModified
     * @type boolean
     * @default false
     */

    /**
     * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
     *
     * @property parent
     * @type composite
     * @default null
     */

    /**
     * An array of `Body` that are _direct_ children of this composite.
     * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
     *
     * @property bodies
     * @type body[]
     * @default []
     */

    /**
     * An array of `Constraint` that are _direct_ children of this composite.
     * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
     *
     * @property constraints
     * @type constraint[]
     * @default []
     */

    /**
     * An array of `Composite` that are _direct_ children of this composite.
     * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
     *
     * @property composites
     * @type composite[]
     * @default []
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

})();

},{"../core/Common":14,"../core/Events":16,"./Body":1}],3:[function(_dereq_,module,exports){
/**
* The `Matter.World` module contains methods for creating and manipulating the world composite.
* A `Matter.World` is a `Matter.Composite` body, which is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`.
* A `Matter.World` has a few additional properties including `gravity` and `bounds`.
* It is important to use the functions in the `Matter.Composite` module to modify the world composite, rather than directly modifying its properties.
* There are also a few methods here that alias those in `Matter.Composite` for easier readability.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class World
* @extends Composite
*/

var World = {};

module.exports = World;

var Composite = _dereq_('./Composite');
var Constraint = _dereq_('../constraint/Constraint');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a new world composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @constructor
     * @param {} options
     * @return {world} A new world
     */
    World.create = function(options) {
        var composite = Composite.create();

        var defaults = {
            label: 'World',
            gravity: {
                x: 0,
                y: 1,
                scale: 0.001
            },
            bounds: { 
                min: { x: -Infinity, y: -Infinity }, 
                max: { x: Infinity, y: Infinity } 
            }
        };
        
        return Common.extend(composite, defaults, options);
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * The gravity to apply on the world.
     *
     * @property gravity
     * @type object
     */

    /**
     * The gravity x component.
     *
     * @property gravity.x
     * @type object
     * @default 0
     */

    /**
     * The gravity y component.
     *
     * @property gravity.y
     * @type object
     * @default 1
     */

    /**
     * The gravity scale factor.
     *
     * @property gravity.scale
     * @type object
     * @default 0.001
     */

    /**
     * A `Bounds` object that defines the world bounds for collision detection.
     *
     * @property bounds
     * @type bounds
     * @default { min: { x: -Infinity, y: -Infinity }, max: { x: Infinity, y: Infinity } }
     */

    // World is a Composite body
    // see src/module/Outro.js for these aliases:
    
    /**
     * An alias for Composite.add
     * @method add
     * @param {world} world
     * @param {} object
     * @return {composite} The original world with the objects added
     */

    /**
     * An alias for Composite.remove
     * @method remove
     * @param {world} world
     * @param {} object
     * @param {boolean} [deep=false]
     * @return {composite} The original world with the objects removed
     */

    /**
     * An alias for Composite.clear
     * @method clear
     * @param {world} world
     * @param {boolean} keepStatic
     */

    /**
     * An alias for Composite.addComposite
     * @method addComposite
     * @param {world} world
     * @param {composite} composite
     * @return {world} The original world with the objects from composite added
     */
    
     /**
      * An alias for Composite.addBody
      * @method addBody
      * @param {world} world
      * @param {body} body
      * @return {world} The original world with the body added
      */

     /**
      * An alias for Composite.addConstraint
      * @method addConstraint
      * @param {world} world
      * @param {constraint} constraint
      * @return {world} The original world with the constraint added
      */

})();

},{"../constraint/Constraint":12,"../core/Common":14,"./Composite":2}],4:[function(_dereq_,module,exports){
/**
* The `Matter.Contact` module contains methods for creating and manipulating collision contacts.
*
* @class Contact
*/

var Contact = {};

module.exports = Contact;

(function() {

    /**
     * Creates a new contact.
     * @method create
     * @param {vertex} vertex
     * @return {contact} A new contact
     */
    Contact.create = function(vertex) {
        return {
            id: Contact.id(vertex),
            vertex: vertex,
            normalImpulse: 0,
            tangentImpulse: 0
        };
    };
    
    /**
     * Generates a contact id.
     * @method id
     * @param {vertex} vertex
     * @return {string} Unique contactID
     */
    Contact.id = function(vertex) {
        return vertex.body.id + '_' + vertex.index;
    };

})();

},{}],5:[function(_dereq_,module,exports){
/**
* The `Matter.Detector` module contains methods for detecting collisions given a set of pairs.
*
* @class Detector
*/

// TODO: speculative contacts

var Detector = {};

module.exports = Detector;

var SAT = _dereq_('./SAT');
var Pair = _dereq_('./Pair');
var Bounds = _dereq_('../geometry/Bounds');

(function() {

    /**
     * Finds all collisions given a list of pairs.
     * @method collisions
     * @param {pair[]} broadphasePairs
     * @param {engine} engine
     * @return {array} collisions
     */
    Detector.collisions = function(broadphasePairs, engine) {
        var collisions = [],
            pairsTable = engine.pairs.table;

        
        for (var i = 0; i < broadphasePairs.length; i++) {
            var bodyA = broadphasePairs[i][0], 
                bodyB = broadphasePairs[i][1];

            if ((bodyA.isStatic || bodyA.isSleeping) && (bodyB.isStatic || bodyB.isSleeping))
                continue;
            
            if (!Detector.canCollide(bodyA.collisionFilter, bodyB.collisionFilter))
                continue;


            // mid phase
            if (Bounds.overlaps(bodyA.bounds, bodyB.bounds)) {
                for (var j = bodyA.parts.length > 1 ? 1 : 0; j < bodyA.parts.length; j++) {
                    var partA = bodyA.parts[j];

                    for (var k = bodyB.parts.length > 1 ? 1 : 0; k < bodyB.parts.length; k++) {
                        var partB = bodyB.parts[k];

                        if ((partA === bodyA && partB === bodyB) || Bounds.overlaps(partA.bounds, partB.bounds)) {
                            // find a previous collision we could reuse
                            var pairId = Pair.id(partA, partB),
                                pair = pairsTable[pairId],
                                previousCollision;

                            if (pair && pair.isActive) {
                                previousCollision = pair.collision;
                            } else {
                                previousCollision = null;
                            }

                            // narrow phase
                            var collision = SAT.collides(partA, partB, previousCollision);


                            if (collision.collided) {
                                collisions.push(collision);
                            }
                        }
                    }
                }
            }
        }

        return collisions;
    };

    /**
     * Returns `true` if both supplied collision filters will allow a collision to occur.
     * See `body.collisionFilter` for more information.
     * @method canCollide
     * @param {} filterA
     * @param {} filterB
     * @return {bool} `true` if collision can occur
     */
    Detector.canCollide = function(filterA, filterB) {
        if (filterA.group === filterB.group && filterA.group !== 0)
            return filterA.group > 0;

        return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
    };

})();

},{"../geometry/Bounds":26,"./Pair":7,"./SAT":11}],6:[function(_dereq_,module,exports){
/**
* The `Matter.Grid` module contains methods for creating and manipulating collision broadphase grid structures.
*
* @class Grid
*/

var Grid = {};

module.exports = Grid;

var Pair = _dereq_('./Pair');
var Detector = _dereq_('./Detector');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a new grid.
     * @method create
     * @param {} options
     * @return {grid} A new grid
     */
    Grid.create = function(options) {
        var defaults = {
            controller: Grid,
            detector: Detector.collisions,
            buckets: {},
            pairs: {},
            pairsList: [],
            bucketWidth: 48,
            bucketHeight: 48
        };

        return Common.extend(defaults, options);
    };

    /**
     * The width of a single grid bucket.
     *
     * @property bucketWidth
     * @type number
     * @default 48
     */

    /**
     * The height of a single grid bucket.
     *
     * @property bucketHeight
     * @type number
     * @default 48
     */

    /**
     * Updates the grid.
     * @method update
     * @param {grid} grid
     * @param {body[]} bodies
     * @param {engine} engine
     * @param {boolean} forceUpdate
     */
    Grid.update = function(grid, bodies, engine, forceUpdate) {
        var i, col, row,
            world = engine.world,
            buckets = grid.buckets,
            bucket,
            bucketId,
            gridChanged = false;


        for (i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isSleeping && !forceUpdate)
                continue;

            // don't update out of world bodies
            if (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x
                || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y)
                continue;

            var newRegion = Grid._getRegion(grid, body);

            // if the body has changed grid region
            if (!body.region || newRegion.id !== body.region.id || forceUpdate) {


                if (!body.region || forceUpdate)
                    body.region = newRegion;

                var union = Grid._regionUnion(newRegion, body.region);

                // update grid buckets affected by region change
                // iterate over the union of both regions
                for (col = union.startCol; col <= union.endCol; col++) {
                    for (row = union.startRow; row <= union.endRow; row++) {
                        bucketId = Grid._getBucketId(col, row);
                        bucket = buckets[bucketId];

                        var isInsideNewRegion = (col >= newRegion.startCol && col <= newRegion.endCol
                                                && row >= newRegion.startRow && row <= newRegion.endRow);

                        var isInsideOldRegion = (col >= body.region.startCol && col <= body.region.endCol
                                                && row >= body.region.startRow && row <= body.region.endRow);

                        // remove from old region buckets
                        if (!isInsideNewRegion && isInsideOldRegion) {
                            if (isInsideOldRegion) {
                                if (bucket)
                                    Grid._bucketRemoveBody(grid, bucket, body);
                            }
                        }

                        // add to new region buckets
                        if (body.region === newRegion || (isInsideNewRegion && !isInsideOldRegion) || forceUpdate) {
                            if (!bucket)
                                bucket = Grid._createBucket(buckets, bucketId);
                            Grid._bucketAddBody(grid, bucket, body);
                        }
                    }
                }

                // set the new region
                body.region = newRegion;

                // flag changes so we can update pairs
                gridChanged = true;
            }
        }

        // update pairs list only if pairs changed (i.e. a body changed region)
        if (gridChanged)
            grid.pairsList = Grid._createActivePairsList(grid);
    };

    /**
     * Clears the grid.
     * @method clear
     * @param {grid} grid
     */
    Grid.clear = function(grid) {
        grid.buckets = {};
        grid.pairs = {};
        grid.pairsList = [];
    };

    /**
     * Finds the union of two regions.
     * @method _regionUnion
     * @private
     * @param {} regionA
     * @param {} regionB
     * @return {} region
     */
    Grid._regionUnion = function(regionA, regionB) {
        var startCol = Math.min(regionA.startCol, regionB.startCol),
            endCol = Math.max(regionA.endCol, regionB.endCol),
            startRow = Math.min(regionA.startRow, regionB.startRow),
            endRow = Math.max(regionA.endRow, regionB.endRow);

        return Grid._createRegion(startCol, endCol, startRow, endRow);
    };

    /**
     * Gets the region a given body falls in for a given grid.
     * @method _getRegion
     * @private
     * @param {} grid
     * @param {} body
     * @return {} region
     */
    Grid._getRegion = function(grid, body) {
        var bounds = body.bounds,
            startCol = Math.floor(bounds.min.x / grid.bucketWidth),
            endCol = Math.floor(bounds.max.x / grid.bucketWidth),
            startRow = Math.floor(bounds.min.y / grid.bucketHeight),
            endRow = Math.floor(bounds.max.y / grid.bucketHeight);

        return Grid._createRegion(startCol, endCol, startRow, endRow);
    };

    /**
     * Creates a region.
     * @method _createRegion
     * @private
     * @param {} startCol
     * @param {} endCol
     * @param {} startRow
     * @param {} endRow
     * @return {} region
     */
    Grid._createRegion = function(startCol, endCol, startRow, endRow) {
        return { 
            id: startCol + ',' + endCol + ',' + startRow + ',' + endRow,
            startCol: startCol, 
            endCol: endCol, 
            startRow: startRow, 
            endRow: endRow 
        };
    };

    /**
     * Gets the bucket id at the given position.
     * @method _getBucketId
     * @private
     * @param {} column
     * @param {} row
     * @return {string} bucket id
     */
    Grid._getBucketId = function(column, row) {
        return 'C' + column + 'R' + row;
    };

    /**
     * Creates a bucket.
     * @method _createBucket
     * @private
     * @param {} buckets
     * @param {} bucketId
     * @return {} bucket
     */
    Grid._createBucket = function(buckets, bucketId) {
        var bucket = buckets[bucketId] = [];
        return bucket;
    };

    /**
     * Adds a body to a bucket.
     * @method _bucketAddBody
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */
    Grid._bucketAddBody = function(grid, bucket, body) {
        // add new pairs
        for (var i = 0; i < bucket.length; i++) {
            var bodyB = bucket[i];

            if (body.id === bodyB.id || (body.isStatic && bodyB.isStatic))
                continue;

            // keep track of the number of buckets the pair exists in
            // important for Grid.update to work
            var pairId = Pair.id(body, bodyB),
                pair = grid.pairs[pairId];

            if (pair) {
                pair[2] += 1;
            } else {
                grid.pairs[pairId] = [body, bodyB, 1];
            }
        }

        // add to bodies (after pairs, otherwise pairs with self)
        bucket.push(body);
    };

    /**
     * Removes a body from a bucket.
     * @method _bucketRemoveBody
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */
    Grid._bucketRemoveBody = function(grid, bucket, body) {
        // remove from bucket
        bucket.splice(Common.indexOf(bucket, body), 1);

        // update pair counts
        for (var i = 0; i < bucket.length; i++) {
            // keep track of the number of buckets the pair exists in
            // important for _createActivePairsList to work
            var bodyB = bucket[i],
                pairId = Pair.id(body, bodyB),
                pair = grid.pairs[pairId];

            if (pair)
                pair[2] -= 1;
        }
    };

    /**
     * Generates a list of the active pairs in the grid.
     * @method _createActivePairsList
     * @private
     * @param {} grid
     * @return [] pairs
     */
    Grid._createActivePairsList = function(grid) {
        var pairKeys,
            pair,
            pairs = [];

        // grid.pairs is used as a hashmap
        pairKeys = Common.keys(grid.pairs);

        // iterate over grid.pairs
        for (var k = 0; k < pairKeys.length; k++) {
            pair = grid.pairs[pairKeys[k]];

            // if pair exists in at least one bucket
            // it is a pair that needs further collision testing so push it
            if (pair[2] > 0) {
                pairs.push(pair);
            } else {
                delete grid.pairs[pairKeys[k]];
            }
        }

        return pairs;
    };
    
})();

},{"../core/Common":14,"./Detector":5,"./Pair":7}],7:[function(_dereq_,module,exports){
/**
* The `Matter.Pair` module contains methods for creating and manipulating collision pairs.
*
* @class Pair
*/

var Pair = {};

module.exports = Pair;

var Contact = _dereq_('./Contact');

(function() {
    
    /**
     * Creates a pair.
     * @method create
     * @param {collision} collision
     * @param {number} timestamp
     * @return {pair} A new pair
     */
    Pair.create = function(collision, timestamp) {
        var bodyA = collision.bodyA,
            bodyB = collision.bodyB,
            parentA = collision.parentA,
            parentB = collision.parentB;

        var pair = {
            id: Pair.id(bodyA, bodyB),
            bodyA: bodyA,
            bodyB: bodyB,
            contacts: {},
            activeContacts: [],
            separation: 0,
            isActive: true,
            isSensor: bodyA.isSensor || bodyB.isSensor,
            timeCreated: timestamp,
            timeUpdated: timestamp,
            inverseMass: parentA.inverseMass + parentB.inverseMass,
            friction: Math.min(parentA.friction, parentB.friction),
            frictionStatic: Math.max(parentA.frictionStatic, parentB.frictionStatic),
            restitution: Math.max(parentA.restitution, parentB.restitution),
            slop: Math.max(parentA.slop, parentB.slop)
        };

        Pair.update(pair, collision, timestamp);

        return pair;
    };

    /**
     * Updates a pair given a collision.
     * @method update
     * @param {pair} pair
     * @param {collision} collision
     * @param {number} timestamp
     */
    Pair.update = function(pair, collision, timestamp) {
        var contacts = pair.contacts,
            supports = collision.supports,
            activeContacts = pair.activeContacts,
            parentA = collision.parentA,
            parentB = collision.parentB;
        
        pair.collision = collision;
        pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
        pair.friction = Math.min(parentA.friction, parentB.friction);
        pair.frictionStatic = Math.max(parentA.frictionStatic, parentB.frictionStatic);
        pair.restitution = Math.max(parentA.restitution, parentB.restitution);
        pair.slop = Math.max(parentA.slop, parentB.slop);
        activeContacts.length = 0;
        
        if (collision.collided) {
            for (var i = 0; i < supports.length; i++) {
                var support = supports[i],
                    contactId = Contact.id(support),
                    contact = contacts[contactId];

                if (contact) {
                    activeContacts.push(contact);
                } else {
                    activeContacts.push(contacts[contactId] = Contact.create(support));
                }
            }

            pair.separation = collision.depth;
            Pair.setActive(pair, true, timestamp);
        } else {
            if (pair.isActive === true)
                Pair.setActive(pair, false, timestamp);
        }
    };
    
    /**
     * Set a pair as active or inactive.
     * @method setActive
     * @param {pair} pair
     * @param {bool} isActive
     * @param {number} timestamp
     */
    Pair.setActive = function(pair, isActive, timestamp) {
        if (isActive) {
            pair.isActive = true;
            pair.timeUpdated = timestamp;
        } else {
            pair.isActive = false;
            pair.activeContacts.length = 0;
        }
    };

    /**
     * Get the id for the given pair.
     * @method id
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {string} Unique pairId
     */
    Pair.id = function(bodyA, bodyB) {
        if (bodyA.id < bodyB.id) {
            return 'A' + bodyA.id + 'B' + bodyB.id;
        } else {
            return 'A' + bodyB.id + 'B' + bodyA.id;
        }
    };

})();

},{"./Contact":4}],8:[function(_dereq_,module,exports){
/**
* The `Matter.Pairs` module contains methods for creating and manipulating collision pair sets.
*
* @class Pairs
*/

var Pairs = {};

module.exports = Pairs;

var Pair = _dereq_('./Pair');
var Common = _dereq_('../core/Common');

(function() {
    
    Pairs._pairMaxIdleLife = 1000;

    /**
     * Creates a new pairs structure.
     * @method create
     * @param {object} options
     * @return {pairs} A new pairs structure
     */
    Pairs.create = function(options) {
        return Common.extend({ 
            table: {},
            list: [],
            collisionStart: [],
            collisionActive: [],
            collisionEnd: []
        }, options);
    };

    /**
     * Updates pairs given a list of collisions.
     * @method update
     * @param {object} pairs
     * @param {collision[]} collisions
     * @param {number} timestamp
     */
    Pairs.update = function(pairs, collisions, timestamp) {
        var pairsList = pairs.list,
            pairsTable = pairs.table,
            collisionStart = pairs.collisionStart,
            collisionEnd = pairs.collisionEnd,
            collisionActive = pairs.collisionActive,
            activePairIds = [],
            collision,
            pairId,
            pair,
            i;

        // clear collision state arrays, but maintain old reference
        collisionStart.length = 0;
        collisionEnd.length = 0;
        collisionActive.length = 0;

        for (i = 0; i < collisions.length; i++) {
            collision = collisions[i];

            if (collision.collided) {
                pairId = Pair.id(collision.bodyA, collision.bodyB);
                activePairIds.push(pairId);

                pair = pairsTable[pairId];
                
                if (pair) {
                    // pair already exists (but may or may not be active)
                    if (pair.isActive) {
                        // pair exists and is active
                        collisionActive.push(pair);
                    } else {
                        // pair exists but was inactive, so a collision has just started again
                        collisionStart.push(pair);
                    }

                    // update the pair
                    Pair.update(pair, collision, timestamp);
                } else {
                    // pair did not exist, create a new pair
                    pair = Pair.create(collision, timestamp);
                    pairsTable[pairId] = pair;

                    // push the new pair
                    collisionStart.push(pair);
                    pairsList.push(pair);
                }
            }
        }

        // deactivate previously active pairs that are now inactive
        for (i = 0; i < pairsList.length; i++) {
            pair = pairsList[i];
            if (pair.isActive && Common.indexOf(activePairIds, pair.id) === -1) {
                Pair.setActive(pair, false, timestamp);
                collisionEnd.push(pair);
            }
        }
    };
    
    /**
     * Finds and removes pairs that have been inactive for a set amount of time.
     * @method removeOld
     * @param {object} pairs
     * @param {number} timestamp
     */
    Pairs.removeOld = function(pairs, timestamp) {
        var pairsList = pairs.list,
            pairsTable = pairs.table,
            indexesToRemove = [],
            pair,
            collision,
            pairIndex,
            i;

        for (i = 0; i < pairsList.length; i++) {
            pair = pairsList[i];
            collision = pair.collision;
            
            // never remove sleeping pairs
            if (collision.bodyA.isSleeping || collision.bodyB.isSleeping) {
                pair.timeUpdated = timestamp;
                continue;
            }

            // if pair is inactive for too long, mark it to be removed
            if (timestamp - pair.timeUpdated > Pairs._pairMaxIdleLife) {
                indexesToRemove.push(i);
            }
        }

        // remove marked pairs
        for (i = 0; i < indexesToRemove.length; i++) {
            pairIndex = indexesToRemove[i] - i;
            pair = pairsList[pairIndex];
            delete pairsTable[pair.id];
            pairsList.splice(pairIndex, 1);
        }
    };

    /**
     * Clears the given pairs structure.
     * @method clear
     * @param {pairs} pairs
     * @return {pairs} pairs
     */
    Pairs.clear = function(pairs) {
        pairs.table = {};
        pairs.list.length = 0;
        pairs.collisionStart.length = 0;
        pairs.collisionActive.length = 0;
        pairs.collisionEnd.length = 0;
        return pairs;
    };

})();

},{"../core/Common":14,"./Pair":7}],9:[function(_dereq_,module,exports){
/**
* The `Matter.Query` module contains methods for performing collision queries.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Query
*/

var Query = {};

module.exports = Query;

var Vector = _dereq_('../geometry/Vector');
var SAT = _dereq_('./SAT');
var Bounds = _dereq_('../geometry/Bounds');
var Bodies = _dereq_('../factory/Bodies');
var Vertices = _dereq_('../geometry/Vertices');

(function() {

    /**
     * Returns a list of collisions between `body` and `bodies`.
     * @method collides
     * @param {body} body
     * @param {body[]} bodies
     * @return {object[]} Collisions
     */
    Query.collides = function(body, bodies) {
        var collisions = [];

        for (var i = 0; i < bodies.length; i++) {
            var bodyA = bodies[i];
            
            if (Bounds.overlaps(bodyA.bounds, body.bounds)) {
                for (var j = bodyA.parts.length === 1 ? 0 : 1; j < bodyA.parts.length; j++) {
                    var part = bodyA.parts[j];

                    if (Bounds.overlaps(part.bounds, body.bounds)) {
                        var collision = SAT.collides(part, body);

                        if (collision.collided) {
                            collisions.push(collision);
                            break;
                        }
                    }
                }
            }
        }

        return collisions;
    };

    /**
     * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
     * @method ray
     * @param {body[]} bodies
     * @param {vector} startPoint
     * @param {vector} endPoint
     * @param {number} [rayWidth]
     * @return {object[]} Collisions
     */
    Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
        rayWidth = rayWidth || 1e-100;

        var rayAngle = Vector.angle(startPoint, endPoint),
            rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)),
            rayX = (endPoint.x + startPoint.x) * 0.5,
            rayY = (endPoint.y + startPoint.y) * 0.5,
            ray = Bodies.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }),
            collisions = Query.collides(ray, bodies);

        for (var i = 0; i < collisions.length; i += 1) {
            var collision = collisions[i];
            collision.body = collision.bodyB = collision.bodyA;            
        }

        return collisions;
    };

    /**
     * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
     * @method region
     * @param {body[]} bodies
     * @param {bounds} bounds
     * @param {bool} [outside=false]
     * @return {body[]} The bodies matching the query
     */
    Query.region = function(bodies, bounds, outside) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                overlaps = Bounds.overlaps(body.bounds, bounds);
            if ((overlaps && !outside) || (!overlaps && outside))
                result.push(body);
        }

        return result;
    };

    /**
     * Returns all bodies whose vertices contain the given point, from the given set of bodies.
     * @method point
     * @param {body[]} bodies
     * @param {vector} point
     * @return {body[]} The bodies matching the query
     */
    Query.point = function(bodies, point) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            
            if (Bounds.contains(body.bounds, point)) {
                for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
                    var part = body.parts[j];

                    if (Bounds.contains(part.bounds, point)
                        && Vertices.contains(part.vertices, point)) {
                        result.push(body);
                        break;
                    }
                }
            }
        }

        return result;
    };

})();

},{"../factory/Bodies":23,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"./SAT":11}],10:[function(_dereq_,module,exports){
/**
* The `Matter.Resolver` module contains methods for resolving collision pairs.
*
* @class Resolver
*/

var Resolver = {};

module.exports = Resolver;

var Vertices = _dereq_('../geometry/Vertices');
var Vector = _dereq_('../geometry/Vector');
var Common = _dereq_('../core/Common');
var Bounds = _dereq_('../geometry/Bounds');

(function() {

    Resolver._restingThresh = 4;
    Resolver._restingThreshTangent = 6;
    Resolver._positionDampen = 0.9;
    Resolver._positionWarming = 0.8;
    Resolver._frictionNormalMultiplier = 5;

    /**
     * Prepare pairs for position solving.
     * @method preSolvePosition
     * @param {pair[]} pairs
     */
    Resolver.preSolvePosition = function(pairs) {
        var i,
            pair,
            activeCount;

        // find total contacts on each body
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive)
                continue;
            
            activeCount = pair.activeContacts.length;
            pair.collision.parentA.totalContacts += activeCount;
            pair.collision.parentB.totalContacts += activeCount;
        }
    };

    /**
     * Find a solution for pair positions.
     * @method solvePosition
     * @param {pair[]} pairs
     * @param {number} timeScale
     */
    Resolver.solvePosition = function(pairs, timeScale) {
        var i,
            pair,
            collision,
            bodyA,
            bodyB,
            normal,
            bodyBtoA,
            contactShare,
            positionImpulse,
            contactCount = {},
            tempA = Vector._temp[0],
            tempB = Vector._temp[1],
            tempC = Vector._temp[2],
            tempD = Vector._temp[3];

        // find impulses required to resolve penetration
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive || pair.isSensor)
                continue;

            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;

            // get current separation between body edges involved in collision
            bodyBtoA = Vector.sub(Vector.add(bodyB.positionImpulse, bodyB.position, tempA), 
                                    Vector.add(bodyA.positionImpulse, 
                                        Vector.sub(bodyB.position, collision.penetration, tempB), tempC), tempD);

            pair.separation = Vector.dot(normal, bodyBtoA);
        }
        
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive || pair.isSensor)
                continue;
            
            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;
            positionImpulse = (pair.separation - pair.slop) * timeScale;

            if (bodyA.isStatic || bodyB.isStatic)
                positionImpulse *= 2;
            
            if (!(bodyA.isStatic || bodyA.isSleeping)) {
                contactShare = Resolver._positionDampen / bodyA.totalContacts;
                bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
            }

            if (!(bodyB.isStatic || bodyB.isSleeping)) {
                contactShare = Resolver._positionDampen / bodyB.totalContacts;
                bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
            }
        }
    };

    /**
     * Apply position resolution.
     * @method postSolvePosition
     * @param {body[]} bodies
     */
    Resolver.postSolvePosition = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            // reset contact count
            body.totalContacts = 0;

            if (body.positionImpulse.x !== 0 || body.positionImpulse.y !== 0) {
                // update body geometry
                for (var j = 0; j < body.parts.length; j++) {
                    var part = body.parts[j];
                    Vertices.translate(part.vertices, body.positionImpulse);
                    Bounds.update(part.bounds, part.vertices, body.velocity);
                    part.position.x += body.positionImpulse.x;
                    part.position.y += body.positionImpulse.y;
                }

                // move the body without changing velocity
                body.positionPrev.x += body.positionImpulse.x;
                body.positionPrev.y += body.positionImpulse.y;

                if (Vector.dot(body.positionImpulse, body.velocity) < 0) {
                    // reset cached impulse if the body has velocity along it
                    body.positionImpulse.x = 0;
                    body.positionImpulse.y = 0;
                } else {
                    // warm the next iteration
                    body.positionImpulse.x *= Resolver._positionWarming;
                    body.positionImpulse.y *= Resolver._positionWarming;
                }
            }
        }
    };

    /**
     * Prepare pairs for velocity solving.
     * @method preSolveVelocity
     * @param {pair[]} pairs
     */
    Resolver.preSolveVelocity = function(pairs) {
        var i,
            j,
            pair,
            contacts,
            collision,
            bodyA,
            bodyB,
            normal,
            tangent,
            contact,
            contactVertex,
            normalImpulse,
            tangentImpulse,
            offset,
            impulse = Vector._temp[0],
            tempA = Vector._temp[1];
        
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive || pair.isSensor)
                continue;
            
            contacts = pair.activeContacts;
            collision = pair.collision;
            bodyA = collision.parentA;
            bodyB = collision.parentB;
            normal = collision.normal;
            tangent = collision.tangent;

            // resolve each contact
            for (j = 0; j < contacts.length; j++) {
                contact = contacts[j];
                contactVertex = contact.vertex;
                normalImpulse = contact.normalImpulse;
                tangentImpulse = contact.tangentImpulse;

                if (normalImpulse !== 0 || tangentImpulse !== 0) {
                    // total impulse from contact
                    impulse.x = (normal.x * normalImpulse) + (tangent.x * tangentImpulse);
                    impulse.y = (normal.y * normalImpulse) + (tangent.y * tangentImpulse);
                    
                    // apply impulse from contact
                    if (!(bodyA.isStatic || bodyA.isSleeping)) {
                        offset = Vector.sub(contactVertex, bodyA.position, tempA);
                        bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                        bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                        bodyA.anglePrev += Vector.cross(offset, impulse) * bodyA.inverseInertia;
                    }

                    if (!(bodyB.isStatic || bodyB.isSleeping)) {
                        offset = Vector.sub(contactVertex, bodyB.position, tempA);
                        bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                        bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                        bodyB.anglePrev -= Vector.cross(offset, impulse) * bodyB.inverseInertia;
                    }
                }
            }
        }
    };

    /**
     * Find a solution for pair velocities.
     * @method solveVelocity
     * @param {pair[]} pairs
     * @param {number} timeScale
     */
    Resolver.solveVelocity = function(pairs, timeScale) {
        var timeScaleSquared = timeScale * timeScale,
            impulse = Vector._temp[0],
            tempA = Vector._temp[1],
            tempB = Vector._temp[2],
            tempC = Vector._temp[3],
            tempD = Vector._temp[4],
            tempE = Vector._temp[5];
        
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            
            if (!pair.isActive || pair.isSensor)
                continue;
            
            var collision = pair.collision,
                bodyA = collision.parentA,
                bodyB = collision.parentB,
                normal = collision.normal,
                tangent = collision.tangent,
                contacts = pair.activeContacts,
                contactShare = 1 / contacts.length;

            // update body velocities
            bodyA.velocity.x = bodyA.position.x - bodyA.positionPrev.x;
            bodyA.velocity.y = bodyA.position.y - bodyA.positionPrev.y;
            bodyB.velocity.x = bodyB.position.x - bodyB.positionPrev.x;
            bodyB.velocity.y = bodyB.position.y - bodyB.positionPrev.y;
            bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
            bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;

            // resolve each contact
            for (var j = 0; j < contacts.length; j++) {
                var contact = contacts[j],
                    contactVertex = contact.vertex,
                    offsetA = Vector.sub(contactVertex, bodyA.position, tempA),
                    offsetB = Vector.sub(contactVertex, bodyB.position, tempB),
                    velocityPointA = Vector.add(bodyA.velocity, Vector.mult(Vector.perp(offsetA), bodyA.angularVelocity), tempC),
                    velocityPointB = Vector.add(bodyB.velocity, Vector.mult(Vector.perp(offsetB), bodyB.angularVelocity), tempD), 
                    relativeVelocity = Vector.sub(velocityPointA, velocityPointB, tempE),
                    normalVelocity = Vector.dot(normal, relativeVelocity);

                var tangentVelocity = Vector.dot(tangent, relativeVelocity),
                    tangentSpeed = Math.abs(tangentVelocity),
                    tangentVelocityDirection = Common.sign(tangentVelocity);

                // raw impulses
                var normalImpulse = (1 + pair.restitution) * normalVelocity,
                    normalForce = Common.clamp(pair.separation + normalVelocity, 0, 1) * Resolver._frictionNormalMultiplier;

                // coulomb friction
                var tangentImpulse = tangentVelocity,
                    maxFriction = Infinity;

                if (tangentSpeed > pair.friction * pair.frictionStatic * normalForce * timeScaleSquared) {
                    maxFriction = tangentSpeed;
                    tangentImpulse = Common.clamp(
                        pair.friction * tangentVelocityDirection * timeScaleSquared,
                        -maxFriction, maxFriction
                    );
                }

                // modify impulses accounting for mass, inertia and offset
                var oAcN = Vector.cross(offsetA, normal),
                    oBcN = Vector.cross(offsetB, normal),
                    share = contactShare / (bodyA.inverseMass + bodyB.inverseMass + bodyA.inverseInertia * oAcN * oAcN  + bodyB.inverseInertia * oBcN * oBcN);

                normalImpulse *= share;
                tangentImpulse *= share;

                // handle high velocity and resting collisions separately
                if (normalVelocity < 0 && normalVelocity * normalVelocity > Resolver._restingThresh * timeScaleSquared) {
                    // high normal velocity so clear cached contact normal impulse
                    contact.normalImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)
                    // impulse constraint tends to 0
                    var contactNormalImpulse = contact.normalImpulse;
                    contact.normalImpulse = Math.min(contact.normalImpulse + normalImpulse, 0);
                    normalImpulse = contact.normalImpulse - contactNormalImpulse;
                }

                // handle high velocity and resting collisions separately
                if (tangentVelocity * tangentVelocity > Resolver._restingThreshTangent * timeScaleSquared) {
                    // high tangent velocity so clear cached contact tangent impulse
                    contact.tangentImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)
                    // tangent impulse tends to -tangentSpeed or +tangentSpeed
                    var contactTangentImpulse = contact.tangentImpulse;
                    contact.tangentImpulse = Common.clamp(contact.tangentImpulse + tangentImpulse, -maxFriction, maxFriction);
                    tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                }

                // total impulse from contact
                impulse.x = (normal.x * normalImpulse) + (tangent.x * tangentImpulse);
                impulse.y = (normal.y * normalImpulse) + (tangent.y * tangentImpulse);
                
                // apply impulse from contact
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                    bodyA.anglePrev += Vector.cross(offsetA, impulse) * bodyA.inverseInertia;
                }

                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                    bodyB.anglePrev -= Vector.cross(offsetB, impulse) * bodyB.inverseInertia;
                }
            }
        }
    };

})();

},{"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],11:[function(_dereq_,module,exports){
/**
* The `Matter.SAT` module contains methods for detecting collisions using the Separating Axis Theorem.
*
* @class SAT
*/

// TODO: true circles and curves

var SAT = {};

module.exports = SAT;

var Vertices = _dereq_('../geometry/Vertices');
var Vector = _dereq_('../geometry/Vector');

(function() {

    /**
     * Detect collision between two bodies using the Separating Axis Theorem.
     * @method collides
     * @param {body} bodyA
     * @param {body} bodyB
     * @param {collision} previousCollision
     * @return {collision} collision
     */
    SAT.collides = function(bodyA, bodyB, previousCollision) {
        var overlapAB,
            overlapBA, 
            minOverlap,
            collision,
            canReusePrevCol = false;

        if (previousCollision) {
            // estimate total motion
            var parentA = bodyA.parent,
                parentB = bodyB.parent,
                motion = parentA.speed * parentA.speed + parentA.angularSpeed * parentA.angularSpeed
                       + parentB.speed * parentB.speed + parentB.angularSpeed * parentB.angularSpeed;

            // we may be able to (partially) reuse collision result 
            // but only safe if collision was resting
            canReusePrevCol = previousCollision && previousCollision.collided && motion < 0.2;

            // reuse collision object
            collision = previousCollision;
        } else {
            collision = { collided: false, bodyA: bodyA, bodyB: bodyB };
        }

        if (previousCollision && canReusePrevCol) {
            // if we can reuse the collision result
            // we only need to test the previously found axis
            var axisBodyA = collision.axisBody,
                axisBodyB = axisBodyA === bodyA ? bodyB : bodyA,
                axes = [axisBodyA.axes[previousCollision.axisNumber]];

            minOverlap = SAT._overlapAxes(axisBodyA.vertices, axisBodyB.vertices, axes);
            collision.reused = true;

            if (minOverlap.overlap <= 0) {
                collision.collided = false;
                return collision;
            }
        } else {
            // if we can't reuse a result, perform a full SAT test

            overlapAB = SAT._overlapAxes(bodyA.vertices, bodyB.vertices, bodyA.axes);

            if (overlapAB.overlap <= 0) {
                collision.collided = false;
                return collision;
            }

            overlapBA = SAT._overlapAxes(bodyB.vertices, bodyA.vertices, bodyB.axes);

            if (overlapBA.overlap <= 0) {
                collision.collided = false;
                return collision;
            }

            if (overlapAB.overlap < overlapBA.overlap) {
                minOverlap = overlapAB;
                collision.axisBody = bodyA;
            } else {
                minOverlap = overlapBA;
                collision.axisBody = bodyB;
            }

            // important for reuse later
            collision.axisNumber = minOverlap.axisNumber;
        }

        collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
        collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
        collision.collided = true;
        collision.depth = minOverlap.overlap;
        collision.parentA = collision.bodyA.parent;
        collision.parentB = collision.bodyB.parent;
        
        bodyA = collision.bodyA;
        bodyB = collision.bodyB;

        // ensure normal is facing away from bodyA
        if (Vector.dot(minOverlap.axis, Vector.sub(bodyB.position, bodyA.position)) < 0) {
            collision.normal = {
                x: minOverlap.axis.x,
                y: minOverlap.axis.y
            };
        } else {
            collision.normal = {
                x: -minOverlap.axis.x,
                y: -minOverlap.axis.y
            };
        }

        collision.tangent = Vector.perp(collision.normal);

        collision.penetration = collision.penetration || {};
        collision.penetration.x = collision.normal.x * collision.depth;
        collision.penetration.y = collision.normal.y * collision.depth; 

        // find support points, there is always either exactly one or two
        var verticesB = SAT._findSupports(bodyA, bodyB, collision.normal),
            supports = [];

        // find the supports from bodyB that are inside bodyA
        if (Vertices.contains(bodyA.vertices, verticesB[0]))
            supports.push(verticesB[0]);

        if (Vertices.contains(bodyA.vertices, verticesB[1]))
            supports.push(verticesB[1]);

        // find the supports from bodyA that are inside bodyB
        if (supports.length < 2) {
            var verticesA = SAT._findSupports(bodyB, bodyA, Vector.neg(collision.normal));
                
            if (Vertices.contains(bodyB.vertices, verticesA[0]))
                supports.push(verticesA[0]);

            if (supports.length < 2 && Vertices.contains(bodyB.vertices, verticesA[1]))
                supports.push(verticesA[1]);
        }

        // account for the edge case of overlapping but no vertex containment
        if (supports.length < 1)
            supports = [verticesB[0]];
        
        collision.supports = supports;

        return collision;
    };

    /**
     * Find the overlap between two sets of vertices.
     * @method _overlapAxes
     * @private
     * @param {} verticesA
     * @param {} verticesB
     * @param {} axes
     * @return result
     */
    SAT._overlapAxes = function(verticesA, verticesB, axes) {
        var projectionA = Vector._temp[0], 
            projectionB = Vector._temp[1],
            result = { overlap: Number.MAX_VALUE },
            overlap,
            axis;

        for (var i = 0; i < axes.length; i++) {
            axis = axes[i];

            SAT._projectToAxis(projectionA, verticesA, axis);
            SAT._projectToAxis(projectionB, verticesB, axis);

            overlap = Math.min(projectionA.max - projectionB.min, projectionB.max - projectionA.min);

            if (overlap <= 0) {
                result.overlap = overlap;
                return result;
            }

            if (overlap < result.overlap) {
                result.overlap = overlap;
                result.axis = axis;
                result.axisNumber = i;
            }
        }

        return result;
    };

    /**
     * Projects vertices on an axis and returns an interval.
     * @method _projectToAxis
     * @private
     * @param {} projection
     * @param {} vertices
     * @param {} axis
     */
    SAT._projectToAxis = function(projection, vertices, axis) {
        var min = Vector.dot(vertices[0], axis),
            max = min;

        for (var i = 1; i < vertices.length; i += 1) {
            var dot = Vector.dot(vertices[i], axis);

            if (dot > max) { 
                max = dot; 
            } else if (dot < min) { 
                min = dot; 
            }
        }

        projection.min = min;
        projection.max = max;
    };
    
    /**
     * Finds supporting vertices given two bodies along a given direction using hill-climbing.
     * @method _findSupports
     * @private
     * @param {} bodyA
     * @param {} bodyB
     * @param {} normal
     * @return [vector]
     */
    SAT._findSupports = function(bodyA, bodyB, normal) {
        var nearestDistance = Number.MAX_VALUE,
            vertexToBody = Vector._temp[0],
            vertices = bodyB.vertices,
            bodyAPosition = bodyA.position,
            distance,
            vertex,
            vertexA,
            vertexB;

        // find closest vertex on bodyB
        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            vertexToBody.x = vertex.x - bodyAPosition.x;
            vertexToBody.y = vertex.y - bodyAPosition.y;
            distance = -Vector.dot(normal, vertexToBody);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                vertexA = vertex;
            }
        }

        // find next closest vertex using the two connected to it
        var prevIndex = vertexA.index - 1 >= 0 ? vertexA.index - 1 : vertices.length - 1;
        vertex = vertices[prevIndex];
        vertexToBody.x = vertex.x - bodyAPosition.x;
        vertexToBody.y = vertex.y - bodyAPosition.y;
        nearestDistance = -Vector.dot(normal, vertexToBody);
        vertexB = vertex;

        var nextIndex = (vertexA.index + 1) % vertices.length;
        vertex = vertices[nextIndex];
        vertexToBody.x = vertex.x - bodyAPosition.x;
        vertexToBody.y = vertex.y - bodyAPosition.y;
        distance = -Vector.dot(normal, vertexToBody);
        if (distance < nearestDistance) {
            vertexB = vertex;
        }

        return [vertexA, vertexB];
    };

})();

},{"../geometry/Vector":28,"../geometry/Vertices":29}],12:[function(_dereq_,module,exports){
/**
* The `Matter.Constraint` module contains methods for creating and manipulating constraints.
* Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
* The stiffness of constraints can be modified to create springs or elastic.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Constraint
*/

var Constraint = {};

module.exports = Constraint;

var Vertices = _dereq_('../geometry/Vertices');
var Vector = _dereq_('../geometry/Vector');
var Sleeping = _dereq_('../core/Sleeping');
var Bounds = _dereq_('../geometry/Bounds');
var Axes = _dereq_('../geometry/Axes');
var Common = _dereq_('../core/Common');

(function() {

    Constraint._warming = 0.4;
    Constraint._torqueDampen = 1;
    Constraint._minLength = 0.000001;

    /**
     * Creates a new constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * To simulate a revolute constraint (or pin joint) set `length: 0` and a high `stiffness` value (e.g. `0.7` or above).
     * If the constraint is unstable, try lowering the `stiffness` value and / or increasing `engine.constraintIterations`.
     * For compound bodies, constraints must be applied to the parent body (not one of its parts).
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {constraint} constraint
     */
    Constraint.create = function(options) {
        var constraint = options;

        // if bodies defined but no points, use body centre
        if (constraint.bodyA && !constraint.pointA)
            constraint.pointA = { x: 0, y: 0 };
        if (constraint.bodyB && !constraint.pointB)
            constraint.pointB = { x: 0, y: 0 };

        // calculate static length using initial world space points
        var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA,
            initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB,
            length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));
    
        constraint.length = typeof constraint.length !== 'undefined' ? constraint.length : length;

        // option defaults
        constraint.id = constraint.id || Common.nextId();
        constraint.label = constraint.label || 'Constraint';
        constraint.type = 'constraint';
        constraint.stiffness = constraint.stiffness || (constraint.length > 0 ? 1 : 0.7);
        constraint.damping = constraint.damping || 0;
        constraint.angularStiffness = constraint.angularStiffness || 0;
        constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
        constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;
        constraint.plugin = {};

        // render
        var render = {
            visible: true,
            lineWidth: 2,
            strokeStyle: '#ffffff',
            type: 'line',
            anchors: true
        };

        if (constraint.length === 0 && constraint.stiffness > 0.1) {
            render.type = 'pin';
            render.anchors = false;
        } else if (constraint.stiffness < 0.9) {
            render.type = 'spring';
        }

        constraint.render = Common.extend(render, constraint.render);

        return constraint;
    };

    /**
     * Prepares for solving by constraint warming.
     * @private
     * @method preSolveAll
     * @param {body[]} bodies
     */
    Constraint.preSolveAll = function(bodies) {
        for (var i = 0; i < bodies.length; i += 1) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            if (body.isStatic || (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)) {
                continue;
            }

            body.position.x += impulse.x;
            body.position.y += impulse.y;
            body.angle += impulse.angle;
        }
    };

    /**
     * Solves all constraints in a list of collisions.
     * @private
     * @method solveAll
     * @param {constraint[]} constraints
     * @param {number} timeScale
     */
    Constraint.solveAll = function(constraints, timeScale) {
        // Solve fixed constraints first.
        for (var i = 0; i < constraints.length; i += 1) {
            var constraint = constraints[i],
                fixedA = !constraint.bodyA || (constraint.bodyA && constraint.bodyA.isStatic),
                fixedB = !constraint.bodyB || (constraint.bodyB && constraint.bodyB.isStatic);

            if (fixedA || fixedB) {
                Constraint.solve(constraints[i], timeScale);
            }
        }

        // Solve free constraints last.
        for (i = 0; i < constraints.length; i += 1) {
            constraint = constraints[i];
            fixedA = !constraint.bodyA || (constraint.bodyA && constraint.bodyA.isStatic);
            fixedB = !constraint.bodyB || (constraint.bodyB && constraint.bodyB.isStatic);

            if (!fixedA && !fixedB) {
                Constraint.solve(constraints[i], timeScale);
            }
        }
    };

    /**
     * Solves a distance constraint with Gauss-Siedel method.
     * @private
     * @method solve
     * @param {constraint} constraint
     * @param {number} timeScale
     */
    Constraint.solve = function(constraint, timeScale) {
        var bodyA = constraint.bodyA,
            bodyB = constraint.bodyB,
            pointA = constraint.pointA,
            pointB = constraint.pointB;

        if (!bodyA && !bodyB)
            return;

        // update reference angle
        if (bodyA && !bodyA.isStatic) {
            Vector.rotate(pointA, bodyA.angle - constraint.angleA, pointA);
            constraint.angleA = bodyA.angle;
        }
        
        // update reference angle
        if (bodyB && !bodyB.isStatic) {
            Vector.rotate(pointB, bodyB.angle - constraint.angleB, pointB);
            constraint.angleB = bodyB.angle;
        }

        var pointAWorld = pointA,
            pointBWorld = pointB;

        if (bodyA) pointAWorld = Vector.add(bodyA.position, pointA);
        if (bodyB) pointBWorld = Vector.add(bodyB.position, pointB);

        if (!pointAWorld || !pointBWorld)
            return;

        var delta = Vector.sub(pointAWorld, pointBWorld),
            currentLength = Vector.magnitude(delta);

        // prevent singularity
        if (currentLength < Constraint._minLength) {
            currentLength = Constraint._minLength;
        }

        // solve distance constraint with Gauss-Siedel method
        var difference = (currentLength - constraint.length) / currentLength,
            stiffness = constraint.stiffness < 1 ? constraint.stiffness * timeScale : constraint.stiffness,
            force = Vector.mult(delta, difference * stiffness),
            massTotal = (bodyA ? bodyA.inverseMass : 0) + (bodyB ? bodyB.inverseMass : 0),
            inertiaTotal = (bodyA ? bodyA.inverseInertia : 0) + (bodyB ? bodyB.inverseInertia : 0),
            resistanceTotal = massTotal + inertiaTotal,
            torque,
            share,
            normal,
            normalVelocity,
            relativeVelocity;

        if (constraint.damping) {
            var zero = Vector.create();
            normal = Vector.div(delta, currentLength);

            relativeVelocity = Vector.sub(
                bodyB && Vector.sub(bodyB.position, bodyB.positionPrev) || zero,
                bodyA && Vector.sub(bodyA.position, bodyA.positionPrev) || zero
            );

            normalVelocity = Vector.dot(normal, relativeVelocity);
        }

        if (bodyA && !bodyA.isStatic) {
            share = bodyA.inverseMass / massTotal;

            // keep track of applied impulses for post solving
            bodyA.constraintImpulse.x -= force.x * share;
            bodyA.constraintImpulse.y -= force.y * share;

            // apply forces
            bodyA.position.x -= force.x * share;
            bodyA.position.y -= force.y * share;

            // apply damping
            if (constraint.damping) {
                bodyA.positionPrev.x -= constraint.damping * normal.x * normalVelocity * share;
                bodyA.positionPrev.y -= constraint.damping * normal.y * normalVelocity * share;
            }

            // apply torque
            torque = (Vector.cross(pointA, force) / resistanceTotal) * Constraint._torqueDampen * bodyA.inverseInertia * (1 - constraint.angularStiffness);
            bodyA.constraintImpulse.angle -= torque;
            bodyA.angle -= torque;
        }

        if (bodyB && !bodyB.isStatic) {
            share = bodyB.inverseMass / massTotal;

            // keep track of applied impulses for post solving
            bodyB.constraintImpulse.x += force.x * share;
            bodyB.constraintImpulse.y += force.y * share;
            
            // apply forces
            bodyB.position.x += force.x * share;
            bodyB.position.y += force.y * share;

            // apply damping
            if (constraint.damping) {
                bodyB.positionPrev.x += constraint.damping * normal.x * normalVelocity * share;
                bodyB.positionPrev.y += constraint.damping * normal.y * normalVelocity * share;
            }

            // apply torque
            torque = (Vector.cross(pointB, force) / resistanceTotal) * Constraint._torqueDampen * bodyB.inverseInertia * (1 - constraint.angularStiffness);
            bodyB.constraintImpulse.angle += torque;
            bodyB.angle += torque;
        }

    };

    /**
     * Performs body updates required after solving constraints.
     * @private
     * @method postSolveAll
     * @param {body[]} bodies
     */
    Constraint.postSolveAll = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            if (body.isStatic || (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0)) {
                continue;
            }

            Sleeping.set(body, false);

            // update geometry and reset
            for (var j = 0; j < body.parts.length; j++) {
                var part = body.parts[j];
                
                Vertices.translate(part.vertices, impulse);

                if (j > 0) {
                    part.position.x += impulse.x;
                    part.position.y += impulse.y;
                }

                if (impulse.angle !== 0) {
                    Vertices.rotate(part.vertices, impulse.angle, body.position);
                    Axes.rotate(part.axes, impulse.angle);
                    if (j > 0) {
                        Vector.rotateAbout(part.position, impulse.angle, body.position, part.position);
                    }
                }

                Bounds.update(part.bounds, part.vertices, body.velocity);
            }

            // dampen the cached impulse for warming next step
            impulse.angle *= Constraint._warming;
            impulse.x *= Constraint._warming;
            impulse.y *= Constraint._warming;
        }
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Constraint"
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the constraint should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * A `Number` that defines the line width to use when rendering the constraint outline.
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 2
     */

    /**
     * A `String` that defines the stroke style to use when rendering the constraint outline.
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the constraint rendering type. 
     * The possible values are 'line', 'pin', 'spring'.
     * An appropriate render type will be automatically chosen unless one is given in options.
     *
     * @property render.type
     * @type string
     * @default 'line'
     */

    /**
     * A `Boolean` that defines if the constraint's anchor points should be rendered.
     *
     * @property render.anchors
     * @type boolean
     * @default true
     */

    /**
     * The first possible `Body` that this constraint is attached to.
     *
     * @property bodyA
     * @type body
     * @default null
     */

    /**
     * The second possible `Body` that this constraint is attached to.
     *
     * @property bodyB
     * @type body
     * @default null
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointA
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointB
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
     * A value of `1` means the constraint should be very stiff.
     * A value of `0.2` means the constraint acts like a soft spring.
     *
     * @property stiffness
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the damping of the constraint, 
     * i.e. the amount of resistance applied to each body based on their velocities to limit the amount of oscillation.
     * Damping will only be apparent when the constraint also has a very low `stiffness`.
     * A value of `0.1` means the constraint will apply heavy damping, resulting in little to no oscillation.
     * A value of `0` means the constraint will apply no damping.
     *
     * @property damping
     * @type number
     * @default 0
     */

    /**
     * A `Number` that specifies the target resting length of the constraint. 
     * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
     *
     * @property length
     * @type number
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

})();

},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],13:[function(_dereq_,module,exports){
/**
* The `Matter.MouseConstraint` module contains methods for creating mouse constraints.
* Mouse constraints are used for allowing user interaction, providing the ability to move bodies via the mouse or touch.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class MouseConstraint
*/

var MouseConstraint = {};

module.exports = MouseConstraint;

var Vertices = _dereq_('../geometry/Vertices');
var Sleeping = _dereq_('../core/Sleeping');
var Mouse = _dereq_('../core/Mouse');
var Events = _dereq_('../core/Events');
var Detector = _dereq_('../collision/Detector');
var Constraint = _dereq_('./Constraint');
var Composite = _dereq_('../body/Composite');
var Common = _dereq_('../core/Common');
var Bounds = _dereq_('../geometry/Bounds');

(function() {

    /**
     * Creates a new mouse constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {engine} engine
     * @param {} options
     * @return {MouseConstraint} A new MouseConstraint
     */
    MouseConstraint.create = function(engine, options) {
        var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);

        if (!mouse) {
            if (engine && engine.render && engine.render.canvas) {
                mouse = Mouse.create(engine.render.canvas);
            } else if (options && options.element) {
                mouse = Mouse.create(options.element);
            } else {
                mouse = Mouse.create();
                Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
            }
        }

        var constraint = Constraint.create({ 
            label: 'Mouse Constraint',
            pointA: mouse.position,
            pointB: { x: 0, y: 0 },
            length: 0.01, 
            stiffness: 0.1,
            angularStiffness: 1,
            render: {
                strokeStyle: '#90EE90',
                lineWidth: 3
            }
        });

        var defaults = {
            type: 'mouseConstraint',
            mouse: mouse,
            element: null,
            body: null,
            constraint: constraint,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            }
        };

        var mouseConstraint = Common.extend(defaults, options);

        Events.on(engine, 'beforeUpdate', function() {
            var allBodies = Composite.allBodies(engine.world);
            MouseConstraint.update(mouseConstraint, allBodies);
            MouseConstraint._triggerEvents(mouseConstraint);
        });

        return mouseConstraint;
    };

    /**
     * Updates the given mouse constraint.
     * @private
     * @method update
     * @param {MouseConstraint} mouseConstraint
     * @param {body[]} bodies
     */
    MouseConstraint.update = function(mouseConstraint, bodies) {
        var mouse = mouseConstraint.mouse,
            constraint = mouseConstraint.constraint,
            body = mouseConstraint.body;

        if (mouse.button === 0) {
            if (!constraint.bodyB) {
                for (var i = 0; i < bodies.length; i++) {
                    body = bodies[i];
                    if (Bounds.contains(body.bounds, mouse.position) 
                            && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                        for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
                            var part = body.parts[j];
                            if (Vertices.contains(part.vertices, mouse.position)) {
                                constraint.pointA = mouse.position;
                                constraint.bodyB = mouseConstraint.body = body;
                                constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                                constraint.angleB = body.angle;

                                Sleeping.set(body, false);
                                Events.trigger(mouseConstraint, 'startdrag', { mouse: mouse, body: body });

                                break;
                            }
                        }
                    }
                }
            } else {
                Sleeping.set(constraint.bodyB, false);
                constraint.pointA = mouse.position;
            }
        } else {
            constraint.bodyB = mouseConstraint.body = null;
            constraint.pointB = null;

            if (body)
                Events.trigger(mouseConstraint, 'enddrag', { mouse: mouse, body: body });
        }
    };

    /**
     * Triggers mouse constraint events.
     * @method _triggerEvents
     * @private
     * @param {mouse} mouseConstraint
     */
    MouseConstraint._triggerEvents = function(mouseConstraint) {
        var mouse = mouseConstraint.mouse,
            mouseEvents = mouse.sourceEvents;

        if (mouseEvents.mousemove)
            Events.trigger(mouseConstraint, 'mousemove', { mouse: mouse });

        if (mouseEvents.mousedown)
            Events.trigger(mouseConstraint, 'mousedown', { mouse: mouse });

        if (mouseEvents.mouseup)
            Events.trigger(mouseConstraint, 'mouseup', { mouse: mouse });

        // reset the mouse state ready for the next step
        Mouse.clearSourceEvents(mouse);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when the mouse has moved (or a touch moves) during the last step
    *
    * @event mousemove
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the mouse is down (or a touch has started) during the last step
    *
    * @event mousedown
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the mouse is up (or a touch has ended) during the last step
    *
    * @event mouseup
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the user starts dragging a body
    *
    * @event startdrag
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {body} event.body The body being dragged
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when the user ends dragging a body
    *
    * @event enddrag
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {body} event.body The body that has stopped being dragged
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     */

    /**
     * The `Mouse` instance in use. If not supplied in `MouseConstraint.create`, one will be created.
     *
     * @property mouse
     * @type mouse
     * @default mouse
     */

    /**
     * The `Body` that is currently being moved by the user, or `null` if no body.
     *
     * @property body
     * @type body
     * @default null
     */

    /**
     * The `Constraint` object that is used to move the body during interaction.
     *
     * @property constraint
     * @type constraint
     */

    /**
     * An `Object` that specifies the collision filter properties.
     * The collision filter allows the user to define which types of body this mouse constraint can interact with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter
     * @type object
     */

})();

},{"../body/Composite":2,"../collision/Detector":5,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../core/Sleeping":22,"../geometry/Bounds":26,"../geometry/Vertices":29,"./Constraint":12}],14:[function(_dereq_,module,exports){
/**
* The `Matter.Common` module contains utility functions that are common to all modules.
*
* @class Common
*/

var Common = {};

module.exports = Common;

(function() {

    Common._nextId = 0;
    Common._seed = 0;
    Common._nowStartTime = +(new Date());

    /**
     * Extends the object in the first argument using the object in the second argument.
     * @method extend
     * @param {} obj
     * @param {boolean} deep
     * @return {} obj extended
     */
    Common.extend = function(obj, deep) {
        var argsStart,
            args,
            deepClone;

        if (typeof deep === 'boolean') {
            argsStart = 2;
            deepClone = deep;
        } else {
            argsStart = 1;
            deepClone = true;
        }

        for (var i = argsStart; i < arguments.length; i++) {
            var source = arguments[i];

            if (source) {
                for (var prop in source) {
                    if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }
        
        return obj;
    };

    /**
     * Creates a new clone of the object, if deep is true references will also be cloned.
     * @method clone
     * @param {} obj
     * @param {bool} deep
     * @return {} obj cloned
     */
    Common.clone = function(obj, deep) {
        return Common.extend({}, deep, obj);
    };

    /**
     * Returns the list of keys for the given object.
     * @method keys
     * @param {} obj
     * @return {string[]} keys
     */
    Common.keys = function(obj) {
        if (Object.keys)
            return Object.keys(obj);

        // avoid hasOwnProperty for performance
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return keys;
    };

    /**
     * Returns the list of values for the given object.
     * @method values
     * @param {} obj
     * @return {array} Array of the objects property values
     */
    Common.values = function(obj) {
        var values = [];
        
        if (Object.keys) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        }
        
        // avoid hasOwnProperty for performance
        for (var key in obj)
            values.push(obj[key]);
        return values;
    };

    /**
     * Gets a value from `base` relative to the `path` string.
     * @method get
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} The object at the given path
     */
    Common.get = function(obj, path, begin, end) {
        path = path.split('.').slice(begin, end);

        for (var i = 0; i < path.length; i += 1) {
            obj = obj[path[i]];
        }

        return obj;
    };

    /**
     * Sets a value on `base` relative to the given `path` string.
     * @method set
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {} val The value to set
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} Pass through `val` for chaining
     */
    Common.set = function(obj, path, val, begin, end) {
        var parts = path.split('.').slice(begin, end);
        Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
        return val;
    };

    /**
     * Shuffles the given array in-place.
     * The function uses a seeded random generator.
     * @method shuffle
     * @param {array} array
     * @return {array} array shuffled randomly
     */
    Common.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Common.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    /**
     * Randomly chooses a value from a list with equal probability.
     * The function uses a seeded random generator.
     * @method choose
     * @param {array} choices
     * @return {object} A random choice object from the array
     */
    Common.choose = function(choices) {
        return choices[Math.floor(Common.random() * choices.length)];
    };

    /**
     * Returns true if the object is a HTMLElement, otherwise false.
     * @method isElement
     * @param {object} obj
     * @return {boolean} True if the object is a HTMLElement, otherwise false
     */
    Common.isElement = function(obj) {
        if (typeof HTMLElement !== 'undefined') {
            return obj instanceof HTMLElement;
        }

        return !!(obj && obj.nodeType && obj.nodeName);
    };

    /**
     * Returns true if the object is an array.
     * @method isArray
     * @param {object} obj
     * @return {boolean} True if the object is an array, otherwise false
     */
    Common.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Returns true if the object is a function.
     * @method isFunction
     * @param {object} obj
     * @return {boolean} True if the object is a function, otherwise false
     */
    Common.isFunction = function(obj) {
        return typeof obj === "function";
    };

    /**
     * Returns true if the object is a plain object.
     * @method isPlainObject
     * @param {object} obj
     * @return {boolean} True if the object is a plain object, otherwise false
     */
    Common.isPlainObject = function(obj) {
        return typeof obj === 'object' && obj.constructor === Object;
    };

    /**
     * Returns true if the object is a string.
     * @method isString
     * @param {object} obj
     * @return {boolean} True if the object is a string, otherwise false
     */
    Common.isString = function(obj) {
        return toString.call(obj) === '[object String]';
    };
    
    /**
     * Returns the given value clamped between a minimum and maximum value.
     * @method clamp
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @return {number} The value clamped between min and max inclusive
     */
    Common.clamp = function(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    
    /**
     * Returns the sign of the given value.
     * @method sign
     * @param {number} value
     * @return {number} -1 if negative, +1 if 0 or positive
     */
    Common.sign = function(value) {
        return value < 0 ? -1 : 1;
    };
    
    /**
     * Returns the current timestamp since the time origin (e.g. from page load).
     * The result will be high-resolution including decimal places if available.
     * @method now
     * @return {number} the current timestamp
     */
    Common.now = function() {
        if (window.performance) {
            if (window.performance.now) {
                return window.performance.now();
            } else if (window.performance.webkitNow) {
                return window.performance.webkitNow();
            }
        }

        return (new Date()) - Common._nowStartTime;
    };
    
    /**
     * Returns a random value between a minimum and a maximum value inclusive.
     * The function uses a seeded random generator.
     * @method random
     * @param {number} min
     * @param {number} max
     * @return {number} A random number between min and max inclusive
     */
    Common.random = function(min, max) {
        min = (typeof min !== "undefined") ? min : 0;
        max = (typeof max !== "undefined") ? max : 1;
        return min + _seededRandom() * (max - min);
    };

    var _seededRandom = function() {
        // https://en.wikipedia.org/wiki/Linear_congruential_generator
        Common._seed = (Common._seed * 9301 + 49297) % 233280;
        return Common._seed / 233280;
    };

    /**
     * Converts a CSS hex colour string into an integer.
     * @method colorToNumber
     * @param {string} colorString
     * @return {number} An integer representing the CSS hex string
     */
    Common.colorToNumber = function(colorString) {
        colorString = colorString.replace('#','');

        if (colorString.length == 3) {
            colorString = colorString.charAt(0) + colorString.charAt(0)
                        + colorString.charAt(1) + colorString.charAt(1)
                        + colorString.charAt(2) + colorString.charAt(2);
        }

        return parseInt(colorString, 16);
    };

    /**
     * The console logging level to use, where each level includes all levels above and excludes the levels below.
     * The default level is 'debug' which shows all console messages.  
     *
     * Possible level values are:
     * - 0 = None
     * - 1 = Debug
     * - 2 = Info
     * - 3 = Warn
     * - 4 = Error
     * @property Common.logLevel
     * @type {Number}
     * @default 1
     */
    Common.logLevel = 1;

    /**
     * Shows a `console.log` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method log
     * @param ...objs {} The objects to log.
     */
    Common.log = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.log.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.info` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method info
     * @param ...objs {} The objects to log.
     */
    Common.info = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
            console.info.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.warn` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method warn
     * @param ...objs {} The objects to log.
     */
    Common.warn = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.warn.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Returns the next unique sequential ID.
     * @method nextId
     * @return {Number} Unique sequential ID
     */
    Common.nextId = function() {
        return Common._nextId++;
    };

    /**
     * A cross browser compatible indexOf implementation.
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     * @return {number} The position of needle in haystack, otherwise -1.
     */
    Common.indexOf = function(haystack, needle) {
        if (haystack.indexOf)
            return haystack.indexOf(needle);

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                return i;
        }

        return -1;
    };

    /**
     * A cross browser compatible array map implementation.
     * @method map
     * @param {array} list
     * @param {function} func
     * @return {array} Values from list transformed by func.
     */
    Common.map = function(list, func) {
        if (list.map) {
            return list.map(func);
        }

        var mapped = [];

        for (var i = 0; i < list.length; i += 1) {
            mapped.push(func(list[i]));
        }

        return mapped;
    };

    /**
     * Takes a directed graph and returns the partially ordered set of vertices in topological order.
     * Circular dependencies are allowed.
     * @method topologicalSort
     * @param {object} graph
     * @return {array} Partially ordered set of vertices in topological order.
     */
    Common.topologicalSort = function(graph) {
        // https://github.com/mgechev/javascript-algorithms
        // Copyright (c) Minko Gechev (MIT license)
        // Modifications: tidy formatting and naming
        var result = [],
            visited = [],
            temp = [];

        for (var node in graph) {
            if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
            }
        }

        return result;
    };

    Common._topologicalSort = function(node, visited, temp, graph, result) {
        var neighbors = graph[node] || [];
        temp[node] = true;

        for (var i = 0; i < neighbors.length; i += 1) {
            var neighbor = neighbors[i];

            if (temp[neighbor]) {
                // skip circular dependencies
                continue;
            }

            if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
            }
        }

        temp[node] = false;
        visited[node] = true;

        result.push(node);
    };

    /**
     * Takes _n_ functions as arguments and returns a new function that calls them in order.
     * The arguments applied when calling the new function will also be applied to every function passed.
     * The value of `this` refers to the last value returned in the chain that was not `undefined`.
     * Therefore if a passed function does not return a value, the previously returned value is maintained.
     * After all passed functions have been called the new function returns the last returned value (if any).
     * If any of the passed functions are a chain, then the chain will be flattened.
     * @method chain
     * @param ...funcs {function} The functions to chain.
     * @return {function} A new function that calls the passed functions in order.
     */
    Common.chain = function() {
        var funcs = [];

        for (var i = 0; i < arguments.length; i += 1) {
            var func = arguments[i];

            if (func._chained) {
                // flatten already chained functions
                funcs.push.apply(funcs, func._chained);
            } else {
                funcs.push(func);
            }
        }

        var chain = function() {
            // https://github.com/GoogleChrome/devtools-docs/issues/53#issuecomment-51941358
            var lastResult,
                args = new Array(arguments.length);

            for (var i = 0, l = arguments.length; i < l; i++) {
                args[i] = arguments[i];
            }

            for (i = 0; i < funcs.length; i += 1) {
                var result = funcs[i].apply(lastResult, args);

                if (typeof result !== 'undefined') {
                    lastResult = result;
                }
            }

            return lastResult;
        };

        chain._chained = funcs;

        return chain;
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathBefore
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathBefore = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            func,
            Common.get(base, path)
        ));
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathAfter
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathAfter = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            Common.get(base, path),
            func
        ));
    };

})();

},{}],15:[function(_dereq_,module,exports){
/**
* The `Matter.Engine` module contains methods for creating and manipulating engines.
* An engine is a controller that manages updating the simulation of the world.
* See `Matter.Runner` for an optional game loop utility.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Engine
*/

var Engine = {};

module.exports = Engine;

var World = _dereq_('../body/World');
var Sleeping = _dereq_('./Sleeping');
var Resolver = _dereq_('../collision/Resolver');
var Render = _dereq_('../render/Render');
var Pairs = _dereq_('../collision/Pairs');
var Metrics = _dereq_('./Metrics');
var Grid = _dereq_('../collision/Grid');
var Events = _dereq_('./Events');
var Composite = _dereq_('../body/Composite');
var Constraint = _dereq_('../constraint/Constraint');
var Common = _dereq_('./Common');
var Body = _dereq_('../body/Body');

(function() {

    /**
     * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {engine} engine
     */
    Engine.create = function(element, options) {
        // options may be passed as the first (and only) argument
        options = Common.isElement(element) ? options : element;
        element = Common.isElement(element) ? element : null;
        options = options || {};

        if (element || options.render) {
            Common.warn('Engine.create: engine.render is deprecated (see docs)');
        }

        var defaults = {
            positionIterations: 6,
            velocityIterations: 4,
            constraintIterations: 2,
            enableSleeping: false,
            events: [],
            plugin: {},
            timing: {
                timestamp: 0,
                timeScale: 1
            },
            broadphase: {
                controller: Grid
            }
        };

        var engine = Common.extend(defaults, options);

        // @deprecated
        if (element || engine.render) {
            var renderDefaults = {
                element: element,
                controller: Render
            };
            
            engine.render = Common.extend(renderDefaults, engine.render);
        }

        // @deprecated
        if (engine.render && engine.render.controller) {
            engine.render = engine.render.controller.create(engine.render);
        }

        // @deprecated
        if (engine.render) {
            engine.render.engine = engine;
        }

        engine.world = options.world || World.create(engine.world);
        engine.pairs = Pairs.create();
        engine.broadphase = engine.broadphase.controller.create(engine.broadphase);
        engine.metrics = engine.metrics || { extended: false };


        return engine;
    };

    /**
     * Moves the simulation forward in time by `delta` ms.
     * The `correction` argument is an optional `Number` that specifies the time correction factor to apply to the update.
     * This can help improve the accuracy of the simulation in cases where `delta` is changing between updates.
     * The value of `correction` is defined as `delta / lastDelta`, i.e. the percentage change of `delta` over the last step.
     * Therefore the value is always `1` (no correction) when `delta` constant (or when no correction is desired, which is the default).
     * See the paper on <a href="http://lonesock.net/article/verlet.html">Time Corrected Verlet</a> for more information.
     *
     * Triggers `beforeUpdate` and `afterUpdate` events.
     * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
     * @method update
     * @param {engine} engine
     * @param {number} [delta=16.666]
     * @param {number} [correction=1]
     */
    Engine.update = function(engine, delta, correction) {
        delta = delta || 1000 / 60;
        correction = correction || 1;

        var world = engine.world,
            timing = engine.timing,
            broadphase = engine.broadphase,
            broadphasePairs = [],
            i;

        // increment timestamp
        timing.timestamp += delta * timing.timeScale;

        // create an event object
        var event = {
            timestamp: timing.timestamp
        };

        Events.trigger(engine, 'beforeUpdate', event);

        // get lists of all bodies and constraints, no matter what composites they are in
        var allBodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world);


        // if sleeping enabled, call the sleeping controller
        if (engine.enableSleeping)
            Sleeping.update(allBodies, timing.timeScale);

        // applies gravity to all bodies
        Engine._bodiesApplyGravity(allBodies, world.gravity);

        // update all body position and rotation by integration
        Engine._bodiesUpdate(allBodies, delta, timing.timeScale, correction, world.bounds);

        // update all constraints (first pass)
        Constraint.preSolveAll(allBodies);
        for (i = 0; i < engine.constraintIterations; i++) {
            Constraint.solveAll(allConstraints, timing.timeScale);
        }
        Constraint.postSolveAll(allBodies);

        // broadphase pass: find potential collision pairs
        if (broadphase.controller) {
            // if world is dirty, we must flush the whole grid
            if (world.isModified)
                broadphase.controller.clear(broadphase);

            // update the grid buckets based on current bodies
            broadphase.controller.update(broadphase, allBodies, engine, world.isModified);
            broadphasePairs = broadphase.pairsList;
        } else {
            // if no broadphase set, we just pass all bodies
            broadphasePairs = allBodies;
        }

        // clear all composite modified flags
        if (world.isModified) {
            Composite.setModified(world, false, false, true);
        }

        // narrowphase pass: find actual collisions, then create or update collision pairs
        var collisions = broadphase.detector(broadphasePairs, engine);

        // update collision pairs
        var pairs = engine.pairs,
            timestamp = timing.timestamp;
        Pairs.update(pairs, collisions, timestamp);
        Pairs.removeOld(pairs, timestamp);

        // wake up bodies involved in collisions
        if (engine.enableSleeping)
            Sleeping.afterCollisions(pairs.list, timing.timeScale);

        // trigger collision events
        if (pairs.collisionStart.length > 0)
            Events.trigger(engine, 'collisionStart', { pairs: pairs.collisionStart });

        // iteratively resolve position between collisions
        Resolver.preSolvePosition(pairs.list);
        for (i = 0; i < engine.positionIterations; i++) {
            Resolver.solvePosition(pairs.list, timing.timeScale);
        }
        Resolver.postSolvePosition(allBodies);

        // update all constraints (second pass)
        Constraint.preSolveAll(allBodies);
        for (i = 0; i < engine.constraintIterations; i++) {
            Constraint.solveAll(allConstraints, timing.timeScale);
        }
        Constraint.postSolveAll(allBodies);

        // iteratively resolve velocity between collisions
        Resolver.preSolveVelocity(pairs.list);
        for (i = 0; i < engine.velocityIterations; i++) {
            Resolver.solveVelocity(pairs.list, timing.timeScale);
        }

        // trigger collision events
        if (pairs.collisionActive.length > 0)
            Events.trigger(engine, 'collisionActive', { pairs: pairs.collisionActive });

        if (pairs.collisionEnd.length > 0)
            Events.trigger(engine, 'collisionEnd', { pairs: pairs.collisionEnd });


        // clear force buffers
        Engine._bodiesClearForces(allBodies);

        Events.trigger(engine, 'afterUpdate', event);

        return engine;
    };
    
    /**
     * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
     * @method merge
     * @param {engine} engineA
     * @param {engine} engineB
     */
    Engine.merge = function(engineA, engineB) {
        Common.extend(engineA, engineB);
        
        if (engineB.world) {
            engineA.world = engineB.world;

            Engine.clear(engineA);

            var bodies = Composite.allBodies(engineA.world);

            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                Sleeping.set(body, false);
                body.id = Common.nextId();
            }
        }
    };

    /**
     * Clears the engine including the world, pairs and broadphase.
     * @method clear
     * @param {engine} engine
     */
    Engine.clear = function(engine) {
        var world = engine.world;
        
        Pairs.clear(engine.pairs);

        var broadphase = engine.broadphase;
        if (broadphase.controller) {
            var bodies = Composite.allBodies(world);
            broadphase.controller.clear(broadphase);
            broadphase.controller.update(broadphase, bodies, engine, true);
        }
    };

    /**
     * Zeroes the `body.force` and `body.torque` force buffers.
     * @method _bodiesClearForces
     * @private
     * @param {body[]} bodies
     */
    Engine._bodiesClearForces = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            // reset force buffers
            body.force.x = 0;
            body.force.y = 0;
            body.torque = 0;
        }
    };

    /**
     * Applys a mass dependant force to all given bodies.
     * @method _bodiesApplyGravity
     * @private
     * @param {body[]} bodies
     * @param {vector} gravity
     */
    Engine._bodiesApplyGravity = function(bodies, gravity) {
        var gravityScale = typeof gravity.scale !== 'undefined' ? gravity.scale : 0.001;

        if ((gravity.x === 0 && gravity.y === 0) || gravityScale === 0) {
            return;
        }
        
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping)
                continue;

            // apply gravity
            body.force.y += body.mass * gravity.y * gravityScale;
            body.force.x += body.mass * gravity.x * gravityScale;
        }
    };

    /**
     * Applys `Body.update` to all given `bodies`.
     * @method _bodiesUpdate
     * @private
     * @param {body[]} bodies
     * @param {number} deltaTime 
     * The amount of time elapsed between updates
     * @param {number} timeScale
     * @param {number} correction 
     * The Verlet correction factor (deltaTime / lastDeltaTime)
     * @param {bounds} worldBounds
     */
    Engine._bodiesUpdate = function(bodies, deltaTime, timeScale, correction, worldBounds) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping)
                continue;

            Body.update(body, deltaTime, timeScale, correction);
        }
    };

    /**
     * An alias for `Runner.run`, see `Matter.Runner` for more information.
     * @method run
     * @param {engine} engine
     */

    /**
    * Fired just before an update
    *
    * @event beforeUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update and all collision events
    *
    * @event afterUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
    *
    * @event collisionStart
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
    *
    * @event collisionActive
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
    *
    * @event collisionEnd
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` that specifies the number of position iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property positionIterations
     * @type number
     * @default 6
     */

    /**
     * An integer `Number` that specifies the number of velocity iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property velocityIterations
     * @type number
     * @default 4
     */

    /**
     * An integer `Number` that specifies the number of constraint iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     * The default value of `2` is usually very adequate.
     *
     * @property constraintIterations
     * @type number
     * @default 2
     */

    /**
     * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
     * Sleeping can improve stability and performance, but often at the expense of accuracy.
     *
     * @property enableSleeping
     * @type boolean
     * @default false
     */

    /**
     * An `Object` containing properties regarding the timing systems of the engine. 
     *
     * @property timing
     * @type object
     */

    /**
     * A `Number` that specifies the global scaling factor of time for all bodies.
     * A value of `0` freezes the simulation.
     * A value of `0.1` gives a slow-motion effect.
     * A value of `1.2` gives a speed-up effect.
     *
     * @property timing.timeScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the current simulation-time in milliseconds starting from `0`. 
     * It is incremented on every `Engine.update` by the given `delta` argument. 
     *
     * @property timing.timestamp
     * @type number
     * @default 0
     */

    /**
     * An instance of a `Render` controller. The default value is a `Matter.Render` instance created by `Engine.create`.
     * One may also develop a custom renderer module based on `Matter.Render` and pass an instance of it to `Engine.create` via `options.render`.
     *
     * A minimal custom renderer object must define at least three functions: `create`, `clear` and `world` (see `Matter.Render`).
     * It is also possible to instead pass the _module_ reference via `options.render.controller` and `Engine.create` will instantiate one for you.
     *
     * @property render
     * @type render
     * @deprecated see Demo.js for an example of creating a renderer
     * @default a Matter.Render instance
     */

    /**
     * An instance of a broadphase controller. The default value is a `Matter.Grid` instance created by `Engine.create`.
     *
     * @property broadphase
     * @type grid
     * @default a Matter.Grid instance
     */

    /**
     * A `World` composite object that will contain all simulated bodies and constraints.
     *
     * @property world
     * @type world
     * @default a Matter.World instance
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

})();

},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Grid":6,"../collision/Pairs":8,"../collision/Resolver":10,"../constraint/Constraint":12,"../render/Render":31,"./Common":14,"./Events":16,"./Metrics":18,"./Sleeping":22}],16:[function(_dereq_,module,exports){
/**
* The `Matter.Events` module contains methods to fire and listen to events on other objects.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Events
*/

var Events = {};

module.exports = Events;

var Common = _dereq_('./Common');

(function() {

    /**
     * Subscribes a callback function to the given object's `eventName`.
     * @method on
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.on = function(object, eventNames, callback) {
        var names = eventNames.split(' '),
            name;

        for (var i = 0; i < names.length; i++) {
            name = names[i];
            object.events = object.events || {};
            object.events[name] = object.events[name] || [];
            object.events[name].push(callback);
        }

        return callback;
    };

    /**
     * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
     * @method off
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.off = function(object, eventNames, callback) {
        if (!eventNames) {
            object.events = {};
            return;
        }

        // handle Events.off(object, callback)
        if (typeof eventNames === 'function') {
            callback = eventNames;
            eventNames = Common.keys(object.events).join(' ');
        }

        var names = eventNames.split(' ');

        for (var i = 0; i < names.length; i++) {
            var callbacks = object.events[names[i]],
                newCallbacks = [];

            if (callback && callbacks) {
                for (var j = 0; j < callbacks.length; j++) {
                    if (callbacks[j] !== callback)
                        newCallbacks.push(callbacks[j]);
                }
            }

            object.events[names[i]] = newCallbacks;
        }
    };

    /**
     * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
     * @method trigger
     * @param {} object
     * @param {string} eventNames
     * @param {} event
     */
    Events.trigger = function(object, eventNames, event) {
        var names,
            name,
            callbacks,
            eventClone;

        if (object.events) {
            if (!event)
                event = {};

            names = eventNames.split(' ');

            for (var i = 0; i < names.length; i++) {
                name = names[i];
                callbacks = object.events[name];

                if (callbacks) {
                    eventClone = Common.clone(event, false);
                    eventClone.name = name;
                    eventClone.source = object;

                    for (var j = 0; j < callbacks.length; j++) {
                        callbacks[j].apply(object, [eventClone]);
                    }
                }
            }
        }
    };

})();

},{"./Common":14}],17:[function(_dereq_,module,exports){
/**
* The `Matter` module is the top level namespace. It also includes a function for installing plugins on top of the library.
*
* @class Matter
*/

var Matter = {};

module.exports = Matter;

var Plugin = _dereq_('./Plugin');
var Common = _dereq_('./Common');

(function() {

    /**
     * The library name.
     * @property name
     * @readOnly
     * @type {String}
     */
    Matter.name = 'matter-js';

    /**
     * The library version.
     * @property version
     * @readOnly
     * @type {String}
     */
    Matter.version = '0.14.1';

    /**
     * A list of plugin dependencies to be installed. These are normally set and installed through `Matter.use`.
     * Alternatively you may set `Matter.uses` manually and install them by calling `Plugin.use(Matter)`.
     * @property uses
     * @type {Array}
     */
    Matter.uses = [];

    /**
     * The plugins that have been installed through `Matter.Plugin.install`. Read only.
     * @property used
     * @readOnly
     * @type {Array}
     */
    Matter.used = [];

    /**
     * Installs the given plugins on the `Matter` namespace.
     * This is a short-hand for `Plugin.use`, see it for more information.
     * Call this function once at the start of your code, with all of the plugins you wish to install as arguments.
     * Avoid calling this function multiple times unless you intend to manually control installation order.
     * @method use
     * @param ...plugin {Function} The plugin(s) to install on `base` (multi-argument).
     */
    Matter.use = function() {
        Plugin.use(Matter, Array.prototype.slice.call(arguments));
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `Matter`.
     * See also docs for `Common.chain`.
     * @method before
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Matter.before = function(path, func) {
        path = path.replace(/^Matter./, '');
        return Common.chainPathBefore(Matter, path, func);
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `Matter`.
     * See also docs for `Common.chain`.
     * @method after
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Matter.after = function(path, func) {
        path = path.replace(/^Matter./, '');
        return Common.chainPathAfter(Matter, path, func);
    };

})();

},{"./Common":14,"./Plugin":20}],18:[function(_dereq_,module,exports){

},{"../body/Composite":2,"./Common":14}],19:[function(_dereq_,module,exports){
/**
* The `Matter.Mouse` module contains methods for creating and manipulating mouse inputs.
*
* @class Mouse
*/

var Mouse = {};

module.exports = Mouse;

var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a mouse input.
     * @method create
     * @param {HTMLElement} element
     * @return {mouse} A new mouse
     */
    Mouse.create = function(element) {
        var mouse = {};

        if (!element) {
            Common.log('Mouse.create: element was undefined, defaulting to document.body', 'warn');
        }
        
        mouse.element = element || document.body;
        mouse.absolute = { x: 0, y: 0 };
        mouse.position = { x: 0, y: 0 };
        mouse.mousedownPosition = { x: 0, y: 0 };
        mouse.mouseupPosition = { x: 0, y: 0 };
        mouse.offset = { x: 0, y: 0 };
        mouse.scale = { x: 1, y: 1 };
        mouse.wheelDelta = 0;
        mouse.button = -1;
        mouse.pixelRatio = mouse.element.getAttribute('data-pixel-ratio') || 1;

        mouse.sourceEvents = {
            mousemove: null,
            mousedown: null,
            mouseup: null,
            mousewheel: null
        };
        
        mouse.mousemove = function(event) { 
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                mouse.button = 0;
                event.preventDefault();
            }

            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.sourceEvents.mousemove = event;
        };
        
        mouse.mousedown = function(event) {
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                mouse.button = 0;
                event.preventDefault();
            } else {
                mouse.button = event.button;
            }

            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.mousedownPosition.x = mouse.position.x;
            mouse.mousedownPosition.y = mouse.position.y;
            mouse.sourceEvents.mousedown = event;
        };
        
        mouse.mouseup = function(event) {
            var position = Mouse._getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                touches = event.changedTouches;

            if (touches) {
                event.preventDefault();
            }
            
            mouse.button = -1;
            mouse.absolute.x = position.x;
            mouse.absolute.y = position.y;
            mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
            mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
            mouse.mouseupPosition.x = mouse.position.x;
            mouse.mouseupPosition.y = mouse.position.y;
            mouse.sourceEvents.mouseup = event;
        };

        mouse.mousewheel = function(event) {
            mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
            event.preventDefault();
        };

        Mouse.setElement(mouse, mouse.element);

        return mouse;
    };

    /**
     * Sets the element the mouse is bound to (and relative to).
     * @method setElement
     * @param {mouse} mouse
     * @param {HTMLElement} element
     */
    Mouse.setElement = function(mouse, element) {
        mouse.element = element;

        element.addEventListener('mousemove', mouse.mousemove);
        element.addEventListener('mousedown', mouse.mousedown);
        element.addEventListener('mouseup', mouse.mouseup);
        
        element.addEventListener('mousewheel', mouse.mousewheel);
        element.addEventListener('DOMMouseScroll', mouse.mousewheel);

        element.addEventListener('touchmove', mouse.mousemove);
        element.addEventListener('touchstart', mouse.mousedown);
        element.addEventListener('touchend', mouse.mouseup);
    };

    /**
     * Clears all captured source events.
     * @method clearSourceEvents
     * @param {mouse} mouse
     */
    Mouse.clearSourceEvents = function(mouse) {
        mouse.sourceEvents.mousemove = null;
        mouse.sourceEvents.mousedown = null;
        mouse.sourceEvents.mouseup = null;
        mouse.sourceEvents.mousewheel = null;
        mouse.wheelDelta = 0;
    };

    /**
     * Sets the mouse position offset.
     * @method setOffset
     * @param {mouse} mouse
     * @param {vector} offset
     */
    Mouse.setOffset = function(mouse, offset) {
        mouse.offset.x = offset.x;
        mouse.offset.y = offset.y;
        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
    };

    /**
     * Sets the mouse position scale.
     * @method setScale
     * @param {mouse} mouse
     * @param {vector} scale
     */
    Mouse.setScale = function(mouse, scale) {
        mouse.scale.x = scale.x;
        mouse.scale.y = scale.y;
        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
    };
    
    /**
     * Gets the mouse position relative to an element given a screen pixel ratio.
     * @method _getRelativeMousePosition
     * @private
     * @param {} event
     * @param {} element
     * @param {number} pixelRatio
     * @return {}
     */
    Mouse._getRelativeMousePosition = function(event, element, pixelRatio) {
        var elementBounds = element.getBoundingClientRect(),
            rootNode = (document.documentElement || document.body.parentNode || document.body),
            scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : rootNode.scrollLeft,
            scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : rootNode.scrollTop,
            touches = event.changedTouches,
            x, y;
        
        if (touches) {
            x = touches[0].pageX - elementBounds.left - scrollX;
            y = touches[0].pageY - elementBounds.top - scrollY;
        } else {
            x = event.pageX - elementBounds.left - scrollX;
            y = event.pageY - elementBounds.top - scrollY;
        }

        return { 
            x: x / (element.clientWidth / (element.width || element.clientWidth) * pixelRatio),
            y: y / (element.clientHeight / (element.height || element.clientHeight) * pixelRatio)
        };
    };

})();

},{"../core/Common":14}],20:[function(_dereq_,module,exports){
/**
* The `Matter.Plugin` module contains functions for registering and installing plugins on modules.
*
* @class Plugin
*/

var Plugin = {};

module.exports = Plugin;

var Common = _dereq_('./Common');

(function() {

    Plugin._registry = {};

    /**
     * Registers a plugin object so it can be resolved later by name.
     * @method register
     * @param plugin {} The plugin to register.
     * @return {object} The plugin.
     */
    Plugin.register = function(plugin) {
        if (!Plugin.isPlugin(plugin)) {
            Common.warn('Plugin.register:', Plugin.toString(plugin), 'does not implement all required fields.');
        }

        if (plugin.name in Plugin._registry) {
            var registered = Plugin._registry[plugin.name],
                pluginVersion = Plugin.versionParse(plugin.version).number,
                registeredVersion = Plugin.versionParse(registered.version).number;

            if (pluginVersion > registeredVersion) {
                Common.warn('Plugin.register:', Plugin.toString(registered), 'was upgraded to', Plugin.toString(plugin));
                Plugin._registry[plugin.name] = plugin;
            } else if (pluginVersion < registeredVersion) {
                Common.warn('Plugin.register:', Plugin.toString(registered), 'can not be downgraded to', Plugin.toString(plugin));
            } else if (plugin !== registered) {
                Common.warn('Plugin.register:', Plugin.toString(plugin), 'is already registered to different plugin object');
            }
        } else {
            Plugin._registry[plugin.name] = plugin;
        }

        return plugin;
    };

    /**
     * Resolves a dependency to a plugin object from the registry if it exists. 
     * The `dependency` may contain a version, but only the name matters when resolving.
     * @method resolve
     * @param dependency {string} The dependency.
     * @return {object} The plugin if resolved, otherwise `undefined`.
     */
    Plugin.resolve = function(dependency) {
        return Plugin._registry[Plugin.dependencyParse(dependency).name];
    };

    /**
     * Returns a pretty printed plugin name and version.
     * @method toString
     * @param plugin {} The plugin.
     * @return {string} Pretty printed plugin name and version.
     */
    Plugin.toString = function(plugin) {
        return typeof plugin === 'string' ? plugin : (plugin.name || 'anonymous') + '@' + (plugin.version || plugin.range || '0.0.0');
    };

    /**
     * Returns `true` if the object meets the minimum standard to be considered a plugin.
     * This means it must define the following properties:
     * - `name`
     * - `version`
     * - `install`
     * @method isPlugin
     * @param obj {} The obj to test.
     * @return {boolean} `true` if the object can be considered a plugin otherwise `false`.
     */
    Plugin.isPlugin = function(obj) {
        return obj && obj.name && obj.version && obj.install;
    };

    /**
     * Returns `true` if a plugin with the given `name` been installed on `module`.
     * @method isUsed
     * @param module {} The module.
     * @param name {string} The plugin name.
     * @return {boolean} `true` if a plugin with the given `name` been installed on `module`, otherwise `false`.
     */
    Plugin.isUsed = function(module, name) {
        return module.used.indexOf(name) > -1;
    };

    /**
     * Returns `true` if `plugin.for` is applicable to `module` by comparing against `module.name` and `module.version`.
     * If `plugin.for` is not specified then it is assumed to be applicable.
     * The value of `plugin.for` is a string of the format `'module-name'` or `'module-name@version'`.
     * @method isFor
     * @param plugin {} The plugin.
     * @param module {} The module.
     * @return {boolean} `true` if `plugin.for` is applicable to `module`, otherwise `false`.
     */
    Plugin.isFor = function(plugin, module) {
        var parsed = plugin.for && Plugin.dependencyParse(plugin.for);
        return !plugin.for || (module.name === parsed.name && Plugin.versionSatisfies(module.version, parsed.range));
    };

    /**
     * Installs the plugins by calling `plugin.install` on each plugin specified in `plugins` if passed, otherwise `module.uses`.
     * For installing plugins on `Matter` see the convenience function `Matter.use`.
     * Plugins may be specified either by their name or a reference to the plugin object.
     * Plugins themselves may specify further dependencies, but each plugin is installed only once.
     * Order is important, a topological sort is performed to find the best resulting order of installation.
     * This sorting attempts to satisfy every dependency's requested ordering, but may not be exact in all cases.
     * This function logs the resulting status of each dependency in the console, along with any warnings.
     * - A green tick ✅ indicates a dependency was resolved and installed.
     * - An orange diamond 🔶 indicates a dependency was resolved but a warning was thrown for it or one if its dependencies.
     * - A red cross ❌ indicates a dependency could not be resolved.
     * Avoid calling this function multiple times on the same module unless you intend to manually control installation order.
     * @method use
     * @param module {} The module install plugins on.
     * @param [plugins=module.uses] {} The plugins to install on module (optional, defaults to `module.uses`).
     */
    Plugin.use = function(module, plugins) {
        module.uses = (module.uses || []).concat(plugins || []);

        if (module.uses.length === 0) {
            Common.warn('Plugin.use:', Plugin.toString(module), 'does not specify any dependencies to install.');
            return;
        }

        var dependencies = Plugin.dependencies(module),
            sortedDependencies = Common.topologicalSort(dependencies),
            status = [];

        for (var i = 0; i < sortedDependencies.length; i += 1) {
            if (sortedDependencies[i] === module.name) {
                continue;
            }

            var plugin = Plugin.resolve(sortedDependencies[i]);

            if (!plugin) {
                status.push('❌ ' + sortedDependencies[i]);
                continue;
            }

            if (Plugin.isUsed(module, plugin.name)) {
                continue;
            }

            if (!Plugin.isFor(plugin, module)) {
                Common.warn('Plugin.use:', Plugin.toString(plugin), 'is for', plugin.for, 'but installed on', Plugin.toString(module) + '.');
                plugin._warned = true;
            }

            if (plugin.install) {
                plugin.install(module);
            } else {
                Common.warn('Plugin.use:', Plugin.toString(plugin), 'does not specify an install function.');
                plugin._warned = true;
            }

            if (plugin._warned) {
                status.push('🔶 ' + Plugin.toString(plugin));
                delete plugin._warned;
            } else {
                status.push('✅ ' + Plugin.toString(plugin));
            }

            module.used.push(plugin.name);
        }

        if (status.length > 0) {
            Common.info(status.join('  '));
        }
    };

    /**
     * Recursively finds all of a module's dependencies and returns a flat dependency graph.
     * @method dependencies
     * @param module {} The module.
     * @return {object} A dependency graph.
     */
    Plugin.dependencies = function(module, tracked) {
        var parsedBase = Plugin.dependencyParse(module),
            name = parsedBase.name;

        tracked = tracked || {};

        if (name in tracked) {
            return;
        }

        module = Plugin.resolve(module) || module;

        tracked[name] = Common.map(module.uses || [], function(dependency) {
            if (Plugin.isPlugin(dependency)) {
                Plugin.register(dependency);
            }

            var parsed = Plugin.dependencyParse(dependency),
                resolved = Plugin.resolve(dependency);

            if (resolved && !Plugin.versionSatisfies(resolved.version, parsed.range)) {
                Common.warn(
                    'Plugin.dependencies:', Plugin.toString(resolved), 'does not satisfy',
                    Plugin.toString(parsed), 'used by', Plugin.toString(parsedBase) + '.'
                );

                resolved._warned = true;
                module._warned = true;
            } else if (!resolved) {
                Common.warn(
                    'Plugin.dependencies:', Plugin.toString(dependency), 'used by',
                    Plugin.toString(parsedBase), 'could not be resolved.'
                );

                module._warned = true;
            }

            return parsed.name;
        });

        for (var i = 0; i < tracked[name].length; i += 1) {
            Plugin.dependencies(tracked[name][i], tracked);
        }

        return tracked;
    };

    /**
     * Parses a dependency string into its components.
     * The `dependency` is a string of the format `'module-name'` or `'module-name@version'`.
     * See documentation for `Plugin.versionParse` for a description of the format.
     * This function can also handle dependencies that are already resolved (e.g. a module object).
     * @method dependencyParse
     * @param dependency {string} The dependency of the format `'module-name'` or `'module-name@version'`.
     * @return {object} The dependency parsed into its components.
     */
    Plugin.dependencyParse = function(dependency) {
        if (Common.isString(dependency)) {
            var pattern = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;

            if (!pattern.test(dependency)) {
                Common.warn('Plugin.dependencyParse:', dependency, 'is not a valid dependency string.');
            }

            return {
                name: dependency.split('@')[0],
                range: dependency.split('@')[1] || '*'
            };
        }

        return {
            name: dependency.name,
            range: dependency.range || dependency.version
        };
    };

    /**
     * Parses a version string into its components.  
     * Versions are strictly of the format `x.y.z` (as in [semver](http://semver.org/)).
     * Versions may optionally have a prerelease tag in the format `x.y.z-alpha`.
     * Ranges are a strict subset of [npm ranges](https://docs.npmjs.com/misc/semver#advanced-range-syntax).
     * Only the following range types are supported:
     * - Tilde ranges e.g. `~1.2.3`
     * - Caret ranges e.g. `^1.2.3`
     * - Exact version e.g. `1.2.3`
     * - Any version `*`
     * @method versionParse
     * @param range {string} The version string.
     * @return {object} The version range parsed into its components.
     */
    Plugin.versionParse = function(range) {
        var pattern = /^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/;

        if (!pattern.test(range)) {
            Common.warn('Plugin.versionParse:', range, 'is not a valid version or range.');
        }

        var identifiers = range.split('-');
        range = identifiers[0];

        var isRange = isNaN(Number(range[0])),
            version = isRange ? range.substr(1) : range,
            parts = Common.map(version.split('.'), function(part) {
                return Number(part);
            });

        return {
            isRange: isRange,
            version: version,
            range: range,
            operator: isRange ? range[0] : '',
            parts: parts,
            prerelease: identifiers[1],
            number: parts[0] * 1e8 + parts[1] * 1e4 + parts[2]
        };
    };

    /**
     * Returns `true` if `version` satisfies the given `range`.
     * See documentation for `Plugin.versionParse` for a description of the format.
     * If a version or range is not specified, then any version (`*`) is assumed to satisfy.
     * @method versionSatisfies
     * @param version {string} The version string.
     * @param range {string} The range string.
     * @return {boolean} `true` if `version` satisfies `range`, otherwise `false`.
     */
    Plugin.versionSatisfies = function(version, range) {
        range = range || '*';

        var rangeParsed = Plugin.versionParse(range),
            rangeParts = rangeParsed.parts,
            versionParsed = Plugin.versionParse(version),
            versionParts = versionParsed.parts;

        if (rangeParsed.isRange) {
            if (rangeParsed.operator === '*' || version === '*') {
                return true;
            }

            if (rangeParsed.operator === '~') {
                return versionParts[0] === rangeParts[0] && versionParts[1] === rangeParts[1] && versionParts[2] >= rangeParts[2];
            }

            if (rangeParsed.operator === '^') {
                if (rangeParts[0] > 0) {
                    return versionParts[0] === rangeParts[0] && versionParsed.number >= rangeParsed.number;
                }

                if (rangeParts[1] > 0) {
                    return versionParts[1] === rangeParts[1] && versionParts[2] >= rangeParts[2];
                }

                return versionParts[2] === rangeParts[2];
            }
        }

        return version === range || version === '*';
    };

})();

},{"./Common":14}],21:[function(_dereq_,module,exports){
/**
* The `Matter.Runner` module is an optional utility which provides a game loop, 
* that handles continuously updating a `Matter.Engine` for you within a browser.
* It is intended for development and debugging purposes, but may also be suitable for simple games.
* If you are using your own game loop instead, then you do not need the `Matter.Runner` module.
* Instead just call `Engine.update(engine, delta)` in your own loop.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Runner
*/

var Runner = {};

module.exports = Runner;

var Events = _dereq_('./Events');
var Engine = _dereq_('./Engine');
var Common = _dereq_('./Common');

(function() {

    var _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
   
        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }

    if (!_requestAnimationFrame) {
        var _frameTimeout;

        _requestAnimationFrame = function(callback){ 
            _frameTimeout = setTimeout(function() { 
                callback(Common.now()); 
            }, 1000 / 60);
        };

        _cancelAnimationFrame = function() {
            clearTimeout(_frameTimeout);
        };
    }

    /**
     * Creates a new Runner. The options parameter is an object that specifies any properties you wish to override the defaults.
     * @method create
     * @param {} options
     */
    Runner.create = function(options) {
        var defaults = {
            fps: 60,
            correction: 1,
            deltaSampleSize: 60,
            counterTimestamp: 0,
            frameCounter: 0,
            deltaHistory: [],
            timePrev: null,
            timeScalePrev: 1,
            frameRequestId: null,
            isFixed: false,
            enabled: true
        };

        var runner = Common.extend(defaults, options);

        runner.delta = runner.delta || 1000 / runner.fps;
        runner.deltaMin = runner.deltaMin || 1000 / runner.fps;
        runner.deltaMax = runner.deltaMax || 1000 / (runner.fps * 0.5);
        runner.fps = 1000 / runner.delta;

        return runner;
    };

    /**
     * Continuously ticks a `Matter.Engine` by calling `Runner.tick` on the `requestAnimationFrame` event.
     * @method run
     * @param {engine} engine
     */
    Runner.run = function(runner, engine) {
        // create runner if engine is first argument
        if (typeof runner.positionIterations !== 'undefined') {
            engine = runner;
            runner = Runner.create();
        }

        (function render(time){
            runner.frameRequestId = _requestAnimationFrame(render);

            if (time && runner.enabled) {
                Runner.tick(runner, engine, time);
            }
        })();

        return runner;
    };

    /**
     * A game loop utility that updates the engine and renderer by one step (a 'tick').
     * Features delta smoothing, time correction and fixed or dynamic timing.
     * Triggers `beforeTick`, `tick` and `afterTick` events on the engine.
     * Consider just `Engine.update(engine, delta)` if you're using your own loop.
     * @method tick
     * @param {runner} runner
     * @param {engine} engine
     * @param {number} time
     */
    Runner.tick = function(runner, engine, time) {
        var timing = engine.timing,
            correction = 1,
            delta;

        // create an event object
        var event = {
            timestamp: timing.timestamp
        };

        Events.trigger(runner, 'beforeTick', event);
        Events.trigger(engine, 'beforeTick', event); // @deprecated

        if (runner.isFixed) {
            // fixed timestep
            delta = runner.delta;
        } else {
            // dynamic timestep based on wall clock between calls
            delta = (time - runner.timePrev) || runner.delta;
            runner.timePrev = time;

            // optimistically filter delta over a few frames, to improve stability
            runner.deltaHistory.push(delta);
            runner.deltaHistory = runner.deltaHistory.slice(-runner.deltaSampleSize);
            delta = Math.min.apply(null, runner.deltaHistory);
            
            // limit delta
            delta = delta < runner.deltaMin ? runner.deltaMin : delta;
            delta = delta > runner.deltaMax ? runner.deltaMax : delta;

            // correction for delta
            correction = delta / runner.delta;

            // update engine timing object
            runner.delta = delta;
        }

        // time correction for time scaling
        if (runner.timeScalePrev !== 0)
            correction *= timing.timeScale / runner.timeScalePrev;

        if (timing.timeScale === 0)
            correction = 0;

        runner.timeScalePrev = timing.timeScale;
        runner.correction = correction;

        // fps counter
        runner.frameCounter += 1;
        if (time - runner.counterTimestamp >= 1000) {
            runner.fps = runner.frameCounter * ((time - runner.counterTimestamp) / 1000);
            runner.counterTimestamp = time;
            runner.frameCounter = 0;
        }

        Events.trigger(runner, 'tick', event);
        Events.trigger(engine, 'tick', event); // @deprecated

        // if world has been modified, clear the render scene graph
        if (engine.world.isModified 
            && engine.render
            && engine.render.controller
            && engine.render.controller.clear) {
            engine.render.controller.clear(engine.render); // @deprecated
        }

        // update
        Events.trigger(runner, 'beforeUpdate', event);
        Engine.update(engine, delta, correction);
        Events.trigger(runner, 'afterUpdate', event);

        // render
        // @deprecated
        if (engine.render && engine.render.controller) {
            Events.trigger(runner, 'beforeRender', event);
            Events.trigger(engine, 'beforeRender', event); // @deprecated

            engine.render.controller.world(engine.render);

            Events.trigger(runner, 'afterRender', event);
            Events.trigger(engine, 'afterRender', event); // @deprecated
        }

        Events.trigger(runner, 'afterTick', event);
        Events.trigger(engine, 'afterTick', event); // @deprecated
    };

    /**
     * Ends execution of `Runner.run` on the given `runner`, by canceling the animation frame request event loop.
     * If you wish to only temporarily pause the engine, see `engine.enabled` instead.
     * @method stop
     * @param {runner} runner
     */
    Runner.stop = function(runner) {
        _cancelAnimationFrame(runner.frameRequestId);
    };

    /**
     * Alias for `Runner.run`.
     * @method start
     * @param {runner} runner
     * @param {engine} engine
     */
    Runner.start = function(runner, engine) {
        Runner.run(runner, engine);
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired at the start of a tick, before any updates to the engine or timing
    *
    * @event beforeTick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine timing updated, but just before update
    *
    * @event tick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired at the end of a tick, after engine update and after rendering
    *
    * @event afterTick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired before update
    *
    * @event beforeUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after update
    *
    * @event afterUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired before rendering
    *
    * @event beforeRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    * @deprecated
    */

    /**
    * Fired after rendering
    *
    * @event afterRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    * @deprecated
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A flag that specifies whether the runner is running or not.
     *
     * @property enabled
     * @type boolean
     * @default true
     */

    /**
     * A `Boolean` that specifies if the runner should use a fixed timestep (otherwise it is variable).
     * If timing is fixed, then the apparent simulation speed will change depending on the frame rate (but behaviour will be deterministic).
     * If the timing is variable, then the apparent simulation speed will be constant (approximately, but at the cost of determininism).
     *
     * @property isFixed
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that specifies the time step between updates in milliseconds.
     * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
     * If it is `false`, then `delta` can dynamically change to maintain the correct apparent simulation speed.
     *
     * @property delta
     * @type number
     * @default 1000 / 60
     */

})();

},{"./Common":14,"./Engine":15,"./Events":16}],22:[function(_dereq_,module,exports){
/**
* The `Matter.Sleeping` module contains methods to manage the sleeping state of bodies.
*
* @class Sleeping
*/

var Sleeping = {};

module.exports = Sleeping;

var Events = _dereq_('./Events');

(function() {

    Sleeping._motionWakeThreshold = 0.18;
    Sleeping._motionSleepThreshold = 0.08;
    Sleeping._minBias = 0.9;

    /**
     * Puts bodies to sleep or wakes them up depending on their motion.
     * @method update
     * @param {body[]} bodies
     * @param {number} timeScale
     */
    Sleeping.update = function(bodies, timeScale) {
        var timeFactor = timeScale * timeScale * timeScale;

        // update bodies sleeping status
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                motion = body.speed * body.speed + body.angularSpeed * body.angularSpeed;

            // wake up bodies if they have a force applied
            if (body.force.x !== 0 || body.force.y !== 0) {
                Sleeping.set(body, false);
                continue;
            }

            var minMotion = Math.min(body.motion, motion),
                maxMotion = Math.max(body.motion, motion);
        
            // biased average motion estimation between frames
            body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
            
            if (body.sleepThreshold > 0 && body.motion < Sleeping._motionSleepThreshold * timeFactor) {
                body.sleepCounter += 1;
                
                if (body.sleepCounter >= body.sleepThreshold)
                    Sleeping.set(body, true);
            } else if (body.sleepCounter > 0) {
                body.sleepCounter -= 1;
            }
        }
    };

    /**
     * Given a set of colliding pairs, wakes the sleeping bodies involved.
     * @method afterCollisions
     * @param {pair[]} pairs
     * @param {number} timeScale
     */
    Sleeping.afterCollisions = function(pairs, timeScale) {
        var timeFactor = timeScale * timeScale * timeScale;

        // wake up bodies involved in collisions
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            
            // don't wake inactive pairs
            if (!pair.isActive)
                continue;

            var collision = pair.collision,
                bodyA = collision.bodyA.parent, 
                bodyB = collision.bodyB.parent;
        
            // don't wake if at least one body is static
            if ((bodyA.isSleeping && bodyB.isSleeping) || bodyA.isStatic || bodyB.isStatic)
                continue;
        
            if (bodyA.isSleeping || bodyB.isSleeping) {
                var sleepingBody = (bodyA.isSleeping && !bodyA.isStatic) ? bodyA : bodyB,
                    movingBody = sleepingBody === bodyA ? bodyB : bodyA;

                if (!sleepingBody.isStatic && movingBody.motion > Sleeping._motionWakeThreshold * timeFactor) {
                    Sleeping.set(sleepingBody, false);
                }
            }
        }
    };
  
    /**
     * Set a body as sleeping or awake.
     * @method set
     * @param {body} body
     * @param {boolean} isSleeping
     */
    Sleeping.set = function(body, isSleeping) {
        var wasSleeping = body.isSleeping;

        if (isSleeping) {
            body.isSleeping = true;
            body.sleepCounter = body.sleepThreshold;

            body.positionImpulse.x = 0;
            body.positionImpulse.y = 0;

            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;

            body.anglePrev = body.angle;
            body.speed = 0;
            body.angularSpeed = 0;
            body.motion = 0;

            if (!wasSleeping) {
                Events.trigger(body, 'sleepStart');
            }
        } else {
            body.isSleeping = false;
            body.sleepCounter = 0;

            if (wasSleeping) {
                Events.trigger(body, 'sleepEnd');
            }
        }
    };

})();

},{"./Events":16}],23:[function(_dereq_,module,exports){
(function (global){
/**
* The `Matter.Bodies` module contains factory methods for creating rigid body models 
* with commonly used body configurations (such as rectangles, circles and other polygons).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Bodies
*/

// TODO: true circle bodies

var Bodies = {};

module.exports = Bodies;

var Vertices = _dereq_('../geometry/Vertices');
var Common = _dereq_('../core/Common');
var Body = _dereq_('../body/Body');
var Bounds = _dereq_('../geometry/Bounds');
var Vector = _dereq_('../geometry/Vector');
var decomp = (typeof window !== "undefined" ? window['decomp'] : typeof global !== "undefined" ? global['decomp'] : null);

(function() {

    /**
     * Creates a new rigid body model with a rectangle hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method rectangle
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {object} [options]
     * @return {body} A new rectangle body
     */
    Bodies.rectangle = function(x, y, width, height, options) {
        options = options || {};

        var rectangle = { 
            label: 'Rectangle Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath('L 0 0 L ' + width + ' 0 L ' + width + ' ' + height + ' L 0 ' + height)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            rectangle.vertices = Vertices.chamfer(rectangle.vertices, chamfer.radius, 
                                    chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, rectangle, options));
    };
    
    /**
     * Creates a new rigid body model with a trapezoid hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method trapezoid
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} slope
     * @param {object} [options]
     * @return {body} A new trapezoid body
     */
    Bodies.trapezoid = function(x, y, width, height, slope, options) {
        options = options || {};

        slope *= 0.5;
        var roof = (1 - (slope * 2)) * width;
        
        var x1 = width * slope,
            x2 = x1 + roof,
            x3 = x2 + x1,
            verticesPath;

        if (slope < 0.5) {
            verticesPath = 'L 0 0 L ' + x1 + ' ' + (-height) + ' L ' + x2 + ' ' + (-height) + ' L ' + x3 + ' 0';
        } else {
            verticesPath = 'L 0 0 L ' + x2 + ' ' + (-height) + ' L ' + x3 + ' 0';
        }

        var trapezoid = { 
            label: 'Trapezoid Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath(verticesPath)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            trapezoid.vertices = Vertices.chamfer(trapezoid.vertices, chamfer.radius, 
                                    chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, trapezoid, options));
    };

    /**
     * Creates a new rigid body model with a circle hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method circle
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {object} [options]
     * @param {number} [maxSides]
     * @return {body} A new circle body
     */
    Bodies.circle = function(x, y, radius, options, maxSides) {
        options = options || {};

        var circle = {
            label: 'Circle Body',
            circleRadius: radius
        };
        
        // approximate circles with polygons until true circles implemented in SAT
        maxSides = maxSides || 25;
        var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));

        // optimisation: always use even number of sides (half the number of unique axes)
        if (sides % 2 === 1)
            sides += 1;

        return Bodies.polygon(x, y, sides, radius, Common.extend({}, circle, options));
    };

    /**
     * Creates a new rigid body model with a regular polygon hull with the given number of sides. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method polygon
     * @param {number} x
     * @param {number} y
     * @param {number} sides
     * @param {number} radius
     * @param {object} [options]
     * @return {body} A new regular polygon body
     */
    Bodies.polygon = function(x, y, sides, radius, options) {
        options = options || {};

        if (sides < 3)
            return Bodies.circle(x, y, radius, options);

        var theta = 2 * Math.PI / sides,
            path = '',
            offset = theta * 0.5;

        for (var i = 0; i < sides; i += 1) {
            var angle = offset + (i * theta),
                xx = Math.cos(angle) * radius,
                yy = Math.sin(angle) * radius;

            path += 'L ' + xx.toFixed(3) + ' ' + yy.toFixed(3) + ' ';
        }

        var polygon = { 
            label: 'Polygon Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath(path)
        };

        if (options.chamfer) {
            var chamfer = options.chamfer;
            polygon.vertices = Vertices.chamfer(polygon.vertices, chamfer.radius, 
                                    chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
            delete options.chamfer;
        }

        return Body.create(Common.extend({}, polygon, options));
    };

    /**
     * Creates a body using the supplied vertices (or an array containing multiple sets of vertices).
     * If the vertices are convex, they will pass through as supplied.
     * Otherwise if the vertices are concave, they will be decomposed if [poly-decomp.js](https://github.com/schteppe/poly-decomp.js) is available.
     * Note that this process is not guaranteed to support complex sets of vertices (e.g. those with holes may fail).
     * By default the decomposition will discard collinear edges (to improve performance).
     * It can also optionally discard any parts that have an area less than `minimumArea`.
     * If the vertices can not be decomposed, the result will fall back to using the convex hull.
     * The options parameter is an object that specifies any `Matter.Body` properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method fromVertices
     * @param {number} x
     * @param {number} y
     * @param [[vector]] vertexSets
     * @param {object} [options]
     * @param {bool} [flagInternal=false]
     * @param {number} [removeCollinear=0.01]
     * @param {number} [minimumArea=10]
     * @return {body}
     */
    Bodies.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea) {
        var body,
            parts,
            isConvex,
            vertices,
            i,
            j,
            k,
            v,
            z;

        options = options || {};
        parts = [];

        flagInternal = typeof flagInternal !== 'undefined' ? flagInternal : false;
        removeCollinear = typeof removeCollinear !== 'undefined' ? removeCollinear : 0.01;
        minimumArea = typeof minimumArea !== 'undefined' ? minimumArea : 10;

        if (!decomp) {
            Common.warn('Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.');
        }

        // ensure vertexSets is an array of arrays
        if (!Common.isArray(vertexSets[0])) {
            vertexSets = [vertexSets];
        }

        for (v = 0; v < vertexSets.length; v += 1) {
            vertices = vertexSets[v];
            isConvex = Vertices.isConvex(vertices);

            if (isConvex || !decomp) {
                if (isConvex) {
                    vertices = Vertices.clockwiseSort(vertices);
                } else {
                    // fallback to convex hull when decomposition is not possible
                    vertices = Vertices.hull(vertices);
                }

                parts.push({
                    position: { x: x, y: y },
                    vertices: vertices
                });
            } else {
                // initialise a decomposition
                var concave = vertices.map(function(vertex) {
                    return [vertex.x, vertex.y];
                });

                // vertices are concave and simple, we can decompose into parts
                decomp.makeCCW(concave);
                if (removeCollinear !== false)
                    decomp.removeCollinearPoints(concave, removeCollinear);

                // use the quick decomposition algorithm (Bayazit)
                var decomposed = decomp.quickDecomp(concave);

                // for each decomposed chunk
                for (i = 0; i < decomposed.length; i++) {
                    var chunk = decomposed[i];

                    // convert vertices into the correct structure
                    var chunkVertices = chunk.map(function(vertices) {
                        return {
                            x: vertices[0],
                            y: vertices[1]
                        };
                    });

                    // skip small chunks
                    if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea)
                        continue;

                    // create a compound part
                    parts.push({
                        position: Vertices.centre(chunkVertices),
                        vertices: chunkVertices
                    });
                }
            }
        }

        // create body parts
        for (i = 0; i < parts.length; i++) {
            parts[i] = Body.create(Common.extend(parts[i], options));
        }

        // flag internal edges (coincident part edges)
        if (flagInternal) {
            var coincident_max_dist = 5;

            for (i = 0; i < parts.length; i++) {
                var partA = parts[i];

                for (j = i + 1; j < parts.length; j++) {
                    var partB = parts[j];

                    if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                        var pav = partA.vertices,
                            pbv = partB.vertices;

                        // iterate vertices of both parts
                        for (k = 0; k < partA.vertices.length; k++) {
                            for (z = 0; z < partB.vertices.length; z++) {
                                // find distances between the vertices
                                var da = Vector.magnitudeSquared(Vector.sub(pav[(k + 1) % pav.length], pbv[z])),
                                    db = Vector.magnitudeSquared(Vector.sub(pav[k], pbv[(z + 1) % pbv.length]));

                                // if both vertices are very close, consider the edge concident (internal)
                                if (da < coincident_max_dist && db < coincident_max_dist) {
                                    pav[k].isInternal = true;
                                    pbv[z].isInternal = true;
                                }
                            }
                        }

                    }
                }
            }
        }

        if (parts.length > 1) {
            // create the parent body to be returned, that contains generated compound parts
            body = Body.create(Common.extend({ parts: parts.slice(0) }, options));
            Body.setPosition(body, { x: x, y: y });

            return body;
        } else {
            return parts[0];
        }
    };

})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../body/Body":1,"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],24:[function(_dereq_,module,exports){
/**
* The `Matter.Composites` module contains factory methods for creating composite bodies
* with commonly used configurations (such as stacks and chains).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Composites
*/

var Composites = {};

module.exports = Composites;

var Composite = _dereq_('../body/Composite');
var Constraint = _dereq_('../constraint/Constraint');
var Common = _dereq_('../core/Common');
var Body = _dereq_('../body/Body');
var Bodies = _dereq_('./Bodies');

(function() {

    /**
     * Create a new composite containing bodies created in the callback in a grid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method stack
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.stack = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
        var stack = Composite.create({ label: 'Stack' }),
            x = xx,
            y = yy,
            lastBody,
            i = 0;

        for (var row = 0; row < rows; row++) {
            var maxHeight = 0;
            
            for (var column = 0; column < columns; column++) {
                var body = callback(x, y, column, row, lastBody, i);
                    
                if (body) {
                    var bodyHeight = body.bounds.max.y - body.bounds.min.y,
                        bodyWidth = body.bounds.max.x - body.bounds.min.x; 

                    if (bodyHeight > maxHeight)
                        maxHeight = bodyHeight;
                    
                    Body.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });

                    x = body.bounds.max.x + columnGap;

                    Composite.addBody(stack, body);
                    
                    lastBody = body;
                    i += 1;
                } else {
                    x += columnGap;
                }
            }
            
            y += maxHeight + rowGap;
            x = xx;
        }

        return stack;
    };
    
    /**
     * Chains all bodies in the given composite together using constraints.
     * @method chain
     * @param {composite} composite
     * @param {number} xOffsetA
     * @param {number} yOffsetA
     * @param {number} xOffsetB
     * @param {number} yOffsetB
     * @param {object} options
     * @return {composite} A new composite containing objects chained together with constraints
     */
    Composites.chain = function(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
        var bodies = composite.bodies;
        
        for (var i = 1; i < bodies.length; i++) {
            var bodyA = bodies[i - 1],
                bodyB = bodies[i],
                bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y,
                bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x, 
                bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y,
                bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;
        
            var defaults = {
                bodyA: bodyA,
                pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                bodyB: bodyB,
                pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
            };
            
            var constraint = Common.extend(defaults, options);
        
            Composite.addConstraint(composite, Constraint.create(constraint));
        }

        composite.label += ' Chain';
        
        return composite;
    };

    /**
     * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
     * @method mesh
     * @param {composite} composite
     * @param {number} columns
     * @param {number} rows
     * @param {boolean} crossBrace
     * @param {object} options
     * @return {composite} The composite containing objects meshed together with constraints
     */
    Composites.mesh = function(composite, columns, rows, crossBrace, options) {
        var bodies = composite.bodies,
            row,
            col,
            bodyA,
            bodyB,
            bodyC;
        
        for (row = 0; row < rows; row++) {
            for (col = 1; col < columns; col++) {
                bodyA = bodies[(col - 1) + (row * columns)];
                bodyB = bodies[col + (row * columns)];
                Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));
            }

            if (row > 0) {
                for (col = 0; col < columns; col++) {
                    bodyA = bodies[col + ((row - 1) * columns)];
                    bodyB = bodies[col + (row * columns)];
                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));

                    if (crossBrace && col > 0) {
                        bodyC = bodies[(col - 1) + ((row - 1) * columns)];
                        Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
                    }

                    if (crossBrace && col < columns - 1) {
                        bodyC = bodies[(col + 1) + ((row - 1) * columns)];
                        Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
                    }
                }
            }
        }

        composite.label += ' Mesh';
        
        return composite;
    };
    
    /**
     * Create a new composite containing bodies created in the callback in a pyramid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method pyramid
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */
    Composites.pyramid = function(xx, yy, columns, rows, columnGap, rowGap, callback) {
        return Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y, column, row, lastBody, i) {
            var actualRows = Math.min(rows, Math.ceil(columns / 2)),
                lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;
            
            if (row > actualRows)
                return;
            
            // reverse row order
            row = actualRows - row;
            
            var start = row,
                end = columns - 1 - row;

            if (column < start || column > end)
                return;
            
            // retroactively fix the first body's position, since width was unknown
            if (i === 1) {
                Body.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
            }

            var xOffset = lastBody ? column * lastBodyWidth : 0;
            
            return callback(xx + xOffset + column * columnGap, y, column, row, lastBody, i);
        });
    };

    /**
     * Creates a composite with a Newton's Cradle setup of bodies and constraints.
     * @method newtonsCradle
     * @param {number} xx
     * @param {number} yy
     * @param {number} number
     * @param {number} size
     * @param {number} length
     * @return {composite} A new composite newtonsCradle body
     */
    Composites.newtonsCradle = function(xx, yy, number, size, length) {
        var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

        for (var i = 0; i < number; i++) {
            var separation = 1.9,
                circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
                            { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1 }),
                constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });

            Composite.addBody(newtonsCradle, circle);
            Composite.addConstraint(newtonsCradle, constraint);
        }

        return newtonsCradle;
    };
    
    /**
     * Creates a composite with simple car setup of bodies and constraints.
     * @method car
     * @param {number} xx
     * @param {number} yy
     * @param {number} width
     * @param {number} height
     * @param {number} wheelSize
     * @return {composite} A new composite car body
     */
    Composites.car = function(xx, yy, width, height, wheelSize) {
        var group = Body.nextGroup(true),
            wheelBase = 20,
            wheelAOffset = -width * 0.5 + wheelBase,
            wheelBOffset = width * 0.5 - wheelBase,
            wheelYOffset = 0;
    
        var car = Composite.create({ label: 'Car' }),
            body = Bodies.rectangle(xx, yy, width, height, { 
                collisionFilter: {
                    group: group
                },
                chamfer: {
                    radius: height * 0.5
                },
                density: 0.0002
            });
    
        var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
            collisionFilter: {
                group: group
            },
            friction: 0.8
        });
                    
        var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
            collisionFilter: {
                group: group
            },
            friction: 0.8
        });
                    
        var axelA = Constraint.create({
            bodyB: body,
            pointB: { x: wheelAOffset, y: wheelYOffset },
            bodyA: wheelA,
            stiffness: 1,
            length: 0
        });
                        
        var axelB = Constraint.create({
            bodyB: body,
            pointB: { x: wheelBOffset, y: wheelYOffset },
            bodyA: wheelB,
            stiffness: 1,
            length: 0
        });
        
        Composite.addBody(car, body);
        Composite.addBody(car, wheelA);
        Composite.addBody(car, wheelB);
        Composite.addConstraint(car, axelA);
        Composite.addConstraint(car, axelB);

        return car;
    };

    /**
     * Creates a simple soft body like object.
     * @method softBody
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {boolean} crossBrace
     * @param {number} particleRadius
     * @param {} particleOptions
     * @param {} constraintOptions
     * @return {composite} A new composite softBody
     */
    Composites.softBody = function(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
        particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
        constraintOptions = Common.extend({ stiffness: 0.2, render: { type: 'line', anchors: false } }, constraintOptions);

        var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
            return Bodies.circle(x, y, particleRadius, particleOptions);
        });

        Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);

        softBody.label = 'Soft Body';

        return softBody;
    };

})();

},{"../body/Body":1,"../body/Composite":2,"../constraint/Constraint":12,"../core/Common":14,"./Bodies":23}],25:[function(_dereq_,module,exports){
/**
* The `Matter.Axes` module contains methods for creating and manipulating sets of axes.
*
* @class Axes
*/

var Axes = {};

module.exports = Axes;

var Vector = _dereq_('../geometry/Vector');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a new set of axes from the given vertices.
     * @method fromVertices
     * @param {vertices} vertices
     * @return {axes} A new axes from the given vertices
     */
    Axes.fromVertices = function(vertices) {
        var axes = {};

        // find the unique axes, using edge normal gradients
        for (var i = 0; i < vertices.length; i++) {
            var j = (i + 1) % vertices.length, 
                normal = Vector.normalise({ 
                    x: vertices[j].y - vertices[i].y, 
                    y: vertices[i].x - vertices[j].x
                }),
                gradient = (normal.y === 0) ? Infinity : (normal.x / normal.y);
            
            // limit precision
            gradient = gradient.toFixed(3).toString();
            axes[gradient] = normal;
        }

        return Common.values(axes);
    };

    /**
     * Rotates a set of axes by the given angle.
     * @method rotate
     * @param {axes} axes
     * @param {number} angle
     */
    Axes.rotate = function(axes, angle) {
        if (angle === 0)
            return;
        
        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i],
                xx;
            xx = axis.x * cos - axis.y * sin;
            axis.y = axis.x * sin + axis.y * cos;
            axis.x = xx;
        }
    };

})();

},{"../core/Common":14,"../geometry/Vector":28}],26:[function(_dereq_,module,exports){
/**
* The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
*
* @class Bounds
*/

var Bounds = {};

module.exports = Bounds;

(function() {

    /**
     * Creates a new axis-aligned bounding box (AABB) for the given vertices.
     * @method create
     * @param {vertices} vertices
     * @return {bounds} A new bounds object
     */
    Bounds.create = function(vertices) {
        var bounds = { 
            min: { x: 0, y: 0 }, 
            max: { x: 0, y: 0 }
        };

        if (vertices)
            Bounds.update(bounds, vertices);
        
        return bounds;
    };

    /**
     * Updates bounds using the given vertices and extends the bounds given a velocity.
     * @method update
     * @param {bounds} bounds
     * @param {vertices} vertices
     * @param {vector} velocity
     */
    Bounds.update = function(bounds, vertices, velocity) {
        bounds.min.x = Infinity;
        bounds.max.x = -Infinity;
        bounds.min.y = Infinity;
        bounds.max.y = -Infinity;

        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
            if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
            if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
            if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
        }
        
        if (velocity) {
            if (velocity.x > 0) {
                bounds.max.x += velocity.x;
            } else {
                bounds.min.x += velocity.x;
            }
            
            if (velocity.y > 0) {
                bounds.max.y += velocity.y;
            } else {
                bounds.min.y += velocity.y;
            }
        }
    };

    /**
     * Returns true if the bounds contains the given point.
     * @method contains
     * @param {bounds} bounds
     * @param {vector} point
     * @return {boolean} True if the bounds contain the point, otherwise false
     */
    Bounds.contains = function(bounds, point) {
        return point.x >= bounds.min.x && point.x <= bounds.max.x 
               && point.y >= bounds.min.y && point.y <= bounds.max.y;
    };

    /**
     * Returns true if the two bounds intersect.
     * @method overlaps
     * @param {bounds} boundsA
     * @param {bounds} boundsB
     * @return {boolean} True if the bounds overlap, otherwise false
     */
    Bounds.overlaps = function(boundsA, boundsB) {
        return (boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x
                && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y);
    };

    /**
     * Translates the bounds by the given vector.
     * @method translate
     * @param {bounds} bounds
     * @param {vector} vector
     */
    Bounds.translate = function(bounds, vector) {
        bounds.min.x += vector.x;
        bounds.max.x += vector.x;
        bounds.min.y += vector.y;
        bounds.max.y += vector.y;
    };

    /**
     * Shifts the bounds to the given position.
     * @method shift
     * @param {bounds} bounds
     * @param {vector} position
     */
    Bounds.shift = function(bounds, position) {
        var deltaX = bounds.max.x - bounds.min.x,
            deltaY = bounds.max.y - bounds.min.y;
            
        bounds.min.x = position.x;
        bounds.max.x = position.x + deltaX;
        bounds.min.y = position.y;
        bounds.max.y = position.y + deltaY;
    };
    
})();

},{}],27:[function(_dereq_,module,exports){
/**
* The `Matter.Svg` module contains methods for converting SVG images into an array of vector points.
*
* To use this module you also need the SVGPathSeg polyfill: https://github.com/progers/pathseg
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Svg
*/

var Svg = {};

module.exports = Svg;

var Bounds = _dereq_('../geometry/Bounds');

(function() {

    /**
     * Converts an SVG path into an array of vector points.
     * If the input path forms a concave shape, you must decompose the result into convex parts before use.
     * See `Bodies.fromVertices` which provides support for this.
     * Note that this function is not guaranteed to support complex paths (such as those with holes).
     * @method pathToVertices
     * @param {SVGPathElement} path
     * @param {Number} [sampleLength=15]
     * @return {Vector[]} points
     */
    Svg.pathToVertices = function(path, sampleLength) {
        // https://github.com/wout/svg.topoly.js/blob/master/svg.topoly.js
        var i, il, total, point, segment, segments, 
            segmentsQueue, lastSegment, 
            lastPoint, segmentIndex, points = [],
            lx, ly, length = 0, x = 0, y = 0;

        sampleLength = sampleLength || 15;

        var addPoint = function(px, py, pathSegType) {
            // all odd-numbered path types are relative except PATHSEG_CLOSEPATH (1)
            var isRelative = pathSegType % 2 === 1 && pathSegType > 1;

            // when the last point doesn't equal the current point add the current point
            if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                if (lastPoint && isRelative) {
                    lx = lastPoint.x;
                    ly = lastPoint.y;
                } else {
                    lx = 0;
                    ly = 0;
                }

                var point = {
                    x: lx + px,
                    y: ly + py
                };

                // set last point
                if (isRelative || !lastPoint) {
                    lastPoint = point;
                }

                points.push(point);

                x = lx + px;
                y = ly + py;
            }
        };

        var addSegmentPoint = function(segment) {
            var segType = segment.pathSegTypeAsLetter.toUpperCase();

            // skip path ends
            if (segType === 'Z') 
                return;

            // map segment to x and y
            switch (segType) {

            case 'M':
            case 'L':
            case 'T':
            case 'C':
            case 'S':
            case 'Q':
                x = segment.x;
                y = segment.y;
                break;
            case 'H':
                x = segment.x;
                break;
            case 'V':
                y = segment.y;
                break;
            }

            addPoint(x, y, segment.pathSegType);
        };

        // ensure path is absolute
        Svg._svgPathToAbsolute(path);

        // get total length
        total = path.getTotalLength();

        // queue segments
        segments = [];
        for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
            segments.push(path.pathSegList.getItem(i));

        segmentsQueue = segments.concat();

        // sample through path
        while (length < total) {
            // get segment at position
            segmentIndex = path.getPathSegAtLength(length);
            segment = segments[segmentIndex];

            // new segment
            if (segment != lastSegment) {
                while (segmentsQueue.length && segmentsQueue[0] != segment)
                    addSegmentPoint(segmentsQueue.shift());

                lastSegment = segment;
            }

            // add points in between when curving
            // TODO: adaptive sampling
            switch (segment.pathSegTypeAsLetter.toUpperCase()) {

            case 'C':
            case 'T':
            case 'S':
            case 'Q':
            case 'A':
                point = path.getPointAtLength(length);
                addPoint(point.x, point.y, 0);
                break;

            }

            // increment by sample value
            length += sampleLength;
        }

        // add remaining segments not passed by sampling
        for (i = 0, il = segmentsQueue.length; i < il; ++i)
            addSegmentPoint(segmentsQueue[i]);

        return points;
    };

    Svg._svgPathToAbsolute = function(path) {
        // http://phrogz.net/convert-svg-path-to-all-absolute-commands
        // Copyright (c) Gavin Kistner
        // http://phrogz.net/js/_ReuseLicense.txt
        // Modifications: tidy formatting and naming
        var x0, y0, x1, y1, x2, y2, segs = path.pathSegList,
            x = 0, y = 0, len = segs.numberOfItems;

        for (var i = 0; i < len; ++i) {
            var seg = segs.getItem(i),
                segType = seg.pathSegTypeAsLetter;

            if (/[MLHVCSQTA]/.test(segType)) {
                if ('x' in seg) x = seg.x;
                if ('y' in seg) y = seg.y;
            } else {
                if ('x1' in seg) x1 = x + seg.x1;
                if ('x2' in seg) x2 = x + seg.x2;
                if ('y1' in seg) y1 = y + seg.y1;
                if ('y2' in seg) y2 = y + seg.y2;
                if ('x' in seg) x += seg.x;
                if ('y' in seg) y += seg.y;

                switch (segType) {

                case 'm':
                    segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
                    break;
                case 'l':
                    segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
                    break;
                case 'h':
                    segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
                    break;
                case 'v':
                    segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
                    break;
                case 'c':
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
                    break;
                case 's':
                    segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
                    break;
                case 'q':
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
                    break;
                case 't':
                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
                    break;
                case 'a':
                    segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                    break;
                case 'z':
                case 'Z':
                    x = x0;
                    y = y0;
                    break;

                }
            }

            if (segType == 'M' || segType == 'm') {
                x0 = x;
                y0 = y;
            }
        }
    };

})();
},{"../geometry/Bounds":26}],28:[function(_dereq_,module,exports){
/**
* The `Matter.Vector` module contains methods for creating and manipulating vectors.
* Vectors are the basis of all the geometry related operations in the engine.
* A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vector
*/

// TODO: consider params for reusing vector objects

var Vector = {};

module.exports = Vector;

(function() {

    /**
     * Creates a new vector.
     * @method create
     * @param {number} x
     * @param {number} y
     * @return {vector} A new vector
     */
    Vector.create = function(x, y) {
        return { x: x || 0, y: y || 0 };
    };

    /**
     * Returns a new vector with `x` and `y` copied from the given `vector`.
     * @method clone
     * @param {vector} vector
     * @return {vector} A new cloned vector
     */
    Vector.clone = function(vector) {
        return { x: vector.x, y: vector.y };
    };

    /**
     * Returns the magnitude (length) of a vector.
     * @method magnitude
     * @param {vector} vector
     * @return {number} The magnitude of the vector
     */
    Vector.magnitude = function(vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    };

    /**
     * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
     * @method magnitudeSquared
     * @param {vector} vector
     * @return {number} The squared magnitude of the vector
     */
    Vector.magnitudeSquared = function(vector) {
        return (vector.x * vector.x) + (vector.y * vector.y);
    };

    /**
     * Rotates the vector about (0, 0) by specified angle.
     * @method rotate
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} [output]
     * @return {vector} The vector rotated about (0, 0)
     */
    Vector.rotate = function(vector, angle, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = vector.x * cos - vector.y * sin;
        output.y = vector.x * sin + vector.y * cos;
        output.x = x;
        return output;
    };

    /**
     * Rotates the vector about a specified point by specified angle.
     * @method rotateAbout
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} point
     * @param {vector} [output]
     * @return {vector} A new vector rotated about the point
     */
    Vector.rotateAbout = function(vector, angle, point, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
        output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
        output.x = x;
        return output;
    };

    /**
     * Normalises a vector (such that its magnitude is `1`).
     * @method normalise
     * @param {vector} vector
     * @return {vector} A new vector normalised
     */
    Vector.normalise = function(vector) {
        var magnitude = Vector.magnitude(vector);
        if (magnitude === 0)
            return { x: 0, y: 0 };
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    };

    /**
     * Returns the dot-product of two vectors.
     * @method dot
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The dot product of the two vectors
     */
    Vector.dot = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    };

    /**
     * Returns the cross-product of two vectors.
     * @method cross
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The cross product of the two vectors
     */
    Vector.cross = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
    };

    /**
     * Returns the cross-product of three vectors.
     * @method cross3
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} vectorC
     * @return {number} The cross product of the three vectors
     */
    Vector.cross3 = function(vectorA, vectorB, vectorC) {
        return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
    };

    /**
     * Adds the two vectors.
     * @method add
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB added
     */
    Vector.add = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x + vectorB.x;
        output.y = vectorA.y + vectorB.y;
        return output;
    };

    /**
     * Subtracts the two vectors.
     * @method sub
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB subtracted
     */
    Vector.sub = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x - vectorB.x;
        output.y = vectorA.y - vectorB.y;
        return output;
    };

    /**
     * Multiplies a vector and a scalar.
     * @method mult
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector multiplied by scalar
     */
    Vector.mult = function(vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    };

    /**
     * Divides a vector and a scalar.
     * @method div
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector divided by scalar
     */
    Vector.div = function(vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    };

    /**
     * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
     * @method perp
     * @param {vector} vector
     * @param {bool} [negate=false]
     * @return {vector} The perpendicular vector
     */
    Vector.perp = function(vector, negate) {
        negate = negate === true ? -1 : 1;
        return { x: negate * -vector.y, y: negate * vector.x };
    };

    /**
     * Negates both components of a vector such that it points in the opposite direction.
     * @method neg
     * @param {vector} vector
     * @return {vector} The negated vector
     */
    Vector.neg = function(vector) {
        return { x: -vector.x, y: -vector.y };
    };

    /**
     * Returns the angle in radians between the two vectors relative to the x-axis.
     * @method angle
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The angle in radians
     */
    Vector.angle = function(vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    };

    /**
     * Temporary vector pool (not thread-safe).
     * @property _temp
     * @type {vector[]}
     * @private
     */
    Vector._temp = [
        Vector.create(), Vector.create(), 
        Vector.create(), Vector.create(), 
        Vector.create(), Vector.create()
    ];

})();
},{}],29:[function(_dereq_,module,exports){
/**
* The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
* A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
* A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vertices
*/

var Vertices = {};

module.exports = Vertices;

var Vector = _dereq_('../geometry/Vector');
var Common = _dereq_('../core/Common');

(function() {

    /**
     * Creates a new set of `Matter.Body` compatible vertices.
     * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
     * but with some additional references required for efficient collision detection routines.
     *
     * Vertices must be specified in clockwise order.
     *
     * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
     *
     * @method create
     * @param {vector[]} points
     * @param {body} body
     */
    Vertices.create = function(points, body) {
        var vertices = [];

        for (var i = 0; i < points.length; i++) {
            var point = points[i],
                vertex = {
                    x: point.x,
                    y: point.y,
                    index: i,
                    body: body,
                    isInternal: false
                };

            vertices.push(vertex);
        }

        return vertices;
    };

    /**
     * Parses a string containing ordered x y pairs separated by spaces (and optionally commas), 
     * into a `Matter.Vertices` object for the given `Matter.Body`.
     * For parsing SVG paths, see `Svg.pathToVertices`.
     * @method fromPath
     * @param {string} path
     * @param {body} body
     * @return {vertices} vertices
     */
    Vertices.fromPath = function(path, body) {
        var pathPattern = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/ig,
            points = [];

        path.replace(pathPattern, function(match, x, y) {
            points.push({ x: parseFloat(x), y: parseFloat(y) });
        });

        return Vertices.create(points, body);
    };

    /**
     * Returns the centre (centroid) of the set of vertices.
     * @method centre
     * @param {vertices} vertices
     * @return {vector} The centre point
     */
    Vertices.centre = function(vertices) {
        var area = Vertices.area(vertices, true),
            centre = { x: 0, y: 0 },
            cross,
            temp,
            j;

        for (var i = 0; i < vertices.length; i++) {
            j = (i + 1) % vertices.length;
            cross = Vector.cross(vertices[i], vertices[j]);
            temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
            centre = Vector.add(centre, temp);
        }

        return Vector.div(centre, 6 * area);
    };

    /**
     * Returns the average (mean) of the set of vertices.
     * @method mean
     * @param {vertices} vertices
     * @return {vector} The average point
     */
    Vertices.mean = function(vertices) {
        var average = { x: 0, y: 0 };

        for (var i = 0; i < vertices.length; i++) {
            average.x += vertices[i].x;
            average.y += vertices[i].y;
        }

        return Vector.div(average, vertices.length);
    };

    /**
     * Returns the area of the set of vertices.
     * @method area
     * @param {vertices} vertices
     * @param {bool} signed
     * @return {number} The area
     */
    Vertices.area = function(vertices, signed) {
        var area = 0,
            j = vertices.length - 1;

        for (var i = 0; i < vertices.length; i++) {
            area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
            j = i;
        }

        if (signed)
            return area / 2;

        return Math.abs(area) / 2;
    };

    /**
     * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
     * @method inertia
     * @param {vertices} vertices
     * @param {number} mass
     * @return {number} The polygon's moment of inertia
     */
    Vertices.inertia = function(vertices, mass) {
        var numerator = 0,
            denominator = 0,
            v = vertices,
            cross,
            j;

        // find the polygon's moment of inertia, using second moment of area
        // from equations at http://www.physicsforums.com/showthread.php?t=25293
        for (var n = 0; n < v.length; n++) {
            j = (n + 1) % v.length;
            cross = Math.abs(Vector.cross(v[j], v[n]));
            numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
            denominator += cross;
        }

        return (mass / 6) * (numerator / denominator);
    };

    /**
     * Translates the set of vertices in-place.
     * @method translate
     * @param {vertices} vertices
     * @param {vector} vector
     * @param {number} scalar
     */
    Vertices.translate = function(vertices, vector, scalar) {
        var i;
        if (scalar) {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x * scalar;
                vertices[i].y += vector.y * scalar;
            }
        } else {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x;
                vertices[i].y += vector.y;
            }
        }

        return vertices;
    };

    /**
     * Rotates the set of vertices in-place.
     * @method rotate
     * @param {vertices} vertices
     * @param {number} angle
     * @param {vector} point
     */
    Vertices.rotate = function(vertices, angle, point) {
        if (angle === 0)
            return;

        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                dx = vertice.x - point.x,
                dy = vertice.y - point.y;
                
            vertice.x = point.x + (dx * cos - dy * sin);
            vertice.y = point.y + (dx * sin + dy * cos);
        }

        return vertices;
    };

    /**
     * Returns `true` if the `point` is inside the set of `vertices`.
     * @method contains
     * @param {vertices} vertices
     * @param {vector} point
     * @return {boolean} True if the vertices contains point, otherwise false
     */
    Vertices.contains = function(vertices, point) {
        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                nextVertice = vertices[(i + 1) % vertices.length];
            if ((point.x - vertice.x) * (nextVertice.y - vertice.y) + (point.y - vertice.y) * (vertice.x - nextVertice.x) > 0) {
                return false;
            }
        }

        return true;
    };

    /**
     * Scales the vertices from a point (default is centre) in-place.
     * @method scale
     * @param {vertices} vertices
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     */
    Vertices.scale = function(vertices, scaleX, scaleY, point) {
        if (scaleX === 1 && scaleY === 1)
            return vertices;

        point = point || Vertices.centre(vertices);

        var vertex,
            delta;

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            delta = Vector.sub(vertex, point);
            vertices[i].x = point.x + delta.x * scaleX;
            vertices[i].y = point.y + delta.y * scaleY;
        }

        return vertices;
    };

    /**
     * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
     * The radius parameter is a single number or an array to specify the radius for each vertex.
     * @method chamfer
     * @param {vertices} vertices
     * @param {number[]} radius
     * @param {number} quality
     * @param {number} qualityMin
     * @param {number} qualityMax
     */
    Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
        if (typeof radius === 'number') {
            radius = [radius];
        } else {
            radius = radius || [8];
        }

        // quality defaults to -1, which is auto
        quality = (typeof quality !== 'undefined') ? quality : -1;
        qualityMin = qualityMin || 2;
        qualityMax = qualityMax || 14;

        var newVertices = [];

        for (var i = 0; i < vertices.length; i++) {
            var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
                vertex = vertices[i],
                nextVertex = vertices[(i + 1) % vertices.length],
                currentRadius = radius[i < radius.length ? i : radius.length - 1];

            if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
            }

            var prevNormal = Vector.normalise({ 
                x: vertex.y - prevVertex.y, 
                y: prevVertex.x - vertex.x
            });

            var nextNormal = Vector.normalise({ 
                x: nextVertex.y - vertex.y, 
                y: vertex.x - nextVertex.x
            });

            var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)),
                radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius),
                midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)),
                scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));

            var precision = quality;

            if (quality === -1) {
                // automatically decide precision
                precision = Math.pow(currentRadius, 0.32) * 1.75;
            }

            precision = Common.clamp(precision, qualityMin, qualityMax);

            // use an even value for precision, more likely to reduce axes by using symmetry
            if (precision % 2 === 1)
                precision += 1;

            var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)),
                theta = alpha / precision;

            for (var j = 0; j < precision; j++) {
                newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
            }
        }

        return newVertices;
    };

    /**
     * Sorts the input vertices into clockwise order in place.
     * @method clockwiseSort
     * @param {vertices} vertices
     * @return {vertices} vertices
     */
    Vertices.clockwiseSort = function(vertices) {
        var centre = Vertices.mean(vertices);

        vertices.sort(function(vertexA, vertexB) {
            return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
        });

        return vertices;
    };

    /**
     * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
     * @method isConvex
     * @param {vertices} vertices
     * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
     */
    Vertices.isConvex = function(vertices) {
        // http://paulbourke.net/geometry/polygonmesh/
        // Copyright (c) Paul Bourke (use permitted)

        var flag = 0,
            n = vertices.length,
            i,
            j,
            k,
            z;

        if (n < 3)
            return null;

        for (i = 0; i < n; i++) {
            j = (i + 1) % n;
            k = (i + 2) % n;
            z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
            z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);

            if (z < 0) {
                flag |= 1;
            } else if (z > 0) {
                flag |= 2;
            }

            if (flag === 3) {
                return false;
            }
        }

        if (flag !== 0){
            return true;
        } else {
            return null;
        }
    };

    /**
     * Returns the convex hull of the input vertices as a new array of points.
     * @method hull
     * @param {vertices} vertices
     * @return [vertex] vertices
     */
    Vertices.hull = function(vertices) {
        // http://geomalgorithms.com/a10-_hull-1.html

        var upper = [],
            lower = [], 
            vertex,
            i;

        // sort vertices on x-axis (y-axis for ties)
        vertices = vertices.slice(0);
        vertices.sort(function(vertexA, vertexB) {
            var dx = vertexA.x - vertexB.x;
            return dx !== 0 ? dx : vertexA.y - vertexB.y;
        });

        // build lower hull
        for (i = 0; i < vertices.length; i += 1) {
            vertex = vertices[i];

            while (lower.length >= 2 
                   && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                lower.pop();
            }

            lower.push(vertex);
        }

        // build upper hull
        for (i = vertices.length - 1; i >= 0; i -= 1) {
            vertex = vertices[i];

            while (upper.length >= 2 
                   && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                upper.pop();
            }

            upper.push(vertex);
        }

        // concatenation of the lower and upper hulls gives the convex hull
        // omit last points because they are repeated at the beginning of the other list
        upper.pop();
        lower.pop();

        return upper.concat(lower);
    };

})();

},{"../core/Common":14,"../geometry/Vector":28}],30:[function(_dereq_,module,exports){
var Matter = module.exports = _dereq_('../core/Matter');

Matter.Body = _dereq_('../body/Body');
Matter.Composite = _dereq_('../body/Composite');
Matter.World = _dereq_('../body/World');

Matter.Contact = _dereq_('../collision/Contact');
Matter.Detector = _dereq_('../collision/Detector');
Matter.Grid = _dereq_('../collision/Grid');
Matter.Pairs = _dereq_('../collision/Pairs');
Matter.Pair = _dereq_('../collision/Pair');
Matter.Query = _dereq_('../collision/Query');
Matter.Resolver = _dereq_('../collision/Resolver');
Matter.SAT = _dereq_('../collision/SAT');

Matter.Constraint = _dereq_('../constraint/Constraint');
Matter.MouseConstraint = _dereq_('../constraint/MouseConstraint');

Matter.Common = _dereq_('../core/Common');
Matter.Engine = _dereq_('../core/Engine');
Matter.Events = _dereq_('../core/Events');
Matter.Mouse = _dereq_('../core/Mouse');
Matter.Runner = _dereq_('../core/Runner');
Matter.Sleeping = _dereq_('../core/Sleeping');
Matter.Plugin = _dereq_('../core/Plugin');


Matter.Bodies = _dereq_('../factory/Bodies');
Matter.Composites = _dereq_('../factory/Composites');

Matter.Axes = _dereq_('../geometry/Axes');
Matter.Bounds = _dereq_('../geometry/Bounds');
Matter.Svg = _dereq_('../geometry/Svg');
Matter.Vector = _dereq_('../geometry/Vector');
Matter.Vertices = _dereq_('../geometry/Vertices');

Matter.Render = _dereq_('../render/Render');
Matter.RenderPixi = _dereq_('../render/RenderPixi');

// aliases

Matter.World.add = Matter.Composite.add;
Matter.World.remove = Matter.Composite.remove;
Matter.World.addComposite = Matter.Composite.addComposite;
Matter.World.addBody = Matter.Composite.addBody;
Matter.World.addConstraint = Matter.Composite.addConstraint;
Matter.World.clear = Matter.Composite.clear;
Matter.Engine.run = Matter.Runner.run;

},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Contact":4,"../collision/Detector":5,"../collision/Grid":6,"../collision/Pair":7,"../collision/Pairs":8,"../collision/Query":9,"../collision/Resolver":10,"../collision/SAT":11,"../constraint/Constraint":12,"../constraint/MouseConstraint":13,"../core/Common":14,"../core/Engine":15,"../core/Events":16,"../core/Matter":17,"../core/Metrics":18,"../core/Mouse":19,"../core/Plugin":20,"../core/Runner":21,"../core/Sleeping":22,"../factory/Bodies":23,"../factory/Composites":24,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Svg":27,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31,"../render/RenderPixi":32}],31:[function(_dereq_,module,exports){
/**
* The `Matter.Render` module is a simple HTML5 canvas based renderer for visualising instances of `Matter.Engine`.
* It is intended for development and debugging purposes, but may also be suitable for simple games.
* It includes a number of drawing options including wireframe, vector with support for sprites and viewports.
*
* @class Render
*/

var Render = {};

module.exports = Render;

var Common = _dereq_('../core/Common');
var Composite = _dereq_('../body/Composite');
var Bounds = _dereq_('../geometry/Bounds');
var Events = _dereq_('../core/Events');
var Grid = _dereq_('../collision/Grid');
var Vector = _dereq_('../geometry/Vector');
var Mouse = _dereq_('../core/Mouse');

(function() {

    var _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
                                      || function(callback){ window.setTimeout(function() { callback(Common.now()); }, 1000 / 60); };

        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }

    /**
     * Creates a new renderer. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {render} A new renderer
     */
    Render.create = function(options) {
        var defaults = {
            controller: Render,
            engine: null,
            element: null,
            canvas: null,
            mouse: null,
            frameRequestId: null,
            options: {
                width: 800,
                height: 600,
                pixelRatio: 1,
                background: '#18181d',
                wireframeBackground: '#0f0f13',
                hasBounds: !!options.bounds,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: false,
                showMousePosition: false
            }
        };

        var render = Common.extend(defaults, options);

        if (render.canvas) {
            render.canvas.width = render.options.width || render.canvas.width;
            render.canvas.height = render.options.height || render.canvas.height;
        }

        render.mouse = options.mouse;
        render.engine = options.engine;
        render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
        render.context = render.canvas.getContext('2d');
        render.textures = {};

        render.bounds = render.bounds || {
            min: {
                x: 0,
                y: 0
            },
            max: {
                x: render.canvas.width,
                y: render.canvas.height
            }
        };

        if (render.options.pixelRatio !== 1) {
            Render.setPixelRatio(render, render.options.pixelRatio);
        }

        if (Common.isElement(render.element)) {
            render.element.appendChild(render.canvas);
        } else if (!render.canvas.parentNode) {
            Common.log('Render.create: options.element was undefined, render.canvas was created but not appended', 'warn');
        }

        return render;
    };

    /**
     * Continuously updates the render canvas on the `requestAnimationFrame` event.
     * @method run
     * @param {render} render
     */
    Render.run = function(render) {
        (function loop(time){
            render.frameRequestId = _requestAnimationFrame(loop);
            Render.world(render);
        })();
    };

    /**
     * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
     * @method stop
     * @param {render} render
     */
    Render.stop = function(render) {
        _cancelAnimationFrame(render.frameRequestId);
    };

    /**
     * Sets the pixel ratio of the renderer and updates the canvas.
     * To automatically detect the correct ratio, pass the string `'auto'` for `pixelRatio`.
     * @method setPixelRatio
     * @param {render} render
     * @param {number} pixelRatio
     */
    Render.setPixelRatio = function(render, pixelRatio) {
        var options = render.options,
            canvas = render.canvas;

        if (pixelRatio === 'auto') {
            pixelRatio = _getPixelRatio(canvas);
        }

        options.pixelRatio = pixelRatio;
        canvas.setAttribute('data-pixel-ratio', pixelRatio);
        canvas.width = options.width * pixelRatio;
        canvas.height = options.height * pixelRatio;
        canvas.style.width = options.width + 'px';
        canvas.style.height = options.height + 'px';
        render.context.scale(pixelRatio, pixelRatio);
    };

    /**
     * Positions and sizes the viewport around the given object bounds.
     * Objects must have at least one of the following properties:
     * - `object.bounds`
     * - `object.position`
     * - `object.min` and `object.max`
     * - `object.x` and `object.y`
     * @method lookAt
     * @param {render} render
     * @param {object[]} objects
     * @param {vector} [padding]
     * @param {bool} [center=true]
     */
    Render.lookAt = function(render, objects, padding, center) {
        center = typeof center !== 'undefined' ? center : true;
        objects = Common.isArray(objects) ? objects : [objects];
        padding = padding || {
            x: 0,
            y: 0
        };

        // find bounds of all objects
        var bounds = {
            min: { x: Infinity, y: Infinity },
            max: { x: -Infinity, y: -Infinity }
        };

        for (var i = 0; i < objects.length; i += 1) {
            var object = objects[i],
                min = object.bounds ? object.bounds.min : (object.min || object.position || object),
                max = object.bounds ? object.bounds.max : (object.max || object.position || object);

            if (min && max) {
                if (min.x < bounds.min.x)
                    bounds.min.x = min.x;

                if (max.x > bounds.max.x)
                    bounds.max.x = max.x;

                if (min.y < bounds.min.y)
                    bounds.min.y = min.y;

                if (max.y > bounds.max.y)
                    bounds.max.y = max.y;
            }
        }

        // find ratios
        var width = (bounds.max.x - bounds.min.x) + 2 * padding.x,
            height = (bounds.max.y - bounds.min.y) + 2 * padding.y,
            viewHeight = render.canvas.height,
            viewWidth = render.canvas.width,
            outerRatio = viewWidth / viewHeight,
            innerRatio = width / height,
            scaleX = 1,
            scaleY = 1;

        // find scale factor
        if (innerRatio > outerRatio) {
            scaleY = innerRatio / outerRatio;
        } else {
            scaleX = outerRatio / innerRatio;
        }

        // enable bounds
        render.options.hasBounds = true;

        // position and size
        render.bounds.min.x = bounds.min.x;
        render.bounds.max.x = bounds.min.x + width * scaleX;
        render.bounds.min.y = bounds.min.y;
        render.bounds.max.y = bounds.min.y + height * scaleY;

        // center
        if (center) {
            render.bounds.min.x += width * 0.5 - (width * scaleX) * 0.5;
            render.bounds.max.x += width * 0.5 - (width * scaleX) * 0.5;
            render.bounds.min.y += height * 0.5 - (height * scaleY) * 0.5;
            render.bounds.max.y += height * 0.5 - (height * scaleY) * 0.5;
        }

        // padding
        render.bounds.min.x -= padding.x;
        render.bounds.max.x -= padding.x;
        render.bounds.min.y -= padding.y;
        render.bounds.max.y -= padding.y;

        // update mouse
        if (render.mouse) {
            Mouse.setScale(render.mouse, {
                x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
            });

            Mouse.setOffset(render.mouse, render.bounds.min);
        }
    };

    /**
     * Applies viewport transforms based on `render.bounds` to a render context.
     * @method startViewTransform
     * @param {render} render
     */
    Render.startViewTransform = function(render) {
        var boundsWidth = render.bounds.max.x - render.bounds.min.x,
            boundsHeight = render.bounds.max.y - render.bounds.min.y,
            boundsScaleX = boundsWidth / render.options.width,
            boundsScaleY = boundsHeight / render.options.height;

        render.context.scale(1 / boundsScaleX, 1 / boundsScaleY);
        render.context.translate(-render.bounds.min.x, -render.bounds.min.y);
    };

    /**
     * Resets all transforms on the render context.
     * @method endViewTransform
     * @param {render} render
     */
    Render.endViewTransform = function(render) {
        render.context.setTransform(render.options.pixelRatio, 0, 0, render.options.pixelRatio, 0, 0);
    };

    /**
     * Renders the given `engine`'s `Matter.World` object.
     * This is the entry point for all rendering and should be called every time the scene changes.
     * @method world
     * @param {render} render
     */
    Render.world = function(render) {
        var engine = render.engine,
            world = engine.world,
            canvas = render.canvas,
            context = render.context,
            options = render.options,
            allBodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world),
            background = options.wireframes ? options.wireframeBackground : options.background,
            bodies = [],
            constraints = [],
            i;

        var event = {
            timestamp: engine.timing.timestamp
        };

        Events.trigger(render, 'beforeRender', event);

        // apply background if it has changed
        if (render.currentBackground !== background)
            _applyBackground(render, background);

        // clear the canvas with a transparent fill, to allow the canvas background to show
        context.globalCompositeOperation = 'source-in';
        context.fillStyle = "transparent";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'source-over';

        // handle bounds
        if (options.hasBounds) {
            // filter out bodies that are not in view
            for (i = 0; i < allBodies.length; i++) {
                var body = allBodies[i];
                if (Bounds.overlaps(body.bounds, render.bounds))
                    bodies.push(body);
            }

            // filter out constraints that are not in view
            for (i = 0; i < allConstraints.length; i++) {
                var constraint = allConstraints[i],
                    bodyA = constraint.bodyA,
                    bodyB = constraint.bodyB,
                    pointAWorld = constraint.pointA,
                    pointBWorld = constraint.pointB;

                if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);

                if (!pointAWorld || !pointBWorld)
                    continue;

                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                    constraints.push(constraint);
            }

            // transform the view
            Render.startViewTransform(render);

            // update mouse
            if (render.mouse) {
                Mouse.setScale(render.mouse, {
                    x: (render.bounds.max.x - render.bounds.min.x) / render.canvas.width,
                    y: (render.bounds.max.y - render.bounds.min.y) / render.canvas.height
                });

                Mouse.setOffset(render.mouse, render.bounds.min);
            }
        } else {
            constraints = allConstraints;
            bodies = allBodies;
        }

        if (!options.wireframes || (engine.enableSleeping && options.showSleeping)) {
            // fully featured rendering of bodies
            Render.bodies(render, bodies, context);
        } else {
            if (options.showConvexHulls)
                Render.bodyConvexHulls(render, bodies, context);

            // optimised method for wireframes only
            Render.bodyWireframes(render, bodies, context);
        }

        if (options.showBounds)
            Render.bodyBounds(render, bodies, context);

        if (options.showAxes || options.showAngleIndicator)
            Render.bodyAxes(render, bodies, context);

        if (options.showPositions)
            Render.bodyPositions(render, bodies, context);

        if (options.showVelocity)
            Render.bodyVelocity(render, bodies, context);

        if (options.showIds)
            Render.bodyIds(render, bodies, context);

        if (options.showSeparations)
            Render.separations(render, engine.pairs.list, context);

        if (options.showCollisions)
            Render.collisions(render, engine.pairs.list, context);

        if (options.showVertexNumbers)
            Render.vertexNumbers(render, bodies, context);

        if (options.showMousePosition)
            Render.mousePosition(render, render.mouse, context);

        Render.constraints(constraints, context);

        if (options.showBroadphase && engine.broadphase.controller === Grid)
            Render.grid(render, engine.broadphase, context);

        if (options.showDebug)
            Render.debug(render, context);

        if (options.hasBounds) {
            // revert view transforms
            Render.endViewTransform(render);
        }

        Events.trigger(render, 'afterRender', event);
    };

    /**
     * Description
     * @private
     * @method debug
     * @param {render} render
     * @param {RenderingContext} context
     */
    Render.debug = function(render, context) {
        var c = context,
            engine = render.engine,
            world = engine.world,
            metrics = engine.metrics,
            options = render.options,
            bodies = Composite.allBodies(world),
            space = "    ";

        if (engine.timing.timestamp - (render.debugTimestamp || 0) >= 500) {
            var text = "";

            if (metrics.timing) {
                text += "fps: " + Math.round(metrics.timing.fps) + space;
            }


            render.debugString = text;
            render.debugTimestamp = engine.timing.timestamp;
        }

        if (render.debugString) {
            c.font = "12px Arial";

            if (options.wireframes) {
                c.fillStyle = 'rgba(255,255,255,0.5)';
            } else {
                c.fillStyle = 'rgba(0,0,0,0.5)';
            }

            var split = render.debugString.split('\n');

            for (var i = 0; i < split.length; i++) {
                c.fillText(split[i], 50, 50 + i * 18);
            }
        }
    };

    /**
     * Description
     * @private
     * @method constraints
     * @param {constraint[]} constraints
     * @param {RenderingContext} context
     */
    Render.constraints = function(constraints, context) {
        var c = context;

        for (var i = 0; i < constraints.length; i++) {
            var constraint = constraints[i];

            if (!constraint.render.visible || !constraint.pointA || !constraint.pointB)
                continue;

            var bodyA = constraint.bodyA,
                bodyB = constraint.bodyB,
                start,
                end;

            if (bodyA) {
                start = Vector.add(bodyA.position, constraint.pointA);
            } else {
                start = constraint.pointA;
            }

            if (constraint.render.type === 'pin') {
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.closePath();
            } else {
                if (bodyB) {
                    end = Vector.add(bodyB.position, constraint.pointB);
                } else {
                    end = constraint.pointB;
                }

                c.beginPath();
                c.moveTo(start.x, start.y);

                if (constraint.render.type === 'spring') {
                    var delta = Vector.sub(end, start),
                        normal = Vector.perp(Vector.normalise(delta)),
                        coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20)),
                        offset;

                    for (var j = 1; j < coils; j += 1) {
                        offset = j % 2 === 0 ? 1 : -1;

                        c.lineTo(
                            start.x + delta.x * (j / coils) + normal.x * offset * 4,
                            start.y + delta.y * (j / coils) + normal.y * offset * 4
                        );
                    }
                }

                c.lineTo(end.x, end.y);
            }

            if (constraint.render.lineWidth) {
                c.lineWidth = constraint.render.lineWidth;
                c.strokeStyle = constraint.render.strokeStyle;
                c.stroke();
            }

            if (constraint.render.anchors) {
                c.fillStyle = constraint.render.strokeStyle;
                c.beginPath();
                c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
                c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
                c.closePath();
                c.fill();
            }
        }
    };

    /**
     * Description
     * @private
     * @method bodyShadows
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyShadows = function(render, bodies, context) {
        var c = context,
            engine = render.engine;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (!body.render.visible)
                continue;

            if (body.circleRadius) {
                c.beginPath();
                c.arc(body.position.x, body.position.y, body.circleRadius, 0, 2 * Math.PI);
                c.closePath();
            } else {
                c.beginPath();
                c.moveTo(body.vertices[0].x, body.vertices[0].y);
                for (var j = 1; j < body.vertices.length; j++) {
                    c.lineTo(body.vertices[j].x, body.vertices[j].y);
                }
                c.closePath();
            }

            var distanceX = body.position.x - render.options.width * 0.5,
                distanceY = body.position.y - render.options.height * 0.2,
                distance = Math.abs(distanceX) + Math.abs(distanceY);

            c.shadowColor = 'rgba(0,0,0,0.15)';
            c.shadowOffsetX = 0.05 * distanceX;
            c.shadowOffsetY = 0.05 * distanceY;
            c.shadowBlur = 1 + 12 * Math.min(1, distance / 1000);

            c.fill();

            c.shadowColor = null;
            c.shadowOffsetX = null;
            c.shadowOffsetY = null;
            c.shadowBlur = null;
        }
    };

    /**
     * Description
     * @private
     * @method bodies
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodies = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            showInternalEdges = options.showInternalEdges || !options.wireframes,
            body,
            part,
            i,
            k;

        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];

                if (!part.render.visible)
                    continue;

                if (options.showSleeping && body.isSleeping) {
                    c.globalAlpha = 0.5 * part.render.opacity;
                } else if (part.render.opacity !== 1) {
                    c.globalAlpha = part.render.opacity;
                }

                if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                    // part sprite
                    var sprite = part.render.sprite,
                        texture = _getTexture(render, sprite.texture);

                    c.translate(part.position.x, part.position.y);
                    c.rotate(part.angle);

                    c.drawImage(
                        texture,
                        texture.width * -sprite.xOffset * sprite.xScale,
                        texture.height * -sprite.yOffset * sprite.yScale,
                        texture.width * sprite.xScale,
                        texture.height * sprite.yScale
                    );

                    // revert translation, hopefully faster than save / restore
                    c.rotate(-part.angle);
                    c.translate(-part.position.x, -part.position.y);
                } else {
                    // part polygon
                    if (part.circleRadius) {
                        c.beginPath();
                        c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
                    } else {
                        c.beginPath();
                        c.moveTo(part.vertices[0].x, part.vertices[0].y);

                        for (var j = 1; j < part.vertices.length; j++) {
                            if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                                c.lineTo(part.vertices[j].x, part.vertices[j].y);
                            } else {
                                c.moveTo(part.vertices[j].x, part.vertices[j].y);
                            }

                            if (part.vertices[j].isInternal && !showInternalEdges) {
                                c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                            }
                        }

                        c.lineTo(part.vertices[0].x, part.vertices[0].y);
                        c.closePath();
                    }

                    if (!options.wireframes) {
                        c.fillStyle = part.render.fillStyle;

                        if (part.render.lineWidth) {
                            c.lineWidth = part.render.lineWidth;
                            c.strokeStyle = part.render.strokeStyle;
                            c.stroke();
                        }

                        c.fill();
                    } else {
                        c.lineWidth = 1;
                        c.strokeStyle = '#bbb';
                        c.stroke();
                    }
                }

                c.globalAlpha = 1;
            }
        }
    };

    /**
     * Optimised method for drawing body wireframes in one pass
     * @private
     * @method bodyWireframes
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyWireframes = function(render, bodies, context) {
        var c = context,
            showInternalEdges = render.options.showInternalEdges,
            body,
            part,
            i,
            j,
            k;

        c.beginPath();

        // render all bodies
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                part = body.parts[k];

                c.moveTo(part.vertices[0].x, part.vertices[0].y);

                for (j = 1; j < part.vertices.length; j++) {
                    if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                        c.lineTo(part.vertices[j].x, part.vertices[j].y);
                    } else {
                        c.moveTo(part.vertices[j].x, part.vertices[j].y);
                    }

                    if (part.vertices[j].isInternal && !showInternalEdges) {
                        c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                    }
                }

                c.lineTo(part.vertices[0].x, part.vertices[0].y);
            }
        }

        c.lineWidth = 1;
        c.strokeStyle = '#bbb';
        c.stroke();
    };

    /**
     * Optimised method for drawing body convex hull wireframes in one pass
     * @private
     * @method bodyConvexHulls
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyConvexHulls = function(render, bodies, context) {
        var c = context,
            body,
            part,
            i,
            j,
            k;

        c.beginPath();

        // render convex hulls
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible || body.parts.length === 1)
                continue;

            c.moveTo(body.vertices[0].x, body.vertices[0].y);

            for (j = 1; j < body.vertices.length; j++) {
                c.lineTo(body.vertices[j].x, body.vertices[j].y);
            }

            c.lineTo(body.vertices[0].x, body.vertices[0].y);
        }

        c.lineWidth = 1;
        c.strokeStyle = 'rgba(255,255,255,0.2)';
        c.stroke();
    };

    /**
     * Renders body vertex numbers.
     * @private
     * @method vertexNumbers
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.vertexNumbers = function(render, bodies, context) {
        var c = context,
            i,
            j,
            k;

        for (i = 0; i < bodies.length; i++) {
            var parts = bodies[i].parts;
            for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
                var part = parts[k];
                for (j = 0; j < part.vertices.length; j++) {
                    c.fillStyle = 'rgba(255,255,255,0.2)';
                    c.fillText(i + '_' + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                }
            }
        }
    };

    /**
     * Renders mouse position.
     * @private
     * @method mousePosition
     * @param {render} render
     * @param {mouse} mouse
     * @param {RenderingContext} context
     */
    Render.mousePosition = function(render, mouse, context) {
        var c = context;
        c.fillStyle = 'rgba(255,255,255,0.8)';
        c.fillText(mouse.position.x + '  ' + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
    };

    /**
     * Draws body bounds
     * @private
     * @method bodyBounds
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyBounds = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options;

        c.beginPath();

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.render.visible) {
                var parts = bodies[i].parts;
                for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    var part = parts[j];
                    c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                }
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,255,255,0.08)';
        } else {
            c.strokeStyle = 'rgba(0,0,0,0.1)';
        }

        c.lineWidth = 1;
        c.stroke();
    };

    /**
     * Draws body angle indicators and axes
     * @private
     * @method bodyAxes
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyAxes = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            part,
            i,
            j,
            k;

        c.beginPath();

        for (i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                parts = body.parts;

            if (!body.render.visible)
                continue;

            if (options.showAxes) {
                // render all axes
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    part = parts[j];
                    for (k = 0; k < part.axes.length; k++) {
                        var axis = part.axes[k];
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                    }
                }
            } else {
                for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                    part = parts[j];
                    for (k = 0; k < part.axes.length; k++) {
                        // render a single axis indicator
                        c.moveTo(part.position.x, part.position.y);
                        c.lineTo((part.vertices[0].x + part.vertices[part.vertices.length-1].x) / 2,
                                 (part.vertices[0].y + part.vertices[part.vertices.length-1].y) / 2);
                    }
                }
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'indianred';
            c.lineWidth = 1;
        } else {
            c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            c.globalCompositeOperation = 'overlay';
            c.lineWidth = 2;
        }

        c.stroke();
        c.globalCompositeOperation = 'source-over';
    };

    /**
     * Draws body positions
     * @private
     * @method bodyPositions
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyPositions = function(render, bodies, context) {
        var c = context,
            engine = render.engine,
            options = render.options,
            body,
            part,
            i,
            k;

        c.beginPath();

        // render current positions
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];

            if (!body.render.visible)
                continue;

            // handle compound parts
            for (k = 0; k < body.parts.length; k++) {
                part = body.parts[k];
                c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
                c.closePath();
            }
        }

        if (options.wireframes) {
            c.fillStyle = 'indianred';
        } else {
            c.fillStyle = 'rgba(0,0,0,0.5)';
        }
        c.fill();

        c.beginPath();

        // render previous positions
        for (i = 0; i < bodies.length; i++) {
            body = bodies[i];
            if (body.render.visible) {
                c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
                c.closePath();
            }
        }

        c.fillStyle = 'rgba(255,165,0,0.8)';
        c.fill();
    };

    /**
     * Draws body velocity
     * @private
     * @method bodyVelocity
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyVelocity = function(render, bodies, context) {
        var c = context;

        c.beginPath();

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (!body.render.visible)
                continue;

            c.moveTo(body.position.x, body.position.y);
            c.lineTo(body.position.x + (body.position.x - body.positionPrev.x) * 2, body.position.y + (body.position.y - body.positionPrev.y) * 2);
        }

        c.lineWidth = 3;
        c.strokeStyle = 'cornflowerblue';
        c.stroke();
    };

    /**
     * Draws body ids
     * @private
     * @method bodyIds
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */
    Render.bodyIds = function(render, bodies, context) {
        var c = context,
            i,
            j;

        for (i = 0; i < bodies.length; i++) {
            if (!bodies[i].render.visible)
                continue;

            var parts = bodies[i].parts;
            for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                var part = parts[j];
                c.font = "12px Arial";
                c.fillStyle = 'rgba(255,255,255,0.5)';
                c.fillText(part.id, part.position.x + 10, part.position.y - 10);
            }
        }
    };

    /**
     * Description
     * @private
     * @method collisions
     * @param {render} render
     * @param {pair[]} pairs
     * @param {RenderingContext} context
     */
    Render.collisions = function(render, pairs, context) {
        var c = context,
            options = render.options,
            pair,
            collision,
            corrected,
            bodyA,
            bodyB,
            i,
            j;

        c.beginPath();

        // render collision positions
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;
            for (j = 0; j < pair.activeContacts.length; j++) {
                var contact = pair.activeContacts[j],
                    vertex = contact.vertex;
                c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
            }
        }

        if (options.wireframes) {
            c.fillStyle = 'rgba(255,255,255,0.7)';
        } else {
            c.fillStyle = 'orange';
        }
        c.fill();

        c.beginPath();

        // render collision normals
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;

            if (pair.activeContacts.length > 0) {
                var normalPosX = pair.activeContacts[0].vertex.x,
                    normalPosY = pair.activeContacts[0].vertex.y;

                if (pair.activeContacts.length === 2) {
                    normalPosX = (pair.activeContacts[0].vertex.x + pair.activeContacts[1].vertex.x) / 2;
                    normalPosY = (pair.activeContacts[0].vertex.y + pair.activeContacts[1].vertex.y) / 2;
                }

                if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                    c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                } else {
                    c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                }

                c.lineTo(normalPosX, normalPosY);
            }
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,165,0,0.7)';
        } else {
            c.strokeStyle = 'orange';
        }

        c.lineWidth = 1;
        c.stroke();
    };

    /**
     * Description
     * @private
     * @method separations
     * @param {render} render
     * @param {pair[]} pairs
     * @param {RenderingContext} context
     */
    Render.separations = function(render, pairs, context) {
        var c = context,
            options = render.options,
            pair,
            collision,
            corrected,
            bodyA,
            bodyB,
            i,
            j;

        c.beginPath();

        // render separations
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];

            if (!pair.isActive)
                continue;

            collision = pair.collision;
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;

            var k = 1;

            if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
            if (bodyB.isStatic) k = 0;

            c.moveTo(bodyB.position.x, bodyB.position.y);
            c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);

            k = 1;

            if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
            if (bodyA.isStatic) k = 0;

            c.moveTo(bodyA.position.x, bodyA.position.y);
            c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
        }

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,165,0,0.5)';
        } else {
            c.strokeStyle = 'orange';
        }
        c.stroke();
    };

    /**
     * Description
     * @private
     * @method grid
     * @param {render} render
     * @param {grid} grid
     * @param {RenderingContext} context
     */
    Render.grid = function(render, grid, context) {
        var c = context,
            options = render.options;

        if (options.wireframes) {
            c.strokeStyle = 'rgba(255,180,0,0.1)';
        } else {
            c.strokeStyle = 'rgba(255,180,0,0.5)';
        }

        c.beginPath();

        var bucketKeys = Common.keys(grid.buckets);

        for (var i = 0; i < bucketKeys.length; i++) {
            var bucketId = bucketKeys[i];

            if (grid.buckets[bucketId].length < 2)
                continue;

            var region = bucketId.split(/C|R/);
            c.rect(0.5 + parseInt(region[1], 10) * grid.bucketWidth,
                    0.5 + parseInt(region[2], 10) * grid.bucketHeight,
                    grid.bucketWidth,
                    grid.bucketHeight);
        }

        c.lineWidth = 1;
        c.stroke();
    };

    /**
     * Description
     * @private
     * @method inspector
     * @param {inspector} inspector
     * @param {RenderingContext} context
     */
    Render.inspector = function(inspector, context) {
        var engine = inspector.engine,
            selected = inspector.selected,
            render = inspector.render,
            options = render.options,
            bounds;

        if (options.hasBounds) {
            var boundsWidth = render.bounds.max.x - render.bounds.min.x,
                boundsHeight = render.bounds.max.y - render.bounds.min.y,
                boundsScaleX = boundsWidth / render.options.width,
                boundsScaleY = boundsHeight / render.options.height;

            context.scale(1 / boundsScaleX, 1 / boundsScaleY);
            context.translate(-render.bounds.min.x, -render.bounds.min.y);
        }

        for (var i = 0; i < selected.length; i++) {
            var item = selected[i].data;

            context.translate(0.5, 0.5);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,165,0,0.9)';
            context.setLineDash([1,2]);

            switch (item.type) {

            case 'body':

                // render body selections
                bounds = item.bounds;
                context.beginPath();
                context.rect(Math.floor(bounds.min.x - 3), Math.floor(bounds.min.y - 3),
                             Math.floor(bounds.max.x - bounds.min.x + 6), Math.floor(bounds.max.y - bounds.min.y + 6));
                context.closePath();
                context.stroke();

                break;

            case 'constraint':

                // render constraint selections
                var point = item.pointA;
                if (item.bodyA)
                    point = item.pointB;
                context.beginPath();
                context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                context.closePath();
                context.stroke();

                break;

            }

            context.setLineDash([]);
            context.translate(-0.5, -0.5);
        }

        // render selection region
        if (inspector.selectStart !== null) {
            context.translate(0.5, 0.5);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,165,0,0.6)';
            context.fillStyle = 'rgba(255,165,0,0.1)';
            bounds = inspector.selectBounds;
            context.beginPath();
            context.rect(Math.floor(bounds.min.x), Math.floor(bounds.min.y),
                         Math.floor(bounds.max.x - bounds.min.x), Math.floor(bounds.max.y - bounds.min.y));
            context.closePath();
            context.stroke();
            context.fill();
            context.translate(-0.5, -0.5);
        }

        if (options.hasBounds)
            context.setTransform(1, 0, 0, 1, 0, 0);
    };

    /**
     * Description
     * @method _createCanvas
     * @private
     * @param {} width
     * @param {} height
     * @return canvas
     */
    var _createCanvas = function(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.oncontextmenu = function() { return false; };
        canvas.onselectstart = function() { return false; };
        return canvas;
    };

    /**
     * Gets the pixel ratio of the canvas.
     * @method _getPixelRatio
     * @private
     * @param {HTMLElement} canvas
     * @return {Number} pixel ratio
     */
    var _getPixelRatio = function(canvas) {
        var context = canvas.getContext('2d'),
            devicePixelRatio = window.devicePixelRatio || 1,
            backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio
                                      || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio
                                      || context.backingStorePixelRatio || 1;

        return devicePixelRatio / backingStorePixelRatio;
    };

    /**
     * Gets the requested texture (an Image) via its path
     * @method _getTexture
     * @private
     * @param {render} render
     * @param {string} imagePath
     * @return {Image} texture
     */
    var _getTexture = function(render, imagePath) {
        var image = render.textures[imagePath];

        if (image)
            return image;

        image = render.textures[imagePath] = new Image();
        image.src = imagePath;

        return image;
    };

    /**
     * Applies the background to the canvas using CSS.
     * @method applyBackground
     * @private
     * @param {render} render
     * @param {string} background
     */
    var _applyBackground = function(render, background) {
        var cssBackground = background;

        if (/(jpg|gif|png)$/.test(background))
            cssBackground = 'url(' + background + ')';

        render.canvas.style.background = cssBackground;
        render.canvas.style.backgroundSize = "contain";
        render.currentBackground = background;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired before rendering
    *
    * @event beforeRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after rendering
    *
    * @event afterRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A back-reference to the `Matter.Render` module.
     *
     * @property controller
     * @type render
     */

    /**
     * A reference to the `Matter.Engine` instance to be used.
     *
     * @property engine
     * @type engine
     */

    /**
     * A reference to the element where the canvas is to be inserted (if `render.canvas` has not been specified)
     *
     * @property element
     * @type HTMLElement
     * @default null
     */

    /**
     * The canvas element to render to. If not specified, one will be created if `render.element` has been specified.
     *
     * @property canvas
     * @type HTMLCanvasElement
     * @default null
     */

    /**
     * The configuration options of the renderer.
     *
     * @property options
     * @type {}
     */

    /**
     * The target width in pixels of the `render.canvas` to be created.
     *
     * @property options.width
     * @type number
     * @default 800
     */

    /**
     * The target height in pixels of the `render.canvas` to be created.
     *
     * @property options.height
     * @type number
     * @default 600
     */

    /**
     * A flag that specifies if `render.bounds` should be used when rendering.
     *
     * @property options.hasBounds
     * @type boolean
     * @default false
     */

    /**
     * A `Bounds` object that specifies the drawing view region.
     * Rendering will be automatically transformed and scaled to fit within the canvas size (`render.options.width` and `render.options.height`).
     * This allows for creating views that can pan or zoom around the scene.
     * You must also set `render.options.hasBounds` to `true` to enable bounded rendering.
     *
     * @property bounds
     * @type bounds
     */

    /**
     * The 2d rendering context from the `render.canvas` element.
     *
     * @property context
     * @type CanvasRenderingContext2D
     */

    /**
     * The sprite texture cache.
     *
     * @property textures
     * @type {}
     */

})();

},{"../body/Composite":2,"../collision/Grid":6,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../geometry/Bounds":26,"../geometry/Vector":28}],32:[function(_dereq_,module,exports){
/**
* The `Matter.RenderPixi` module is an example renderer using pixi.js.
* See also `Matter.Render` for a canvas based renderer.
*
* @class RenderPixi
* @deprecated the Matter.RenderPixi module will soon be removed from the Matter.js core.
* It will likely be moved to its own repository (but maintenance will be limited).
*/

var RenderPixi = {};

module.exports = RenderPixi;

var Bounds = _dereq_('../geometry/Bounds');
var Composite = _dereq_('../body/Composite');
var Common = _dereq_('../core/Common');
var Events = _dereq_('../core/Events');
var Vector = _dereq_('../geometry/Vector');

(function() {

    var _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame 
                                      || function(callback){ window.setTimeout(function() { callback(Common.now()); }, 1000 / 60); };
   
        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }
    
    /**
     * Creates a new Pixi.js WebGL renderer
     * @method create
     * @param {object} options
     * @return {RenderPixi} A new renderer
     * @deprecated
     */
    RenderPixi.create = function(options) {
        Common.warn('RenderPixi.create: Matter.RenderPixi is deprecated (see docs)');

        var defaults = {
            controller: RenderPixi,
            engine: null,
            element: null,
            frameRequestId: null,
            canvas: null,
            renderer: null,
            container: null,
            spriteContainer: null,
            pixiOptions: null,
            options: {
                width: 800,
                height: 600,
                background: '#fafafa',
                wireframeBackground: '#222',
                hasBounds: false,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showAxes: false,
                showPositions: false,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false
            }
        };

        var render = Common.extend(defaults, options),
            transparent = !render.options.wireframes && render.options.background === 'transparent';

        // init pixi
        render.pixiOptions = render.pixiOptions || {
            view: render.canvas,
            transparent: transparent,
            antialias: true,
            backgroundColor: options.background
        };

        render.mouse = options.mouse;
        render.engine = options.engine;
        render.renderer = render.renderer || new PIXI.WebGLRenderer(render.options.width, render.options.height, render.pixiOptions);
        render.container = render.container || new PIXI.Container();
        render.spriteContainer = render.spriteContainer || new PIXI.Container();
        render.canvas = render.canvas || render.renderer.view;
        render.bounds = render.bounds || { 
            min: {
                x: 0,
                y: 0
            }, 
            max: { 
                x: render.options.width,
                y: render.options.height
            }
        };

        // event listeners
        Events.on(render.engine, 'beforeUpdate', function() {
            RenderPixi.clear(render);
        });

        // caches
        render.textures = {};
        render.sprites = {};
        render.primitives = {};

        // use a sprite batch for performance
        render.container.addChild(render.spriteContainer);

        // insert canvas
        if (Common.isElement(render.element)) {
            render.element.appendChild(render.canvas);
        } else {
            Common.warn('No "render.element" passed, "render.canvas" was not inserted into document.');
        }

        // prevent menus on canvas
        render.canvas.oncontextmenu = function() { return false; };
        render.canvas.onselectstart = function() { return false; };

        return render;
    };

    /**
     * Continuously updates the render canvas on the `requestAnimationFrame` event.
     * @method run
     * @param {render} render
     * @deprecated
     */
    RenderPixi.run = function(render) {
        (function loop(time){
            render.frameRequestId = _requestAnimationFrame(loop);
            RenderPixi.world(render);
        })();
    };

    /**
     * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
     * @method stop
     * @param {render} render
     * @deprecated
     */
    RenderPixi.stop = function(render) {
        _cancelAnimationFrame(render.frameRequestId);
    };

    /**
     * Clears the scene graph
     * @method clear
     * @param {RenderPixi} render
     * @deprecated
     */
    RenderPixi.clear = function(render) {
        var container = render.container,
            spriteContainer = render.spriteContainer;

        // clear stage container
        while (container.children[0]) { 
            container.removeChild(container.children[0]); 
        }

        // clear sprite batch
        while (spriteContainer.children[0]) { 
            spriteContainer.removeChild(spriteContainer.children[0]); 
        }

        var bgSprite = render.sprites['bg-0'];

        // clear caches
        render.textures = {};
        render.sprites = {};
        render.primitives = {};

        // set background sprite
        render.sprites['bg-0'] = bgSprite;
        if (bgSprite)
            container.addChildAt(bgSprite, 0);

        // add sprite batch back into container
        render.container.addChild(render.spriteContainer);

        // reset background state
        render.currentBackground = null;

        // reset bounds transforms
        container.scale.set(1, 1);
        container.position.set(0, 0);
    };

    /**
     * Sets the background of the canvas 
     * @method setBackground
     * @param {RenderPixi} render
     * @param {string} background
     * @deprecated
     */
    RenderPixi.setBackground = function(render, background) {
        if (render.currentBackground !== background) {
            var isColor = background.indexOf && background.indexOf('#') !== -1,
                bgSprite = render.sprites['bg-0'];

            if (isColor) {
                // if solid background color
                var color = Common.colorToNumber(background);
                render.renderer.backgroundColor = color;

                // remove background sprite if existing
                if (bgSprite)
                    render.container.removeChild(bgSprite); 
            } else {
                // initialise background sprite if needed
                if (!bgSprite) {
                    var texture = _getTexture(render, background);

                    bgSprite = render.sprites['bg-0'] = new PIXI.Sprite(texture);
                    bgSprite.position.x = 0;
                    bgSprite.position.y = 0;
                    render.container.addChildAt(bgSprite, 0);
                }
            }

            render.currentBackground = background;
        }
    };

    /**
     * Description
     * @method world
     * @param {engine} engine
     * @deprecated
     */
    RenderPixi.world = function(render) {
        var engine = render.engine,
            world = engine.world,
            renderer = render.renderer,
            container = render.container,
            options = render.options,
            bodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world),
            constraints = [],
            i;

        if (options.wireframes) {
            RenderPixi.setBackground(render, options.wireframeBackground);
        } else {
            RenderPixi.setBackground(render, options.background);
        }

        // handle bounds
        var boundsWidth = render.bounds.max.x - render.bounds.min.x,
            boundsHeight = render.bounds.max.y - render.bounds.min.y,
            boundsScaleX = boundsWidth / render.options.width,
            boundsScaleY = boundsHeight / render.options.height;

        if (options.hasBounds) {
            // Hide bodies that are not in view
            for (i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                body.render.sprite.visible = Bounds.overlaps(body.bounds, render.bounds);
            }

            // filter out constraints that are not in view
            for (i = 0; i < allConstraints.length; i++) {
                var constraint = allConstraints[i],
                    bodyA = constraint.bodyA,
                    bodyB = constraint.bodyB,
                    pointAWorld = constraint.pointA,
                    pointBWorld = constraint.pointB;

                if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);

                if (!pointAWorld || !pointBWorld)
                    continue;

                if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld))
                    constraints.push(constraint);
            }

            // transform the view
            container.scale.set(1 / boundsScaleX, 1 / boundsScaleY);
            container.position.set(-render.bounds.min.x * (1 / boundsScaleX), -render.bounds.min.y * (1 / boundsScaleY));
        } else {
            constraints = allConstraints;
        }

        for (i = 0; i < bodies.length; i++)
            RenderPixi.body(render, bodies[i]);

        for (i = 0; i < constraints.length; i++)
            RenderPixi.constraint(render, constraints[i]);

        renderer.render(container);
    };


    /**
     * Description
     * @method constraint
     * @param {engine} engine
     * @param {constraint} constraint
     * @deprecated
     */
    RenderPixi.constraint = function(render, constraint) {
        var engine = render.engine,
            bodyA = constraint.bodyA,
            bodyB = constraint.bodyB,
            pointA = constraint.pointA,
            pointB = constraint.pointB,
            container = render.container,
            constraintRender = constraint.render,
            primitiveId = 'c-' + constraint.id,
            primitive = render.primitives[primitiveId];

        // initialise constraint primitive if not existing
        if (!primitive)
            primitive = render.primitives[primitiveId] = new PIXI.Graphics();

        // don't render if constraint does not have two end points
        if (!constraintRender.visible || !constraint.pointA || !constraint.pointB) {
            primitive.clear();
            return;
        }

        // add to scene graph if not already there
        if (Common.indexOf(container.children, primitive) === -1)
            container.addChild(primitive);

        // render the constraint on every update, since they can change dynamically
        primitive.clear();
        primitive.beginFill(0, 0);
        primitive.lineStyle(constraintRender.lineWidth, Common.colorToNumber(constraintRender.strokeStyle), 1);
        
        if (bodyA) {
            primitive.moveTo(bodyA.position.x + pointA.x, bodyA.position.y + pointA.y);
        } else {
            primitive.moveTo(pointA.x, pointA.y);
        }

        if (bodyB) {
            primitive.lineTo(bodyB.position.x + pointB.x, bodyB.position.y + pointB.y);
        } else {
            primitive.lineTo(pointB.x, pointB.y);
        }

        primitive.endFill();
    };
    
    /**
     * Description
     * @method body
     * @param {engine} engine
     * @param {body} body
     * @deprecated
     */
    RenderPixi.body = function(render, body) {
        var engine = render.engine,
            bodyRender = body.render;

        if (!bodyRender.visible)
            return;

        if (bodyRender.sprite && bodyRender.sprite.texture) {
            var spriteId = 'b-' + body.id,
                sprite = render.sprites[spriteId],
                spriteContainer = render.spriteContainer;

            // initialise body sprite if not existing
            if (!sprite)
                sprite = render.sprites[spriteId] = _createBodySprite(render, body);

            // add to scene graph if not already there
            if (Common.indexOf(spriteContainer.children, sprite) === -1)
                spriteContainer.addChild(sprite);

            // update body sprite
            sprite.position.x = body.position.x;
            sprite.position.y = body.position.y;
            sprite.rotation = body.angle;
            sprite.scale.x = bodyRender.sprite.xScale || 1;
            sprite.scale.y = bodyRender.sprite.yScale || 1;
        } else {
            var primitiveId = 'b-' + body.id,
                primitive = render.primitives[primitiveId],
                container = render.container;

            // initialise body primitive if not existing
            if (!primitive) {
                primitive = render.primitives[primitiveId] = _createBodyPrimitive(render, body);
                primitive.initialAngle = body.angle;
            }

            // add to scene graph if not already there
            if (Common.indexOf(container.children, primitive) === -1)
                container.addChild(primitive);

            // update body primitive
            primitive.position.x = body.position.x;
            primitive.position.y = body.position.y;
            primitive.rotation = body.angle - primitive.initialAngle;
        }
    };

    /**
     * Creates a body sprite
     * @method _createBodySprite
     * @private
     * @param {RenderPixi} render
     * @param {body} body
     * @return {PIXI.Sprite} sprite
     * @deprecated
     */
    var _createBodySprite = function(render, body) {
        var bodyRender = body.render,
            texturePath = bodyRender.sprite.texture,
            texture = _getTexture(render, texturePath),
            sprite = new PIXI.Sprite(texture);

        sprite.anchor.x = body.render.sprite.xOffset;
        sprite.anchor.y = body.render.sprite.yOffset;

        return sprite;
    };

    /**
     * Creates a body primitive
     * @method _createBodyPrimitive
     * @private
     * @param {RenderPixi} render
     * @param {body} body
     * @return {PIXI.Graphics} graphics
     * @deprecated
     */
    var _createBodyPrimitive = function(render, body) {
        var bodyRender = body.render,
            options = render.options,
            primitive = new PIXI.Graphics(),
            fillStyle = Common.colorToNumber(bodyRender.fillStyle),
            strokeStyle = Common.colorToNumber(bodyRender.strokeStyle),
            strokeStyleIndicator = Common.colorToNumber(bodyRender.strokeStyle),
            strokeStyleWireframe = Common.colorToNumber('#bbb'),
            strokeStyleWireframeIndicator = Common.colorToNumber('#CD5C5C'),
            part;

        primitive.clear();

        // handle compound parts
        for (var k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
            part = body.parts[k];

            if (!options.wireframes) {
                primitive.beginFill(fillStyle, 1);
                primitive.lineStyle(bodyRender.lineWidth, strokeStyle, 1);
            } else {
                primitive.beginFill(0, 0);
                primitive.lineStyle(1, strokeStyleWireframe, 1);
            }

            primitive.moveTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);

            for (var j = 1; j < part.vertices.length; j++) {
                primitive.lineTo(part.vertices[j].x - body.position.x, part.vertices[j].y - body.position.y);
            }

            primitive.lineTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);

            primitive.endFill();

            // angle indicator
            if (options.showAngleIndicator || options.showAxes) {
                primitive.beginFill(0, 0);

                if (options.wireframes) {
                    primitive.lineStyle(1, strokeStyleWireframeIndicator, 1);
                } else {
                    primitive.lineStyle(1, strokeStyleIndicator);
                }

                primitive.moveTo(part.position.x - body.position.x, part.position.y - body.position.y);
                primitive.lineTo(((part.vertices[0].x + part.vertices[part.vertices.length-1].x) / 2 - body.position.x), 
                                 ((part.vertices[0].y + part.vertices[part.vertices.length-1].y) / 2 - body.position.y));

                primitive.endFill();
            }
        }

        return primitive;
    };

    /**
     * Gets the requested texture (a PIXI.Texture) via its path
     * @method _getTexture
     * @private
     * @param {RenderPixi} render
     * @param {string} imagePath
     * @return {PIXI.Texture} texture
     * @deprecated
     */
    var _getTexture = function(render, imagePath) {
        var texture = render.textures[imagePath];

        if (!texture)
            texture = render.textures[imagePath] = PIXI.Texture.fromImage(imagePath);

        return texture;
    };

})();

},{"../body/Composite":2,"../core/Common":14,"../core/Events":16,"../geometry/Bounds":26,"../geometry/Vector":28}]},{},[30])(30)
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Mapper.ts":
/*!***********************!*\
  !*** ./src/Mapper.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var matter_js_1 = __webpack_require__(/*! matter-js */ "./node_modules/matter-js/build/matter.js");
var createMap = function () {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var engine = matter_js_1.Engine.create();
    var render = matter_js_1.Render.create({
        element: document.body,
        engine: engine,
    });
    function generateCircle() {
        var circle = (matter_js_1.Bodies.circle(400, 400, 10));
        matter_js_1.World.add(engine.world, [circle]);
    }
    setInterval(function () { return generateCircle(); }, 50);
    var ground = matter_js_1.Bodies.rectangle(0, 0, w, 10, { isStatic: true });
    matter_js_1.World.add(engine.world, [ground]);
    matter_js_1.Engine.run(engine);
    matter_js_1.Render.run(render);
    var mouse = matter_js_1.Mouse.create(render.canvas);
    var mouseConstraint = matter_js_1.MouseConstraint.create(engine, {
        constraint: {
            render: {
                visible: false,
            },
            stiffness: 0.9,
        },
        mouse: mouse,
    });
    matter_js_1.World.add(engine.world, mouseConstraint);
    render.mouse = mouse;
};
exports.default = {
    createMap: createMap,
};


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Mapper_1 = __webpack_require__(/*! ./Mapper */ "./src/Mapper.ts");
var start = function () {
    Mapper_1.default.createMap();
};
exports.default = {
    start: start,
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
app_1.default.start();
// run the "soft bodies" example
// import softBodies from './soft-bodies'
// softBodies()


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdHRlci1qcy9idWlsZC9tYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWFwcGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7MERDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLFNBQTJELG1CQUFtQixlQUFxTixDQUFnQixhQUFhLDBCQUEwQiwwQkFBMEIsZ0JBQWdCLFVBQVUsVUFBVSwwQ0FBMEMsOEJBQXdCLG9CQUFvQiw4Q0FBOEMsa0NBQWtDLFlBQVksWUFBWSxtQ0FBbUMsaUJBQWlCLGdCQUFnQixzQkFB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUFVO0FBQ3pCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlO0FBQ2YsZUFBZTtBQUNmLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlO0FBQ2YsZUFBZTtBQUNmLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlO0FBQ2YsZUFBZTtBQUNmLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlO0FBQ2YsZUFBZTtBQUNmLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCxDQUFDLEVBQUUsbURBQW1EO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUFDcEIsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLEtBQUs7QUFDcEIsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FB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Q0FBQyxLQUFLLEdBQUcsS0FBSztBQUNyQixDQUFDO0FBRUQsa0JBQWU7SUFDZCxTQUFTO0NBQ1Q7Ozs7Ozs7Ozs7Ozs7OztBQ3pDRCxzRUFBNkI7QUFHN0IsSUFBTSxLQUFLLEdBQUc7SUFDYixnQkFBTSxDQUFDLFNBQVMsRUFBRTtBQUNuQixDQUFDO0FBR0Qsa0JBQWU7SUFDZCxLQUFLO0NBQ0w7Ozs7Ozs7Ozs7Ozs7OztBQ1ZELDZEQUF1QjtBQUN2QixhQUFHLENBQUMsS0FBSyxFQUFFO0FBRVgsZ0NBQWdDO0FBQ2hDLHlDQUF5QztBQUN6QyxlQUFlIiwiZmlsZSI6Im1haW4uNjMzMWQzMjEyZDRmZmRhNTJjMjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvKipcbiogbWF0dGVyLWpzIDAuMTQuMSBieSBAbGlhYnJ1IDIwMTgtMDEtMTBcbiogaHR0cDovL2JybS5pby9tYXR0ZXItanMvXG4qIExpY2Vuc2UgTUlUXG4qL1xuXG4vKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIExpYW0gQnJ1bW1pdHQgYW5kIGNvbnRyaWJ1dG9ycy5cbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLk1hdHRlciA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5Cb2R5YCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyBib2R5IG1vZGVscy5cbiogQSBgTWF0dGVyLkJvZHlgIGlzIGEgcmlnaWQgYm9keSB0aGF0IGNhbiBiZSBzaW11bGF0ZWQgYnkgYSBgTWF0dGVyLkVuZ2luZWAuXG4qIEZhY3RvcmllcyBmb3IgY29tbW9ubHkgdXNlZCBib2R5IGNvbmZpZ3VyYXRpb25zIChzdWNoIGFzIHJlY3RhbmdsZXMsIGNpcmNsZXMgYW5kIG90aGVyIHBvbHlnb25zKSBjYW4gYmUgZm91bmQgaW4gdGhlIG1vZHVsZSBgTWF0dGVyLkJvZGllc2AuXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG5cbiogQGNsYXNzIEJvZHlcbiovXG5cbnZhciBCb2R5ID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gQm9keTtcblxudmFyIFZlcnRpY2VzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVydGljZXMnKTtcbnZhciBWZWN0b3IgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZWN0b3InKTtcbnZhciBTbGVlcGluZyA9IF9kZXJlcV8oJy4uL2NvcmUvU2xlZXBpbmcnKTtcbnZhciBSZW5kZXIgPSBfZGVyZXFfKCcuLi9yZW5kZXIvUmVuZGVyJyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcbnZhciBCb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcbnZhciBBeGVzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQXhlcycpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBCb2R5Ll9pbmVydGlhU2NhbGUgPSA0O1xuICAgIEJvZHkuX25leHRDb2xsaWRpbmdHcm91cElkID0gMTtcbiAgICBCb2R5Ll9uZXh0Tm9uQ29sbGlkaW5nR3JvdXBJZCA9IC0xO1xuICAgIEJvZHkuX25leHRDYXRlZ29yeSA9IDB4MDAwMTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcmlnaWQgYm9keSBtb2RlbC4gVGhlIG9wdGlvbnMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCB0aGF0IHNwZWNpZmllcyBhbnkgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICogQWxsIHByb3BlcnRpZXMgaGF2ZSBkZWZhdWx0IHZhbHVlcywgYW5kIG1hbnkgYXJlIHByZS1jYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gb3RoZXIgcHJvcGVydGllcy5cbiAgICAgKiBWZXJ0aWNlcyBtdXN0IGJlIHNwZWNpZmllZCBpbiBjbG9ja3dpc2Ugb3JkZXIuXG4gICAgICogU2VlIHRoZSBwcm9wZXJ0aWVzIHNlY3Rpb24gYmVsb3cgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7Ym9keX0gYm9keVxuICAgICAqL1xuICAgIEJvZHkuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBpZDogQ29tbW9uLm5leHRJZCgpLFxuICAgICAgICAgICAgdHlwZTogJ2JvZHknLFxuICAgICAgICAgICAgbGFiZWw6ICdCb2R5JyxcbiAgICAgICAgICAgIHBhcnRzOiBbXSxcbiAgICAgICAgICAgIHBsdWdpbjoge30sXG4gICAgICAgICAgICBhbmdsZTogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBWZXJ0aWNlcy5mcm9tUGF0aCgnTCAwIDAgTCA0MCAwIEwgNDAgNDAgTCAwIDQwJyksXG4gICAgICAgICAgICBwb3NpdGlvbjogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICBmb3JjZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICB0b3JxdWU6IDAsXG4gICAgICAgICAgICBwb3NpdGlvbkltcHVsc2U6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgY29uc3RyYWludEltcHVsc2U6IHsgeDogMCwgeTogMCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHRvdGFsQ29udGFjdHM6IDAsXG4gICAgICAgICAgICBzcGVlZDogMCxcbiAgICAgICAgICAgIGFuZ3VsYXJTcGVlZDogMCxcbiAgICAgICAgICAgIHZlbG9jaXR5OiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIGFuZ3VsYXJWZWxvY2l0eTogMCxcbiAgICAgICAgICAgIGlzU2Vuc29yOiBmYWxzZSxcbiAgICAgICAgICAgIGlzU3RhdGljOiBmYWxzZSxcbiAgICAgICAgICAgIGlzU2xlZXBpbmc6IGZhbHNlLFxuICAgICAgICAgICAgbW90aW9uOiAwLFxuICAgICAgICAgICAgc2xlZXBUaHJlc2hvbGQ6IDYwLFxuICAgICAgICAgICAgZGVuc2l0eTogMC4wMDEsXG4gICAgICAgICAgICByZXN0aXR1dGlvbjogMCxcbiAgICAgICAgICAgIGZyaWN0aW9uOiAwLjEsXG4gICAgICAgICAgICBmcmljdGlvblN0YXRpYzogMC41LFxuICAgICAgICAgICAgZnJpY3Rpb25BaXI6IDAuMDEsXG4gICAgICAgICAgICBjb2xsaXNpb25GaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogMHgwMDAxLFxuICAgICAgICAgICAgICAgIG1hc2s6IDB4RkZGRkZGRkYsXG4gICAgICAgICAgICAgICAgZ3JvdXA6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzbG9wOiAwLjA1LFxuICAgICAgICAgICAgdGltZVNjYWxlOiAxLFxuICAgICAgICAgICAgcmVuZGVyOiB7XG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIHNwcml0ZToge1xuICAgICAgICAgICAgICAgICAgICB4U2NhbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIHlTY2FsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgeE9mZnNldDogMCxcbiAgICAgICAgICAgICAgICAgICAgeU9mZnNldDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGJvZHkgPSBDb21tb24uZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICBfaW5pdFByb3BlcnRpZXMoYm9keSwgb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG5leHQgdW5pcXVlIGdyb3VwIGluZGV4IGZvciB3aGljaCBib2RpZXMgd2lsbCBjb2xsaWRlLlxuICAgICAqIElmIGBpc05vbkNvbGxpZGluZ2AgaXMgYHRydWVgLCByZXR1cm5zIHRoZSBuZXh0IHVuaXF1ZSBncm91cCBpbmRleCBmb3Igd2hpY2ggYm9kaWVzIHdpbGwgX25vdF8gY29sbGlkZS5cbiAgICAgKiBTZWUgYGJvZHkuY29sbGlzaW9uRmlsdGVyYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAbWV0aG9kIG5leHRHcm91cFxuICAgICAqIEBwYXJhbSB7Ym9vbH0gW2lzTm9uQ29sbGlkaW5nPWZhbHNlXVxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVW5pcXVlIGdyb3VwIGluZGV4XG4gICAgICovXG4gICAgQm9keS5uZXh0R3JvdXAgPSBmdW5jdGlvbihpc05vbkNvbGxpZGluZykge1xuICAgICAgICBpZiAoaXNOb25Db2xsaWRpbmcpXG4gICAgICAgICAgICByZXR1cm4gQm9keS5fbmV4dE5vbkNvbGxpZGluZ0dyb3VwSWQtLTtcblxuICAgICAgICByZXR1cm4gQm9keS5fbmV4dENvbGxpZGluZ0dyb3VwSWQrKztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmV4dCB1bmlxdWUgY2F0ZWdvcnkgYml0ZmllbGQgKHN0YXJ0aW5nIGFmdGVyIHRoZSBpbml0aWFsIGRlZmF1bHQgY2F0ZWdvcnkgYDB4MDAwMWApLlxuICAgICAqIFRoZXJlIGFyZSAzMiBhdmFpbGFibGUuIFNlZSBgYm9keS5jb2xsaXNpb25GaWx0ZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqIEBtZXRob2QgbmV4dENhdGVnb3J5XG4gICAgICogQHJldHVybiB7TnVtYmVyfSBVbmlxdWUgY2F0ZWdvcnkgYml0ZmllbGRcbiAgICAgKi9cbiAgICBCb2R5Lm5leHRDYXRlZ29yeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBCb2R5Ll9uZXh0Q2F0ZWdvcnkgPSBCb2R5Ll9uZXh0Q2F0ZWdvcnkgPDwgMTtcbiAgICAgICAgcmV0dXJuIEJvZHkuX25leHRDYXRlZ29yeTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGlzZXMgYm9keSBwcm9wZXJ0aWVzLlxuICAgICAqIEBtZXRob2QgX2luaXRQcm9wZXJ0aWVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge30gW29wdGlvbnNdXG4gICAgICovXG4gICAgdmFyIF9pbml0UHJvcGVydGllcyA9IGZ1bmN0aW9uKGJvZHksIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgLy8gaW5pdCByZXF1aXJlZCBwcm9wZXJ0aWVzIChvcmRlciBpcyBpbXBvcnRhbnQpXG4gICAgICAgIEJvZHkuc2V0KGJvZHksIHtcbiAgICAgICAgICAgIGJvdW5kczogYm9keS5ib3VuZHMgfHwgQm91bmRzLmNyZWF0ZShib2R5LnZlcnRpY2VzKSxcbiAgICAgICAgICAgIHBvc2l0aW9uUHJldjogYm9keS5wb3NpdGlvblByZXYgfHwgVmVjdG9yLmNsb25lKGJvZHkucG9zaXRpb24pLFxuICAgICAgICAgICAgYW5nbGVQcmV2OiBib2R5LmFuZ2xlUHJldiB8fCBib2R5LmFuZ2xlLFxuICAgICAgICAgICAgdmVydGljZXM6IGJvZHkudmVydGljZXMsXG4gICAgICAgICAgICBwYXJ0czogYm9keS5wYXJ0cyB8fCBbYm9keV0sXG4gICAgICAgICAgICBpc1N0YXRpYzogYm9keS5pc1N0YXRpYyxcbiAgICAgICAgICAgIGlzU2xlZXBpbmc6IGJvZHkuaXNTbGVlcGluZyxcbiAgICAgICAgICAgIHBhcmVudDogYm9keS5wYXJlbnQgfHwgYm9keVxuICAgICAgICB9KTtcblxuICAgICAgICBWZXJ0aWNlcy5yb3RhdGUoYm9keS52ZXJ0aWNlcywgYm9keS5hbmdsZSwgYm9keS5wb3NpdGlvbik7XG4gICAgICAgIEF4ZXMucm90YXRlKGJvZHkuYXhlcywgYm9keS5hbmdsZSk7XG4gICAgICAgIEJvdW5kcy51cGRhdGUoYm9keS5ib3VuZHMsIGJvZHkudmVydGljZXMsIGJvZHkudmVsb2NpdHkpO1xuXG4gICAgICAgIC8vIGFsbG93IG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIGF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzXG4gICAgICAgIEJvZHkuc2V0KGJvZHksIHtcbiAgICAgICAgICAgIGF4ZXM6IG9wdGlvbnMuYXhlcyB8fCBib2R5LmF4ZXMsXG4gICAgICAgICAgICBhcmVhOiBvcHRpb25zLmFyZWEgfHwgYm9keS5hcmVhLFxuICAgICAgICAgICAgbWFzczogb3B0aW9ucy5tYXNzIHx8IGJvZHkubWFzcyxcbiAgICAgICAgICAgIGluZXJ0aWE6IG9wdGlvbnMuaW5lcnRpYSB8fCBib2R5LmluZXJ0aWFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVuZGVyIHByb3BlcnRpZXNcbiAgICAgICAgdmFyIGRlZmF1bHRGaWxsU3R5bGUgPSAoYm9keS5pc1N0YXRpYyA/ICcjMmUyYjQ0JyA6IENvbW1vbi5jaG9vc2UoWycjMDA2QkE2JywgJyMwNDk2RkYnLCAnI0ZGQkM0MicsICcjRDgxMTU5JywgJyM4RjJENTYnXSkpLFxuICAgICAgICAgICAgZGVmYXVsdFN0cm9rZVN0eWxlID0gJyMwMDAnO1xuICAgICAgICBib2R5LnJlbmRlci5maWxsU3R5bGUgPSBib2R5LnJlbmRlci5maWxsU3R5bGUgfHwgZGVmYXVsdEZpbGxTdHlsZTtcbiAgICAgICAgYm9keS5yZW5kZXIuc3Ryb2tlU3R5bGUgPSBib2R5LnJlbmRlci5zdHJva2VTdHlsZSB8fCBkZWZhdWx0U3Ryb2tlU3R5bGU7XG4gICAgICAgIGJvZHkucmVuZGVyLnNwcml0ZS54T2Zmc2V0ICs9IC0oYm9keS5ib3VuZHMubWluLnggLSBib2R5LnBvc2l0aW9uLngpIC8gKGJvZHkuYm91bmRzLm1heC54IC0gYm9keS5ib3VuZHMubWluLngpO1xuICAgICAgICBib2R5LnJlbmRlci5zcHJpdGUueU9mZnNldCArPSAtKGJvZHkuYm91bmRzLm1pbi55IC0gYm9keS5wb3NpdGlvbi55KSAvIChib2R5LmJvdW5kcy5tYXgueSAtIGJvZHkuYm91bmRzLm1pbi55KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBwcm9wZXJ0eSBhbmQgYSB2YWx1ZSAob3IgbWFwIG9mKSwgc2V0cyB0aGUgcHJvcGVydHkocykgb24gdGhlIGJvZHksIHVzaW5nIHRoZSBhcHByb3ByaWF0ZSBzZXR0ZXIgZnVuY3Rpb25zIGlmIHRoZXkgZXhpc3QuXG4gICAgICogUHJlZmVyIHRvIHVzZSB0aGUgYWN0dWFsIHNldHRlciBmdW5jdGlvbnMgaW4gcGVyZm9ybWFuY2UgY3JpdGljYWwgc2l0dWF0aW9ucy5cbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7fSBzZXR0aW5ncyBBIHByb3BlcnR5IG5hbWUgKG9yIG1hcCBvZiBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMpIHRvIHNldCBvbiB0aGUgYm9keS5cbiAgICAgKiBAcGFyYW0ge30gdmFsdWUgVGhlIHZhbHVlIHRvIHNldCBpZiBgc2V0dGluZ3NgIGlzIGEgc2luZ2xlIHByb3BlcnR5IG5hbWUuXG4gICAgICovXG4gICAgQm9keS5zZXQgPSBmdW5jdGlvbihib2R5LCBzZXR0aW5ncywgdmFsdWUpIHtcbiAgICAgICAgdmFyIHByb3BlcnR5O1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eSA9IHNldHRpbmdzO1xuICAgICAgICAgICAgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgICAgIHNldHRpbmdzW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBzZXR0aW5ncykge1xuICAgICAgICAgICAgdmFsdWUgPSBzZXR0aW5nc1twcm9wZXJ0eV07XG5cbiAgICAgICAgICAgIGlmICghc2V0dGluZ3MuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ2lzU3RhdGljJzpcbiAgICAgICAgICAgICAgICBCb2R5LnNldFN0YXRpYyhib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpc1NsZWVwaW5nJzpcbiAgICAgICAgICAgICAgICBTbGVlcGluZy5zZXQoYm9keSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWFzcyc6XG4gICAgICAgICAgICAgICAgQm9keS5zZXRNYXNzKGJvZHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RlbnNpdHknOlxuICAgICAgICAgICAgICAgIEJvZHkuc2V0RGVuc2l0eShib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbmVydGlhJzpcbiAgICAgICAgICAgICAgICBCb2R5LnNldEluZXJ0aWEoYm9keSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndmVydGljZXMnOlxuICAgICAgICAgICAgICAgIEJvZHkuc2V0VmVydGljZXMoYm9keSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncG9zaXRpb24nOlxuICAgICAgICAgICAgICAgIEJvZHkuc2V0UG9zaXRpb24oYm9keSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYW5nbGUnOlxuICAgICAgICAgICAgICAgIEJvZHkuc2V0QW5nbGUoYm9keSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndmVsb2NpdHknOlxuICAgICAgICAgICAgICAgIEJvZHkuc2V0VmVsb2NpdHkoYm9keSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYW5ndWxhclZlbG9jaXR5JzpcbiAgICAgICAgICAgICAgICBCb2R5LnNldEFuZ3VsYXJWZWxvY2l0eShib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwYXJ0cyc6XG4gICAgICAgICAgICAgICAgQm9keS5zZXRQYXJ0cyhib2R5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJvZHlbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBib2R5IGFzIHN0YXRpYywgaW5jbHVkaW5nIGlzU3RhdGljIGZsYWcgYW5kIHNldHRpbmcgbWFzcyBhbmQgaW5lcnRpYSB0byBJbmZpbml0eS5cbiAgICAgKiBAbWV0aG9kIHNldFN0YXRpY1xuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7Ym9vbH0gaXNTdGF0aWNcbiAgICAgKi9cbiAgICBCb2R5LnNldFN0YXRpYyA9IGZ1bmN0aW9uKGJvZHksIGlzU3RhdGljKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBib2R5LnBhcnRzW2ldO1xuICAgICAgICAgICAgcGFydC5pc1N0YXRpYyA9IGlzU3RhdGljO1xuXG4gICAgICAgICAgICBpZiAoaXNTdGF0aWMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0Ll9vcmlnaW5hbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdGl0dXRpb246IHBhcnQucmVzdGl0dXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGZyaWN0aW9uOiBwYXJ0LmZyaWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBtYXNzOiBwYXJ0Lm1hc3MsXG4gICAgICAgICAgICAgICAgICAgIGluZXJ0aWE6IHBhcnQuaW5lcnRpYSxcbiAgICAgICAgICAgICAgICAgICAgZGVuc2l0eTogcGFydC5kZW5zaXR5LFxuICAgICAgICAgICAgICAgICAgICBpbnZlcnNlTWFzczogcGFydC5pbnZlcnNlTWFzcyxcbiAgICAgICAgICAgICAgICAgICAgaW52ZXJzZUluZXJ0aWE6IHBhcnQuaW52ZXJzZUluZXJ0aWFcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcGFydC5yZXN0aXR1dGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgcGFydC5mcmljdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgcGFydC5tYXNzID0gcGFydC5pbmVydGlhID0gcGFydC5kZW5zaXR5ID0gSW5maW5pdHk7XG4gICAgICAgICAgICAgICAgcGFydC5pbnZlcnNlTWFzcyA9IHBhcnQuaW52ZXJzZUluZXJ0aWEgPSAwO1xuXG4gICAgICAgICAgICAgICAgcGFydC5wb3NpdGlvblByZXYueCA9IHBhcnQucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBwYXJ0LnBvc2l0aW9uUHJldi55ID0gcGFydC5wb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIHBhcnQuYW5nbGVQcmV2ID0gcGFydC5hbmdsZTtcbiAgICAgICAgICAgICAgICBwYXJ0LmFuZ3VsYXJWZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgcGFydC5zcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgcGFydC5hbmd1bGFyU3BlZWQgPSAwO1xuICAgICAgICAgICAgICAgIHBhcnQubW90aW9uID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFydC5fb3JpZ2luYWwpIHtcbiAgICAgICAgICAgICAgICBwYXJ0LnJlc3RpdHV0aW9uID0gcGFydC5fb3JpZ2luYWwucmVzdGl0dXRpb247XG4gICAgICAgICAgICAgICAgcGFydC5mcmljdGlvbiA9IHBhcnQuX29yaWdpbmFsLmZyaWN0aW9uO1xuICAgICAgICAgICAgICAgIHBhcnQubWFzcyA9IHBhcnQuX29yaWdpbmFsLm1hc3M7XG4gICAgICAgICAgICAgICAgcGFydC5pbmVydGlhID0gcGFydC5fb3JpZ2luYWwuaW5lcnRpYTtcbiAgICAgICAgICAgICAgICBwYXJ0LmRlbnNpdHkgPSBwYXJ0Ll9vcmlnaW5hbC5kZW5zaXR5O1xuICAgICAgICAgICAgICAgIHBhcnQuaW52ZXJzZU1hc3MgPSBwYXJ0Ll9vcmlnaW5hbC5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgICAgICBwYXJ0LmludmVyc2VJbmVydGlhID0gcGFydC5fb3JpZ2luYWwuaW52ZXJzZUluZXJ0aWE7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgcGFydC5fb3JpZ2luYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWFzcyBvZiB0aGUgYm9keS4gSW52ZXJzZSBtYXNzLCBkZW5zaXR5IGFuZCBpbmVydGlhIGFyZSBhdXRvbWF0aWNhbGx5IHVwZGF0ZWQgdG8gcmVmbGVjdCB0aGUgY2hhbmdlLlxuICAgICAqIEBtZXRob2Qgc2V0TWFzc1xuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXNzXG4gICAgICovXG4gICAgQm9keS5zZXRNYXNzID0gZnVuY3Rpb24oYm9keSwgbWFzcykge1xuICAgICAgICB2YXIgbW9tZW50ID0gYm9keS5pbmVydGlhIC8gKGJvZHkubWFzcyAvIDYpO1xuICAgICAgICBib2R5LmluZXJ0aWEgPSBtb21lbnQgKiAobWFzcyAvIDYpO1xuICAgICAgICBib2R5LmludmVyc2VJbmVydGlhID0gMSAvIGJvZHkuaW5lcnRpYTtcblxuICAgICAgICBib2R5Lm1hc3MgPSBtYXNzO1xuICAgICAgICBib2R5LmludmVyc2VNYXNzID0gMSAvIGJvZHkubWFzcztcbiAgICAgICAgYm9keS5kZW5zaXR5ID0gYm9keS5tYXNzIC8gYm9keS5hcmVhO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZW5zaXR5IG9mIHRoZSBib2R5LiBNYXNzIGFuZCBpbmVydGlhIGFyZSBhdXRvbWF0aWNhbGx5IHVwZGF0ZWQgdG8gcmVmbGVjdCB0aGUgY2hhbmdlLlxuICAgICAqIEBtZXRob2Qgc2V0RGVuc2l0eVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZW5zaXR5XG4gICAgICovXG4gICAgQm9keS5zZXREZW5zaXR5ID0gZnVuY3Rpb24oYm9keSwgZGVuc2l0eSkge1xuICAgICAgICBCb2R5LnNldE1hc3MoYm9keSwgZGVuc2l0eSAqIGJvZHkuYXJlYSk7XG4gICAgICAgIGJvZHkuZGVuc2l0eSA9IGRlbnNpdHk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1vbWVudCBvZiBpbmVydGlhIChpLmUuIHNlY29uZCBtb21lbnQgb2YgYXJlYSkgb2YgdGhlIGJvZHkgb2YgdGhlIGJvZHkuIFxuICAgICAqIEludmVyc2UgaW5lcnRpYSBpcyBhdXRvbWF0aWNhbGx5IHVwZGF0ZWQgdG8gcmVmbGVjdCB0aGUgY2hhbmdlLiBNYXNzIGlzIG5vdCBjaGFuZ2VkLlxuICAgICAqIEBtZXRob2Qgc2V0SW5lcnRpYVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmVydGlhXG4gICAgICovXG4gICAgQm9keS5zZXRJbmVydGlhID0gZnVuY3Rpb24oYm9keSwgaW5lcnRpYSkge1xuICAgICAgICBib2R5LmluZXJ0aWEgPSBpbmVydGlhO1xuICAgICAgICBib2R5LmludmVyc2VJbmVydGlhID0gMSAvIGJvZHkuaW5lcnRpYTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYm9keSdzIHZlcnRpY2VzIGFuZCB1cGRhdGVzIGJvZHkgcHJvcGVydGllcyBhY2NvcmRpbmdseSwgaW5jbHVkaW5nIGluZXJ0aWEsIGFyZWEgYW5kIG1hc3MgKHdpdGggcmVzcGVjdCB0byBgYm9keS5kZW5zaXR5YCkuXG4gICAgICogVmVydGljZXMgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHRyYW5zZm9ybWVkIHRvIGJlIG9yaWVudGF0ZWQgYXJvdW5kIHRoZWlyIGNlbnRyZSBvZiBtYXNzIGFzIHRoZSBvcmlnaW4uXG4gICAgICogVGhleSBhcmUgdGhlbiBhdXRvbWF0aWNhbGx5IHRyYW5zbGF0ZWQgdG8gd29ybGQgc3BhY2UgYmFzZWQgb24gYGJvZHkucG9zaXRpb25gLlxuICAgICAqXG4gICAgICogVGhlIGB2ZXJ0aWNlc2AgYXJndW1lbnQgc2hvdWxkIGJlIHBhc3NlZCBhcyBhbiBhcnJheSBvZiBgTWF0dGVyLlZlY3RvcmAgcG9pbnRzIChvciBhIGBNYXR0ZXIuVmVydGljZXNgIGFycmF5KS5cbiAgICAgKiBWZXJ0aWNlcyBtdXN0IGZvcm0gYSBjb252ZXggaHVsbCwgY29uY2F2ZSBodWxscyBhcmUgbm90IHN1cHBvcnRlZC5cbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc2V0VmVydGljZXNcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge3ZlY3RvcltdfSB2ZXJ0aWNlc1xuICAgICAqL1xuICAgIEJvZHkuc2V0VmVydGljZXMgPSBmdW5jdGlvbihib2R5LCB2ZXJ0aWNlcykge1xuICAgICAgICAvLyBjaGFuZ2UgdmVydGljZXNcbiAgICAgICAgaWYgKHZlcnRpY2VzWzBdLmJvZHkgPT09IGJvZHkpIHtcbiAgICAgICAgICAgIGJvZHkudmVydGljZXMgPSB2ZXJ0aWNlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkudmVydGljZXMgPSBWZXJ0aWNlcy5jcmVhdGUodmVydGljZXMsIGJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHByb3BlcnRpZXNcbiAgICAgICAgYm9keS5heGVzID0gQXhlcy5mcm9tVmVydGljZXMoYm9keS52ZXJ0aWNlcyk7XG4gICAgICAgIGJvZHkuYXJlYSA9IFZlcnRpY2VzLmFyZWEoYm9keS52ZXJ0aWNlcyk7XG4gICAgICAgIEJvZHkuc2V0TWFzcyhib2R5LCBib2R5LmRlbnNpdHkgKiBib2R5LmFyZWEpO1xuXG4gICAgICAgIC8vIG9yaWVudCB2ZXJ0aWNlcyBhcm91bmQgdGhlIGNlbnRyZSBvZiBtYXNzIGF0IG9yaWdpbiAoMCwgMClcbiAgICAgICAgdmFyIGNlbnRyZSA9IFZlcnRpY2VzLmNlbnRyZShib2R5LnZlcnRpY2VzKTtcbiAgICAgICAgVmVydGljZXMudHJhbnNsYXRlKGJvZHkudmVydGljZXMsIGNlbnRyZSwgLTEpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBpbmVydGlhIHdoaWxlIHZlcnRpY2VzIGFyZSBhdCBvcmlnaW4gKDAsIDApXG4gICAgICAgIEJvZHkuc2V0SW5lcnRpYShib2R5LCBCb2R5Ll9pbmVydGlhU2NhbGUgKiBWZXJ0aWNlcy5pbmVydGlhKGJvZHkudmVydGljZXMsIGJvZHkubWFzcykpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBnZW9tZXRyeVxuICAgICAgICBWZXJ0aWNlcy50cmFuc2xhdGUoYm9keS52ZXJ0aWNlcywgYm9keS5wb3NpdGlvbik7XG4gICAgICAgIEJvdW5kcy51cGRhdGUoYm9keS5ib3VuZHMsIGJvZHkudmVydGljZXMsIGJvZHkudmVsb2NpdHkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwYXJ0cyBvZiB0aGUgYGJvZHlgIGFuZCB1cGRhdGVzIG1hc3MsIGluZXJ0aWEgYW5kIGNlbnRyb2lkLlxuICAgICAqIEVhY2ggcGFydCB3aWxsIGhhdmUgaXRzIHBhcmVudCBzZXQgdG8gYGJvZHlgLlxuICAgICAqIEJ5IGRlZmF1bHQgdGhlIGNvbnZleCBodWxsIHdpbGwgYmUgYXV0b21hdGljYWxseSBjb21wdXRlZCBhbmQgc2V0IG9uIGBib2R5YCwgdW5sZXNzIGBhdXRvSHVsbGAgaXMgc2V0IHRvIGBmYWxzZS5gXG4gICAgICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgZW5zdXJlIHRoYXQgdGhlIGZpcnN0IHBhcnQgaW4gYGJvZHkucGFydHNgIHdpbGwgYWx3YXlzIGJlIHRoZSBgYm9keWAuXG4gICAgICogQG1ldGhvZCBzZXRQYXJ0c1xuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSBbYm9keV0gcGFydHNcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IFthdXRvSHVsbD10cnVlXVxuICAgICAqL1xuICAgIEJvZHkuc2V0UGFydHMgPSBmdW5jdGlvbihib2R5LCBwYXJ0cywgYXV0b0h1bGwpIHtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgLy8gYWRkIGFsbCB0aGUgcGFydHMsIGVuc3VyaW5nIHRoYXQgdGhlIGZpcnN0IHBhcnQgaXMgYWx3YXlzIHRoZSBwYXJlbnQgYm9keVxuICAgICAgICBwYXJ0cyA9IHBhcnRzLnNsaWNlKDApO1xuICAgICAgICBib2R5LnBhcnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIGJvZHkucGFydHMucHVzaChib2R5KTtcbiAgICAgICAgYm9keS5wYXJlbnQgPSBib2R5O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcbiAgICAgICAgICAgIGlmIChwYXJ0ICE9PSBib2R5KSB7XG4gICAgICAgICAgICAgICAgcGFydC5wYXJlbnQgPSBib2R5O1xuICAgICAgICAgICAgICAgIGJvZHkucGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib2R5LnBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBhdXRvSHVsbCA9IHR5cGVvZiBhdXRvSHVsbCAhPT0gJ3VuZGVmaW5lZCcgPyBhdXRvSHVsbCA6IHRydWU7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgY29udmV4IGh1bGwgb2YgYWxsIHBhcnRzIHRvIHNldCBvbiB0aGUgcGFyZW50IGJvZHlcbiAgICAgICAgaWYgKGF1dG9IdWxsKSB7XG4gICAgICAgICAgICB2YXIgdmVydGljZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzID0gdmVydGljZXMuY29uY2F0KHBhcnRzW2ldLnZlcnRpY2VzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVmVydGljZXMuY2xvY2t3aXNlU29ydCh2ZXJ0aWNlcyk7XG5cbiAgICAgICAgICAgIHZhciBodWxsID0gVmVydGljZXMuaHVsbCh2ZXJ0aWNlcyksXG4gICAgICAgICAgICAgICAgaHVsbENlbnRyZSA9IFZlcnRpY2VzLmNlbnRyZShodWxsKTtcblxuICAgICAgICAgICAgQm9keS5zZXRWZXJ0aWNlcyhib2R5LCBodWxsKTtcbiAgICAgICAgICAgIFZlcnRpY2VzLnRyYW5zbGF0ZShib2R5LnZlcnRpY2VzLCBodWxsQ2VudHJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN1bSB0aGUgcHJvcGVydGllcyBvZiBhbGwgY29tcG91bmQgcGFydHMgb2YgdGhlIHBhcmVudCBib2R5XG4gICAgICAgIHZhciB0b3RhbCA9IEJvZHkuX3RvdGFsUHJvcGVydGllcyhib2R5KTtcblxuICAgICAgICBib2R5LmFyZWEgPSB0b3RhbC5hcmVhO1xuICAgICAgICBib2R5LnBhcmVudCA9IGJvZHk7XG4gICAgICAgIGJvZHkucG9zaXRpb24ueCA9IHRvdGFsLmNlbnRyZS54O1xuICAgICAgICBib2R5LnBvc2l0aW9uLnkgPSB0b3RhbC5jZW50cmUueTtcbiAgICAgICAgYm9keS5wb3NpdGlvblByZXYueCA9IHRvdGFsLmNlbnRyZS54O1xuICAgICAgICBib2R5LnBvc2l0aW9uUHJldi55ID0gdG90YWwuY2VudHJlLnk7XG5cbiAgICAgICAgQm9keS5zZXRNYXNzKGJvZHksIHRvdGFsLm1hc3MpO1xuICAgICAgICBCb2R5LnNldEluZXJ0aWEoYm9keSwgdG90YWwuaW5lcnRpYSk7XG4gICAgICAgIEJvZHkuc2V0UG9zaXRpb24oYm9keSwgdG90YWwuY2VudHJlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGJvZHkgaW5zdGFudGx5LiBWZWxvY2l0eSwgYW5nbGUsIGZvcmNlIGV0Yy4gYXJlIHVuY2hhbmdlZC5cbiAgICAgKiBAbWV0aG9kIHNldFBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvc2l0aW9uXG4gICAgICovXG4gICAgQm9keS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKGJvZHksIHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IFZlY3Rvci5zdWIocG9zaXRpb24sIGJvZHkucG9zaXRpb24pO1xuICAgICAgICBib2R5LnBvc2l0aW9uUHJldi54ICs9IGRlbHRhLng7XG4gICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnkgKz0gZGVsdGEueTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZHkucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYXJ0ID0gYm9keS5wYXJ0c1tpXTtcbiAgICAgICAgICAgIHBhcnQucG9zaXRpb24ueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgcGFydC5wb3NpdGlvbi55ICs9IGRlbHRhLnk7XG4gICAgICAgICAgICBWZXJ0aWNlcy50cmFuc2xhdGUocGFydC52ZXJ0aWNlcywgZGVsdGEpO1xuICAgICAgICAgICAgQm91bmRzLnVwZGF0ZShwYXJ0LmJvdW5kcywgcGFydC52ZXJ0aWNlcywgYm9keS52ZWxvY2l0eSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYW5nbGUgb2YgdGhlIGJvZHkgaW5zdGFudGx5LiBBbmd1bGFyIHZlbG9jaXR5LCBwb3NpdGlvbiwgZm9yY2UgZXRjLiBhcmUgdW5jaGFuZ2VkLlxuICAgICAqIEBtZXRob2Qgc2V0QW5nbGVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGVcbiAgICAgKi9cbiAgICBCb2R5LnNldEFuZ2xlID0gZnVuY3Rpb24oYm9keSwgYW5nbGUpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gYW5nbGUgLSBib2R5LmFuZ2xlO1xuICAgICAgICBib2R5LmFuZ2xlUHJldiArPSBkZWx0YTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZHkucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYXJ0ID0gYm9keS5wYXJ0c1tpXTtcbiAgICAgICAgICAgIHBhcnQuYW5nbGUgKz0gZGVsdGE7XG4gICAgICAgICAgICBWZXJ0aWNlcy5yb3RhdGUocGFydC52ZXJ0aWNlcywgZGVsdGEsIGJvZHkucG9zaXRpb24pO1xuICAgICAgICAgICAgQXhlcy5yb3RhdGUocGFydC5heGVzLCBkZWx0YSk7XG4gICAgICAgICAgICBCb3VuZHMudXBkYXRlKHBhcnQuYm91bmRzLCBwYXJ0LnZlcnRpY2VzLCBib2R5LnZlbG9jaXR5KTtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIFZlY3Rvci5yb3RhdGVBYm91dChwYXJ0LnBvc2l0aW9uLCBkZWx0YSwgYm9keS5wb3NpdGlvbiwgcGFydC5wb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbGluZWFyIHZlbG9jaXR5IG9mIHRoZSBib2R5IGluc3RhbnRseS4gUG9zaXRpb24sIGFuZ2xlLCBmb3JjZSBldGMuIGFyZSB1bmNoYW5nZWQuIFNlZSBhbHNvIGBCb2R5LmFwcGx5Rm9yY2VgLlxuICAgICAqIEBtZXRob2Qgc2V0VmVsb2NpdHlcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVsb2NpdHlcbiAgICAgKi9cbiAgICBCb2R5LnNldFZlbG9jaXR5ID0gZnVuY3Rpb24oYm9keSwgdmVsb2NpdHkpIHtcbiAgICAgICAgYm9keS5wb3NpdGlvblByZXYueCA9IGJvZHkucG9zaXRpb24ueCAtIHZlbG9jaXR5Lng7XG4gICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnkgPSBib2R5LnBvc2l0aW9uLnkgLSB2ZWxvY2l0eS55O1xuICAgICAgICBib2R5LnZlbG9jaXR5LnggPSB2ZWxvY2l0eS54O1xuICAgICAgICBib2R5LnZlbG9jaXR5LnkgPSB2ZWxvY2l0eS55O1xuICAgICAgICBib2R5LnNwZWVkID0gVmVjdG9yLm1hZ25pdHVkZShib2R5LnZlbG9jaXR5KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYW5ndWxhciB2ZWxvY2l0eSBvZiB0aGUgYm9keSBpbnN0YW50bHkuIFBvc2l0aW9uLCBhbmdsZSwgZm9yY2UgZXRjLiBhcmUgdW5jaGFuZ2VkLiBTZWUgYWxzbyBgQm9keS5hcHBseUZvcmNlYC5cbiAgICAgKiBAbWV0aG9kIHNldEFuZ3VsYXJWZWxvY2l0eVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2ZWxvY2l0eVxuICAgICAqL1xuICAgIEJvZHkuc2V0QW5ndWxhclZlbG9jaXR5ID0gZnVuY3Rpb24oYm9keSwgdmVsb2NpdHkpIHtcbiAgICAgICAgYm9keS5hbmdsZVByZXYgPSBib2R5LmFuZ2xlIC0gdmVsb2NpdHk7XG4gICAgICAgIGJvZHkuYW5ndWxhclZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgICAgIGJvZHkuYW5ndWxhclNwZWVkID0gTWF0aC5hYnMoYm9keS5hbmd1bGFyVmVsb2NpdHkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhIGJvZHkgYnkgYSBnaXZlbiB2ZWN0b3IgcmVsYXRpdmUgdG8gaXRzIGN1cnJlbnQgcG9zaXRpb24sIHdpdGhvdXQgaW1wYXJ0aW5nIGFueSB2ZWxvY2l0eS5cbiAgICAgKiBAbWV0aG9kIHRyYW5zbGF0ZVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB0cmFuc2xhdGlvblxuICAgICAqL1xuICAgIEJvZHkudHJhbnNsYXRlID0gZnVuY3Rpb24oYm9keSwgdHJhbnNsYXRpb24pIHtcbiAgICAgICAgQm9keS5zZXRQb3NpdGlvbihib2R5LCBWZWN0b3IuYWRkKGJvZHkucG9zaXRpb24sIHRyYW5zbGF0aW9uKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJvdGF0ZXMgYSBib2R5IGJ5IGEgZ2l2ZW4gYW5nbGUgcmVsYXRpdmUgdG8gaXRzIGN1cnJlbnQgYW5nbGUsIHdpdGhvdXQgaW1wYXJ0aW5nIGFueSBhbmd1bGFyIHZlbG9jaXR5LlxuICAgICAqIEBtZXRob2Qgcm90YXRlXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvdGF0aW9uXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtwb2ludF1cbiAgICAgKi9cbiAgICBCb2R5LnJvdGF0ZSA9IGZ1bmN0aW9uKGJvZHksIHJvdGF0aW9uLCBwb2ludCkge1xuICAgICAgICBpZiAoIXBvaW50KSB7XG4gICAgICAgICAgICBCb2R5LnNldEFuZ2xlKGJvZHksIGJvZHkuYW5nbGUgKyByb3RhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29zID0gTWF0aC5jb3Mocm90YXRpb24pLFxuICAgICAgICAgICAgICAgIHNpbiA9IE1hdGguc2luKHJvdGF0aW9uKSxcbiAgICAgICAgICAgICAgICBkeCA9IGJvZHkucG9zaXRpb24ueCAtIHBvaW50LngsXG4gICAgICAgICAgICAgICAgZHkgPSBib2R5LnBvc2l0aW9uLnkgLSBwb2ludC55O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgQm9keS5zZXRQb3NpdGlvbihib2R5LCB7XG4gICAgICAgICAgICAgICAgeDogcG9pbnQueCArIChkeCAqIGNvcyAtIGR5ICogc2luKSxcbiAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgKGR4ICogc2luICsgZHkgKiBjb3MpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQm9keS5zZXRBbmdsZShib2R5LCBib2R5LmFuZ2xlICsgcm90YXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNjYWxlcyB0aGUgYm9keSwgaW5jbHVkaW5nIHVwZGF0aW5nIHBoeXNpY2FsIHByb3BlcnRpZXMgKG1hc3MsIGFyZWEsIGF4ZXMsIGluZXJ0aWEpLCBmcm9tIGEgd29ybGQtc3BhY2UgcG9pbnQgKGRlZmF1bHQgaXMgYm9keSBjZW50cmUpLlxuICAgICAqIEBtZXRob2Qgc2NhbGVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVYXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlWVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBbcG9pbnRdXG4gICAgICovXG4gICAgQm9keS5zY2FsZSA9IGZ1bmN0aW9uKGJvZHksIHNjYWxlWCwgc2NhbGVZLCBwb2ludCkge1xuICAgICAgICB2YXIgdG90YWxBcmVhID0gMCxcbiAgICAgICAgICAgIHRvdGFsSW5lcnRpYSA9IDA7XG5cbiAgICAgICAgcG9pbnQgPSBwb2ludCB8fCBib2R5LnBvc2l0aW9uO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBib2R5LnBhcnRzW2ldO1xuXG4gICAgICAgICAgICAvLyBzY2FsZSB2ZXJ0aWNlc1xuICAgICAgICAgICAgVmVydGljZXMuc2NhbGUocGFydC52ZXJ0aWNlcywgc2NhbGVYLCBzY2FsZVksIHBvaW50KTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHByb3BlcnRpZXNcbiAgICAgICAgICAgIHBhcnQuYXhlcyA9IEF4ZXMuZnJvbVZlcnRpY2VzKHBhcnQudmVydGljZXMpO1xuICAgICAgICAgICAgcGFydC5hcmVhID0gVmVydGljZXMuYXJlYShwYXJ0LnZlcnRpY2VzKTtcbiAgICAgICAgICAgIEJvZHkuc2V0TWFzcyhwYXJ0LCBib2R5LmRlbnNpdHkgKiBwYXJ0LmFyZWEpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgaW5lcnRpYSAocmVxdWlyZXMgdmVydGljZXMgdG8gYmUgYXQgb3JpZ2luKVxuICAgICAgICAgICAgVmVydGljZXMudHJhbnNsYXRlKHBhcnQudmVydGljZXMsIHsgeDogLXBhcnQucG9zaXRpb24ueCwgeTogLXBhcnQucG9zaXRpb24ueSB9KTtcbiAgICAgICAgICAgIEJvZHkuc2V0SW5lcnRpYShwYXJ0LCBCb2R5Ll9pbmVydGlhU2NhbGUgKiBWZXJ0aWNlcy5pbmVydGlhKHBhcnQudmVydGljZXMsIHBhcnQubWFzcykpO1xuICAgICAgICAgICAgVmVydGljZXMudHJhbnNsYXRlKHBhcnQudmVydGljZXMsIHsgeDogcGFydC5wb3NpdGlvbi54LCB5OiBwYXJ0LnBvc2l0aW9uLnkgfSk7XG5cbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHRvdGFsQXJlYSArPSBwYXJ0LmFyZWE7XG4gICAgICAgICAgICAgICAgdG90YWxJbmVydGlhICs9IHBhcnQuaW5lcnRpYTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2NhbGUgcG9zaXRpb25cbiAgICAgICAgICAgIHBhcnQucG9zaXRpb24ueCA9IHBvaW50LnggKyAocGFydC5wb3NpdGlvbi54IC0gcG9pbnQueCkgKiBzY2FsZVg7XG4gICAgICAgICAgICBwYXJ0LnBvc2l0aW9uLnkgPSBwb2ludC55ICsgKHBhcnQucG9zaXRpb24ueSAtIHBvaW50LnkpICogc2NhbGVZO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgYm91bmRzXG4gICAgICAgICAgICBCb3VuZHMudXBkYXRlKHBhcnQuYm91bmRzLCBwYXJ0LnZlcnRpY2VzLCBib2R5LnZlbG9jaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhhbmRsZSBwYXJlbnQgYm9keVxuICAgICAgICBpZiAoYm9keS5wYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBib2R5LmFyZWEgPSB0b3RhbEFyZWE7XG5cbiAgICAgICAgICAgIGlmICghYm9keS5pc1N0YXRpYykge1xuICAgICAgICAgICAgICAgIEJvZHkuc2V0TWFzcyhib2R5LCBib2R5LmRlbnNpdHkgKiB0b3RhbEFyZWEpO1xuICAgICAgICAgICAgICAgIEJvZHkuc2V0SW5lcnRpYShib2R5LCB0b3RhbEluZXJ0aWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIGNpcmNsZXNcbiAgICAgICAgaWYgKGJvZHkuY2lyY2xlUmFkaXVzKSB7IFxuICAgICAgICAgICAgaWYgKHNjYWxlWCA9PT0gc2NhbGVZKSB7XG4gICAgICAgICAgICAgICAgYm9keS5jaXJjbGVSYWRpdXMgKj0gc2NhbGVYO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBib2R5IGlzIG5vIGxvbmdlciBhIGNpcmNsZVxuICAgICAgICAgICAgICAgIGJvZHkuY2lyY2xlUmFkaXVzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHNpbXVsYXRpb24gc3RlcCBmb3IgdGhlIGdpdmVuIGBib2R5YCwgaW5jbHVkaW5nIHVwZGF0aW5nIHBvc2l0aW9uIGFuZCBhbmdsZSB1c2luZyBWZXJsZXQgaW50ZWdyYXRpb24uXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVsdGFUaW1lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVTY2FsZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb3JyZWN0aW9uXG4gICAgICovXG4gICAgQm9keS51cGRhdGUgPSBmdW5jdGlvbihib2R5LCBkZWx0YVRpbWUsIHRpbWVTY2FsZSwgY29ycmVjdGlvbikge1xuICAgICAgICB2YXIgZGVsdGFUaW1lU3F1YXJlZCA9IE1hdGgucG93KGRlbHRhVGltZSAqIHRpbWVTY2FsZSAqIGJvZHkudGltZVNjYWxlLCAyKTtcblxuICAgICAgICAvLyBmcm9tIHRoZSBwcmV2aW91cyBzdGVwXG4gICAgICAgIHZhciBmcmljdGlvbkFpciA9IDEgLSBib2R5LmZyaWN0aW9uQWlyICogdGltZVNjYWxlICogYm9keS50aW1lU2NhbGUsXG4gICAgICAgICAgICB2ZWxvY2l0eVByZXZYID0gYm9keS5wb3NpdGlvbi54IC0gYm9keS5wb3NpdGlvblByZXYueCxcbiAgICAgICAgICAgIHZlbG9jaXR5UHJldlkgPSBib2R5LnBvc2l0aW9uLnkgLSBib2R5LnBvc2l0aW9uUHJldi55O1xuXG4gICAgICAgIC8vIHVwZGF0ZSB2ZWxvY2l0eSB3aXRoIFZlcmxldCBpbnRlZ3JhdGlvblxuICAgICAgICBib2R5LnZlbG9jaXR5LnggPSAodmVsb2NpdHlQcmV2WCAqIGZyaWN0aW9uQWlyICogY29ycmVjdGlvbikgKyAoYm9keS5mb3JjZS54IC8gYm9keS5tYXNzKSAqIGRlbHRhVGltZVNxdWFyZWQ7XG4gICAgICAgIGJvZHkudmVsb2NpdHkueSA9ICh2ZWxvY2l0eVByZXZZICogZnJpY3Rpb25BaXIgKiBjb3JyZWN0aW9uKSArIChib2R5LmZvcmNlLnkgLyBib2R5Lm1hc3MpICogZGVsdGFUaW1lU3F1YXJlZDtcblxuICAgICAgICBib2R5LnBvc2l0aW9uUHJldi54ID0gYm9keS5wb3NpdGlvbi54O1xuICAgICAgICBib2R5LnBvc2l0aW9uUHJldi55ID0gYm9keS5wb3NpdGlvbi55O1xuICAgICAgICBib2R5LnBvc2l0aW9uLnggKz0gYm9keS52ZWxvY2l0eS54O1xuICAgICAgICBib2R5LnBvc2l0aW9uLnkgKz0gYm9keS52ZWxvY2l0eS55O1xuXG4gICAgICAgIC8vIHVwZGF0ZSBhbmd1bGFyIHZlbG9jaXR5IHdpdGggVmVybGV0IGludGVncmF0aW9uXG4gICAgICAgIGJvZHkuYW5ndWxhclZlbG9jaXR5ID0gKChib2R5LmFuZ2xlIC0gYm9keS5hbmdsZVByZXYpICogZnJpY3Rpb25BaXIgKiBjb3JyZWN0aW9uKSArIChib2R5LnRvcnF1ZSAvIGJvZHkuaW5lcnRpYSkgKiBkZWx0YVRpbWVTcXVhcmVkO1xuICAgICAgICBib2R5LmFuZ2xlUHJldiA9IGJvZHkuYW5nbGU7XG4gICAgICAgIGJvZHkuYW5nbGUgKz0gYm9keS5hbmd1bGFyVmVsb2NpdHk7XG5cbiAgICAgICAgLy8gdHJhY2sgc3BlZWQgYW5kIGFjY2VsZXJhdGlvblxuICAgICAgICBib2R5LnNwZWVkID0gVmVjdG9yLm1hZ25pdHVkZShib2R5LnZlbG9jaXR5KTtcbiAgICAgICAgYm9keS5hbmd1bGFyU3BlZWQgPSBNYXRoLmFicyhib2R5LmFuZ3VsYXJWZWxvY2l0eSk7XG5cbiAgICAgICAgLy8gdHJhbnNmb3JtIHRoZSBib2R5IGdlb21ldHJ5XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBib2R5LnBhcnRzW2ldO1xuXG4gICAgICAgICAgICBWZXJ0aWNlcy50cmFuc2xhdGUocGFydC52ZXJ0aWNlcywgYm9keS52ZWxvY2l0eSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHBhcnQucG9zaXRpb24ueCArPSBib2R5LnZlbG9jaXR5Lng7XG4gICAgICAgICAgICAgICAgcGFydC5wb3NpdGlvbi55ICs9IGJvZHkudmVsb2NpdHkueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJvZHkuYW5ndWxhclZlbG9jaXR5ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgVmVydGljZXMucm90YXRlKHBhcnQudmVydGljZXMsIGJvZHkuYW5ndWxhclZlbG9jaXR5LCBib2R5LnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBBeGVzLnJvdGF0ZShwYXJ0LmF4ZXMsIGJvZHkuYW5ndWxhclZlbG9jaXR5KTtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yLnJvdGF0ZUFib3V0KHBhcnQucG9zaXRpb24sIGJvZHkuYW5ndWxhclZlbG9jaXR5LCBib2R5LnBvc2l0aW9uLCBwYXJ0LnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEJvdW5kcy51cGRhdGUocGFydC5ib3VuZHMsIHBhcnQudmVydGljZXMsIGJvZHkudmVsb2NpdHkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgYSBmb3JjZSB0byBhIGJvZHkgZnJvbSBhIGdpdmVuIHdvcmxkLXNwYWNlIHBvc2l0aW9uLCBpbmNsdWRpbmcgcmVzdWx0aW5nIHRvcnF1ZS5cbiAgICAgKiBAbWV0aG9kIGFwcGx5Rm9yY2VcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gcG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gZm9yY2VcbiAgICAgKi9cbiAgICBCb2R5LmFwcGx5Rm9yY2UgPSBmdW5jdGlvbihib2R5LCBwb3NpdGlvbiwgZm9yY2UpIHtcbiAgICAgICAgYm9keS5mb3JjZS54ICs9IGZvcmNlLng7XG4gICAgICAgIGJvZHkuZm9yY2UueSArPSBmb3JjZS55O1xuICAgICAgICB2YXIgb2Zmc2V0ID0geyB4OiBwb3NpdGlvbi54IC0gYm9keS5wb3NpdGlvbi54LCB5OiBwb3NpdGlvbi55IC0gYm9keS5wb3NpdGlvbi55IH07XG4gICAgICAgIGJvZHkudG9ycXVlICs9IG9mZnNldC54ICogZm9yY2UueSAtIG9mZnNldC55ICogZm9yY2UueDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3VtcyBvZiB0aGUgcHJvcGVydGllcyBvZiBhbGwgY29tcG91bmQgcGFydHMgb2YgdGhlIHBhcmVudCBib2R5LlxuICAgICAqIEBtZXRob2QgX3RvdGFsUHJvcGVydGllc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHJldHVybiB7fVxuICAgICAqL1xuICAgIEJvZHkuX3RvdGFsUHJvcGVydGllcyA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgICAgLy8gZnJvbSBlcXVhdGlvbnMgYXQ6XG4gICAgICAgIC8vIGh0dHBzOi8vZWNvdXJzZXMub3UuZWR1L2NnaS1iaW4vZWJvb2suY2dpP2RvYz0mdG9waWM9c3QmY2hhcF9zZWM9MDcuMiZwYWdlPXRoZW9yeVxuICAgICAgICAvLyBodHRwOi8vb3V0cHV0LnRvL3NpZGV3YXkvZGVmYXVsdC5hc3A/cW5vPTEyMTEwMDA4N1xuXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0ge1xuICAgICAgICAgICAgbWFzczogMCxcbiAgICAgICAgICAgIGFyZWE6IDAsXG4gICAgICAgICAgICBpbmVydGlhOiAwLFxuICAgICAgICAgICAgY2VudHJlOiB7IHg6IDAsIHk6IDAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHN1bSB0aGUgcHJvcGVydGllcyBvZiBhbGwgY29tcG91bmQgcGFydHMgb2YgdGhlIHBhcmVudCBib2R5XG4gICAgICAgIGZvciAodmFyIGkgPSBib2R5LnBhcnRzLmxlbmd0aCA9PT0gMSA/IDAgOiAxOyBpIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBib2R5LnBhcnRzW2ldLFxuICAgICAgICAgICAgICAgIG1hc3MgPSBwYXJ0Lm1hc3MgIT09IEluZmluaXR5ID8gcGFydC5tYXNzIDogMTtcblxuICAgICAgICAgICAgcHJvcGVydGllcy5tYXNzICs9IG1hc3M7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmFyZWEgKz0gcGFydC5hcmVhO1xuICAgICAgICAgICAgcHJvcGVydGllcy5pbmVydGlhICs9IHBhcnQuaW5lcnRpYTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMuY2VudHJlID0gVmVjdG9yLmFkZChwcm9wZXJ0aWVzLmNlbnRyZSwgVmVjdG9yLm11bHQocGFydC5wb3NpdGlvbiwgbWFzcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvcGVydGllcy5jZW50cmUgPSBWZWN0b3IuZGl2KHByb3BlcnRpZXMuY2VudHJlLCBwcm9wZXJ0aWVzLm1hc3MpO1xuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH07XG5cbiAgICAvKlxuICAgICpcbiAgICAqICBFdmVudHMgRG9jdW1lbnRhdGlvblxuICAgICpcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCB3aGVuIGEgYm9keSBzdGFydHMgc2xlZXBpbmcgKHdoZXJlIGB0aGlzYCBpcyB0aGUgYm9keSkuXG4gICAgKlxuICAgICogQGV2ZW50IHNsZWVwU3RhcnRcbiAgICAqIEB0aGlzIHtib2R5fSBUaGUgYm9keSB0aGF0IGhhcyBzdGFydGVkIHNsZWVwaW5nXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiBhIGJvZHkgZW5kcyBzbGVlcGluZyAod2hlcmUgYHRoaXNgIGlzIHRoZSBib2R5KS5cbiAgICAqXG4gICAgKiBAZXZlbnQgc2xlZXBFbmRcbiAgICAqIEB0aGlzIHtib2R5fSBUaGUgYm9keSB0aGF0IGhhcyBlbmRlZCBzbGVlcGluZ1xuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKlxuICAgICpcbiAgICAqICBQcm9wZXJ0aWVzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGludGVnZXIgYE51bWJlcmAgdW5pcXVlbHkgaWRlbnRpZnlpbmcgbnVtYmVyIGdlbmVyYXRlZCBpbiBgQm9keS5jcmVhdGVgIGJ5IGBDb21tb24ubmV4dElkYC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBpZFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgU3RyaW5nYCBkZW5vdGluZyB0aGUgdHlwZSBvZiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdHlwZVxuICAgICAqIEB0eXBlIHN0cmluZ1xuICAgICAqIEBkZWZhdWx0IFwiYm9keVwiXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBhcmJpdHJhcnkgYFN0cmluZ2AgbmFtZSB0byBoZWxwIHRoZSB1c2VyIGlkZW50aWZ5IGFuZCBtYW5hZ2UgYm9kaWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGxhYmVsXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgXCJCb2R5XCJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGJvZGllcyB0aGF0IG1ha2UgdXAgdGhpcyBib2R5LiBcbiAgICAgKiBUaGUgZmlyc3QgYm9keSBpbiB0aGUgYXJyYXkgbXVzdCBhbHdheXMgYmUgYSBzZWxmIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBib2R5IGluc3RhbmNlLlxuICAgICAqIEFsbCBib2RpZXMgaW4gdGhlIGBwYXJ0c2AgYXJyYXkgdG9nZXRoZXIgZm9ybSBhIHNpbmdsZSByaWdpZCBjb21wb3VuZCBib2R5LlxuICAgICAqIFBhcnRzIGFyZSBhbGxvd2VkIHRvIG92ZXJsYXAsIGhhdmUgZ2FwcyBvciBob2xlcyBvciBldmVuIGZvcm0gY29uY2F2ZSBib2RpZXMuXG4gICAgICogUGFydHMgdGhlbXNlbHZlcyBzaG91bGQgbmV2ZXIgYmUgYWRkZWQgdG8gYSBgV29ybGRgLCBvbmx5IHRoZSBwYXJlbnQgYm9keSBzaG91bGQgYmUuXG4gICAgICogVXNlIGBCb2R5LnNldFBhcnRzYCB3aGVuIHNldHRpbmcgcGFydHMgdG8gZW5zdXJlIGNvcnJlY3QgdXBkYXRlcyBvZiBhbGwgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwYXJ0c1xuICAgICAqIEB0eXBlIGJvZHlbXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gb2JqZWN0IHJlc2VydmVkIGZvciBzdG9yaW5nIHBsdWdpbi1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBsdWdpblxuICAgICAqIEB0eXBlIHt9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIHNlbGYgcmVmZXJlbmNlIGlmIHRoZSBib2R5IGlzIF9ub3RfIGEgcGFydCBvZiBhbm90aGVyIGJvZHkuXG4gICAgICogT3RoZXJ3aXNlIHRoaXMgaXMgYSByZWZlcmVuY2UgdG8gdGhlIGJvZHkgdGhhdCB0aGlzIGlzIGEgcGFydCBvZi5cbiAgICAgKiBTZWUgYGJvZHkucGFydHNgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBhcmVudFxuICAgICAqIEB0eXBlIGJvZHlcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgc3BlY2lmeWluZyB0aGUgYW5nbGUgb2YgdGhlIGJvZHksIGluIHJhZGlhbnMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYW5nbGVcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBgVmVjdG9yYCBvYmplY3RzIHRoYXQgc3BlY2lmeSB0aGUgY29udmV4IGh1bGwgb2YgdGhlIHJpZ2lkIGJvZHkuXG4gICAgICogVGhlc2Ugc2hvdWxkIGJlIHByb3ZpZGVkIGFib3V0IHRoZSBvcmlnaW4gYCgwLCAwKWAuIEUuZy5cbiAgICAgKlxuICAgICAqICAgICBbeyB4OiAwLCB5OiAwIH0sIHsgeDogMjUsIHk6IDUwIH0sIHsgeDogNTAsIHk6IDAgfV1cbiAgICAgKlxuICAgICAqIFdoZW4gcGFzc2VkIHZpYSBgQm9keS5jcmVhdGVgLCB0aGUgdmVydGljZXMgYXJlIHRyYW5zbGF0ZWQgcmVsYXRpdmUgdG8gYGJvZHkucG9zaXRpb25gIChpLmUuIHdvcmxkLXNwYWNlLCBhbmQgY29uc3RhbnRseSB1cGRhdGVkIGJ5IGBCb2R5LnVwZGF0ZWAgZHVyaW5nIHNpbXVsYXRpb24pLlxuICAgICAqIFRoZSBgVmVjdG9yYCBvYmplY3RzIGFyZSBhbHNvIGF1Z21lbnRlZCB3aXRoIGFkZGl0aW9uYWwgcHJvcGVydGllcyByZXF1aXJlZCBmb3IgZWZmaWNpZW50IGNvbGxpc2lvbiBkZXRlY3Rpb24uIFxuICAgICAqXG4gICAgICogT3RoZXIgcHJvcGVydGllcyBzdWNoIGFzIGBpbmVydGlhYCBhbmQgYGJvdW5kc2AgYXJlIGF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlZCBmcm9tIHRoZSBwYXNzZWQgdmVydGljZXMgKHVubGVzcyBwcm92aWRlZCB2aWEgYG9wdGlvbnNgKS5cbiAgICAgKiBDb25jYXZlIGh1bGxzIGFyZSBub3QgY3VycmVudGx5IHN1cHBvcnRlZC4gVGhlIG1vZHVsZSBgTWF0dGVyLlZlcnRpY2VzYCBjb250YWlucyB1c2VmdWwgbWV0aG9kcyBmb3Igd29ya2luZyB3aXRoIHZlcnRpY2VzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHZlcnRpY2VzXG4gICAgICogQHR5cGUgdmVjdG9yW11cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFZlY3RvcmAgdGhhdCBzcGVjaWZpZXMgdGhlIGN1cnJlbnQgd29ybGQtc3BhY2UgcG9zaXRpb24gb2YgdGhlIGJvZHkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcG9zaXRpb25cbiAgICAgKiBAdHlwZSB2ZWN0b3JcbiAgICAgKiBAZGVmYXVsdCB7IHg6IDAsIHk6IDAgfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgVmVjdG9yYCB0aGF0IHNwZWNpZmllcyB0aGUgZm9yY2UgdG8gYXBwbHkgaW4gdGhlIGN1cnJlbnQgc3RlcC4gSXQgaXMgemVyb2VkIGFmdGVyIGV2ZXJ5IGBCb2R5LnVwZGF0ZWAuIFNlZSBhbHNvIGBCb2R5LmFwcGx5Rm9yY2VgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGZvcmNlXG4gICAgICogQHR5cGUgdmVjdG9yXG4gICAgICogQGRlZmF1bHQgeyB4OiAwLCB5OiAwIH1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgdGhlIHRvcnF1ZSAodHVybmluZyBmb3JjZSkgdG8gYXBwbHkgaW4gdGhlIGN1cnJlbnQgc3RlcC4gSXQgaXMgemVyb2VkIGFmdGVyIGV2ZXJ5IGBCb2R5LnVwZGF0ZWAuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdG9ycXVlXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IF9tZWFzdXJlc18gdGhlIGN1cnJlbnQgc3BlZWQgb2YgdGhlIGJvZHkgYWZ0ZXIgdGhlIGxhc3QgYEJvZHkudXBkYXRlYC4gSXQgaXMgcmVhZC1vbmx5IGFuZCBhbHdheXMgcG9zaXRpdmUgKGl0J3MgdGhlIG1hZ25pdHVkZSBvZiBgYm9keS52ZWxvY2l0eWApLlxuICAgICAqXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQHByb3BlcnR5IHNwZWVkXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IF9tZWFzdXJlc18gdGhlIGN1cnJlbnQgYW5ndWxhciBzcGVlZCBvZiB0aGUgYm9keSBhZnRlciB0aGUgbGFzdCBgQm9keS51cGRhdGVgLiBJdCBpcyByZWFkLW9ubHkgYW5kIGFsd2F5cyBwb3NpdGl2ZSAoaXQncyB0aGUgbWFnbml0dWRlIG9mIGBib2R5LmFuZ3VsYXJWZWxvY2l0eWApLlxuICAgICAqXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQHByb3BlcnR5IGFuZ3VsYXJTcGVlZFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFZlY3RvcmAgdGhhdCBfbWVhc3VyZXNfIHRoZSBjdXJyZW50IHZlbG9jaXR5IG9mIHRoZSBib2R5IGFmdGVyIHRoZSBsYXN0IGBCb2R5LnVwZGF0ZWAuIEl0IGlzIHJlYWQtb25seS4gXG4gICAgICogSWYgeW91IG5lZWQgdG8gbW9kaWZ5IGEgYm9keSdzIHZlbG9jaXR5IGRpcmVjdGx5LCB5b3Ugc2hvdWxkIGVpdGhlciBhcHBseSBhIGZvcmNlIG9yIHNpbXBseSBjaGFuZ2UgdGhlIGJvZHkncyBgcG9zaXRpb25gIChhcyB0aGUgZW5naW5lIHVzZXMgcG9zaXRpb24tVmVybGV0IGludGVncmF0aW9uKS5cbiAgICAgKlxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBwcm9wZXJ0eSB2ZWxvY2l0eVxuICAgICAqIEB0eXBlIHZlY3RvclxuICAgICAqIEBkZWZhdWx0IHsgeDogMCwgeTogMCB9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgX21lYXN1cmVzXyB0aGUgY3VycmVudCBhbmd1bGFyIHZlbG9jaXR5IG9mIHRoZSBib2R5IGFmdGVyIHRoZSBsYXN0IGBCb2R5LnVwZGF0ZWAuIEl0IGlzIHJlYWQtb25seS4gXG4gICAgICogSWYgeW91IG5lZWQgdG8gbW9kaWZ5IGEgYm9keSdzIGFuZ3VsYXIgdmVsb2NpdHkgZGlyZWN0bHksIHlvdSBzaG91bGQgYXBwbHkgYSB0b3JxdWUgb3Igc2ltcGx5IGNoYW5nZSB0aGUgYm9keSdzIGBhbmdsZWAgKGFzIHRoZSBlbmdpbmUgdXNlcyBwb3NpdGlvbi1WZXJsZXQgaW50ZWdyYXRpb24pLlxuICAgICAqXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQHByb3BlcnR5IGFuZ3VsYXJWZWxvY2l0eVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIGEgYm9keSBpcyBjb25zaWRlcmVkIHN0YXRpYy4gQSBzdGF0aWMgYm9keSBjYW4gbmV2ZXIgY2hhbmdlIHBvc2l0aW9uIG9yIGFuZ2xlIGFuZCBpcyBjb21wbGV0ZWx5IGZpeGVkLlxuICAgICAqIElmIHlvdSBuZWVkIHRvIHNldCBhIGJvZHkgYXMgc3RhdGljIGFmdGVyIGl0cyBjcmVhdGlvbiwgeW91IHNob3VsZCB1c2UgYEJvZHkuc2V0U3RhdGljYCBhcyB0aGlzIHJlcXVpcmVzIG1vcmUgdGhhbiBqdXN0IHNldHRpbmcgdGhpcyBmbGFnLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGlzU3RhdGljXG4gICAgICogQHR5cGUgYm9vbGVhblxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGZsYWcgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBhIGJvZHkgaXMgYSBzZW5zb3IuIFNlbnNvciB0cmlnZ2VycyBjb2xsaXNpb24gZXZlbnRzLCBidXQgZG9lc24ndCByZWFjdCB3aXRoIGNvbGxpZGluZyBib2R5IHBoeXNpY2FsbHkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNTZW5zb3JcbiAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHRoZSBib2R5IGlzIGNvbnNpZGVyZWQgc2xlZXBpbmcuIEEgc2xlZXBpbmcgYm9keSBhY3RzIHNpbWlsYXIgdG8gYSBzdGF0aWMgYm9keSwgZXhjZXB0IGl0IGlzIG9ubHkgdGVtcG9yYXJ5IGFuZCBjYW4gYmUgYXdva2VuLlxuICAgICAqIElmIHlvdSBuZWVkIHRvIHNldCBhIGJvZHkgYXMgc2xlZXBpbmcsIHlvdSBzaG91bGQgdXNlIGBTbGVlcGluZy5zZXRgIGFzIHRoaXMgcmVxdWlyZXMgbW9yZSB0aGFuIGp1c3Qgc2V0dGluZyB0aGlzIGZsYWcuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNTbGVlcGluZ1xuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IF9tZWFzdXJlc18gdGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhIGJvZHkgY3VycmVudGx5IGhhcyAoYSBjb21iaW5hdGlvbiBvZiBgc3BlZWRgIGFuZCBgYW5ndWxhclNwZWVkYCkuIEl0IGlzIHJlYWQtb25seSBhbmQgYWx3YXlzIHBvc2l0aXZlLlxuICAgICAqIEl0IGlzIHVzZWQgYW5kIHVwZGF0ZWQgYnkgdGhlIGBNYXR0ZXIuU2xlZXBpbmdgIG1vZHVsZSBkdXJpbmcgc2ltdWxhdGlvbiB0byBkZWNpZGUgaWYgYSBib2R5IGhhcyBjb21lIHRvIHJlc3QuXG4gICAgICpcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAcHJvcGVydHkgbW90aW9uXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIG51bWJlciBvZiB1cGRhdGVzIGluIHdoaWNoIHRoaXMgYm9keSBtdXN0IGhhdmUgbmVhci16ZXJvIHZlbG9jaXR5IGJlZm9yZSBpdCBpcyBzZXQgYXMgc2xlZXBpbmcgYnkgdGhlIGBNYXR0ZXIuU2xlZXBpbmdgIG1vZHVsZSAoaWYgc2xlZXBpbmcgaXMgZW5hYmxlZCBieSB0aGUgZW5naW5lKS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBzbGVlcFRocmVzaG9sZFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDYwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgZGVuc2l0eSBvZiB0aGUgYm9keSwgdGhhdCBpcyBpdHMgbWFzcyBwZXIgdW5pdCBhcmVhLlxuICAgICAqIElmIHlvdSBwYXNzIHRoZSBkZW5zaXR5IHZpYSBgQm9keS5jcmVhdGVgIHRoZSBgbWFzc2AgcHJvcGVydHkgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIGZvciB5b3UgYmFzZWQgb24gdGhlIHNpemUgKGFyZWEpIG9mIHRoZSBvYmplY3QuXG4gICAgICogVGhpcyBpcyBnZW5lcmFsbHkgcHJlZmVyYWJsZSB0byBzaW1wbHkgc2V0dGluZyBtYXNzIGFuZCBhbGxvd3MgZm9yIG1vcmUgaW50dWl0aXZlIGRlZmluaXRpb24gb2YgbWF0ZXJpYWxzIChlLmcuIHJvY2sgaGFzIGEgaGlnaGVyIGRlbnNpdHkgdGhhbiB3b29kKS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBkZW5zaXR5XG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMC4wMDFcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBtYXNzIG9mIHRoZSBib2R5LCBhbHRob3VnaCBpdCBtYXkgYmUgbW9yZSBhcHByb3ByaWF0ZSB0byBzcGVjaWZ5IHRoZSBgZGVuc2l0eWAgcHJvcGVydHkgaW5zdGVhZC5cbiAgICAgKiBJZiB5b3UgbW9kaWZ5IHRoaXMgdmFsdWUsIHlvdSBtdXN0IGFsc28gbW9kaWZ5IHRoZSBgYm9keS5pbnZlcnNlTWFzc2AgcHJvcGVydHkgKGAxIC8gbWFzc2ApLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IG1hc3NcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBpbnZlcnNlIG1hc3Mgb2YgdGhlIGJvZHkgKGAxIC8gbWFzc2ApLlxuICAgICAqIElmIHlvdSBtb2RpZnkgdGhpcyB2YWx1ZSwgeW91IG11c3QgYWxzbyBtb2RpZnkgdGhlIGBib2R5Lm1hc3NgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGludmVyc2VNYXNzXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgbW9tZW50IG9mIGluZXJ0aWEgKGkuZS4gc2Vjb25kIG1vbWVudCBvZiBhcmVhKSBvZiB0aGUgYm9keS5cbiAgICAgKiBJdCBpcyBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQgZnJvbSB0aGUgZ2l2ZW4gY29udmV4IGh1bGwgKGB2ZXJ0aWNlc2AgYXJyYXkpIGFuZCBkZW5zaXR5IGluIGBCb2R5LmNyZWF0ZWAuXG4gICAgICogSWYgeW91IG1vZGlmeSB0aGlzIHZhbHVlLCB5b3UgbXVzdCBhbHNvIG1vZGlmeSB0aGUgYGJvZHkuaW52ZXJzZUluZXJ0aWFgIHByb3BlcnR5IChgMSAvIGluZXJ0aWFgKS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBpbmVydGlhXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgaW52ZXJzZSBtb21lbnQgb2YgaW5lcnRpYSBvZiB0aGUgYm9keSAoYDEgLyBpbmVydGlhYCkuXG4gICAgICogSWYgeW91IG1vZGlmeSB0aGlzIHZhbHVlLCB5b3UgbXVzdCBhbHNvIG1vZGlmeSB0aGUgYGJvZHkuaW5lcnRpYWAgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaW52ZXJzZUluZXJ0aWFcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSByZXN0aXR1dGlvbiAoZWxhc3RpY2l0eSkgb2YgdGhlIGJvZHkuIFRoZSB2YWx1ZSBpcyBhbHdheXMgcG9zaXRpdmUgYW5kIGlzIGluIHRoZSByYW5nZSBgKDAsIDEpYC5cbiAgICAgKiBBIHZhbHVlIG9mIGAwYCBtZWFucyBjb2xsaXNpb25zIG1heSBiZSBwZXJmZWN0bHkgaW5lbGFzdGljIGFuZCBubyBib3VuY2luZyBtYXkgb2NjdXIuIFxuICAgICAqIEEgdmFsdWUgb2YgYDAuOGAgbWVhbnMgdGhlIGJvZHkgbWF5IGJvdW5jZSBiYWNrIHdpdGggYXBwcm94aW1hdGVseSA4MCUgb2YgaXRzIGtpbmV0aWMgZW5lcmd5LlxuICAgICAqIE5vdGUgdGhhdCBjb2xsaXNpb24gcmVzcG9uc2UgaXMgYmFzZWQgb24gX3BhaXJzXyBvZiBib2RpZXMsIGFuZCB0aGF0IGByZXN0aXR1dGlvbmAgdmFsdWVzIGFyZSBfY29tYmluZWRfIHdpdGggdGhlIGZvbGxvd2luZyBmb3JtdWxhOlxuICAgICAqXG4gICAgICogICAgIE1hdGgubWF4KGJvZHlBLnJlc3RpdHV0aW9uLCBib2R5Qi5yZXN0aXR1dGlvbilcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZXN0aXR1dGlvblxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBmcmljdGlvbiBvZiB0aGUgYm9keS4gVGhlIHZhbHVlIGlzIGFsd2F5cyBwb3NpdGl2ZSBhbmQgaXMgaW4gdGhlIHJhbmdlIGAoMCwgMSlgLlxuICAgICAqIEEgdmFsdWUgb2YgYDBgIG1lYW5zIHRoYXQgdGhlIGJvZHkgbWF5IHNsaWRlIGluZGVmaW5pdGVseS5cbiAgICAgKiBBIHZhbHVlIG9mIGAxYCBtZWFucyB0aGUgYm9keSBtYXkgY29tZSB0byBhIHN0b3AgYWxtb3N0IGluc3RhbnRseSBhZnRlciBhIGZvcmNlIGlzIGFwcGxpZWQuXG4gICAgICpcbiAgICAgKiBUaGUgZWZmZWN0cyBvZiB0aGUgdmFsdWUgbWF5IGJlIG5vbi1saW5lYXIuIFxuICAgICAqIEhpZ2ggdmFsdWVzIG1heSBiZSB1bnN0YWJsZSBkZXBlbmRpbmcgb24gdGhlIGJvZHkuXG4gICAgICogVGhlIGVuZ2luZSB1c2VzIGEgQ291bG9tYiBmcmljdGlvbiBtb2RlbCBpbmNsdWRpbmcgc3RhdGljIGFuZCBraW5ldGljIGZyaWN0aW9uLlxuICAgICAqIE5vdGUgdGhhdCBjb2xsaXNpb24gcmVzcG9uc2UgaXMgYmFzZWQgb24gX3BhaXJzXyBvZiBib2RpZXMsIGFuZCB0aGF0IGBmcmljdGlvbmAgdmFsdWVzIGFyZSBfY29tYmluZWRfIHdpdGggdGhlIGZvbGxvd2luZyBmb3JtdWxhOlxuICAgICAqXG4gICAgICogICAgIE1hdGgubWluKGJvZHlBLmZyaWN0aW9uLCBib2R5Qi5mcmljdGlvbilcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBmcmljdGlvblxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDAuMVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIHN0YXRpYyBmcmljdGlvbiBvZiB0aGUgYm9keSAoaW4gdGhlIENvdWxvbWIgZnJpY3Rpb24gbW9kZWwpLiBcbiAgICAgKiBBIHZhbHVlIG9mIGAwYCBtZWFucyB0aGUgYm9keSB3aWxsIG5ldmVyICdzdGljaycgd2hlbiBpdCBpcyBuZWFybHkgc3RhdGlvbmFyeSBhbmQgb25seSBkeW5hbWljIGBmcmljdGlvbmAgaXMgdXNlZC5cbiAgICAgKiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSAoZS5nLiBgMTBgKSwgdGhlIG1vcmUgZm9yY2UgaXQgd2lsbCB0YWtlIHRvIGluaXRpYWxseSBnZXQgdGhlIGJvZHkgbW92aW5nIHdoZW4gbmVhcmx5IHN0YXRpb25hcnkuXG4gICAgICogVGhpcyB2YWx1ZSBpcyBtdWx0aXBsaWVkIHdpdGggdGhlIGBmcmljdGlvbmAgcHJvcGVydHkgdG8gbWFrZSBpdCBlYXNpZXIgdG8gY2hhbmdlIGBmcmljdGlvbmAgYW5kIG1haW50YWluIGFuIGFwcHJvcHJpYXRlIGFtb3VudCBvZiBzdGF0aWMgZnJpY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZnJpY3Rpb25TdGF0aWNcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwLjVcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBhaXIgZnJpY3Rpb24gb2YgdGhlIGJvZHkgKGFpciByZXNpc3RhbmNlKS4gXG4gICAgICogQSB2YWx1ZSBvZiBgMGAgbWVhbnMgdGhlIGJvZHkgd2lsbCBuZXZlciBzbG93IGFzIGl0IG1vdmVzIHRocm91Z2ggc3BhY2UuXG4gICAgICogVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBmYXN0ZXIgYSBib2R5IHNsb3dzIHdoZW4gbW92aW5nIHRocm91Z2ggc3BhY2UuXG4gICAgICogVGhlIGVmZmVjdHMgb2YgdGhlIHZhbHVlIGFyZSBub24tbGluZWFyLiBcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBmcmljdGlvbkFpclxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDAuMDFcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGBPYmplY3RgIHRoYXQgc3BlY2lmaWVzIHRoZSBjb2xsaXNpb24gZmlsdGVyaW5nIHByb3BlcnRpZXMgb2YgdGhpcyBib2R5LlxuICAgICAqXG4gICAgICogQ29sbGlzaW9ucyBiZXR3ZWVuIHR3byBib2RpZXMgd2lsbCBvYmV5IHRoZSBmb2xsb3dpbmcgcnVsZXM6XG4gICAgICogLSBJZiB0aGUgdHdvIGJvZGllcyBoYXZlIHRoZSBzYW1lIG5vbi16ZXJvIHZhbHVlIG9mIGBjb2xsaXNpb25GaWx0ZXIuZ3JvdXBgLFxuICAgICAqICAgdGhleSB3aWxsIGFsd2F5cyBjb2xsaWRlIGlmIHRoZSB2YWx1ZSBpcyBwb3NpdGl2ZSwgYW5kIHRoZXkgd2lsbCBuZXZlciBjb2xsaWRlXG4gICAgICogICBpZiB0aGUgdmFsdWUgaXMgbmVnYXRpdmUuXG4gICAgICogLSBJZiB0aGUgdHdvIGJvZGllcyBoYXZlIGRpZmZlcmVudCB2YWx1ZXMgb2YgYGNvbGxpc2lvbkZpbHRlci5ncm91cGAgb3IgaWYgb25lXG4gICAgICogICAob3IgYm90aCkgb2YgdGhlIGJvZGllcyBoYXMgYSB2YWx1ZSBvZiAwLCB0aGVuIHRoZSBjYXRlZ29yeS9tYXNrIHJ1bGVzIGFwcGx5IGFzIGZvbGxvd3M6XG4gICAgICpcbiAgICAgKiBFYWNoIGJvZHkgYmVsb25ncyB0byBhIGNvbGxpc2lvbiBjYXRlZ29yeSwgZ2l2ZW4gYnkgYGNvbGxpc2lvbkZpbHRlci5jYXRlZ29yeWAuIFRoaXNcbiAgICAgKiB2YWx1ZSBpcyB1c2VkIGFzIGEgYml0IGZpZWxkIGFuZCB0aGUgY2F0ZWdvcnkgc2hvdWxkIGhhdmUgb25seSBvbmUgYml0IHNldCwgbWVhbmluZyB0aGF0XG4gICAgICogdGhlIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkgaXMgYSBwb3dlciBvZiB0d28gaW4gdGhlIHJhbmdlIFsxLCAyXjMxXS4gVGh1cywgdGhlcmUgYXJlIDMyXG4gICAgICogZGlmZmVyZW50IGNvbGxpc2lvbiBjYXRlZ29yaWVzIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEVhY2ggYm9keSBhbHNvIGRlZmluZXMgYSBjb2xsaXNpb24gYml0bWFzaywgZ2l2ZW4gYnkgYGNvbGxpc2lvbkZpbHRlci5tYXNrYCB3aGljaCBzcGVjaWZpZXNcbiAgICAgKiB0aGUgY2F0ZWdvcmllcyBpdCBjb2xsaWRlcyB3aXRoICh0aGUgdmFsdWUgaXMgdGhlIGJpdHdpc2UgQU5EIHZhbHVlIG9mIGFsbCB0aGVzZSBjYXRlZ29yaWVzKS5cbiAgICAgKlxuICAgICAqIFVzaW5nIHRoZSBjYXRlZ29yeS9tYXNrIHJ1bGVzLCB0d28gYm9kaWVzIGBBYCBhbmQgYEJgIGNvbGxpZGUgaWYgZWFjaCBpbmNsdWRlcyB0aGUgb3RoZXInc1xuICAgICAqIGNhdGVnb3J5IGluIGl0cyBtYXNrLCBpLmUuIGAoY2F0ZWdvcnlBICYgbWFza0IpICE9PSAwYCBhbmQgYChjYXRlZ29yeUIgJiBtYXNrQSkgIT09IDBgXG4gICAgICogYXJlIGJvdGggdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb2xsaXNpb25GaWx0ZXJcbiAgICAgKiBAdHlwZSBvYmplY3RcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIEludGVnZXIgYE51bWJlcmAsIHRoYXQgc3BlY2lmaWVzIHRoZSBjb2xsaXNpb24gZ3JvdXAgdGhpcyBib2R5IGJlbG9uZ3MgdG8uXG4gICAgICogU2VlIGBib2R5LmNvbGxpc2lvbkZpbHRlcmAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgY29sbGlzaW9uRmlsdGVyLmdyb3VwXG4gICAgICogQHR5cGUgb2JqZWN0XG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBiaXQgZmllbGQgdGhhdCBzcGVjaWZpZXMgdGhlIGNvbGxpc2lvbiBjYXRlZ29yeSB0aGlzIGJvZHkgYmVsb25ncyB0by5cbiAgICAgKiBUaGUgY2F0ZWdvcnkgdmFsdWUgc2hvdWxkIGhhdmUgb25seSBvbmUgYml0IHNldCwgZm9yIGV4YW1wbGUgYDB4MDAwMWAuXG4gICAgICogVGhpcyBtZWFucyB0aGVyZSBhcmUgdXAgdG8gMzIgdW5pcXVlIGNvbGxpc2lvbiBjYXRlZ29yaWVzIGF2YWlsYWJsZS5cbiAgICAgKiBTZWUgYGJvZHkuY29sbGlzaW9uRmlsdGVyYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb2xsaXNpb25GaWx0ZXIuY2F0ZWdvcnlcbiAgICAgKiBAdHlwZSBvYmplY3RcbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGJpdCBtYXNrIHRoYXQgc3BlY2lmaWVzIHRoZSBjb2xsaXNpb24gY2F0ZWdvcmllcyB0aGlzIGJvZHkgbWF5IGNvbGxpZGUgd2l0aC5cbiAgICAgKiBTZWUgYGJvZHkuY29sbGlzaW9uRmlsdGVyYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb2xsaXNpb25GaWx0ZXIubWFza1xuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqIEBkZWZhdWx0IC0xXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgc3BlY2lmaWVzIGEgdG9sZXJhbmNlIG9uIGhvdyBmYXIgYSBib2R5IGlzIGFsbG93ZWQgdG8gJ3NpbmsnIG9yIHJvdGF0ZSBpbnRvIG90aGVyIGJvZGllcy5cbiAgICAgKiBBdm9pZCBjaGFuZ2luZyB0aGlzIHZhbHVlIHVubGVzcyB5b3UgdW5kZXJzdGFuZCB0aGUgcHVycG9zZSBvZiBgc2xvcGAgaW4gcGh5c2ljcyBlbmdpbmVzLlxuICAgICAqIFRoZSBkZWZhdWx0IHNob3VsZCBnZW5lcmFsbHkgc3VmZmljZSwgYWx0aG91Z2ggdmVyeSBsYXJnZSBib2RpZXMgbWF5IHJlcXVpcmUgbGFyZ2VyIHZhbHVlcyBmb3Igc3RhYmxlIHN0YWNraW5nLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHNsb3BcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwLjA1XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgYWxsb3dzIHBlci1ib2R5IHRpbWUgc2NhbGluZywgZS5nLiBhIGZvcmNlLWZpZWxkIHdoZXJlIGJvZGllcyBpbnNpZGUgYXJlIGluIHNsb3ctbW90aW9uLCB3aGlsZSBvdGhlcnMgYXJlIGF0IGZ1bGwgc3BlZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdGltZVNjYWxlXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYE9iamVjdGAgdGhhdCBkZWZpbmVzIHRoZSByZW5kZXJpbmcgcHJvcGVydGllcyB0byBiZSBjb25zdW1lZCBieSB0aGUgbW9kdWxlIGBNYXR0ZXIuUmVuZGVyYC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXJcbiAgICAgKiBAdHlwZSBvYmplY3RcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0aGF0IGluZGljYXRlcyBpZiB0aGUgYm9keSBzaG91bGQgYmUgcmVuZGVyZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLnZpc2libGVcbiAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgb3BhY2l0eSB0byB1c2Ugd2hlbiByZW5kZXJpbmcuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLm9wYWNpdHlcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGBPYmplY3RgIHRoYXQgZGVmaW5lcyB0aGUgc3ByaXRlIHByb3BlcnRpZXMgdG8gdXNlIHdoZW4gcmVuZGVyaW5nLCBpZiBhbnkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLnNwcml0ZVxuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYFN0cmluZ2AgdGhhdCBkZWZpbmVzIHRoZSBwYXRoIHRvIHRoZSBpbWFnZSB0byB1c2UgYXMgdGhlIHNwcml0ZSB0ZXh0dXJlLCBpZiBhbnkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLnNwcml0ZS50ZXh0dXJlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgIFxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBzY2FsaW5nIGluIHRoZSB4LWF4aXMgZm9yIHRoZSBzcHJpdGUsIGlmIGFueS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuc3ByaXRlLnhTY2FsZVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBkZWZpbmVzIHRoZSBzY2FsaW5nIGluIHRoZSB5LWF4aXMgZm9yIHRoZSBzcHJpdGUsIGlmIGFueS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuc3ByaXRlLnlTY2FsZVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cblxuICAgICAvKipcbiAgICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIG9mZnNldCBpbiB0aGUgeC1heGlzIGZvciB0aGUgc3ByaXRlIChub3JtYWxpc2VkIGJ5IHRleHR1cmUgd2lkdGgpLlxuICAgICAgKlxuICAgICAgKiBAcHJvcGVydHkgcmVuZGVyLnNwcml0ZS54T2Zmc2V0XG4gICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAqL1xuXG4gICAgIC8qKlxuICAgICAgKiBBIGBOdW1iZXJgIHRoYXQgZGVmaW5lcyB0aGUgb2Zmc2V0IGluIHRoZSB5LWF4aXMgZm9yIHRoZSBzcHJpdGUgKG5vcm1hbGlzZWQgYnkgdGV4dHVyZSBoZWlnaHQpLlxuICAgICAgKlxuICAgICAgKiBAcHJvcGVydHkgcmVuZGVyLnNwcml0ZS55T2Zmc2V0XG4gICAgICAqIEB0eXBlIG51bWJlclxuICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIGxpbmUgd2lkdGggdG8gdXNlIHdoZW4gcmVuZGVyaW5nIHRoZSBib2R5IG91dGxpbmUgKGlmIGEgc3ByaXRlIGlzIG5vdCBkZWZpbmVkKS5cbiAgICAgKiBBIHZhbHVlIG9mIGAwYCBtZWFucyBubyBvdXRsaW5lIHdpbGwgYmUgcmVuZGVyZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLmxpbmVXaWR0aFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFN0cmluZ2AgdGhhdCBkZWZpbmVzIHRoZSBmaWxsIHN0eWxlIHRvIHVzZSB3aGVuIHJlbmRlcmluZyB0aGUgYm9keSAoaWYgYSBzcHJpdGUgaXMgbm90IGRlZmluZWQpLlxuICAgICAqIEl0IGlzIHRoZSBzYW1lIGFzIHdoZW4gdXNpbmcgYSBjYW52YXMsIHNvIGl0IGFjY2VwdHMgQ1NTIHN0eWxlIHByb3BlcnR5IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuZmlsbFN0eWxlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgYSByYW5kb20gY29sb3VyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBTdHJpbmdgIHRoYXQgZGVmaW5lcyB0aGUgc3Ryb2tlIHN0eWxlIHRvIHVzZSB3aGVuIHJlbmRlcmluZyB0aGUgYm9keSBvdXRsaW5lIChpZiBhIHNwcml0ZSBpcyBub3QgZGVmaW5lZCkuXG4gICAgICogSXQgaXMgdGhlIHNhbWUgYXMgd2hlbiB1c2luZyBhIGNhbnZhcywgc28gaXQgYWNjZXB0cyBDU1Mgc3R5bGUgcHJvcGVydHkgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlci5zdHJva2VTdHlsZVxuICAgICAqIEB0eXBlIHN0cmluZ1xuICAgICAqIEBkZWZhdWx0IGEgcmFuZG9tIGNvbG91clxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgdW5pcXVlIGF4aXMgdmVjdG9ycyAoZWRnZSBub3JtYWxzKSB1c2VkIGZvciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAgICAqIFRoZXNlIGFyZSBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQgZnJvbSB0aGUgZ2l2ZW4gY29udmV4IGh1bGwgKGB2ZXJ0aWNlc2AgYXJyYXkpIGluIGBCb2R5LmNyZWF0ZWAuXG4gICAgICogVGhleSBhcmUgY29uc3RhbnRseSB1cGRhdGVkIGJ5IGBCb2R5LnVwZGF0ZWAgZHVyaW5nIHRoZSBzaW11bGF0aW9uLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGF4ZXNcbiAgICAgKiBAdHlwZSB2ZWN0b3JbXVxuICAgICAqL1xuICAgICBcbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgX21lYXN1cmVzXyB0aGUgYXJlYSBvZiB0aGUgYm9keSdzIGNvbnZleCBodWxsLCBjYWxjdWxhdGVkIGF0IGNyZWF0aW9uIGJ5IGBCb2R5LmNyZWF0ZWAuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYXJlYVxuICAgICAqIEB0eXBlIHN0cmluZ1xuICAgICAqIEBkZWZhdWx0IFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgQm91bmRzYCBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZSBBQUJCIHJlZ2lvbiBmb3IgdGhlIGJvZHkuXG4gICAgICogSXQgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIGZyb20gdGhlIGdpdmVuIGNvbnZleCBodWxsIChgdmVydGljZXNgIGFycmF5KSBpbiBgQm9keS5jcmVhdGVgIGFuZCBjb25zdGFudGx5IHVwZGF0ZWQgYnkgYEJvZHkudXBkYXRlYCBkdXJpbmcgc2ltdWxhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBib3VuZHNcbiAgICAgKiBAdHlwZSBib3VuZHNcbiAgICAgKi9cblxufSkoKTtcblxufSx7XCIuLi9jb3JlL0NvbW1vblwiOjE0LFwiLi4vY29yZS9TbGVlcGluZ1wiOjIyLFwiLi4vZ2VvbWV0cnkvQXhlc1wiOjI1LFwiLi4vZ2VvbWV0cnkvQm91bmRzXCI6MjYsXCIuLi9nZW9tZXRyeS9WZWN0b3JcIjoyOCxcIi4uL2dlb21ldHJ5L1ZlcnRpY2VzXCI6MjksXCIuLi9yZW5kZXIvUmVuZGVyXCI6MzF9XSwyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5Db21wb3NpdGVgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIGNvbXBvc2l0ZSBib2RpZXMuXG4qIEEgY29tcG9zaXRlIGJvZHkgaXMgYSBjb2xsZWN0aW9uIG9mIGBNYXR0ZXIuQm9keWAsIGBNYXR0ZXIuQ29uc3RyYWludGAgYW5kIG90aGVyIGBNYXR0ZXIuQ29tcG9zaXRlYCwgdGhlcmVmb3JlIGNvbXBvc2l0ZXMgZm9ybSBhIHRyZWUgc3RydWN0dXJlLlxuKiBJdCBpcyBpbXBvcnRhbnQgdG8gdXNlIHRoZSBmdW5jdGlvbnMgaW4gdGhpcyBtb2R1bGUgdG8gbW9kaWZ5IGNvbXBvc2l0ZXMsIHJhdGhlciB0aGFuIGRpcmVjdGx5IG1vZGlmeWluZyB0aGVpciBwcm9wZXJ0aWVzLlxuKiBOb3RlIHRoYXQgdGhlIGBNYXR0ZXIuV29ybGRgIG9iamVjdCBpcyBhbHNvIGEgdHlwZSBvZiBgTWF0dGVyLkNvbXBvc2l0ZWAgYW5kIGFzIHN1Y2ggYWxsIGNvbXBvc2l0ZSBtZXRob2RzIGhlcmUgY2FuIGFsc28gb3BlcmF0ZSBvbiBhIGBNYXR0ZXIuV29ybGRgLlxuKlxuKiBTZWUgdGhlIGluY2x1ZGVkIHVzYWdlIFtleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL2xpYWJydS9tYXR0ZXItanMvdHJlZS9tYXN0ZXIvZXhhbXBsZXMpLlxuKlxuKiBAY2xhc3MgQ29tcG9zaXRlXG4qL1xuXG52YXIgQ29tcG9zaXRlID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9zaXRlO1xuXG52YXIgRXZlbnRzID0gX2RlcmVxXygnLi4vY29yZS9FdmVudHMnKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xudmFyIEJvZHkgPSBfZGVyZXFfKCcuL0JvZHknKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb21wb3NpdGUuIFRoZSBvcHRpb25zIHBhcmFtZXRlciBpcyBhbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgYW55IHByb3BlcnRpZXMgeW91IHdpc2ggdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzLlxuICAgICAqIFNlZSB0aGUgcHJvcGVyaXRlcyBzZWN0aW9uIGJlbG93IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge30gW29wdGlvbnNdXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBBIG5ldyBjb21wb3NpdGVcbiAgICAgKi9cbiAgICBDb21wb3NpdGUuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmV4dGVuZCh7IFxuICAgICAgICAgICAgaWQ6IENvbW1vbi5uZXh0SWQoKSxcbiAgICAgICAgICAgIHR5cGU6ICdjb21wb3NpdGUnLFxuICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgaXNNb2RpZmllZDogZmFsc2UsXG4gICAgICAgICAgICBib2RpZXM6IFtdLCBcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzOiBbXSwgXG4gICAgICAgICAgICBjb21wb3NpdGVzOiBbXSxcbiAgICAgICAgICAgIGxhYmVsOiAnQ29tcG9zaXRlJyxcbiAgICAgICAgICAgIHBsdWdpbjoge31cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbXBvc2l0ZSdzIGBpc01vZGlmaWVkYCBmbGFnLiBcbiAgICAgKiBJZiBgdXBkYXRlUGFyZW50c2AgaXMgdHJ1ZSwgYWxsIHBhcmVudHMgd2lsbCBiZSBzZXQgKGRlZmF1bHQ6IGZhbHNlKS5cbiAgICAgKiBJZiBgdXBkYXRlQ2hpbGRyZW5gIGlzIHRydWUsIGFsbCBjaGlsZHJlbiB3aWxsIGJlIHNldCAoZGVmYXVsdDogZmFsc2UpLlxuICAgICAqIEBtZXRob2Qgc2V0TW9kaWZpZWRcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc01vZGlmaWVkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbdXBkYXRlUGFyZW50cz1mYWxzZV1cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt1cGRhdGVDaGlsZHJlbj1mYWxzZV1cbiAgICAgKi9cbiAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQgPSBmdW5jdGlvbihjb21wb3NpdGUsIGlzTW9kaWZpZWQsIHVwZGF0ZVBhcmVudHMsIHVwZGF0ZUNoaWxkcmVuKSB7XG4gICAgICAgIGNvbXBvc2l0ZS5pc01vZGlmaWVkID0gaXNNb2RpZmllZDtcblxuICAgICAgICBpZiAodXBkYXRlUGFyZW50cyAmJiBjb21wb3NpdGUucGFyZW50KSB7XG4gICAgICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLnBhcmVudCwgaXNNb2RpZmllZCwgdXBkYXRlUGFyZW50cywgdXBkYXRlQ2hpbGRyZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVwZGF0ZUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY29tcG9zaXRlLmNvbXBvc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRDb21wb3NpdGUgPSBjb21wb3NpdGUuY29tcG9zaXRlc1tpXTtcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY2hpbGRDb21wb3NpdGUsIGlzTW9kaWZpZWQsIHVwZGF0ZVBhcmVudHMsIHVwZGF0ZUNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmljIGFkZCBmdW5jdGlvbi4gQWRkcyBvbmUgb3IgbWFueSBib2R5KHMpLCBjb25zdHJhaW50KHMpIG9yIGEgY29tcG9zaXRlKHMpIHRvIHRoZSBnaXZlbiBjb21wb3NpdGUuXG4gICAgICogVHJpZ2dlcnMgYGJlZm9yZUFkZGAgYW5kIGBhZnRlckFkZGAgZXZlbnRzIG9uIHRoZSBgY29tcG9zaXRlYC5cbiAgICAgKiBAbWV0aG9kIGFkZFxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge30gb2JqZWN0XG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgY29tcG9zaXRlIHdpdGggdGhlIG9iamVjdHMgYWRkZWRcbiAgICAgKi9cbiAgICBDb21wb3NpdGUuYWRkID0gZnVuY3Rpb24oY29tcG9zaXRlLCBvYmplY3QpIHtcbiAgICAgICAgdmFyIG9iamVjdHMgPSBbXS5jb25jYXQob2JqZWN0KTtcblxuICAgICAgICBFdmVudHMudHJpZ2dlcihjb21wb3NpdGUsICdiZWZvcmVBZGQnLCB7IG9iamVjdDogb2JqZWN0IH0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG9iamVjdHNbaV07XG5cbiAgICAgICAgICAgIHN3aXRjaCAob2JqLnR5cGUpIHtcblxuICAgICAgICAgICAgY2FzZSAnYm9keSc6XG4gICAgICAgICAgICAgICAgLy8gc2tpcCBhZGRpbmcgY29tcG91bmQgcGFydHNcbiAgICAgICAgICAgICAgICBpZiAob2JqLnBhcmVudCAhPT0gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIENvbW1vbi53YXJuKCdDb21wb3NpdGUuYWRkOiBza2lwcGVkIGFkZGluZyBhIGNvbXBvdW5kIGJvZHkgcGFydCAoeW91IG11c3QgYWRkIGl0cyBwYXJlbnQgaW5zdGVhZCknKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgQ29tcG9zaXRlLmFkZEJvZHkoY29tcG9zaXRlLCBvYmopO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29uc3RyYWludCc6XG4gICAgICAgICAgICAgICAgQ29tcG9zaXRlLmFkZENvbnN0cmFpbnQoY29tcG9zaXRlLCBvYmopO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29tcG9zaXRlJzpcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29tcG9zaXRlKGNvbXBvc2l0ZSwgb2JqKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlQ29uc3RyYWludCc6XG4gICAgICAgICAgICAgICAgQ29tcG9zaXRlLmFkZENvbnN0cmFpbnQoY29tcG9zaXRlLCBvYmouY29uc3RyYWludCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKGNvbXBvc2l0ZSwgJ2FmdGVyQWRkJywgeyBvYmplY3Q6IG9iamVjdCB9KTtcblxuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmljIHJlbW92ZSBmdW5jdGlvbi4gUmVtb3ZlcyBvbmUgb3IgbWFueSBib2R5KHMpLCBjb25zdHJhaW50KHMpIG9yIGEgY29tcG9zaXRlKHMpIHRvIHRoZSBnaXZlbiBjb21wb3NpdGUuXG4gICAgICogT3B0aW9uYWxseSBzZWFyY2hpbmcgaXRzIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5LlxuICAgICAqIFRyaWdnZXJzIGBiZWZvcmVSZW1vdmVgIGFuZCBgYWZ0ZXJSZW1vdmVgIGV2ZW50cyBvbiB0aGUgYGNvbXBvc2l0ZWAuXG4gICAgICogQG1ldGhvZCByZW1vdmVcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHt9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZXA9ZmFsc2VdXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgY29tcG9zaXRlIHdpdGggdGhlIG9iamVjdHMgcmVtb3ZlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5yZW1vdmUgPSBmdW5jdGlvbihjb21wb3NpdGUsIG9iamVjdCwgZGVlcCkge1xuICAgICAgICB2YXIgb2JqZWN0cyA9IFtdLmNvbmNhdChvYmplY3QpO1xuXG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKGNvbXBvc2l0ZSwgJ2JlZm9yZVJlbW92ZScsIHsgb2JqZWN0OiBvYmplY3QgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gb2JqZWN0c1tpXTtcblxuICAgICAgICAgICAgc3dpdGNoIChvYmoudHlwZSkge1xuXG4gICAgICAgICAgICBjYXNlICdib2R5JzpcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUucmVtb3ZlQm9keShjb21wb3NpdGUsIG9iaiwgZGVlcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb25zdHJhaW50JzpcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUucmVtb3ZlQ29uc3RyYWludChjb21wb3NpdGUsIG9iaiwgZGVlcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb21wb3NpdGUnOlxuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5yZW1vdmVDb21wb3NpdGUoY29tcG9zaXRlLCBvYmosIGRlZXApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2VDb25zdHJhaW50JzpcbiAgICAgICAgICAgICAgICBDb21wb3NpdGUucmVtb3ZlQ29uc3RyYWludChjb21wb3NpdGUsIG9iai5jb25zdHJhaW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIoY29tcG9zaXRlLCAnYWZ0ZXJSZW1vdmUnLCB7IG9iamVjdDogb2JqZWN0IH0pO1xuXG4gICAgICAgIHJldHVybiBjb21wb3NpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBjb21wb3NpdGUgdG8gdGhlIGdpdmVuIGNvbXBvc2l0ZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYWRkQ29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZUFcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlQlxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gVGhlIG9yaWdpbmFsIGNvbXBvc2l0ZUEgd2l0aCB0aGUgb2JqZWN0cyBmcm9tIGNvbXBvc2l0ZUIgYWRkZWRcbiAgICAgKi9cbiAgICBDb21wb3NpdGUuYWRkQ29tcG9zaXRlID0gZnVuY3Rpb24oY29tcG9zaXRlQSwgY29tcG9zaXRlQikge1xuICAgICAgICBjb21wb3NpdGVBLmNvbXBvc2l0ZXMucHVzaChjb21wb3NpdGVCKTtcbiAgICAgICAgY29tcG9zaXRlQi5wYXJlbnQgPSBjb21wb3NpdGVBO1xuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlQSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlQTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGNvbXBvc2l0ZSBmcm9tIHRoZSBnaXZlbiBjb21wb3NpdGUsIGFuZCBvcHRpb25hbGx5IHNlYXJjaGluZyBpdHMgY2hpbGRyZW4gcmVjdXJzaXZlbHkuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVBXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZUJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWVwPWZhbHNlXVxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gVGhlIG9yaWdpbmFsIGNvbXBvc2l0ZUEgd2l0aCB0aGUgY29tcG9zaXRlIHJlbW92ZWRcbiAgICAgKi9cbiAgICBDb21wb3NpdGUucmVtb3ZlQ29tcG9zaXRlID0gZnVuY3Rpb24oY29tcG9zaXRlQSwgY29tcG9zaXRlQiwgZGVlcCkge1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBDb21tb24uaW5kZXhPZihjb21wb3NpdGVBLmNvbXBvc2l0ZXMsIGNvbXBvc2l0ZUIpO1xuICAgICAgICBpZiAocG9zaXRpb24gIT09IC0xKSB7XG4gICAgICAgICAgICBDb21wb3NpdGUucmVtb3ZlQ29tcG9zaXRlQXQoY29tcG9zaXRlQSwgcG9zaXRpb24pO1xuICAgICAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKGNvbXBvc2l0ZUEsIHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWVwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBvc2l0ZUEuY29tcG9zaXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgQ29tcG9zaXRlLnJlbW92ZUNvbXBvc2l0ZShjb21wb3NpdGVBLmNvbXBvc2l0ZXNbaV0sIGNvbXBvc2l0ZUIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZUE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBjb21wb3NpdGUgZnJvbSB0aGUgZ2l2ZW4gY29tcG9zaXRlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCByZW1vdmVDb21wb3NpdGVBdFxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zaXRpb25cbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCBjb21wb3NpdGUgd2l0aCB0aGUgY29tcG9zaXRlIHJlbW92ZWRcbiAgICAgKi9cbiAgICBDb21wb3NpdGUucmVtb3ZlQ29tcG9zaXRlQXQgPSBmdW5jdGlvbihjb21wb3NpdGUsIHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbXBvc2l0ZS5jb21wb3NpdGVzLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjb21wb3NpdGUsIHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGJvZHkgdG8gdGhlIGdpdmVuIGNvbXBvc2l0ZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYWRkQm9keVxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCBjb21wb3NpdGUgd2l0aCB0aGUgYm9keSBhZGRlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5hZGRCb2R5ID0gZnVuY3Rpb24oY29tcG9zaXRlLCBib2R5KSB7XG4gICAgICAgIGNvbXBvc2l0ZS5ib2RpZXMucHVzaChib2R5KTtcbiAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKGNvbXBvc2l0ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgYm9keSBmcm9tIHRoZSBnaXZlbiBjb21wb3NpdGUsIGFuZCBvcHRpb25hbGx5IHNlYXJjaGluZyBpdHMgY2hpbGRyZW4gcmVjdXJzaXZlbHkuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUJvZHlcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGVlcD1mYWxzZV1cbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IFRoZSBvcmlnaW5hbCBjb21wb3NpdGUgd2l0aCB0aGUgYm9keSByZW1vdmVkXG4gICAgICovXG4gICAgQ29tcG9zaXRlLnJlbW92ZUJvZHkgPSBmdW5jdGlvbihjb21wb3NpdGUsIGJvZHksIGRlZXApIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gQ29tbW9uLmluZGV4T2YoY29tcG9zaXRlLmJvZGllcywgYm9keSk7XG4gICAgICAgIGlmIChwb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgICAgIENvbXBvc2l0ZS5yZW1vdmVCb2R5QXQoY29tcG9zaXRlLCBwb3NpdGlvbik7XG4gICAgICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVlcCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21wb3NpdGUuY29tcG9zaXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgQ29tcG9zaXRlLnJlbW92ZUJvZHkoY29tcG9zaXRlLmNvbXBvc2l0ZXNbaV0sIGJvZHksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGJvZHkgZnJvbSB0aGUgZ2l2ZW4gY29tcG9zaXRlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCByZW1vdmVCb2R5QXRcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgY29tcG9zaXRlIHdpdGggdGhlIGJvZHkgcmVtb3ZlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5yZW1vdmVCb2R5QXQgPSBmdW5jdGlvbihjb21wb3NpdGUsIHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbXBvc2l0ZS5ib2RpZXMuc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKGNvbXBvc2l0ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgY29uc3RyYWludCB0byB0aGUgZ2l2ZW4gY29tcG9zaXRlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBhZGRDb25zdHJhaW50XG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7Y29uc3RyYWludH0gY29uc3RyYWludFxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gVGhlIG9yaWdpbmFsIGNvbXBvc2l0ZSB3aXRoIHRoZSBjb25zdHJhaW50IGFkZGVkXG4gICAgICovXG4gICAgQ29tcG9zaXRlLmFkZENvbnN0cmFpbnQgPSBmdW5jdGlvbihjb21wb3NpdGUsIGNvbnN0cmFpbnQpIHtcbiAgICAgICAgY29tcG9zaXRlLmNvbnN0cmFpbnRzLnB1c2goY29uc3RyYWludCk7XG4gICAgICAgIENvbXBvc2l0ZS5zZXRNb2RpZmllZChjb21wb3NpdGUsIHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGNvbnN0cmFpbnQgZnJvbSB0aGUgZ2l2ZW4gY29tcG9zaXRlLCBhbmQgb3B0aW9uYWxseSBzZWFyY2hpbmcgaXRzIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCByZW1vdmVDb25zdHJhaW50XG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7Y29uc3RyYWludH0gY29uc3RyYWludFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZXA9ZmFsc2VdXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgY29tcG9zaXRlIHdpdGggdGhlIGNvbnN0cmFpbnQgcmVtb3ZlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5yZW1vdmVDb25zdHJhaW50ID0gZnVuY3Rpb24oY29tcG9zaXRlLCBjb25zdHJhaW50LCBkZWVwKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IENvbW1vbi5pbmRleE9mKGNvbXBvc2l0ZS5jb25zdHJhaW50cywgY29uc3RyYWludCk7XG4gICAgICAgIGlmIChwb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgICAgIENvbXBvc2l0ZS5yZW1vdmVDb25zdHJhaW50QXQoY29tcG9zaXRlLCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVlcCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21wb3NpdGUuY29tcG9zaXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgQ29tcG9zaXRlLnJlbW92ZUNvbnN0cmFpbnQoY29tcG9zaXRlLmNvbXBvc2l0ZXNbaV0sIGNvbnN0cmFpbnQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGJvZHkgZnJvbSB0aGUgZ2l2ZW4gY29tcG9zaXRlLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCByZW1vdmVDb25zdHJhaW50QXRcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgY29tcG9zaXRlIHdpdGggdGhlIGNvbnN0cmFpbnQgcmVtb3ZlZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5yZW1vdmVDb25zdHJhaW50QXQgPSBmdW5jdGlvbihjb21wb3NpdGUsIHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbXBvc2l0ZS5jb25zdHJhaW50cy5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBjb21wb3NpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGJvZGllcywgY29uc3RyYWludHMgYW5kIGNvbXBvc2l0ZXMgZnJvbSB0aGUgZ2l2ZW4gY29tcG9zaXRlLlxuICAgICAqIE9wdGlvbmFsbHkgY2xlYXJpbmcgaXRzIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtib29sZWFufSBrZWVwU3RhdGljXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGVlcD1mYWxzZV1cbiAgICAgKi9cbiAgICBDb21wb3NpdGUuY2xlYXIgPSBmdW5jdGlvbihjb21wb3NpdGUsIGtlZXBTdGF0aWMsIGRlZXApIHtcbiAgICAgICAgaWYgKGRlZXApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9zaXRlLmNvbXBvc2l0ZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5jbGVhcihjb21wb3NpdGUuY29tcG9zaXRlc1tpXSwga2VlcFN0YXRpYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChrZWVwU3RhdGljKSB7XG4gICAgICAgICAgICBjb21wb3NpdGUuYm9kaWVzID0gY29tcG9zaXRlLmJvZGllcy5maWx0ZXIoZnVuY3Rpb24oYm9keSkgeyByZXR1cm4gYm9keS5pc1N0YXRpYzsgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wb3NpdGUuYm9kaWVzLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wb3NpdGUuY29uc3RyYWludHMubGVuZ3RoID0gMDtcbiAgICAgICAgY29tcG9zaXRlLmNvbXBvc2l0ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKGNvbXBvc2l0ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuXG4gICAgICAgIHJldHVybiBjb21wb3NpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGJvZGllcyBpbiB0aGUgZ2l2ZW4gY29tcG9zaXRlLCBpbmNsdWRpbmcgYWxsIGJvZGllcyBpbiBpdHMgY2hpbGRyZW4sIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBtZXRob2QgYWxsQm9kaWVzXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEByZXR1cm4ge2JvZHlbXX0gQWxsIHRoZSBib2RpZXNcbiAgICAgKi9cbiAgICBDb21wb3NpdGUuYWxsQm9kaWVzID0gZnVuY3Rpb24oY29tcG9zaXRlKSB7XG4gICAgICAgIHZhciBib2RpZXMgPSBbXS5jb25jYXQoY29tcG9zaXRlLmJvZGllcyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21wb3NpdGUuY29tcG9zaXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGJvZGllcyA9IGJvZGllcy5jb25jYXQoQ29tcG9zaXRlLmFsbEJvZGllcyhjb21wb3NpdGUuY29tcG9zaXRlc1tpXSkpO1xuXG4gICAgICAgIHJldHVybiBib2RpZXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGNvbnN0cmFpbnRzIGluIHRoZSBnaXZlbiBjb21wb3NpdGUsIGluY2x1ZGluZyBhbGwgY29uc3RyYWludHMgaW4gaXRzIGNoaWxkcmVuLCByZWN1cnNpdmVseS5cbiAgICAgKiBAbWV0aG9kIGFsbENvbnN0cmFpbnRzXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEByZXR1cm4ge2NvbnN0cmFpbnRbXX0gQWxsIHRoZSBjb25zdHJhaW50c1xuICAgICAqL1xuICAgIENvbXBvc2l0ZS5hbGxDb25zdHJhaW50cyA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSkge1xuICAgICAgICB2YXIgY29uc3RyYWludHMgPSBbXS5jb25jYXQoY29tcG9zaXRlLmNvbnN0cmFpbnRzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBvc2l0ZS5jb21wb3NpdGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgY29uc3RyYWludHMgPSBjb25zdHJhaW50cy5jb25jYXQoQ29tcG9zaXRlLmFsbENvbnN0cmFpbnRzKGNvbXBvc2l0ZS5jb21wb3NpdGVzW2ldKSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBjb21wb3NpdGVzIGluIHRoZSBnaXZlbiBjb21wb3NpdGUsIGluY2x1ZGluZyBhbGwgY29tcG9zaXRlcyBpbiBpdHMgY2hpbGRyZW4sIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBtZXRob2QgYWxsQ29tcG9zaXRlc1xuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGVbXX0gQWxsIHRoZSBjb21wb3NpdGVzXG4gICAgICovXG4gICAgQ29tcG9zaXRlLmFsbENvbXBvc2l0ZXMgPSBmdW5jdGlvbihjb21wb3NpdGUpIHtcbiAgICAgICAgdmFyIGNvbXBvc2l0ZXMgPSBbXS5jb25jYXQoY29tcG9zaXRlLmNvbXBvc2l0ZXMpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9zaXRlLmNvbXBvc2l0ZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBjb21wb3NpdGVzID0gY29tcG9zaXRlcy5jb25jYXQoQ29tcG9zaXRlLmFsbENvbXBvc2l0ZXMoY29tcG9zaXRlLmNvbXBvc2l0ZXNbaV0pKTtcblxuICAgICAgICByZXR1cm4gY29tcG9zaXRlcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2VhcmNoZXMgdGhlIGNvbXBvc2l0ZSByZWN1cnNpdmVseSBmb3IgYW4gb2JqZWN0IG1hdGNoaW5nIHRoZSB0eXBlIGFuZCBpZCBzdXBwbGllZCwgbnVsbCBpZiBub3QgZm91bmQuXG4gICAgICogQG1ldGhvZCBnZXRcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSByZXF1ZXN0ZWQgb2JqZWN0LCBpZiBmb3VuZFxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5nZXQgPSBmdW5jdGlvbihjb21wb3NpdGUsIGlkLCB0eXBlKSB7XG4gICAgICAgIHZhciBvYmplY3RzLFxuICAgICAgICAgICAgb2JqZWN0O1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdib2R5JzpcbiAgICAgICAgICAgIG9iamVjdHMgPSBDb21wb3NpdGUuYWxsQm9kaWVzKGNvbXBvc2l0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29uc3RyYWludCc6XG4gICAgICAgICAgICBvYmplY3RzID0gQ29tcG9zaXRlLmFsbENvbnN0cmFpbnRzKGNvbXBvc2l0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29tcG9zaXRlJzpcbiAgICAgICAgICAgIG9iamVjdHMgPSBDb21wb3NpdGUuYWxsQ29tcG9zaXRlcyhjb21wb3NpdGUpLmNvbmNhdChjb21wb3NpdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9iamVjdHMpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICBvYmplY3QgPSBvYmplY3RzLmZpbHRlcihmdW5jdGlvbihvYmplY3QpIHsgXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0LmlkLnRvU3RyaW5nKCkgPT09IGlkLnRvU3RyaW5nKCk7IFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JqZWN0Lmxlbmd0aCA9PT0gMCA/IG51bGwgOiBvYmplY3RbMF07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1vdmVzIHRoZSBnaXZlbiBvYmplY3QocykgZnJvbSBjb21wb3NpdGVBIHRvIGNvbXBvc2l0ZUIgKGVxdWFsIHRvIGEgcmVtb3ZlIGZvbGxvd2VkIGJ5IGFuIGFkZCkuXG4gICAgICogQG1ldGhvZCBtb3ZlXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGVBfSBjb21wb3NpdGVBXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlQn0gY29tcG9zaXRlQlxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gUmV0dXJucyBjb21wb3NpdGVBXG4gICAgICovXG4gICAgQ29tcG9zaXRlLm1vdmUgPSBmdW5jdGlvbihjb21wb3NpdGVBLCBvYmplY3RzLCBjb21wb3NpdGVCKSB7XG4gICAgICAgIENvbXBvc2l0ZS5yZW1vdmUoY29tcG9zaXRlQSwgb2JqZWN0cyk7XG4gICAgICAgIENvbXBvc2l0ZS5hZGQoY29tcG9zaXRlQiwgb2JqZWN0cyk7XG4gICAgICAgIHJldHVybiBjb21wb3NpdGVBO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ25zIG5ldyBpZHMgZm9yIGFsbCBvYmplY3RzIGluIHRoZSBjb21wb3NpdGUsIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBtZXRob2QgcmViYXNlXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gUmV0dXJucyBjb21wb3NpdGVcbiAgICAgKi9cbiAgICBDb21wb3NpdGUucmViYXNlID0gZnVuY3Rpb24oY29tcG9zaXRlKSB7XG4gICAgICAgIHZhciBvYmplY3RzID0gQ29tcG9zaXRlLmFsbEJvZGllcyhjb21wb3NpdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KENvbXBvc2l0ZS5hbGxDb25zdHJhaW50cyhjb21wb3NpdGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChDb21wb3NpdGUuYWxsQ29tcG9zaXRlcyhjb21wb3NpdGUpKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9iamVjdHNbaV0uaWQgPSBDb21tb24ubmV4dElkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlcyBhbGwgY2hpbGRyZW4gaW4gdGhlIGNvbXBvc2l0ZSBieSBhIGdpdmVuIHZlY3RvciByZWxhdGl2ZSB0byB0aGVpciBjdXJyZW50IHBvc2l0aW9ucywgXG4gICAgICogd2l0aG91dCBpbXBhcnRpbmcgYW55IHZlbG9jaXR5LlxuICAgICAqIEBtZXRob2QgdHJhbnNsYXRlXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB0cmFuc2xhdGlvblxuICAgICAqIEBwYXJhbSB7Ym9vbH0gW3JlY3Vyc2l2ZT10cnVlXVxuICAgICAqL1xuICAgIENvbXBvc2l0ZS50cmFuc2xhdGUgPSBmdW5jdGlvbihjb21wb3NpdGUsIHRyYW5zbGF0aW9uLCByZWN1cnNpdmUpIHtcbiAgICAgICAgdmFyIGJvZGllcyA9IHJlY3Vyc2l2ZSA/IENvbXBvc2l0ZS5hbGxCb2RpZXMoY29tcG9zaXRlKSA6IGNvbXBvc2l0ZS5ib2RpZXM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIEJvZHkudHJhbnNsYXRlKGJvZGllc1tpXSwgdHJhbnNsYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKGNvbXBvc2l0ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuXG4gICAgICAgIHJldHVybiBjb21wb3NpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJvdGF0ZXMgYWxsIGNoaWxkcmVuIGluIHRoZSBjb21wb3NpdGUgYnkgYSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgZ2l2ZW4gcG9pbnQsIHdpdGhvdXQgaW1wYXJ0aW5nIGFueSBhbmd1bGFyIHZlbG9jaXR5LlxuICAgICAqIEBtZXRob2Qgcm90YXRlXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3RhdGlvblxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBwb2ludFxuICAgICAqIEBwYXJhbSB7Ym9vbH0gW3JlY3Vyc2l2ZT10cnVlXVxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5yb3RhdGUgPSBmdW5jdGlvbihjb21wb3NpdGUsIHJvdGF0aW9uLCBwb2ludCwgcmVjdXJzaXZlKSB7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhyb3RhdGlvbiksXG4gICAgICAgICAgICBzaW4gPSBNYXRoLnNpbihyb3RhdGlvbiksXG4gICAgICAgICAgICBib2RpZXMgPSByZWN1cnNpdmUgPyBDb21wb3NpdGUuYWxsQm9kaWVzKGNvbXBvc2l0ZSkgOiBjb21wb3NpdGUuYm9kaWVzO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXSxcbiAgICAgICAgICAgICAgICBkeCA9IGJvZHkucG9zaXRpb24ueCAtIHBvaW50LngsXG4gICAgICAgICAgICAgICAgZHkgPSBib2R5LnBvc2l0aW9uLnkgLSBwb2ludC55O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgQm9keS5zZXRQb3NpdGlvbihib2R5LCB7XG4gICAgICAgICAgICAgICAgeDogcG9pbnQueCArIChkeCAqIGNvcyAtIGR5ICogc2luKSxcbiAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgKGR4ICogc2luICsgZHkgKiBjb3MpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQm9keS5yb3RhdGUoYm9keSwgcm90YXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29tcG9zaXRlLnNldE1vZGlmaWVkKGNvbXBvc2l0ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuXG4gICAgICAgIHJldHVybiBjb21wb3NpdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNjYWxlcyBhbGwgY2hpbGRyZW4gaW4gdGhlIGNvbXBvc2l0ZSwgaW5jbHVkaW5nIHVwZGF0aW5nIHBoeXNpY2FsIHByb3BlcnRpZXMgKG1hc3MsIGFyZWEsIGF4ZXMsIGluZXJ0aWEpLCBmcm9tIGEgd29ybGQtc3BhY2UgcG9pbnQuXG4gICAgICogQG1ldGhvZCBzY2FsZVxuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVYXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlWVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBwb2ludFxuICAgICAqIEBwYXJhbSB7Ym9vbH0gW3JlY3Vyc2l2ZT10cnVlXVxuICAgICAqL1xuICAgIENvbXBvc2l0ZS5zY2FsZSA9IGZ1bmN0aW9uKGNvbXBvc2l0ZSwgc2NhbGVYLCBzY2FsZVksIHBvaW50LCByZWN1cnNpdmUpIHtcbiAgICAgICAgdmFyIGJvZGllcyA9IHJlY3Vyc2l2ZSA/IENvbXBvc2l0ZS5hbGxCb2RpZXMoY29tcG9zaXRlKSA6IGNvbXBvc2l0ZS5ib2RpZXM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldLFxuICAgICAgICAgICAgICAgIGR4ID0gYm9keS5wb3NpdGlvbi54IC0gcG9pbnQueCxcbiAgICAgICAgICAgICAgICBkeSA9IGJvZHkucG9zaXRpb24ueSAtIHBvaW50Lnk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBCb2R5LnNldFBvc2l0aW9uKGJvZHksIHtcbiAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgZHggKiBzY2FsZVgsXG4gICAgICAgICAgICAgICAgeTogcG9pbnQueSArIGR5ICogc2NhbGVZXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgQm9keS5zY2FsZShib2R5LCBzY2FsZVgsIHNjYWxlWSk7XG4gICAgICAgIH1cblxuICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQoY29tcG9zaXRlLCB0cnVlLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdW5pb24gb2YgdGhlIGJvdW5kcyBvZiBhbGwgb2YgdGhlIGNvbXBvc2l0ZSdzIGJvZGllcy5cbiAgICAgKiBAbWV0aG9kIGJvdW5kc1xuICAgICAqIEBwYXJhbSB7Y29tcG9zaXRlfSBjb21wb3NpdGUgVGhlIGNvbXBvc2l0ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym91bmRzfSBUaGUgY29tcG9zaXRlIGJvdW5kcy5cbiAgICAgKi9cbiAgICBDb21wb3NpdGUuYm91bmRzID0gZnVuY3Rpb24oY29tcG9zaXRlKSB7XG4gICAgICAgIHZhciBib2RpZXMgPSBNYXR0ZXIuQ29tcG9zaXRlLmFsbEJvZGllcyhjb21wb3NpdGUpLFxuICAgICAgICAgICAgdmVydGljZXMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV07XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGJvZHkuYm91bmRzLm1pbiwgYm9keS5ib3VuZHMubWF4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBNYXR0ZXIuQm91bmRzLmNyZWF0ZSh2ZXJ0aWNlcyk7XG4gICAgfTtcblxuICAgIC8qXG4gICAgKlxuICAgICogIEV2ZW50cyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIHdoZW4gYSBjYWxsIHRvIGBDb21wb3NpdGUuYWRkYCBpcyBtYWRlLCBiZWZvcmUgb2JqZWN0cyBoYXZlIGJlZW4gYWRkZWQuXG4gICAgKlxuICAgICogQGV2ZW50IGJlZm9yZUFkZFxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm9iamVjdCBUaGUgb2JqZWN0KHMpIHRvIGJlIGFkZGVkIChtYXkgYmUgYSBzaW5nbGUgYm9keSwgY29uc3RyYWludCwgY29tcG9zaXRlIG9yIGEgbWl4ZWQgYXJyYXkgb2YgdGhlc2UpXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiBhIGNhbGwgdG8gYENvbXBvc2l0ZS5hZGRgIGlzIG1hZGUsIGFmdGVyIG9iamVjdHMgaGF2ZSBiZWVuIGFkZGVkLlxuICAgICpcbiAgICAqIEBldmVudCBhZnRlckFkZFxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm9iamVjdCBUaGUgb2JqZWN0KHMpIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIChtYXkgYmUgYSBzaW5nbGUgYm9keSwgY29uc3RyYWludCwgY29tcG9zaXRlIG9yIGEgbWl4ZWQgYXJyYXkgb2YgdGhlc2UpXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiBhIGNhbGwgdG8gYENvbXBvc2l0ZS5yZW1vdmVgIGlzIG1hZGUsIGJlZm9yZSBvYmplY3RzIGhhdmUgYmVlbiByZW1vdmVkLlxuICAgICpcbiAgICAqIEBldmVudCBiZWZvcmVSZW1vdmVcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7fSBldmVudC5vYmplY3QgVGhlIG9iamVjdChzKSB0byBiZSByZW1vdmVkIChtYXkgYmUgYSBzaW5nbGUgYm9keSwgY29uc3RyYWludCwgY29tcG9zaXRlIG9yIGEgbWl4ZWQgYXJyYXkgb2YgdGhlc2UpXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiBhIGNhbGwgdG8gYENvbXBvc2l0ZS5yZW1vdmVgIGlzIG1hZGUsIGFmdGVyIG9iamVjdHMgaGF2ZSBiZWVuIHJlbW92ZWQuXG4gICAgKlxuICAgICogQGV2ZW50IGFmdGVyUmVtb3ZlXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge30gZXZlbnQub2JqZWN0IFRoZSBvYmplY3QocykgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZCAobWF5IGJlIGEgc2luZ2xlIGJvZHksIGNvbnN0cmFpbnQsIGNvbXBvc2l0ZSBvciBhIG1peGVkIGFycmF5IG9mIHRoZXNlKVxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKlxuICAgICpcbiAgICAqICBQcm9wZXJ0aWVzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGludGVnZXIgYE51bWJlcmAgdW5pcXVlbHkgaWRlbnRpZnlpbmcgbnVtYmVyIGdlbmVyYXRlZCBpbiBgQ29tcG9zaXRlLmNyZWF0ZWAgYnkgYENvbW1vbi5uZXh0SWRgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBTdHJpbmdgIGRlbm90aW5nIHRoZSB0eXBlIG9mIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgXCJjb21wb3NpdGVcIlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJiaXRyYXJ5IGBTdHJpbmdgIG5hbWUgdG8gaGVscCB0aGUgdXNlciBpZGVudGlmeSBhbmQgbWFuYWdlIGNvbXBvc2l0ZXMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbGFiZWxcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBcIkNvbXBvc2l0ZVwiXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGZsYWcgdGhhdCBzcGVjaWZpZXMgd2hldGhlciB0aGUgY29tcG9zaXRlIGhhcyBiZWVuIG1vZGlmaWVkIGR1cmluZyB0aGUgY3VycmVudCBzdGVwLlxuICAgICAqIE1vc3QgYE1hdHRlci5Db21wb3NpdGVgIG1ldGhvZHMgd2lsbCBhdXRvbWF0aWNhbGx5IHNldCB0aGlzIGZsYWcgdG8gYHRydWVgIHRvIGluZm9ybSB0aGUgZW5naW5lIG9mIGNoYW5nZXMgdG8gYmUgaGFuZGxlZC5cbiAgICAgKiBJZiB5b3UgbmVlZCB0byBjaGFuZ2UgaXQgbWFudWFsbHksIHlvdSBzaG91bGQgdXNlIHRoZSBgQ29tcG9zaXRlLnNldE1vZGlmaWVkYCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNNb2RpZmllZFxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGBDb21wb3NpdGVgIHRoYXQgaXMgdGhlIHBhcmVudCBvZiB0aGlzIGNvbXBvc2l0ZS4gSXQgaXMgYXV0b21hdGljYWxseSBtYW5hZ2VkIGJ5IHRoZSBgTWF0dGVyLkNvbXBvc2l0ZWAgbWV0aG9kcy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwYXJlbnRcbiAgICAgKiBAdHlwZSBjb21wb3NpdGVcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBgQm9keWAgdGhhdCBhcmUgX2RpcmVjdF8gY2hpbGRyZW4gb2YgdGhpcyBjb21wb3NpdGUuXG4gICAgICogVG8gYWRkIG9yIHJlbW92ZSBib2RpZXMgeW91IHNob3VsZCB1c2UgYENvbXBvc2l0ZS5hZGRgIGFuZCBgQ29tcG9zaXRlLnJlbW92ZWAgbWV0aG9kcyByYXRoZXIgdGhhbiBkaXJlY3RseSBtb2RpZnlpbmcgdGhpcyBwcm9wZXJ0eS5cbiAgICAgKiBJZiB5b3Ugd2lzaCB0byByZWN1cnNpdmVseSBmaW5kIGFsbCBkZXNjZW5kYW50cywgeW91IHNob3VsZCB1c2UgdGhlIGBDb21wb3NpdGUuYWxsQm9kaWVzYCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYm9kaWVzXG4gICAgICogQHR5cGUgYm9keVtdXG4gICAgICogQGRlZmF1bHQgW11cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGBDb25zdHJhaW50YCB0aGF0IGFyZSBfZGlyZWN0XyBjaGlsZHJlbiBvZiB0aGlzIGNvbXBvc2l0ZS5cbiAgICAgKiBUbyBhZGQgb3IgcmVtb3ZlIGNvbnN0cmFpbnRzIHlvdSBzaG91bGQgdXNlIGBDb21wb3NpdGUuYWRkYCBhbmQgYENvbXBvc2l0ZS5yZW1vdmVgIG1ldGhvZHMgcmF0aGVyIHRoYW4gZGlyZWN0bHkgbW9kaWZ5aW5nIHRoaXMgcHJvcGVydHkuXG4gICAgICogSWYgeW91IHdpc2ggdG8gcmVjdXJzaXZlbHkgZmluZCBhbGwgZGVzY2VuZGFudHMsIHlvdSBzaG91bGQgdXNlIHRoZSBgQ29tcG9zaXRlLmFsbENvbnN0cmFpbnRzYCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgY29uc3RyYWludHNcbiAgICAgKiBAdHlwZSBjb25zdHJhaW50W11cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgYENvbXBvc2l0ZWAgdGhhdCBhcmUgX2RpcmVjdF8gY2hpbGRyZW4gb2YgdGhpcyBjb21wb3NpdGUuXG4gICAgICogVG8gYWRkIG9yIHJlbW92ZSBjb21wb3NpdGVzIHlvdSBzaG91bGQgdXNlIGBDb21wb3NpdGUuYWRkYCBhbmQgYENvbXBvc2l0ZS5yZW1vdmVgIG1ldGhvZHMgcmF0aGVyIHRoYW4gZGlyZWN0bHkgbW9kaWZ5aW5nIHRoaXMgcHJvcGVydHkuXG4gICAgICogSWYgeW91IHdpc2ggdG8gcmVjdXJzaXZlbHkgZmluZCBhbGwgZGVzY2VuZGFudHMsIHlvdSBzaG91bGQgdXNlIHRoZSBgQ29tcG9zaXRlLmFsbENvbXBvc2l0ZXNgIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb21wb3NpdGVzXG4gICAgICogQHR5cGUgY29tcG9zaXRlW11cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gb2JqZWN0IHJlc2VydmVkIGZvciBzdG9yaW5nIHBsdWdpbi1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBsdWdpblxuICAgICAqIEB0eXBlIHt9XG4gICAgICovXG5cbn0pKCk7XG5cbn0se1wiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2NvcmUvRXZlbnRzXCI6MTYsXCIuL0JvZHlcIjoxfV0sMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuV29ybGRgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIHRoZSB3b3JsZCBjb21wb3NpdGUuXG4qIEEgYE1hdHRlci5Xb3JsZGAgaXMgYSBgTWF0dGVyLkNvbXBvc2l0ZWAgYm9keSwgd2hpY2ggaXMgYSBjb2xsZWN0aW9uIG9mIGBNYXR0ZXIuQm9keWAsIGBNYXR0ZXIuQ29uc3RyYWludGAgYW5kIG90aGVyIGBNYXR0ZXIuQ29tcG9zaXRlYC5cbiogQSBgTWF0dGVyLldvcmxkYCBoYXMgYSBmZXcgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGluY2x1ZGluZyBgZ3Jhdml0eWAgYW5kIGBib3VuZHNgLlxuKiBJdCBpcyBpbXBvcnRhbnQgdG8gdXNlIHRoZSBmdW5jdGlvbnMgaW4gdGhlIGBNYXR0ZXIuQ29tcG9zaXRlYCBtb2R1bGUgdG8gbW9kaWZ5IHRoZSB3b3JsZCBjb21wb3NpdGUsIHJhdGhlciB0aGFuIGRpcmVjdGx5IG1vZGlmeWluZyBpdHMgcHJvcGVydGllcy5cbiogVGhlcmUgYXJlIGFsc28gYSBmZXcgbWV0aG9kcyBoZXJlIHRoYXQgYWxpYXMgdGhvc2UgaW4gYE1hdHRlci5Db21wb3NpdGVgIGZvciBlYXNpZXIgcmVhZGFiaWxpdHkuXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBXb3JsZFxuKiBAZXh0ZW5kcyBDb21wb3NpdGVcbiovXG5cbnZhciBXb3JsZCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmxkO1xuXG52YXIgQ29tcG9zaXRlID0gX2RlcmVxXygnLi9Db21wb3NpdGUnKTtcbnZhciBDb25zdHJhaW50ID0gX2RlcmVxXygnLi4vY29uc3RyYWludC9Db25zdHJhaW50Jyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyB3b3JsZCBjb21wb3NpdGUuIFRoZSBvcHRpb25zIHBhcmFtZXRlciBpcyBhbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgYW55IHByb3BlcnRpZXMgeW91IHdpc2ggdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzLlxuICAgICAqIFNlZSB0aGUgcHJvcGVydGllcyBzZWN0aW9uIGJlbG93IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge30gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge3dvcmxkfSBBIG5ldyB3b3JsZFxuICAgICAqL1xuICAgIFdvcmxkLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNvbXBvc2l0ZSA9IENvbXBvc2l0ZS5jcmVhdGUoKTtcblxuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBsYWJlbDogJ1dvcmxkJyxcbiAgICAgICAgICAgIGdyYXZpdHk6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDEsXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm91bmRzOiB7IFxuICAgICAgICAgICAgICAgIG1pbjogeyB4OiAtSW5maW5pdHksIHk6IC1JbmZpbml0eSB9LCBcbiAgICAgICAgICAgICAgICBtYXg6IHsgeDogSW5maW5pdHksIHk6IEluZmluaXR5IH0gXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQ29tbW9uLmV4dGVuZChjb21wb3NpdGUsIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAqXG4gICAgKiAgUHJvcGVydGllcyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZ3Jhdml0eSB0byBhcHBseSBvbiB0aGUgd29ybGQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZ3Jhdml0eVxuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGdyYXZpdHkgeCBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZ3Jhdml0eS54XG4gICAgICogQHR5cGUgb2JqZWN0XG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGdyYXZpdHkgeSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZ3Jhdml0eS55XG4gICAgICogQHR5cGUgb2JqZWN0XG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGdyYXZpdHkgc2NhbGUgZmFjdG9yLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGdyYXZpdHkuc2NhbGVcbiAgICAgKiBAdHlwZSBvYmplY3RcbiAgICAgKiBAZGVmYXVsdCAwLjAwMVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgQm91bmRzYCBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZSB3b3JsZCBib3VuZHMgZm9yIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYm91bmRzXG4gICAgICogQHR5cGUgYm91bmRzXG4gICAgICogQGRlZmF1bHQgeyBtaW46IHsgeDogLUluZmluaXR5LCB5OiAtSW5maW5pdHkgfSwgbWF4OiB7IHg6IEluZmluaXR5LCB5OiBJbmZpbml0eSB9IH1cbiAgICAgKi9cblxuICAgIC8vIFdvcmxkIGlzIGEgQ29tcG9zaXRlIGJvZHlcbiAgICAvLyBzZWUgc3JjL21vZHVsZS9PdXRyby5qcyBmb3IgdGhlc2UgYWxpYXNlczpcbiAgICBcbiAgICAvKipcbiAgICAgKiBBbiBhbGlhcyBmb3IgQ29tcG9zaXRlLmFkZFxuICAgICAqIEBtZXRob2QgYWRkXG4gICAgICogQHBhcmFtIHt3b3JsZH0gd29ybGRcbiAgICAgKiBAcGFyYW0ge30gb2JqZWN0XG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgd29ybGQgd2l0aCB0aGUgb2JqZWN0cyBhZGRlZFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYWxpYXMgZm9yIENvbXBvc2l0ZS5yZW1vdmVcbiAgICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgICAqIEBwYXJhbSB7d29ybGR9IHdvcmxkXG4gICAgICogQHBhcmFtIHt9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZXA9ZmFsc2VdXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBUaGUgb3JpZ2luYWwgd29ybGQgd2l0aCB0aGUgb2JqZWN0cyByZW1vdmVkXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBhbGlhcyBmb3IgQ29tcG9zaXRlLmNsZWFyXG4gICAgICogQG1ldGhvZCBjbGVhclxuICAgICAqIEBwYXJhbSB7d29ybGR9IHdvcmxkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBrZWVwU3RhdGljXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBhbGlhcyBmb3IgQ29tcG9zaXRlLmFkZENvbXBvc2l0ZVxuICAgICAqIEBtZXRob2QgYWRkQ29tcG9zaXRlXG4gICAgICogQHBhcmFtIHt3b3JsZH0gd29ybGRcbiAgICAgKiBAcGFyYW0ge2NvbXBvc2l0ZX0gY29tcG9zaXRlXG4gICAgICogQHJldHVybiB7d29ybGR9IFRoZSBvcmlnaW5hbCB3b3JsZCB3aXRoIHRoZSBvYmplY3RzIGZyb20gY29tcG9zaXRlIGFkZGVkXG4gICAgICovXG4gICAgXG4gICAgIC8qKlxuICAgICAgKiBBbiBhbGlhcyBmb3IgQ29tcG9zaXRlLmFkZEJvZHlcbiAgICAgICogQG1ldGhvZCBhZGRCb2R5XG4gICAgICAqIEBwYXJhbSB7d29ybGR9IHdvcmxkXG4gICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAgKiBAcmV0dXJuIHt3b3JsZH0gVGhlIG9yaWdpbmFsIHdvcmxkIHdpdGggdGhlIGJvZHkgYWRkZWRcbiAgICAgICovXG5cbiAgICAgLyoqXG4gICAgICAqIEFuIGFsaWFzIGZvciBDb21wb3NpdGUuYWRkQ29uc3RyYWludFxuICAgICAgKiBAbWV0aG9kIGFkZENvbnN0cmFpbnRcbiAgICAgICogQHBhcmFtIHt3b3JsZH0gd29ybGRcbiAgICAgICogQHBhcmFtIHtjb25zdHJhaW50fSBjb25zdHJhaW50XG4gICAgICAqIEByZXR1cm4ge3dvcmxkfSBUaGUgb3JpZ2luYWwgd29ybGQgd2l0aCB0aGUgY29uc3RyYWludCBhZGRlZFxuICAgICAgKi9cblxufSkoKTtcblxufSx7XCIuLi9jb25zdHJhaW50L0NvbnN0cmFpbnRcIjoxMixcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuL0NvbXBvc2l0ZVwiOjJ9XSw0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5Db250YWN0YCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyBjb2xsaXNpb24gY29udGFjdHMuXG4qXG4qIEBjbGFzcyBDb250YWN0XG4qL1xuXG52YXIgQ29udGFjdCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhY3Q7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgY29udGFjdC5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7dmVydGV4fSB2ZXJ0ZXhcbiAgICAgKiBAcmV0dXJuIHtjb250YWN0fSBBIG5ldyBjb250YWN0XG4gICAgICovXG4gICAgQ29udGFjdC5jcmVhdGUgPSBmdW5jdGlvbih2ZXJ0ZXgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBDb250YWN0LmlkKHZlcnRleCksXG4gICAgICAgICAgICB2ZXJ0ZXg6IHZlcnRleCxcbiAgICAgICAgICAgIG5vcm1hbEltcHVsc2U6IDAsXG4gICAgICAgICAgICB0YW5nZW50SW1wdWxzZTogMFxuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgY29udGFjdCBpZC5cbiAgICAgKiBAbWV0aG9kIGlkXG4gICAgICogQHBhcmFtIHt2ZXJ0ZXh9IHZlcnRleFxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gVW5pcXVlIGNvbnRhY3RJRFxuICAgICAqL1xuICAgIENvbnRhY3QuaWQgPSBmdW5jdGlvbih2ZXJ0ZXgpIHtcbiAgICAgICAgcmV0dXJuIHZlcnRleC5ib2R5LmlkICsgJ18nICsgdmVydGV4LmluZGV4O1xuICAgIH07XG5cbn0pKCk7XG5cbn0se31dLDU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkRldGVjdG9yYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgZGV0ZWN0aW5nIGNvbGxpc2lvbnMgZ2l2ZW4gYSBzZXQgb2YgcGFpcnMuXG4qXG4qIEBjbGFzcyBEZXRlY3RvclxuKi9cblxuLy8gVE9ETzogc3BlY3VsYXRpdmUgY29udGFjdHNcblxudmFyIERldGVjdG9yID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gRGV0ZWN0b3I7XG5cbnZhciBTQVQgPSBfZGVyZXFfKCcuL1NBVCcpO1xudmFyIFBhaXIgPSBfZGVyZXFfKCcuL1BhaXInKTtcbnZhciBCb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogRmluZHMgYWxsIGNvbGxpc2lvbnMgZ2l2ZW4gYSBsaXN0IG9mIHBhaXJzLlxuICAgICAqIEBtZXRob2QgY29sbGlzaW9uc1xuICAgICAqIEBwYXJhbSB7cGFpcltdfSBicm9hZHBoYXNlUGFpcnNcbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lXG4gICAgICogQHJldHVybiB7YXJyYXl9IGNvbGxpc2lvbnNcbiAgICAgKi9cbiAgICBEZXRlY3Rvci5jb2xsaXNpb25zID0gZnVuY3Rpb24oYnJvYWRwaGFzZVBhaXJzLCBlbmdpbmUpIHtcbiAgICAgICAgdmFyIGNvbGxpc2lvbnMgPSBbXSxcbiAgICAgICAgICAgIHBhaXJzVGFibGUgPSBlbmdpbmUucGFpcnMudGFibGU7XG5cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJvYWRwaGFzZVBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keUEgPSBicm9hZHBoYXNlUGFpcnNbaV1bMF0sIFxuICAgICAgICAgICAgICAgIGJvZHlCID0gYnJvYWRwaGFzZVBhaXJzW2ldWzFdO1xuXG4gICAgICAgICAgICBpZiAoKGJvZHlBLmlzU3RhdGljIHx8IGJvZHlBLmlzU2xlZXBpbmcpICYmIChib2R5Qi5pc1N0YXRpYyB8fCBib2R5Qi5pc1NsZWVwaW5nKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFEZXRlY3Rvci5jYW5Db2xsaWRlKGJvZHlBLmNvbGxpc2lvbkZpbHRlciwgYm9keUIuY29sbGlzaW9uRmlsdGVyKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuXG4gICAgICAgICAgICAvLyBtaWQgcGhhc2VcbiAgICAgICAgICAgIGlmIChCb3VuZHMub3ZlcmxhcHMoYm9keUEuYm91bmRzLCBib2R5Qi5ib3VuZHMpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IGJvZHlBLnBhcnRzLmxlbmd0aCA+IDEgPyAxIDogMDsgaiA8IGJvZHlBLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0QSA9IGJvZHlBLnBhcnRzW2pdO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSBib2R5Qi5wYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGsgPCBib2R5Qi5wYXJ0cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRCID0gYm9keUIucGFydHNba107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGFydEEgPT09IGJvZHlBICYmIHBhcnRCID09PSBib2R5QikgfHwgQm91bmRzLm92ZXJsYXBzKHBhcnRBLmJvdW5kcywgcGFydEIuYm91bmRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmQgYSBwcmV2aW91cyBjb2xsaXNpb24gd2UgY291bGQgcmV1c2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFpcklkID0gUGFpci5pZChwYXJ0QSwgcGFydEIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWlyID0gcGFpcnNUYWJsZVtwYWlySWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0NvbGxpc2lvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYWlyICYmIHBhaXIuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0NvbGxpc2lvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFycm93IHBoYXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbiA9IFNBVC5jb2xsaWRlcyhwYXJ0QSwgcGFydEIsIHByZXZpb3VzQ29sbGlzaW9uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpc2lvbi5jb2xsaWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLnB1c2goY29sbGlzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sbGlzaW9ucztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYm90aCBzdXBwbGllZCBjb2xsaXNpb24gZmlsdGVycyB3aWxsIGFsbG93IGEgY29sbGlzaW9uIHRvIG9jY3VyLlxuICAgICAqIFNlZSBgYm9keS5jb2xsaXNpb25GaWx0ZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqIEBtZXRob2QgY2FuQ29sbGlkZVxuICAgICAqIEBwYXJhbSB7fSBmaWx0ZXJBXG4gICAgICogQHBhcmFtIHt9IGZpbHRlckJcbiAgICAgKiBAcmV0dXJuIHtib29sfSBgdHJ1ZWAgaWYgY29sbGlzaW9uIGNhbiBvY2N1clxuICAgICAqL1xuICAgIERldGVjdG9yLmNhbkNvbGxpZGUgPSBmdW5jdGlvbihmaWx0ZXJBLCBmaWx0ZXJCKSB7XG4gICAgICAgIGlmIChmaWx0ZXJBLmdyb3VwID09PSBmaWx0ZXJCLmdyb3VwICYmIGZpbHRlckEuZ3JvdXAgIT09IDApXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyQS5ncm91cCA+IDA7XG5cbiAgICAgICAgcmV0dXJuIChmaWx0ZXJBLm1hc2sgJiBmaWx0ZXJCLmNhdGVnb3J5KSAhPT0gMCAmJiAoZmlsdGVyQi5tYXNrICYgZmlsdGVyQS5jYXRlZ29yeSkgIT09IDA7XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuLi9nZW9tZXRyeS9Cb3VuZHNcIjoyNixcIi4vUGFpclwiOjcsXCIuL1NBVFwiOjExfV0sNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuR3JpZGAgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgY29sbGlzaW9uIGJyb2FkcGhhc2UgZ3JpZCBzdHJ1Y3R1cmVzLlxuKlxuKiBAY2xhc3MgR3JpZFxuKi9cblxudmFyIEdyaWQgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkO1xuXG52YXIgUGFpciA9IF9kZXJlcV8oJy4vUGFpcicpO1xudmFyIERldGVjdG9yID0gX2RlcmVxXygnLi9EZXRlY3RvcicpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgZ3JpZC5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7Z3JpZH0gQSBuZXcgZ3JpZFxuICAgICAqL1xuICAgIEdyaWQuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBjb250cm9sbGVyOiBHcmlkLFxuICAgICAgICAgICAgZGV0ZWN0b3I6IERldGVjdG9yLmNvbGxpc2lvbnMsXG4gICAgICAgICAgICBidWNrZXRzOiB7fSxcbiAgICAgICAgICAgIHBhaXJzOiB7fSxcbiAgICAgICAgICAgIHBhaXJzTGlzdDogW10sXG4gICAgICAgICAgICBidWNrZXRXaWR0aDogNDgsXG4gICAgICAgICAgICBidWNrZXRIZWlnaHQ6IDQ4XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgd2lkdGggb2YgYSBzaW5nbGUgZ3JpZCBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYnVja2V0V2lkdGhcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCA0OFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGhlaWdodCBvZiBhIHNpbmdsZSBncmlkIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBidWNrZXRIZWlnaHRcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCA0OFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZ3JpZC5cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7Z3JpZH0gZ3JpZFxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZVVwZGF0ZVxuICAgICAqL1xuICAgIEdyaWQudXBkYXRlID0gZnVuY3Rpb24oZ3JpZCwgYm9kaWVzLCBlbmdpbmUsIGZvcmNlVXBkYXRlKSB7XG4gICAgICAgIHZhciBpLCBjb2wsIHJvdyxcbiAgICAgICAgICAgIHdvcmxkID0gZW5naW5lLndvcmxkLFxuICAgICAgICAgICAgYnVja2V0cyA9IGdyaWQuYnVja2V0cyxcbiAgICAgICAgICAgIGJ1Y2tldCxcbiAgICAgICAgICAgIGJ1Y2tldElkLFxuICAgICAgICAgICAgZ3JpZENoYW5nZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoYm9keS5pc1NsZWVwaW5nICYmICFmb3JjZVVwZGF0ZSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgLy8gZG9uJ3QgdXBkYXRlIG91dCBvZiB3b3JsZCBib2RpZXNcbiAgICAgICAgICAgIGlmIChib2R5LmJvdW5kcy5tYXgueCA8IHdvcmxkLmJvdW5kcy5taW4ueCB8fCBib2R5LmJvdW5kcy5taW4ueCA+IHdvcmxkLmJvdW5kcy5tYXgueFxuICAgICAgICAgICAgICAgIHx8IGJvZHkuYm91bmRzLm1heC55IDwgd29ybGQuYm91bmRzLm1pbi55IHx8IGJvZHkuYm91bmRzLm1pbi55ID4gd29ybGQuYm91bmRzLm1heC55KVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgbmV3UmVnaW9uID0gR3JpZC5fZ2V0UmVnaW9uKGdyaWQsIGJvZHkpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgYm9keSBoYXMgY2hhbmdlZCBncmlkIHJlZ2lvblxuICAgICAgICAgICAgaWYgKCFib2R5LnJlZ2lvbiB8fCBuZXdSZWdpb24uaWQgIT09IGJvZHkucmVnaW9uLmlkIHx8IGZvcmNlVXBkYXRlKSB7XG5cblxuICAgICAgICAgICAgICAgIGlmICghYm9keS5yZWdpb24gfHwgZm9yY2VVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgIGJvZHkucmVnaW9uID0gbmV3UmVnaW9uO1xuXG4gICAgICAgICAgICAgICAgdmFyIHVuaW9uID0gR3JpZC5fcmVnaW9uVW5pb24obmV3UmVnaW9uLCBib2R5LnJlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgZ3JpZCBidWNrZXRzIGFmZmVjdGVkIGJ5IHJlZ2lvbiBjaGFuZ2VcbiAgICAgICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIHVuaW9uIG9mIGJvdGggcmVnaW9uc1xuICAgICAgICAgICAgICAgIGZvciAoY29sID0gdW5pb24uc3RhcnRDb2w7IGNvbCA8PSB1bmlvbi5lbmRDb2w7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAocm93ID0gdW5pb24uc3RhcnRSb3c7IHJvdyA8PSB1bmlvbi5lbmRSb3c7IHJvdysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWNrZXRJZCA9IEdyaWQuX2dldEJ1Y2tldElkKGNvbCwgcm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Y2tldCA9IGJ1Y2tldHNbYnVja2V0SWRdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNJbnNpZGVOZXdSZWdpb24gPSAoY29sID49IG5ld1JlZ2lvbi5zdGFydENvbCAmJiBjb2wgPD0gbmV3UmVnaW9uLmVuZENvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcm93ID49IG5ld1JlZ2lvbi5zdGFydFJvdyAmJiByb3cgPD0gbmV3UmVnaW9uLmVuZFJvdyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0luc2lkZU9sZFJlZ2lvbiA9IChjb2wgPj0gYm9keS5yZWdpb24uc3RhcnRDb2wgJiYgY29sIDw9IGJvZHkucmVnaW9uLmVuZENvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcm93ID49IGJvZHkucmVnaW9uLnN0YXJ0Um93ICYmIHJvdyA8PSBib2R5LnJlZ2lvbi5lbmRSb3cpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZnJvbSBvbGQgcmVnaW9uIGJ1Y2tldHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNJbnNpZGVOZXdSZWdpb24gJiYgaXNJbnNpZGVPbGRSZWdpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJbnNpZGVPbGRSZWdpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1Y2tldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdyaWQuX2J1Y2tldFJlbW92ZUJvZHkoZ3JpZCwgYnVja2V0LCBib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0byBuZXcgcmVnaW9uIGJ1Y2tldHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2R5LnJlZ2lvbiA9PT0gbmV3UmVnaW9uIHx8IChpc0luc2lkZU5ld1JlZ2lvbiAmJiAhaXNJbnNpZGVPbGRSZWdpb24pIHx8IGZvcmNlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFidWNrZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Y2tldCA9IEdyaWQuX2NyZWF0ZUJ1Y2tldChidWNrZXRzLCBidWNrZXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR3JpZC5fYnVja2V0QWRkQm9keShncmlkLCBidWNrZXQsIGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgcmVnaW9uXG4gICAgICAgICAgICAgICAgYm9keS5yZWdpb24gPSBuZXdSZWdpb247XG5cbiAgICAgICAgICAgICAgICAvLyBmbGFnIGNoYW5nZXMgc28gd2UgY2FuIHVwZGF0ZSBwYWlyc1xuICAgICAgICAgICAgICAgIGdyaWRDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBwYWlycyBsaXN0IG9ubHkgaWYgcGFpcnMgY2hhbmdlZCAoaS5lLiBhIGJvZHkgY2hhbmdlZCByZWdpb24pXG4gICAgICAgIGlmIChncmlkQ2hhbmdlZClcbiAgICAgICAgICAgIGdyaWQucGFpcnNMaXN0ID0gR3JpZC5fY3JlYXRlQWN0aXZlUGFpcnNMaXN0KGdyaWQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGdyaWQuXG4gICAgICogQG1ldGhvZCBjbGVhclxuICAgICAqIEBwYXJhbSB7Z3JpZH0gZ3JpZFxuICAgICAqL1xuICAgIEdyaWQuY2xlYXIgPSBmdW5jdGlvbihncmlkKSB7XG4gICAgICAgIGdyaWQuYnVja2V0cyA9IHt9O1xuICAgICAgICBncmlkLnBhaXJzID0ge307XG4gICAgICAgIGdyaWQucGFpcnNMaXN0ID0gW107XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSB1bmlvbiBvZiB0d28gcmVnaW9ucy5cbiAgICAgKiBAbWV0aG9kIF9yZWdpb25VbmlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IHJlZ2lvbkFcbiAgICAgKiBAcGFyYW0ge30gcmVnaW9uQlxuICAgICAqIEByZXR1cm4ge30gcmVnaW9uXG4gICAgICovXG4gICAgR3JpZC5fcmVnaW9uVW5pb24gPSBmdW5jdGlvbihyZWdpb25BLCByZWdpb25CKSB7XG4gICAgICAgIHZhciBzdGFydENvbCA9IE1hdGgubWluKHJlZ2lvbkEuc3RhcnRDb2wsIHJlZ2lvbkIuc3RhcnRDb2wpLFxuICAgICAgICAgICAgZW5kQ29sID0gTWF0aC5tYXgocmVnaW9uQS5lbmRDb2wsIHJlZ2lvbkIuZW5kQ29sKSxcbiAgICAgICAgICAgIHN0YXJ0Um93ID0gTWF0aC5taW4ocmVnaW9uQS5zdGFydFJvdywgcmVnaW9uQi5zdGFydFJvdyksXG4gICAgICAgICAgICBlbmRSb3cgPSBNYXRoLm1heChyZWdpb25BLmVuZFJvdywgcmVnaW9uQi5lbmRSb3cpO1xuXG4gICAgICAgIHJldHVybiBHcmlkLl9jcmVhdGVSZWdpb24oc3RhcnRDb2wsIGVuZENvbCwgc3RhcnRSb3csIGVuZFJvdyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlZ2lvbiBhIGdpdmVuIGJvZHkgZmFsbHMgaW4gZm9yIGEgZ2l2ZW4gZ3JpZC5cbiAgICAgKiBAbWV0aG9kIF9nZXRSZWdpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7fSBncmlkXG4gICAgICogQHBhcmFtIHt9IGJvZHlcbiAgICAgKiBAcmV0dXJuIHt9IHJlZ2lvblxuICAgICAqL1xuICAgIEdyaWQuX2dldFJlZ2lvbiA9IGZ1bmN0aW9uKGdyaWQsIGJvZHkpIHtcbiAgICAgICAgdmFyIGJvdW5kcyA9IGJvZHkuYm91bmRzLFxuICAgICAgICAgICAgc3RhcnRDb2wgPSBNYXRoLmZsb29yKGJvdW5kcy5taW4ueCAvIGdyaWQuYnVja2V0V2lkdGgpLFxuICAgICAgICAgICAgZW5kQ29sID0gTWF0aC5mbG9vcihib3VuZHMubWF4LnggLyBncmlkLmJ1Y2tldFdpZHRoKSxcbiAgICAgICAgICAgIHN0YXJ0Um93ID0gTWF0aC5mbG9vcihib3VuZHMubWluLnkgLyBncmlkLmJ1Y2tldEhlaWdodCksXG4gICAgICAgICAgICBlbmRSb3cgPSBNYXRoLmZsb29yKGJvdW5kcy5tYXgueSAvIGdyaWQuYnVja2V0SGVpZ2h0KTtcblxuICAgICAgICByZXR1cm4gR3JpZC5fY3JlYXRlUmVnaW9uKHN0YXJ0Q29sLCBlbmRDb2wsIHN0YXJ0Um93LCBlbmRSb3cpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmVnaW9uLlxuICAgICAqIEBtZXRob2QgX2NyZWF0ZVJlZ2lvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IHN0YXJ0Q29sXG4gICAgICogQHBhcmFtIHt9IGVuZENvbFxuICAgICAqIEBwYXJhbSB7fSBzdGFydFJvd1xuICAgICAqIEBwYXJhbSB7fSBlbmRSb3dcbiAgICAgKiBAcmV0dXJuIHt9IHJlZ2lvblxuICAgICAqL1xuICAgIEdyaWQuX2NyZWF0ZVJlZ2lvbiA9IGZ1bmN0aW9uKHN0YXJ0Q29sLCBlbmRDb2wsIHN0YXJ0Um93LCBlbmRSb3cpIHtcbiAgICAgICAgcmV0dXJuIHsgXG4gICAgICAgICAgICBpZDogc3RhcnRDb2wgKyAnLCcgKyBlbmRDb2wgKyAnLCcgKyBzdGFydFJvdyArICcsJyArIGVuZFJvdyxcbiAgICAgICAgICAgIHN0YXJ0Q29sOiBzdGFydENvbCwgXG4gICAgICAgICAgICBlbmRDb2w6IGVuZENvbCwgXG4gICAgICAgICAgICBzdGFydFJvdzogc3RhcnRSb3csIFxuICAgICAgICAgICAgZW5kUm93OiBlbmRSb3cgXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGJ1Y2tldCBpZCBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24uXG4gICAgICogQG1ldGhvZCBfZ2V0QnVja2V0SWRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7fSBjb2x1bW5cbiAgICAgKiBAcGFyYW0ge30gcm93XG4gICAgICogQHJldHVybiB7c3RyaW5nfSBidWNrZXQgaWRcbiAgICAgKi9cbiAgICBHcmlkLl9nZXRCdWNrZXRJZCA9IGZ1bmN0aW9uKGNvbHVtbiwgcm93KSB7XG4gICAgICAgIHJldHVybiAnQycgKyBjb2x1bW4gKyAnUicgKyByb3c7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBidWNrZXQuXG4gICAgICogQG1ldGhvZCBfY3JlYXRlQnVja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gYnVja2V0c1xuICAgICAqIEBwYXJhbSB7fSBidWNrZXRJZFxuICAgICAqIEByZXR1cm4ge30gYnVja2V0XG4gICAgICovXG4gICAgR3JpZC5fY3JlYXRlQnVja2V0ID0gZnVuY3Rpb24oYnVja2V0cywgYnVja2V0SWQpIHtcbiAgICAgICAgdmFyIGJ1Y2tldCA9IGJ1Y2tldHNbYnVja2V0SWRdID0gW107XG4gICAgICAgIHJldHVybiBidWNrZXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBib2R5IHRvIGEgYnVja2V0LlxuICAgICAqIEBtZXRob2QgX2J1Y2tldEFkZEJvZHlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7fSBncmlkXG4gICAgICogQHBhcmFtIHt9IGJ1Y2tldFxuICAgICAqIEBwYXJhbSB7fSBib2R5XG4gICAgICovXG4gICAgR3JpZC5fYnVja2V0QWRkQm9keSA9IGZ1bmN0aW9uKGdyaWQsIGJ1Y2tldCwgYm9keSkge1xuICAgICAgICAvLyBhZGQgbmV3IHBhaXJzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVja2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keUIgPSBidWNrZXRbaV07XG5cbiAgICAgICAgICAgIGlmIChib2R5LmlkID09PSBib2R5Qi5pZCB8fCAoYm9keS5pc1N0YXRpYyAmJiBib2R5Qi5pc1N0YXRpYykpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIG51bWJlciBvZiBidWNrZXRzIHRoZSBwYWlyIGV4aXN0cyBpblxuICAgICAgICAgICAgLy8gaW1wb3J0YW50IGZvciBHcmlkLnVwZGF0ZSB0byB3b3JrXG4gICAgICAgICAgICB2YXIgcGFpcklkID0gUGFpci5pZChib2R5LCBib2R5QiksXG4gICAgICAgICAgICAgICAgcGFpciA9IGdyaWQucGFpcnNbcGFpcklkXTtcblxuICAgICAgICAgICAgaWYgKHBhaXIpIHtcbiAgICAgICAgICAgICAgICBwYWlyWzJdICs9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdyaWQucGFpcnNbcGFpcklkXSA9IFtib2R5LCBib2R5QiwgMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdG8gYm9kaWVzIChhZnRlciBwYWlycywgb3RoZXJ3aXNlIHBhaXJzIHdpdGggc2VsZilcbiAgICAgICAgYnVja2V0LnB1c2goYm9keSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBib2R5IGZyb20gYSBidWNrZXQuXG4gICAgICogQG1ldGhvZCBfYnVja2V0UmVtb3ZlQm9keVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IGdyaWRcbiAgICAgKiBAcGFyYW0ge30gYnVja2V0XG4gICAgICogQHBhcmFtIHt9IGJvZHlcbiAgICAgKi9cbiAgICBHcmlkLl9idWNrZXRSZW1vdmVCb2R5ID0gZnVuY3Rpb24oZ3JpZCwgYnVja2V0LCBib2R5KSB7XG4gICAgICAgIC8vIHJlbW92ZSBmcm9tIGJ1Y2tldFxuICAgICAgICBidWNrZXQuc3BsaWNlKENvbW1vbi5pbmRleE9mKGJ1Y2tldCwgYm9keSksIDEpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwYWlyIGNvdW50c1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1Y2tldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgbnVtYmVyIG9mIGJ1Y2tldHMgdGhlIHBhaXIgZXhpc3RzIGluXG4gICAgICAgICAgICAvLyBpbXBvcnRhbnQgZm9yIF9jcmVhdGVBY3RpdmVQYWlyc0xpc3QgdG8gd29ya1xuICAgICAgICAgICAgdmFyIGJvZHlCID0gYnVja2V0W2ldLFxuICAgICAgICAgICAgICAgIHBhaXJJZCA9IFBhaXIuaWQoYm9keSwgYm9keUIpLFxuICAgICAgICAgICAgICAgIHBhaXIgPSBncmlkLnBhaXJzW3BhaXJJZF07XG5cbiAgICAgICAgICAgIGlmIChwYWlyKVxuICAgICAgICAgICAgICAgIHBhaXJbMl0gLT0gMTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBsaXN0IG9mIHRoZSBhY3RpdmUgcGFpcnMgaW4gdGhlIGdyaWQuXG4gICAgICogQG1ldGhvZCBfY3JlYXRlQWN0aXZlUGFpcnNMaXN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gZ3JpZFxuICAgICAqIEByZXR1cm4gW10gcGFpcnNcbiAgICAgKi9cbiAgICBHcmlkLl9jcmVhdGVBY3RpdmVQYWlyc0xpc3QgPSBmdW5jdGlvbihncmlkKSB7XG4gICAgICAgIHZhciBwYWlyS2V5cyxcbiAgICAgICAgICAgIHBhaXIsXG4gICAgICAgICAgICBwYWlycyA9IFtdO1xuXG4gICAgICAgIC8vIGdyaWQucGFpcnMgaXMgdXNlZCBhcyBhIGhhc2htYXBcbiAgICAgICAgcGFpcktleXMgPSBDb21tb24ua2V5cyhncmlkLnBhaXJzKTtcblxuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgZ3JpZC5wYWlyc1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBhaXJLZXlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBwYWlyID0gZ3JpZC5wYWlyc1twYWlyS2V5c1trXV07XG5cbiAgICAgICAgICAgIC8vIGlmIHBhaXIgZXhpc3RzIGluIGF0IGxlYXN0IG9uZSBidWNrZXRcbiAgICAgICAgICAgIC8vIGl0IGlzIGEgcGFpciB0aGF0IG5lZWRzIGZ1cnRoZXIgY29sbGlzaW9uIHRlc3Rpbmcgc28gcHVzaCBpdFxuICAgICAgICAgICAgaWYgKHBhaXJbMl0gPiAwKSB7XG4gICAgICAgICAgICAgICAgcGFpcnMucHVzaChwYWlyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGdyaWQucGFpcnNbcGFpcktleXNba11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhaXJzO1xuICAgIH07XG4gICAgXG59KSgpO1xuXG59LHtcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuL0RldGVjdG9yXCI6NSxcIi4vUGFpclwiOjd9XSw3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5QYWlyYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyBjb2xsaXNpb24gcGFpcnMuXG4qXG4qIEBjbGFzcyBQYWlyXG4qL1xuXG52YXIgUGFpciA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhaXI7XG5cbnZhciBDb250YWN0ID0gX2RlcmVxXygnLi9Db250YWN0Jyk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGFpci5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7Y29sbGlzaW9ufSBjb2xsaXNpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXG4gICAgICogQHJldHVybiB7cGFpcn0gQSBuZXcgcGFpclxuICAgICAqL1xuICAgIFBhaXIuY3JlYXRlID0gZnVuY3Rpb24oY29sbGlzaW9uLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGJvZHlBID0gY29sbGlzaW9uLmJvZHlBLFxuICAgICAgICAgICAgYm9keUIgPSBjb2xsaXNpb24uYm9keUIsXG4gICAgICAgICAgICBwYXJlbnRBID0gY29sbGlzaW9uLnBhcmVudEEsXG4gICAgICAgICAgICBwYXJlbnRCID0gY29sbGlzaW9uLnBhcmVudEI7XG5cbiAgICAgICAgdmFyIHBhaXIgPSB7XG4gICAgICAgICAgICBpZDogUGFpci5pZChib2R5QSwgYm9keUIpLFxuICAgICAgICAgICAgYm9keUE6IGJvZHlBLFxuICAgICAgICAgICAgYm9keUI6IGJvZHlCLFxuICAgICAgICAgICAgY29udGFjdHM6IHt9LFxuICAgICAgICAgICAgYWN0aXZlQ29udGFjdHM6IFtdLFxuICAgICAgICAgICAgc2VwYXJhdGlvbjogMCxcbiAgICAgICAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgaXNTZW5zb3I6IGJvZHlBLmlzU2Vuc29yIHx8IGJvZHlCLmlzU2Vuc29yLFxuICAgICAgICAgICAgdGltZUNyZWF0ZWQ6IHRpbWVzdGFtcCxcbiAgICAgICAgICAgIHRpbWVVcGRhdGVkOiB0aW1lc3RhbXAsXG4gICAgICAgICAgICBpbnZlcnNlTWFzczogcGFyZW50QS5pbnZlcnNlTWFzcyArIHBhcmVudEIuaW52ZXJzZU1hc3MsXG4gICAgICAgICAgICBmcmljdGlvbjogTWF0aC5taW4ocGFyZW50QS5mcmljdGlvbiwgcGFyZW50Qi5mcmljdGlvbiksXG4gICAgICAgICAgICBmcmljdGlvblN0YXRpYzogTWF0aC5tYXgocGFyZW50QS5mcmljdGlvblN0YXRpYywgcGFyZW50Qi5mcmljdGlvblN0YXRpYyksXG4gICAgICAgICAgICByZXN0aXR1dGlvbjogTWF0aC5tYXgocGFyZW50QS5yZXN0aXR1dGlvbiwgcGFyZW50Qi5yZXN0aXR1dGlvbiksXG4gICAgICAgICAgICBzbG9wOiBNYXRoLm1heChwYXJlbnRBLnNsb3AsIHBhcmVudEIuc2xvcClcbiAgICAgICAgfTtcblxuICAgICAgICBQYWlyLnVwZGF0ZShwYWlyLCBjb2xsaXNpb24sIHRpbWVzdGFtcCk7XG5cbiAgICAgICAgcmV0dXJuIHBhaXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgYSBwYWlyIGdpdmVuIGEgY29sbGlzaW9uLlxuICAgICAqIEBtZXRob2QgdXBkYXRlXG4gICAgICogQHBhcmFtIHtwYWlyfSBwYWlyXG4gICAgICogQHBhcmFtIHtjb2xsaXNpb259IGNvbGxpc2lvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAgICAgKi9cbiAgICBQYWlyLnVwZGF0ZSA9IGZ1bmN0aW9uKHBhaXIsIGNvbGxpc2lvbiwgdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBjb250YWN0cyA9IHBhaXIuY29udGFjdHMsXG4gICAgICAgICAgICBzdXBwb3J0cyA9IGNvbGxpc2lvbi5zdXBwb3J0cyxcbiAgICAgICAgICAgIGFjdGl2ZUNvbnRhY3RzID0gcGFpci5hY3RpdmVDb250YWN0cyxcbiAgICAgICAgICAgIHBhcmVudEEgPSBjb2xsaXNpb24ucGFyZW50QSxcbiAgICAgICAgICAgIHBhcmVudEIgPSBjb2xsaXNpb24ucGFyZW50QjtcbiAgICAgICAgXG4gICAgICAgIHBhaXIuY29sbGlzaW9uID0gY29sbGlzaW9uO1xuICAgICAgICBwYWlyLmludmVyc2VNYXNzID0gcGFyZW50QS5pbnZlcnNlTWFzcyArIHBhcmVudEIuaW52ZXJzZU1hc3M7XG4gICAgICAgIHBhaXIuZnJpY3Rpb24gPSBNYXRoLm1pbihwYXJlbnRBLmZyaWN0aW9uLCBwYXJlbnRCLmZyaWN0aW9uKTtcbiAgICAgICAgcGFpci5mcmljdGlvblN0YXRpYyA9IE1hdGgubWF4KHBhcmVudEEuZnJpY3Rpb25TdGF0aWMsIHBhcmVudEIuZnJpY3Rpb25TdGF0aWMpO1xuICAgICAgICBwYWlyLnJlc3RpdHV0aW9uID0gTWF0aC5tYXgocGFyZW50QS5yZXN0aXR1dGlvbiwgcGFyZW50Qi5yZXN0aXR1dGlvbik7XG4gICAgICAgIHBhaXIuc2xvcCA9IE1hdGgubWF4KHBhcmVudEEuc2xvcCwgcGFyZW50Qi5zbG9wKTtcbiAgICAgICAgYWN0aXZlQ29udGFjdHMubGVuZ3RoID0gMDtcbiAgICAgICAgXG4gICAgICAgIGlmIChjb2xsaXNpb24uY29sbGlkZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3VwcG9ydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydCA9IHN1cHBvcnRzW2ldLFxuICAgICAgICAgICAgICAgICAgICBjb250YWN0SWQgPSBDb250YWN0LmlkKHN1cHBvcnQpLFxuICAgICAgICAgICAgICAgICAgICBjb250YWN0ID0gY29udGFjdHNbY29udGFjdElkXTtcblxuICAgICAgICAgICAgICAgIGlmIChjb250YWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbnRhY3RzLnB1c2goY29udGFjdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29udGFjdHMucHVzaChjb250YWN0c1tjb250YWN0SWRdID0gQ29udGFjdC5jcmVhdGUoc3VwcG9ydCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFpci5zZXBhcmF0aW9uID0gY29sbGlzaW9uLmRlcHRoO1xuICAgICAgICAgICAgUGFpci5zZXRBY3RpdmUocGFpciwgdHJ1ZSwgdGltZXN0YW1wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwYWlyLmlzQWN0aXZlID09PSB0cnVlKVxuICAgICAgICAgICAgICAgIFBhaXIuc2V0QWN0aXZlKHBhaXIsIGZhbHNlLCB0aW1lc3RhbXApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBTZXQgYSBwYWlyIGFzIGFjdGl2ZSBvciBpbmFjdGl2ZS5cbiAgICAgKiBAbWV0aG9kIHNldEFjdGl2ZVxuICAgICAqIEBwYXJhbSB7cGFpcn0gcGFpclxuICAgICAqIEBwYXJhbSB7Ym9vbH0gaXNBY3RpdmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXG4gICAgICovXG4gICAgUGFpci5zZXRBY3RpdmUgPSBmdW5jdGlvbihwYWlyLCBpc0FjdGl2ZSwgdGltZXN0YW1wKSB7XG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgcGFpci5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBwYWlyLnRpbWVVcGRhdGVkID0gdGltZXN0YW1wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFpci5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcGFpci5hY3RpdmVDb250YWN0cy5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaWQgZm9yIHRoZSBnaXZlbiBwYWlyLlxuICAgICAqIEBtZXRob2QgaWRcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlBXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5QlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gVW5pcXVlIHBhaXJJZFxuICAgICAqL1xuICAgIFBhaXIuaWQgPSBmdW5jdGlvbihib2R5QSwgYm9keUIpIHtcbiAgICAgICAgaWYgKGJvZHlBLmlkIDwgYm9keUIuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiAnQScgKyBib2R5QS5pZCArICdCJyArIGJvZHlCLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdBJyArIGJvZHlCLmlkICsgJ0InICsgYm9keUEuaWQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4vQ29udGFjdFwiOjR9XSw4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5QYWlyc2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgY29sbGlzaW9uIHBhaXIgc2V0cy5cbipcbiogQGNsYXNzIFBhaXJzXG4qL1xuXG52YXIgUGFpcnMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWlycztcblxudmFyIFBhaXIgPSBfZGVyZXFfKCcuL1BhaXInKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgUGFpcnMuX3BhaXJNYXhJZGxlTGlmZSA9IDEwMDA7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHBhaXJzIHN0cnVjdHVyZS5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7cGFpcnN9IEEgbmV3IHBhaXJzIHN0cnVjdHVyZVxuICAgICAqL1xuICAgIFBhaXJzLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIENvbW1vbi5leHRlbmQoeyBcbiAgICAgICAgICAgIHRhYmxlOiB7fSxcbiAgICAgICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICAgICAgY29sbGlzaW9uU3RhcnQ6IFtdLFxuICAgICAgICAgICAgY29sbGlzaW9uQWN0aXZlOiBbXSxcbiAgICAgICAgICAgIGNvbGxpc2lvbkVuZDogW11cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgcGFpcnMgZ2l2ZW4gYSBsaXN0IG9mIGNvbGxpc2lvbnMuXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFpcnNcbiAgICAgKiBAcGFyYW0ge2NvbGxpc2lvbltdfSBjb2xsaXNpb25zXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxuICAgICAqL1xuICAgIFBhaXJzLnVwZGF0ZSA9IGZ1bmN0aW9uKHBhaXJzLCBjb2xsaXNpb25zLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIHBhaXJzTGlzdCA9IHBhaXJzLmxpc3QsXG4gICAgICAgICAgICBwYWlyc1RhYmxlID0gcGFpcnMudGFibGUsXG4gICAgICAgICAgICBjb2xsaXNpb25TdGFydCA9IHBhaXJzLmNvbGxpc2lvblN0YXJ0LFxuICAgICAgICAgICAgY29sbGlzaW9uRW5kID0gcGFpcnMuY29sbGlzaW9uRW5kLFxuICAgICAgICAgICAgY29sbGlzaW9uQWN0aXZlID0gcGFpcnMuY29sbGlzaW9uQWN0aXZlLFxuICAgICAgICAgICAgYWN0aXZlUGFpcklkcyA9IFtdLFxuICAgICAgICAgICAgY29sbGlzaW9uLFxuICAgICAgICAgICAgcGFpcklkLFxuICAgICAgICAgICAgcGFpcixcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgLy8gY2xlYXIgY29sbGlzaW9uIHN0YXRlIGFycmF5cywgYnV0IG1haW50YWluIG9sZCByZWZlcmVuY2VcbiAgICAgICAgY29sbGlzaW9uU3RhcnQubGVuZ3RoID0gMDtcbiAgICAgICAgY29sbGlzaW9uRW5kLmxlbmd0aCA9IDA7XG4gICAgICAgIGNvbGxpc2lvbkFjdGl2ZS5sZW5ndGggPSAwO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb2xsaXNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb2xsaXNpb24gPSBjb2xsaXNpb25zW2ldO1xuXG4gICAgICAgICAgICBpZiAoY29sbGlzaW9uLmNvbGxpZGVkKSB7XG4gICAgICAgICAgICAgICAgcGFpcklkID0gUGFpci5pZChjb2xsaXNpb24uYm9keUEsIGNvbGxpc2lvbi5ib2R5Qik7XG4gICAgICAgICAgICAgICAgYWN0aXZlUGFpcklkcy5wdXNoKHBhaXJJZCk7XG5cbiAgICAgICAgICAgICAgICBwYWlyID0gcGFpcnNUYWJsZVtwYWlySWRdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwYWlyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBhaXIgYWxyZWFkeSBleGlzdHMgKGJ1dCBtYXkgb3IgbWF5IG5vdCBiZSBhY3RpdmUpXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWlyLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwYWlyIGV4aXN0cyBhbmQgaXMgYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25BY3RpdmUucHVzaChwYWlyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhaXIgZXhpc3RzIGJ1dCB3YXMgaW5hY3RpdmUsIHNvIGEgY29sbGlzaW9uIGhhcyBqdXN0IHN0YXJ0ZWQgYWdhaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvblN0YXJ0LnB1c2gocGFpcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBhaXJcbiAgICAgICAgICAgICAgICAgICAgUGFpci51cGRhdGUocGFpciwgY29sbGlzaW9uLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBhaXIgZGlkIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IHBhaXJcbiAgICAgICAgICAgICAgICAgICAgcGFpciA9IFBhaXIuY3JlYXRlKGNvbGxpc2lvbiwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgcGFpcnNUYWJsZVtwYWlySWRdID0gcGFpcjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHRoZSBuZXcgcGFpclxuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25TdGFydC5wdXNoKHBhaXIpO1xuICAgICAgICAgICAgICAgICAgICBwYWlyc0xpc3QucHVzaChwYWlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHByZXZpb3VzbHkgYWN0aXZlIHBhaXJzIHRoYXQgYXJlIG5vdyBpbmFjdGl2ZVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYWlyID0gcGFpcnNMaXN0W2ldO1xuICAgICAgICAgICAgaWYgKHBhaXIuaXNBY3RpdmUgJiYgQ29tbW9uLmluZGV4T2YoYWN0aXZlUGFpcklkcywgcGFpci5pZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgUGFpci5zZXRBY3RpdmUocGFpciwgZmFsc2UsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRW5kLnB1c2gocGFpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEZpbmRzIGFuZCByZW1vdmVzIHBhaXJzIHRoYXQgaGF2ZSBiZWVuIGluYWN0aXZlIGZvciBhIHNldCBhbW91bnQgb2YgdGltZS5cbiAgICAgKiBAbWV0aG9kIHJlbW92ZU9sZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYWlyc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAgICAgKi9cbiAgICBQYWlycy5yZW1vdmVPbGQgPSBmdW5jdGlvbihwYWlycywgdGltZXN0YW1wKSB7XG4gICAgICAgIHZhciBwYWlyc0xpc3QgPSBwYWlycy5saXN0LFxuICAgICAgICAgICAgcGFpcnNUYWJsZSA9IHBhaXJzLnRhYmxlLFxuICAgICAgICAgICAgaW5kZXhlc1RvUmVtb3ZlID0gW10sXG4gICAgICAgICAgICBwYWlyLFxuICAgICAgICAgICAgY29sbGlzaW9uLFxuICAgICAgICAgICAgcGFpckluZGV4LFxuICAgICAgICAgICAgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYWlyID0gcGFpcnNMaXN0W2ldO1xuICAgICAgICAgICAgY29sbGlzaW9uID0gcGFpci5jb2xsaXNpb247XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIG5ldmVyIHJlbW92ZSBzbGVlcGluZyBwYWlyc1xuICAgICAgICAgICAgaWYgKGNvbGxpc2lvbi5ib2R5QS5pc1NsZWVwaW5nIHx8IGNvbGxpc2lvbi5ib2R5Qi5pc1NsZWVwaW5nKSB7XG4gICAgICAgICAgICAgICAgcGFpci50aW1lVXBkYXRlZCA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgcGFpciBpcyBpbmFjdGl2ZSBmb3IgdG9vIGxvbmcsIG1hcmsgaXQgdG8gYmUgcmVtb3ZlZFxuICAgICAgICAgICAgaWYgKHRpbWVzdGFtcCAtIHBhaXIudGltZVVwZGF0ZWQgPiBQYWlycy5fcGFpck1heElkbGVMaWZlKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhlc1RvUmVtb3ZlLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgbWFya2VkIHBhaXJzXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbmRleGVzVG9SZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhaXJJbmRleCA9IGluZGV4ZXNUb1JlbW92ZVtpXSAtIGk7XG4gICAgICAgICAgICBwYWlyID0gcGFpcnNMaXN0W3BhaXJJbmRleF07XG4gICAgICAgICAgICBkZWxldGUgcGFpcnNUYWJsZVtwYWlyLmlkXTtcbiAgICAgICAgICAgIHBhaXJzTGlzdC5zcGxpY2UocGFpckluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGdpdmVuIHBhaXJzIHN0cnVjdHVyZS5cbiAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICogQHBhcmFtIHtwYWlyc30gcGFpcnNcbiAgICAgKiBAcmV0dXJuIHtwYWlyc30gcGFpcnNcbiAgICAgKi9cbiAgICBQYWlycy5jbGVhciA9IGZ1bmN0aW9uKHBhaXJzKSB7XG4gICAgICAgIHBhaXJzLnRhYmxlID0ge307XG4gICAgICAgIHBhaXJzLmxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgcGFpcnMuY29sbGlzaW9uU3RhcnQubGVuZ3RoID0gMDtcbiAgICAgICAgcGFpcnMuY29sbGlzaW9uQWN0aXZlLmxlbmd0aCA9IDA7XG4gICAgICAgIHBhaXJzLmNvbGxpc2lvbkVuZC5sZW5ndGggPSAwO1xuICAgICAgICByZXR1cm4gcGFpcnM7XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuLi9jb3JlL0NvbW1vblwiOjE0LFwiLi9QYWlyXCI6N31dLDk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlF1ZXJ5YCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgcGVyZm9ybWluZyBjb2xsaXNpb24gcXVlcmllcy5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIFF1ZXJ5XG4qL1xuXG52YXIgUXVlcnkgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWVyeTtcblxudmFyIFZlY3RvciA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlY3RvcicpO1xudmFyIFNBVCA9IF9kZXJlcV8oJy4vU0FUJyk7XG52YXIgQm91bmRzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQm91bmRzJyk7XG52YXIgQm9kaWVzID0gX2RlcmVxXygnLi4vZmFjdG9yeS9Cb2RpZXMnKTtcbnZhciBWZXJ0aWNlcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlcnRpY2VzJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbGxpc2lvbnMgYmV0d2VlbiBgYm9keWAgYW5kIGBib2RpZXNgLlxuICAgICAqIEBtZXRob2QgY29sbGlkZXNcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHJldHVybiB7b2JqZWN0W119IENvbGxpc2lvbnNcbiAgICAgKi9cbiAgICBRdWVyeS5jb2xsaWRlcyA9IGZ1bmN0aW9uKGJvZHksIGJvZGllcykge1xuICAgICAgICB2YXIgY29sbGlzaW9ucyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keUEgPSBib2RpZXNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChCb3VuZHMub3ZlcmxhcHMoYm9keUEuYm91bmRzLCBib2R5LmJvdW5kcykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gYm9keUEucGFydHMubGVuZ3RoID09PSAxID8gMCA6IDE7IGogPCBib2R5QS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGJvZHlBLnBhcnRzW2pdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChCb3VuZHMub3ZlcmxhcHMocGFydC5ib3VuZHMsIGJvZHkuYm91bmRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbiA9IFNBVC5jb2xsaWRlcyhwYXJ0LCBib2R5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpc2lvbi5jb2xsaWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaChjb2xsaXNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvbnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhc3RzIGEgcmF5IHNlZ21lbnQgYWdhaW5zdCBhIHNldCBvZiBib2RpZXMgYW5kIHJldHVybnMgYWxsIGNvbGxpc2lvbnMsIHJheSB3aWR0aCBpcyBvcHRpb25hbC4gSW50ZXJzZWN0aW9uIHBvaW50cyBhcmUgbm90IHByb3ZpZGVkLlxuICAgICAqIEBtZXRob2QgcmF5XG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBzdGFydFBvaW50XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IGVuZFBvaW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtyYXlXaWR0aF1cbiAgICAgKiBAcmV0dXJuIHtvYmplY3RbXX0gQ29sbGlzaW9uc1xuICAgICAqL1xuICAgIFF1ZXJ5LnJheSA9IGZ1bmN0aW9uKGJvZGllcywgc3RhcnRQb2ludCwgZW5kUG9pbnQsIHJheVdpZHRoKSB7XG4gICAgICAgIHJheVdpZHRoID0gcmF5V2lkdGggfHwgMWUtMTAwO1xuXG4gICAgICAgIHZhciByYXlBbmdsZSA9IFZlY3Rvci5hbmdsZShzdGFydFBvaW50LCBlbmRQb2ludCksXG4gICAgICAgICAgICByYXlMZW5ndGggPSBWZWN0b3IubWFnbml0dWRlKFZlY3Rvci5zdWIoc3RhcnRQb2ludCwgZW5kUG9pbnQpKSxcbiAgICAgICAgICAgIHJheVggPSAoZW5kUG9pbnQueCArIHN0YXJ0UG9pbnQueCkgKiAwLjUsXG4gICAgICAgICAgICByYXlZID0gKGVuZFBvaW50LnkgKyBzdGFydFBvaW50LnkpICogMC41LFxuICAgICAgICAgICAgcmF5ID0gQm9kaWVzLnJlY3RhbmdsZShyYXlYLCByYXlZLCByYXlMZW5ndGgsIHJheVdpZHRoLCB7IGFuZ2xlOiByYXlBbmdsZSB9KSxcbiAgICAgICAgICAgIGNvbGxpc2lvbnMgPSBRdWVyeS5jb2xsaWRlcyhyYXksIGJvZGllcyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsaXNpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgY29sbGlzaW9uID0gY29sbGlzaW9uc1tpXTtcbiAgICAgICAgICAgIGNvbGxpc2lvbi5ib2R5ID0gY29sbGlzaW9uLmJvZHlCID0gY29sbGlzaW9uLmJvZHlBOyAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvbnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGJvZGllcyB3aG9zZSBib3VuZHMgYXJlIGluc2lkZSAob3Igb3V0c2lkZSBpZiBzZXQpIHRoZSBnaXZlbiBzZXQgb2YgYm91bmRzLCBmcm9tIHRoZSBnaXZlbiBzZXQgb2YgYm9kaWVzLlxuICAgICAqIEBtZXRob2QgcmVnaW9uXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7Ym91bmRzfSBib3VuZHNcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IFtvdXRzaWRlPWZhbHNlXVxuICAgICAqIEByZXR1cm4ge2JvZHlbXX0gVGhlIGJvZGllcyBtYXRjaGluZyB0aGUgcXVlcnlcbiAgICAgKi9cbiAgICBRdWVyeS5yZWdpb24gPSBmdW5jdGlvbihib2RpZXMsIGJvdW5kcywgb3V0c2lkZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldLFxuICAgICAgICAgICAgICAgIG92ZXJsYXBzID0gQm91bmRzLm92ZXJsYXBzKGJvZHkuYm91bmRzLCBib3VuZHMpO1xuICAgICAgICAgICAgaWYgKChvdmVybGFwcyAmJiAhb3V0c2lkZSkgfHwgKCFvdmVybGFwcyAmJiBvdXRzaWRlKSlcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGJvZGllcyB3aG9zZSB2ZXJ0aWNlcyBjb250YWluIHRoZSBnaXZlbiBwb2ludCwgZnJvbSB0aGUgZ2l2ZW4gc2V0IG9mIGJvZGllcy5cbiAgICAgKiBAbWV0aG9kIHBvaW50XG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBwb2ludFxuICAgICAqIEByZXR1cm4ge2JvZHlbXX0gVGhlIGJvZGllcyBtYXRjaGluZyB0aGUgcXVlcnlcbiAgICAgKi9cbiAgICBRdWVyeS5wb2ludCA9IGZ1bmN0aW9uKGJvZGllcywgcG9pbnQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKEJvdW5kcy5jb250YWlucyhib2R5LmJvdW5kcywgcG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IGJvZHkucGFydHMubGVuZ3RoID09PSAxID8gMCA6IDE7IGogPCBib2R5LnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gYm9keS5wYXJ0c1tqXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoQm91bmRzLmNvbnRhaW5zKHBhcnQuYm91bmRzLCBwb2ludClcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIFZlcnRpY2VzLmNvbnRhaW5zKHBhcnQudmVydGljZXMsIHBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuLi9mYWN0b3J5L0JvZGllc1wiOjIzLFwiLi4vZ2VvbWV0cnkvQm91bmRzXCI6MjYsXCIuLi9nZW9tZXRyeS9WZWN0b3JcIjoyOCxcIi4uL2dlb21ldHJ5L1ZlcnRpY2VzXCI6MjksXCIuL1NBVFwiOjExfV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlJlc29sdmVyYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgcmVzb2x2aW5nIGNvbGxpc2lvbiBwYWlycy5cbipcbiogQGNsYXNzIFJlc29sdmVyXG4qL1xuXG52YXIgUmVzb2x2ZXIgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvbHZlcjtcblxudmFyIFZlcnRpY2VzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVydGljZXMnKTtcbnZhciBWZWN0b3IgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZWN0b3InKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xudmFyIEJvdW5kcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L0JvdW5kcycpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBSZXNvbHZlci5fcmVzdGluZ1RocmVzaCA9IDQ7XG4gICAgUmVzb2x2ZXIuX3Jlc3RpbmdUaHJlc2hUYW5nZW50ID0gNjtcbiAgICBSZXNvbHZlci5fcG9zaXRpb25EYW1wZW4gPSAwLjk7XG4gICAgUmVzb2x2ZXIuX3Bvc2l0aW9uV2FybWluZyA9IDAuODtcbiAgICBSZXNvbHZlci5fZnJpY3Rpb25Ob3JtYWxNdWx0aXBsaWVyID0gNTtcblxuICAgIC8qKlxuICAgICAqIFByZXBhcmUgcGFpcnMgZm9yIHBvc2l0aW9uIHNvbHZpbmcuXG4gICAgICogQG1ldGhvZCBwcmVTb2x2ZVBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtwYWlyW119IHBhaXJzXG4gICAgICovXG4gICAgUmVzb2x2ZXIucHJlU29sdmVQb3NpdGlvbiA9IGZ1bmN0aW9uKHBhaXJzKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgcGFpcixcbiAgICAgICAgICAgIGFjdGl2ZUNvdW50O1xuXG4gICAgICAgIC8vIGZpbmQgdG90YWwgY29udGFjdHMgb24gZWFjaCBib2R5XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFpciA9IHBhaXJzW2ldO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXBhaXIuaXNBY3RpdmUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFjdGl2ZUNvdW50ID0gcGFpci5hY3RpdmVDb250YWN0cy5sZW5ndGg7XG4gICAgICAgICAgICBwYWlyLmNvbGxpc2lvbi5wYXJlbnRBLnRvdGFsQ29udGFjdHMgKz0gYWN0aXZlQ291bnQ7XG4gICAgICAgICAgICBwYWlyLmNvbGxpc2lvbi5wYXJlbnRCLnRvdGFsQ29udGFjdHMgKz0gYWN0aXZlQ291bnQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmluZCBhIHNvbHV0aW9uIGZvciBwYWlyIHBvc2l0aW9ucy5cbiAgICAgKiBAbWV0aG9kIHNvbHZlUG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge3BhaXJbXX0gcGFpcnNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVNjYWxlXG4gICAgICovXG4gICAgUmVzb2x2ZXIuc29sdmVQb3NpdGlvbiA9IGZ1bmN0aW9uKHBhaXJzLCB0aW1lU2NhbGUpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBwYWlyLFxuICAgICAgICAgICAgY29sbGlzaW9uLFxuICAgICAgICAgICAgYm9keUEsXG4gICAgICAgICAgICBib2R5QixcbiAgICAgICAgICAgIG5vcm1hbCxcbiAgICAgICAgICAgIGJvZHlCdG9BLFxuICAgICAgICAgICAgY29udGFjdFNoYXJlLFxuICAgICAgICAgICAgcG9zaXRpb25JbXB1bHNlLFxuICAgICAgICAgICAgY29udGFjdENvdW50ID0ge30sXG4gICAgICAgICAgICB0ZW1wQSA9IFZlY3Rvci5fdGVtcFswXSxcbiAgICAgICAgICAgIHRlbXBCID0gVmVjdG9yLl90ZW1wWzFdLFxuICAgICAgICAgICAgdGVtcEMgPSBWZWN0b3IuX3RlbXBbMl0sXG4gICAgICAgICAgICB0ZW1wRCA9IFZlY3Rvci5fdGVtcFszXTtcblxuICAgICAgICAvLyBmaW5kIGltcHVsc2VzIHJlcXVpcmVkIHRvIHJlc29sdmUgcGVuZXRyYXRpb25cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcGFpci5pc0FjdGl2ZSB8fCBwYWlyLmlzU2Vuc29yKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbjtcbiAgICAgICAgICAgIGJvZHlBID0gY29sbGlzaW9uLnBhcmVudEE7XG4gICAgICAgICAgICBib2R5QiA9IGNvbGxpc2lvbi5wYXJlbnRCO1xuICAgICAgICAgICAgbm9ybWFsID0gY29sbGlzaW9uLm5vcm1hbDtcblxuICAgICAgICAgICAgLy8gZ2V0IGN1cnJlbnQgc2VwYXJhdGlvbiBiZXR3ZWVuIGJvZHkgZWRnZXMgaW52b2x2ZWQgaW4gY29sbGlzaW9uXG4gICAgICAgICAgICBib2R5QnRvQSA9IFZlY3Rvci5zdWIoVmVjdG9yLmFkZChib2R5Qi5wb3NpdGlvbkltcHVsc2UsIGJvZHlCLnBvc2l0aW9uLCB0ZW1wQSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmVjdG9yLmFkZChib2R5QS5wb3NpdGlvbkltcHVsc2UsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZlY3Rvci5zdWIoYm9keUIucG9zaXRpb24sIGNvbGxpc2lvbi5wZW5ldHJhdGlvbiwgdGVtcEIpLCB0ZW1wQyksIHRlbXBEKTtcblxuICAgICAgICAgICAgcGFpci5zZXBhcmF0aW9uID0gVmVjdG9yLmRvdChub3JtYWwsIGJvZHlCdG9BKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYWlyID0gcGFpcnNbaV07XG5cbiAgICAgICAgICAgIGlmICghcGFpci5pc0FjdGl2ZSB8fCBwYWlyLmlzU2Vuc29yKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb2xsaXNpb24gPSBwYWlyLmNvbGxpc2lvbjtcbiAgICAgICAgICAgIGJvZHlBID0gY29sbGlzaW9uLnBhcmVudEE7XG4gICAgICAgICAgICBib2R5QiA9IGNvbGxpc2lvbi5wYXJlbnRCO1xuICAgICAgICAgICAgbm9ybWFsID0gY29sbGlzaW9uLm5vcm1hbDtcbiAgICAgICAgICAgIHBvc2l0aW9uSW1wdWxzZSA9IChwYWlyLnNlcGFyYXRpb24gLSBwYWlyLnNsb3ApICogdGltZVNjYWxlO1xuXG4gICAgICAgICAgICBpZiAoYm9keUEuaXNTdGF0aWMgfHwgYm9keUIuaXNTdGF0aWMpXG4gICAgICAgICAgICAgICAgcG9zaXRpb25JbXB1bHNlICo9IDI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghKGJvZHlBLmlzU3RhdGljIHx8IGJvZHlBLmlzU2xlZXBpbmcpKSB7XG4gICAgICAgICAgICAgICAgY29udGFjdFNoYXJlID0gUmVzb2x2ZXIuX3Bvc2l0aW9uRGFtcGVuIC8gYm9keUEudG90YWxDb250YWN0cztcbiAgICAgICAgICAgICAgICBib2R5QS5wb3NpdGlvbkltcHVsc2UueCArPSBub3JtYWwueCAqIHBvc2l0aW9uSW1wdWxzZSAqIGNvbnRhY3RTaGFyZTtcbiAgICAgICAgICAgICAgICBib2R5QS5wb3NpdGlvbkltcHVsc2UueSArPSBub3JtYWwueSAqIHBvc2l0aW9uSW1wdWxzZSAqIGNvbnRhY3RTaGFyZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEoYm9keUIuaXNTdGF0aWMgfHwgYm9keUIuaXNTbGVlcGluZykpIHtcbiAgICAgICAgICAgICAgICBjb250YWN0U2hhcmUgPSBSZXNvbHZlci5fcG9zaXRpb25EYW1wZW4gLyBib2R5Qi50b3RhbENvbnRhY3RzO1xuICAgICAgICAgICAgICAgIGJvZHlCLnBvc2l0aW9uSW1wdWxzZS54IC09IG5vcm1hbC54ICogcG9zaXRpb25JbXB1bHNlICogY29udGFjdFNoYXJlO1xuICAgICAgICAgICAgICAgIGJvZHlCLnBvc2l0aW9uSW1wdWxzZS55IC09IG5vcm1hbC55ICogcG9zaXRpb25JbXB1bHNlICogY29udGFjdFNoYXJlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGx5IHBvc2l0aW9uIHJlc29sdXRpb24uXG4gICAgICogQG1ldGhvZCBwb3N0U29sdmVQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKi9cbiAgICBSZXNvbHZlci5wb3N0U29sdmVQb3NpdGlvbiA9IGZ1bmN0aW9uKGJvZGllcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV07XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IGNvbnRhY3QgY291bnRcbiAgICAgICAgICAgIGJvZHkudG90YWxDb250YWN0cyA9IDA7XG5cbiAgICAgICAgICAgIGlmIChib2R5LnBvc2l0aW9uSW1wdWxzZS54ICE9PSAwIHx8IGJvZHkucG9zaXRpb25JbXB1bHNlLnkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgYm9keSBnZW9tZXRyeVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGJvZHkucGFydHNbal07XG4gICAgICAgICAgICAgICAgICAgIFZlcnRpY2VzLnRyYW5zbGF0ZShwYXJ0LnZlcnRpY2VzLCBib2R5LnBvc2l0aW9uSW1wdWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIEJvdW5kcy51cGRhdGUocGFydC5ib3VuZHMsIHBhcnQudmVydGljZXMsIGJvZHkudmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0LnBvc2l0aW9uLnggKz0gYm9keS5wb3NpdGlvbkltcHVsc2UueDtcbiAgICAgICAgICAgICAgICAgICAgcGFydC5wb3NpdGlvbi55ICs9IGJvZHkucG9zaXRpb25JbXB1bHNlLnk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbW92ZSB0aGUgYm9keSB3aXRob3V0IGNoYW5naW5nIHZlbG9jaXR5XG4gICAgICAgICAgICAgICAgYm9keS5wb3NpdGlvblByZXYueCArPSBib2R5LnBvc2l0aW9uSW1wdWxzZS54O1xuICAgICAgICAgICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnkgKz0gYm9keS5wb3NpdGlvbkltcHVsc2UueTtcblxuICAgICAgICAgICAgICAgIGlmIChWZWN0b3IuZG90KGJvZHkucG9zaXRpb25JbXB1bHNlLCBib2R5LnZlbG9jaXR5KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXQgY2FjaGVkIGltcHVsc2UgaWYgdGhlIGJvZHkgaGFzIHZlbG9jaXR5IGFsb25nIGl0XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucG9zaXRpb25JbXB1bHNlLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICBib2R5LnBvc2l0aW9uSW1wdWxzZS55ID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyB3YXJtIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBib2R5LnBvc2l0aW9uSW1wdWxzZS54ICo9IFJlc29sdmVyLl9wb3NpdGlvbldhcm1pbmc7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkucG9zaXRpb25JbXB1bHNlLnkgKj0gUmVzb2x2ZXIuX3Bvc2l0aW9uV2FybWluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZSBwYWlycyBmb3IgdmVsb2NpdHkgc29sdmluZy5cbiAgICAgKiBAbWV0aG9kIHByZVNvbHZlVmVsb2NpdHlcbiAgICAgKiBAcGFyYW0ge3BhaXJbXX0gcGFpcnNcbiAgICAgKi9cbiAgICBSZXNvbHZlci5wcmVTb2x2ZVZlbG9jaXR5ID0gZnVuY3Rpb24ocGFpcnMpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgcGFpcixcbiAgICAgICAgICAgIGNvbnRhY3RzLFxuICAgICAgICAgICAgY29sbGlzaW9uLFxuICAgICAgICAgICAgYm9keUEsXG4gICAgICAgICAgICBib2R5QixcbiAgICAgICAgICAgIG5vcm1hbCxcbiAgICAgICAgICAgIHRhbmdlbnQsXG4gICAgICAgICAgICBjb250YWN0LFxuICAgICAgICAgICAgY29udGFjdFZlcnRleCxcbiAgICAgICAgICAgIG5vcm1hbEltcHVsc2UsXG4gICAgICAgICAgICB0YW5nZW50SW1wdWxzZSxcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIGltcHVsc2UgPSBWZWN0b3IuX3RlbXBbMF0sXG4gICAgICAgICAgICB0ZW1wQSA9IFZlY3Rvci5fdGVtcFsxXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFpciA9IHBhaXJzW2ldO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXBhaXIuaXNBY3RpdmUgfHwgcGFpci5pc1NlbnNvcilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29udGFjdHMgPSBwYWlyLmFjdGl2ZUNvbnRhY3RzO1xuICAgICAgICAgICAgY29sbGlzaW9uID0gcGFpci5jb2xsaXNpb247XG4gICAgICAgICAgICBib2R5QSA9IGNvbGxpc2lvbi5wYXJlbnRBO1xuICAgICAgICAgICAgYm9keUIgPSBjb2xsaXNpb24ucGFyZW50QjtcbiAgICAgICAgICAgIG5vcm1hbCA9IGNvbGxpc2lvbi5ub3JtYWw7XG4gICAgICAgICAgICB0YW5nZW50ID0gY29sbGlzaW9uLnRhbmdlbnQ7XG5cbiAgICAgICAgICAgIC8vIHJlc29sdmUgZWFjaCBjb250YWN0XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29udGFjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb250YWN0ID0gY29udGFjdHNbal07XG4gICAgICAgICAgICAgICAgY29udGFjdFZlcnRleCA9IGNvbnRhY3QudmVydGV4O1xuICAgICAgICAgICAgICAgIG5vcm1hbEltcHVsc2UgPSBjb250YWN0Lm5vcm1hbEltcHVsc2U7XG4gICAgICAgICAgICAgICAgdGFuZ2VudEltcHVsc2UgPSBjb250YWN0LnRhbmdlbnRJbXB1bHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbEltcHVsc2UgIT09IDAgfHwgdGFuZ2VudEltcHVsc2UgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdG90YWwgaW1wdWxzZSBmcm9tIGNvbnRhY3RcbiAgICAgICAgICAgICAgICAgICAgaW1wdWxzZS54ID0gKG5vcm1hbC54ICogbm9ybWFsSW1wdWxzZSkgKyAodGFuZ2VudC54ICogdGFuZ2VudEltcHVsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpbXB1bHNlLnkgPSAobm9ybWFsLnkgKiBub3JtYWxJbXB1bHNlKSArICh0YW5nZW50LnkgKiB0YW5nZW50SW1wdWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBhcHBseSBpbXB1bHNlIGZyb20gY29udGFjdFxuICAgICAgICAgICAgICAgICAgICBpZiAoIShib2R5QS5pc1N0YXRpYyB8fCBib2R5QS5pc1NsZWVwaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gVmVjdG9yLnN1Yihjb250YWN0VmVydGV4LCBib2R5QS5wb3NpdGlvbiwgdGVtcEEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keUEucG9zaXRpb25QcmV2LnggKz0gaW1wdWxzZS54ICogYm9keUEuaW52ZXJzZU1hc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5QS5wb3NpdGlvblByZXYueSArPSBpbXB1bHNlLnkgKiBib2R5QS5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlBLmFuZ2xlUHJldiArPSBWZWN0b3IuY3Jvc3Mob2Zmc2V0LCBpbXB1bHNlKSAqIGJvZHlBLmludmVyc2VJbmVydGlhO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYm9keUIuaXNTdGF0aWMgfHwgYm9keUIuaXNTbGVlcGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IFZlY3Rvci5zdWIoY29udGFjdFZlcnRleCwgYm9keUIucG9zaXRpb24sIHRlbXBBKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlCLnBvc2l0aW9uUHJldi54IC09IGltcHVsc2UueCAqIGJvZHlCLmludmVyc2VNYXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keUIucG9zaXRpb25QcmV2LnkgLT0gaW1wdWxzZS55ICogYm9keUIuaW52ZXJzZU1hc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5Qi5hbmdsZVByZXYgLT0gVmVjdG9yLmNyb3NzKG9mZnNldCwgaW1wdWxzZSkgKiBib2R5Qi5pbnZlcnNlSW5lcnRpYTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGEgc29sdXRpb24gZm9yIHBhaXIgdmVsb2NpdGllcy5cbiAgICAgKiBAbWV0aG9kIHNvbHZlVmVsb2NpdHlcbiAgICAgKiBAcGFyYW0ge3BhaXJbXX0gcGFpcnNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVNjYWxlXG4gICAgICovXG4gICAgUmVzb2x2ZXIuc29sdmVWZWxvY2l0eSA9IGZ1bmN0aW9uKHBhaXJzLCB0aW1lU2NhbGUpIHtcbiAgICAgICAgdmFyIHRpbWVTY2FsZVNxdWFyZWQgPSB0aW1lU2NhbGUgKiB0aW1lU2NhbGUsXG4gICAgICAgICAgICBpbXB1bHNlID0gVmVjdG9yLl90ZW1wWzBdLFxuICAgICAgICAgICAgdGVtcEEgPSBWZWN0b3IuX3RlbXBbMV0sXG4gICAgICAgICAgICB0ZW1wQiA9IFZlY3Rvci5fdGVtcFsyXSxcbiAgICAgICAgICAgIHRlbXBDID0gVmVjdG9yLl90ZW1wWzNdLFxuICAgICAgICAgICAgdGVtcEQgPSBWZWN0b3IuX3RlbXBbNF0sXG4gICAgICAgICAgICB0ZW1wRSA9IFZlY3Rvci5fdGVtcFs1XTtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYWlyID0gcGFpcnNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcGFpci5pc0FjdGl2ZSB8fCBwYWlyLmlzU2Vuc29yKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgY29sbGlzaW9uID0gcGFpci5jb2xsaXNpb24sXG4gICAgICAgICAgICAgICAgYm9keUEgPSBjb2xsaXNpb24ucGFyZW50QSxcbiAgICAgICAgICAgICAgICBib2R5QiA9IGNvbGxpc2lvbi5wYXJlbnRCLFxuICAgICAgICAgICAgICAgIG5vcm1hbCA9IGNvbGxpc2lvbi5ub3JtYWwsXG4gICAgICAgICAgICAgICAgdGFuZ2VudCA9IGNvbGxpc2lvbi50YW5nZW50LFxuICAgICAgICAgICAgICAgIGNvbnRhY3RzID0gcGFpci5hY3RpdmVDb250YWN0cyxcbiAgICAgICAgICAgICAgICBjb250YWN0U2hhcmUgPSAxIC8gY29udGFjdHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgYm9keSB2ZWxvY2l0aWVzXG4gICAgICAgICAgICBib2R5QS52ZWxvY2l0eS54ID0gYm9keUEucG9zaXRpb24ueCAtIGJvZHlBLnBvc2l0aW9uUHJldi54O1xuICAgICAgICAgICAgYm9keUEudmVsb2NpdHkueSA9IGJvZHlBLnBvc2l0aW9uLnkgLSBib2R5QS5wb3NpdGlvblByZXYueTtcbiAgICAgICAgICAgIGJvZHlCLnZlbG9jaXR5LnggPSBib2R5Qi5wb3NpdGlvbi54IC0gYm9keUIucG9zaXRpb25QcmV2Lng7XG4gICAgICAgICAgICBib2R5Qi52ZWxvY2l0eS55ID0gYm9keUIucG9zaXRpb24ueSAtIGJvZHlCLnBvc2l0aW9uUHJldi55O1xuICAgICAgICAgICAgYm9keUEuYW5ndWxhclZlbG9jaXR5ID0gYm9keUEuYW5nbGUgLSBib2R5QS5hbmdsZVByZXY7XG4gICAgICAgICAgICBib2R5Qi5hbmd1bGFyVmVsb2NpdHkgPSBib2R5Qi5hbmdsZSAtIGJvZHlCLmFuZ2xlUHJldjtcblxuICAgICAgICAgICAgLy8gcmVzb2x2ZSBlYWNoIGNvbnRhY3RcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29udGFjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGFjdCA9IGNvbnRhY3RzW2pdLFxuICAgICAgICAgICAgICAgICAgICBjb250YWN0VmVydGV4ID0gY29udGFjdC52ZXJ0ZXgsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEEgPSBWZWN0b3Iuc3ViKGNvbnRhY3RWZXJ0ZXgsIGJvZHlBLnBvc2l0aW9uLCB0ZW1wQSksXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEIgPSBWZWN0b3Iuc3ViKGNvbnRhY3RWZXJ0ZXgsIGJvZHlCLnBvc2l0aW9uLCB0ZW1wQiksXG4gICAgICAgICAgICAgICAgICAgIHZlbG9jaXR5UG9pbnRBID0gVmVjdG9yLmFkZChib2R5QS52ZWxvY2l0eSwgVmVjdG9yLm11bHQoVmVjdG9yLnBlcnAob2Zmc2V0QSksIGJvZHlBLmFuZ3VsYXJWZWxvY2l0eSksIHRlbXBDKSxcbiAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHlQb2ludEIgPSBWZWN0b3IuYWRkKGJvZHlCLnZlbG9jaXR5LCBWZWN0b3IubXVsdChWZWN0b3IucGVycChvZmZzZXRCKSwgYm9keUIuYW5ndWxhclZlbG9jaXR5KSwgdGVtcEQpLCBcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVWZWxvY2l0eSA9IFZlY3Rvci5zdWIodmVsb2NpdHlQb2ludEEsIHZlbG9jaXR5UG9pbnRCLCB0ZW1wRSksXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbFZlbG9jaXR5ID0gVmVjdG9yLmRvdChub3JtYWwsIHJlbGF0aXZlVmVsb2NpdHkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRhbmdlbnRWZWxvY2l0eSA9IFZlY3Rvci5kb3QodGFuZ2VudCwgcmVsYXRpdmVWZWxvY2l0eSksXG4gICAgICAgICAgICAgICAgICAgIHRhbmdlbnRTcGVlZCA9IE1hdGguYWJzKHRhbmdlbnRWZWxvY2l0eSksXG4gICAgICAgICAgICAgICAgICAgIHRhbmdlbnRWZWxvY2l0eURpcmVjdGlvbiA9IENvbW1vbi5zaWduKHRhbmdlbnRWZWxvY2l0eSk7XG5cbiAgICAgICAgICAgICAgICAvLyByYXcgaW1wdWxzZXNcbiAgICAgICAgICAgICAgICB2YXIgbm9ybWFsSW1wdWxzZSA9ICgxICsgcGFpci5yZXN0aXR1dGlvbikgKiBub3JtYWxWZWxvY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsRm9yY2UgPSBDb21tb24uY2xhbXAocGFpci5zZXBhcmF0aW9uICsgbm9ybWFsVmVsb2NpdHksIDAsIDEpICogUmVzb2x2ZXIuX2ZyaWN0aW9uTm9ybWFsTXVsdGlwbGllcjtcblxuICAgICAgICAgICAgICAgIC8vIGNvdWxvbWIgZnJpY3Rpb25cbiAgICAgICAgICAgICAgICB2YXIgdGFuZ2VudEltcHVsc2UgPSB0YW5nZW50VmVsb2NpdHksXG4gICAgICAgICAgICAgICAgICAgIG1heEZyaWN0aW9uID0gSW5maW5pdHk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFuZ2VudFNwZWVkID4gcGFpci5mcmljdGlvbiAqIHBhaXIuZnJpY3Rpb25TdGF0aWMgKiBub3JtYWxGb3JjZSAqIHRpbWVTY2FsZVNxdWFyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4RnJpY3Rpb24gPSB0YW5nZW50U3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRhbmdlbnRJbXB1bHNlID0gQ29tbW9uLmNsYW1wKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFpci5mcmljdGlvbiAqIHRhbmdlbnRWZWxvY2l0eURpcmVjdGlvbiAqIHRpbWVTY2FsZVNxdWFyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAtbWF4RnJpY3Rpb24sIG1heEZyaWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbW9kaWZ5IGltcHVsc2VzIGFjY291bnRpbmcgZm9yIG1hc3MsIGluZXJ0aWEgYW5kIG9mZnNldFxuICAgICAgICAgICAgICAgIHZhciBvQWNOID0gVmVjdG9yLmNyb3NzKG9mZnNldEEsIG5vcm1hbCksXG4gICAgICAgICAgICAgICAgICAgIG9CY04gPSBWZWN0b3IuY3Jvc3Mob2Zmc2V0Qiwgbm9ybWFsKSxcbiAgICAgICAgICAgICAgICAgICAgc2hhcmUgPSBjb250YWN0U2hhcmUgLyAoYm9keUEuaW52ZXJzZU1hc3MgKyBib2R5Qi5pbnZlcnNlTWFzcyArIGJvZHlBLmludmVyc2VJbmVydGlhICogb0FjTiAqIG9BY04gICsgYm9keUIuaW52ZXJzZUluZXJ0aWEgKiBvQmNOICogb0JjTik7XG5cbiAgICAgICAgICAgICAgICBub3JtYWxJbXB1bHNlICo9IHNoYXJlO1xuICAgICAgICAgICAgICAgIHRhbmdlbnRJbXB1bHNlICo9IHNoYXJlO1xuXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlIGhpZ2ggdmVsb2NpdHkgYW5kIHJlc3RpbmcgY29sbGlzaW9ucyBzZXBhcmF0ZWx5XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbFZlbG9jaXR5IDwgMCAmJiBub3JtYWxWZWxvY2l0eSAqIG5vcm1hbFZlbG9jaXR5ID4gUmVzb2x2ZXIuX3Jlc3RpbmdUaHJlc2ggKiB0aW1lU2NhbGVTcXVhcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGhpZ2ggbm9ybWFsIHZlbG9jaXR5IHNvIGNsZWFyIGNhY2hlZCBjb250YWN0IG5vcm1hbCBpbXB1bHNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3Qubm9ybWFsSW1wdWxzZSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc29sdmUgcmVzdGluZyBjb2xsaXNpb24gY29uc3RyYWludHMgdXNpbmcgRXJpbiBDYXR0bydzIG1ldGhvZCAoR0RDMDgpXG4gICAgICAgICAgICAgICAgICAgIC8vIGltcHVsc2UgY29uc3RyYWludCB0ZW5kcyB0byAwXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250YWN0Tm9ybWFsSW1wdWxzZSA9IGNvbnRhY3Qubm9ybWFsSW1wdWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFjdC5ub3JtYWxJbXB1bHNlID0gTWF0aC5taW4oY29udGFjdC5ub3JtYWxJbXB1bHNlICsgbm9ybWFsSW1wdWxzZSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbEltcHVsc2UgPSBjb250YWN0Lm5vcm1hbEltcHVsc2UgLSBjb250YWN0Tm9ybWFsSW1wdWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgaGlnaCB2ZWxvY2l0eSBhbmQgcmVzdGluZyBjb2xsaXNpb25zIHNlcGFyYXRlbHlcbiAgICAgICAgICAgICAgICBpZiAodGFuZ2VudFZlbG9jaXR5ICogdGFuZ2VudFZlbG9jaXR5ID4gUmVzb2x2ZXIuX3Jlc3RpbmdUaHJlc2hUYW5nZW50ICogdGltZVNjYWxlU3F1YXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBoaWdoIHRhbmdlbnQgdmVsb2NpdHkgc28gY2xlYXIgY2FjaGVkIGNvbnRhY3QgdGFuZ2VudCBpbXB1bHNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3QudGFuZ2VudEltcHVsc2UgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvbHZlIHJlc3RpbmcgY29sbGlzaW9uIGNvbnN0cmFpbnRzIHVzaW5nIEVyaW4gQ2F0dG8ncyBtZXRob2QgKEdEQzA4KVxuICAgICAgICAgICAgICAgICAgICAvLyB0YW5nZW50IGltcHVsc2UgdGVuZHMgdG8gLXRhbmdlbnRTcGVlZCBvciArdGFuZ2VudFNwZWVkXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250YWN0VGFuZ2VudEltcHVsc2UgPSBjb250YWN0LnRhbmdlbnRJbXB1bHNlO1xuICAgICAgICAgICAgICAgICAgICBjb250YWN0LnRhbmdlbnRJbXB1bHNlID0gQ29tbW9uLmNsYW1wKGNvbnRhY3QudGFuZ2VudEltcHVsc2UgKyB0YW5nZW50SW1wdWxzZSwgLW1heEZyaWN0aW9uLCBtYXhGcmljdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRhbmdlbnRJbXB1bHNlID0gY29udGFjdC50YW5nZW50SW1wdWxzZSAtIGNvbnRhY3RUYW5nZW50SW1wdWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB0b3RhbCBpbXB1bHNlIGZyb20gY29udGFjdFxuICAgICAgICAgICAgICAgIGltcHVsc2UueCA9IChub3JtYWwueCAqIG5vcm1hbEltcHVsc2UpICsgKHRhbmdlbnQueCAqIHRhbmdlbnRJbXB1bHNlKTtcbiAgICAgICAgICAgICAgICBpbXB1bHNlLnkgPSAobm9ybWFsLnkgKiBub3JtYWxJbXB1bHNlKSArICh0YW5nZW50LnkgKiB0YW5nZW50SW1wdWxzZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gYXBwbHkgaW1wdWxzZSBmcm9tIGNvbnRhY3RcbiAgICAgICAgICAgICAgICBpZiAoIShib2R5QS5pc1N0YXRpYyB8fCBib2R5QS5pc1NsZWVwaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBib2R5QS5wb3NpdGlvblByZXYueCArPSBpbXB1bHNlLnggKiBib2R5QS5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgICAgICAgICAgYm9keUEucG9zaXRpb25QcmV2LnkgKz0gaW1wdWxzZS55ICogYm9keUEuaW52ZXJzZU1hc3M7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlBLmFuZ2xlUHJldiArPSBWZWN0b3IuY3Jvc3Mob2Zmc2V0QSwgaW1wdWxzZSkgKiBib2R5QS5pbnZlcnNlSW5lcnRpYTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIShib2R5Qi5pc1N0YXRpYyB8fCBib2R5Qi5pc1NsZWVwaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBib2R5Qi5wb3NpdGlvblByZXYueCAtPSBpbXB1bHNlLnggKiBib2R5Qi5pbnZlcnNlTWFzcztcbiAgICAgICAgICAgICAgICAgICAgYm9keUIucG9zaXRpb25QcmV2LnkgLT0gaW1wdWxzZS55ICogYm9keUIuaW52ZXJzZU1hc3M7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlCLmFuZ2xlUHJldiAtPSBWZWN0b3IuY3Jvc3Mob2Zmc2V0QiwgaW1wdWxzZSkgKiBib2R5Qi5pbnZlcnNlSW5lcnRpYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuLi9nZW9tZXRyeS9Cb3VuZHNcIjoyNixcIi4uL2dlb21ldHJ5L1ZlY3RvclwiOjI4LFwiLi4vZ2VvbWV0cnkvVmVydGljZXNcIjoyOX1dLDExOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5TQVRgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBkZXRlY3RpbmcgY29sbGlzaW9ucyB1c2luZyB0aGUgU2VwYXJhdGluZyBBeGlzIFRoZW9yZW0uXG4qXG4qIEBjbGFzcyBTQVRcbiovXG5cbi8vIFRPRE86IHRydWUgY2lyY2xlcyBhbmQgY3VydmVzXG5cbnZhciBTQVQgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBTQVQ7XG5cbnZhciBWZXJ0aWNlcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlcnRpY2VzJyk7XG52YXIgVmVjdG9yID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVjdG9yJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIERldGVjdCBjb2xsaXNpb24gYmV0d2VlbiB0d28gYm9kaWVzIHVzaW5nIHRoZSBTZXBhcmF0aW5nIEF4aXMgVGhlb3JlbS5cbiAgICAgKiBAbWV0aG9kIGNvbGxpZGVzXG4gICAgICogQHBhcmFtIHtib2R5fSBib2R5QVxuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keUJcbiAgICAgKiBAcGFyYW0ge2NvbGxpc2lvbn0gcHJldmlvdXNDb2xsaXNpb25cbiAgICAgKiBAcmV0dXJuIHtjb2xsaXNpb259IGNvbGxpc2lvblxuICAgICAqL1xuICAgIFNBVC5jb2xsaWRlcyA9IGZ1bmN0aW9uKGJvZHlBLCBib2R5QiwgcHJldmlvdXNDb2xsaXNpb24pIHtcbiAgICAgICAgdmFyIG92ZXJsYXBBQixcbiAgICAgICAgICAgIG92ZXJsYXBCQSwgXG4gICAgICAgICAgICBtaW5PdmVybGFwLFxuICAgICAgICAgICAgY29sbGlzaW9uLFxuICAgICAgICAgICAgY2FuUmV1c2VQcmV2Q29sID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzQ29sbGlzaW9uKSB7XG4gICAgICAgICAgICAvLyBlc3RpbWF0ZSB0b3RhbCBtb3Rpb25cbiAgICAgICAgICAgIHZhciBwYXJlbnRBID0gYm9keUEucGFyZW50LFxuICAgICAgICAgICAgICAgIHBhcmVudEIgPSBib2R5Qi5wYXJlbnQsXG4gICAgICAgICAgICAgICAgbW90aW9uID0gcGFyZW50QS5zcGVlZCAqIHBhcmVudEEuc3BlZWQgKyBwYXJlbnRBLmFuZ3VsYXJTcGVlZCAqIHBhcmVudEEuYW5ndWxhclNwZWVkXG4gICAgICAgICAgICAgICAgICAgICAgICsgcGFyZW50Qi5zcGVlZCAqIHBhcmVudEIuc3BlZWQgKyBwYXJlbnRCLmFuZ3VsYXJTcGVlZCAqIHBhcmVudEIuYW5ndWxhclNwZWVkO1xuXG4gICAgICAgICAgICAvLyB3ZSBtYXkgYmUgYWJsZSB0byAocGFydGlhbGx5KSByZXVzZSBjb2xsaXNpb24gcmVzdWx0IFxuICAgICAgICAgICAgLy8gYnV0IG9ubHkgc2FmZSBpZiBjb2xsaXNpb24gd2FzIHJlc3RpbmdcbiAgICAgICAgICAgIGNhblJldXNlUHJldkNvbCA9IHByZXZpb3VzQ29sbGlzaW9uICYmIHByZXZpb3VzQ29sbGlzaW9uLmNvbGxpZGVkICYmIG1vdGlvbiA8IDAuMjtcblxuICAgICAgICAgICAgLy8gcmV1c2UgY29sbGlzaW9uIG9iamVjdFxuICAgICAgICAgICAgY29sbGlzaW9uID0gcHJldmlvdXNDb2xsaXNpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsaXNpb24gPSB7IGNvbGxpZGVkOiBmYWxzZSwgYm9keUE6IGJvZHlBLCBib2R5QjogYm9keUIgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2aW91c0NvbGxpc2lvbiAmJiBjYW5SZXVzZVByZXZDb2wpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIGNhbiByZXVzZSB0aGUgY29sbGlzaW9uIHJlc3VsdFxuICAgICAgICAgICAgLy8gd2Ugb25seSBuZWVkIHRvIHRlc3QgdGhlIHByZXZpb3VzbHkgZm91bmQgYXhpc1xuICAgICAgICAgICAgdmFyIGF4aXNCb2R5QSA9IGNvbGxpc2lvbi5heGlzQm9keSxcbiAgICAgICAgICAgICAgICBheGlzQm9keUIgPSBheGlzQm9keUEgPT09IGJvZHlBID8gYm9keUIgOiBib2R5QSxcbiAgICAgICAgICAgICAgICBheGVzID0gW2F4aXNCb2R5QS5heGVzW3ByZXZpb3VzQ29sbGlzaW9uLmF4aXNOdW1iZXJdXTtcblxuICAgICAgICAgICAgbWluT3ZlcmxhcCA9IFNBVC5fb3ZlcmxhcEF4ZXMoYXhpc0JvZHlBLnZlcnRpY2VzLCBheGlzQm9keUIudmVydGljZXMsIGF4ZXMpO1xuICAgICAgICAgICAgY29sbGlzaW9uLnJldXNlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChtaW5PdmVybGFwLm92ZXJsYXAgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbGxpc2lvbi5jb2xsaWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBjYW4ndCByZXVzZSBhIHJlc3VsdCwgcGVyZm9ybSBhIGZ1bGwgU0FUIHRlc3RcblxuICAgICAgICAgICAgb3ZlcmxhcEFCID0gU0FULl9vdmVybGFwQXhlcyhib2R5QS52ZXJ0aWNlcywgYm9keUIudmVydGljZXMsIGJvZHlBLmF4ZXMpO1xuXG4gICAgICAgICAgICBpZiAob3ZlcmxhcEFCLm92ZXJsYXAgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbGxpc2lvbi5jb2xsaWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG92ZXJsYXBCQSA9IFNBVC5fb3ZlcmxhcEF4ZXMoYm9keUIudmVydGljZXMsIGJvZHlBLnZlcnRpY2VzLCBib2R5Qi5heGVzKTtcblxuICAgICAgICAgICAgaWYgKG92ZXJsYXBCQS5vdmVybGFwIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb24uY29sbGlkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3ZlcmxhcEFCLm92ZXJsYXAgPCBvdmVybGFwQkEub3ZlcmxhcCkge1xuICAgICAgICAgICAgICAgIG1pbk92ZXJsYXAgPSBvdmVybGFwQUI7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uLmF4aXNCb2R5ID0gYm9keUE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pbk92ZXJsYXAgPSBvdmVybGFwQkE7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9uLmF4aXNCb2R5ID0gYm9keUI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGltcG9ydGFudCBmb3IgcmV1c2UgbGF0ZXJcbiAgICAgICAgICAgIGNvbGxpc2lvbi5heGlzTnVtYmVyID0gbWluT3ZlcmxhcC5heGlzTnVtYmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgY29sbGlzaW9uLmJvZHlBID0gYm9keUEuaWQgPCBib2R5Qi5pZCA/IGJvZHlBIDogYm9keUI7XG4gICAgICAgIGNvbGxpc2lvbi5ib2R5QiA9IGJvZHlBLmlkIDwgYm9keUIuaWQgPyBib2R5QiA6IGJvZHlBO1xuICAgICAgICBjb2xsaXNpb24uY29sbGlkZWQgPSB0cnVlO1xuICAgICAgICBjb2xsaXNpb24uZGVwdGggPSBtaW5PdmVybGFwLm92ZXJsYXA7XG4gICAgICAgIGNvbGxpc2lvbi5wYXJlbnRBID0gY29sbGlzaW9uLmJvZHlBLnBhcmVudDtcbiAgICAgICAgY29sbGlzaW9uLnBhcmVudEIgPSBjb2xsaXNpb24uYm9keUIucGFyZW50O1xuICAgICAgICBcbiAgICAgICAgYm9keUEgPSBjb2xsaXNpb24uYm9keUE7XG4gICAgICAgIGJvZHlCID0gY29sbGlzaW9uLmJvZHlCO1xuXG4gICAgICAgIC8vIGVuc3VyZSBub3JtYWwgaXMgZmFjaW5nIGF3YXkgZnJvbSBib2R5QVxuICAgICAgICBpZiAoVmVjdG9yLmRvdChtaW5PdmVybGFwLmF4aXMsIFZlY3Rvci5zdWIoYm9keUIucG9zaXRpb24sIGJvZHlBLnBvc2l0aW9uKSkgPCAwKSB7XG4gICAgICAgICAgICBjb2xsaXNpb24ubm9ybWFsID0ge1xuICAgICAgICAgICAgICAgIHg6IG1pbk92ZXJsYXAuYXhpcy54LFxuICAgICAgICAgICAgICAgIHk6IG1pbk92ZXJsYXAuYXhpcy55XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sbGlzaW9uLm5vcm1hbCA9IHtcbiAgICAgICAgICAgICAgICB4OiAtbWluT3ZlcmxhcC5heGlzLngsXG4gICAgICAgICAgICAgICAgeTogLW1pbk92ZXJsYXAuYXhpcy55XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29sbGlzaW9uLnRhbmdlbnQgPSBWZWN0b3IucGVycChjb2xsaXNpb24ubm9ybWFsKTtcblxuICAgICAgICBjb2xsaXNpb24ucGVuZXRyYXRpb24gPSBjb2xsaXNpb24ucGVuZXRyYXRpb24gfHwge307XG4gICAgICAgIGNvbGxpc2lvbi5wZW5ldHJhdGlvbi54ID0gY29sbGlzaW9uLm5vcm1hbC54ICogY29sbGlzaW9uLmRlcHRoO1xuICAgICAgICBjb2xsaXNpb24ucGVuZXRyYXRpb24ueSA9IGNvbGxpc2lvbi5ub3JtYWwueSAqIGNvbGxpc2lvbi5kZXB0aDsgXG5cbiAgICAgICAgLy8gZmluZCBzdXBwb3J0IHBvaW50cywgdGhlcmUgaXMgYWx3YXlzIGVpdGhlciBleGFjdGx5IG9uZSBvciB0d29cbiAgICAgICAgdmFyIHZlcnRpY2VzQiA9IFNBVC5fZmluZFN1cHBvcnRzKGJvZHlBLCBib2R5QiwgY29sbGlzaW9uLm5vcm1hbCksXG4gICAgICAgICAgICBzdXBwb3J0cyA9IFtdO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIHN1cHBvcnRzIGZyb20gYm9keUIgdGhhdCBhcmUgaW5zaWRlIGJvZHlBXG4gICAgICAgIGlmIChWZXJ0aWNlcy5jb250YWlucyhib2R5QS52ZXJ0aWNlcywgdmVydGljZXNCWzBdKSlcbiAgICAgICAgICAgIHN1cHBvcnRzLnB1c2godmVydGljZXNCWzBdKTtcblxuICAgICAgICBpZiAoVmVydGljZXMuY29udGFpbnMoYm9keUEudmVydGljZXMsIHZlcnRpY2VzQlsxXSkpXG4gICAgICAgICAgICBzdXBwb3J0cy5wdXNoKHZlcnRpY2VzQlsxXSk7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgc3VwcG9ydHMgZnJvbSBib2R5QSB0aGF0IGFyZSBpbnNpZGUgYm9keUJcbiAgICAgICAgaWYgKHN1cHBvcnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHZhciB2ZXJ0aWNlc0EgPSBTQVQuX2ZpbmRTdXBwb3J0cyhib2R5QiwgYm9keUEsIFZlY3Rvci5uZWcoY29sbGlzaW9uLm5vcm1hbCkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKFZlcnRpY2VzLmNvbnRhaW5zKGJvZHlCLnZlcnRpY2VzLCB2ZXJ0aWNlc0FbMF0pKVxuICAgICAgICAgICAgICAgIHN1cHBvcnRzLnB1c2godmVydGljZXNBWzBdKTtcblxuICAgICAgICAgICAgaWYgKHN1cHBvcnRzLmxlbmd0aCA8IDIgJiYgVmVydGljZXMuY29udGFpbnMoYm9keUIudmVydGljZXMsIHZlcnRpY2VzQVsxXSkpXG4gICAgICAgICAgICAgICAgc3VwcG9ydHMucHVzaCh2ZXJ0aWNlc0FbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWNjb3VudCBmb3IgdGhlIGVkZ2UgY2FzZSBvZiBvdmVybGFwcGluZyBidXQgbm8gdmVydGV4IGNvbnRhaW5tZW50XG4gICAgICAgIGlmIChzdXBwb3J0cy5sZW5ndGggPCAxKVxuICAgICAgICAgICAgc3VwcG9ydHMgPSBbdmVydGljZXNCWzBdXTtcbiAgICAgICAgXG4gICAgICAgIGNvbGxpc2lvbi5zdXBwb3J0cyA9IHN1cHBvcnRzO1xuXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIG92ZXJsYXAgYmV0d2VlbiB0d28gc2V0cyBvZiB2ZXJ0aWNlcy5cbiAgICAgKiBAbWV0aG9kIF9vdmVybGFwQXhlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IHZlcnRpY2VzQVxuICAgICAqIEBwYXJhbSB7fSB2ZXJ0aWNlc0JcbiAgICAgKiBAcGFyYW0ge30gYXhlc1xuICAgICAqIEByZXR1cm4gcmVzdWx0XG4gICAgICovXG4gICAgU0FULl9vdmVybGFwQXhlcyA9IGZ1bmN0aW9uKHZlcnRpY2VzQSwgdmVydGljZXNCLCBheGVzKSB7XG4gICAgICAgIHZhciBwcm9qZWN0aW9uQSA9IFZlY3Rvci5fdGVtcFswXSwgXG4gICAgICAgICAgICBwcm9qZWN0aW9uQiA9IFZlY3Rvci5fdGVtcFsxXSxcbiAgICAgICAgICAgIHJlc3VsdCA9IHsgb3ZlcmxhcDogTnVtYmVyLk1BWF9WQUxVRSB9LFxuICAgICAgICAgICAgb3ZlcmxhcCxcbiAgICAgICAgICAgIGF4aXM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBheGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBheGlzID0gYXhlc1tpXTtcblxuICAgICAgICAgICAgU0FULl9wcm9qZWN0VG9BeGlzKHByb2plY3Rpb25BLCB2ZXJ0aWNlc0EsIGF4aXMpO1xuICAgICAgICAgICAgU0FULl9wcm9qZWN0VG9BeGlzKHByb2plY3Rpb25CLCB2ZXJ0aWNlc0IsIGF4aXMpO1xuXG4gICAgICAgICAgICBvdmVybGFwID0gTWF0aC5taW4ocHJvamVjdGlvbkEubWF4IC0gcHJvamVjdGlvbkIubWluLCBwcm9qZWN0aW9uQi5tYXggLSBwcm9qZWN0aW9uQS5taW4pO1xuXG4gICAgICAgICAgICBpZiAob3ZlcmxhcCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0Lm92ZXJsYXAgPSBvdmVybGFwO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvdmVybGFwIDwgcmVzdWx0Lm92ZXJsYXApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQub3ZlcmxhcCA9IG92ZXJsYXA7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmF4aXMgPSBheGlzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5heGlzTnVtYmVyID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByb2plY3RzIHZlcnRpY2VzIG9uIGFuIGF4aXMgYW5kIHJldHVybnMgYW4gaW50ZXJ2YWwuXG4gICAgICogQG1ldGhvZCBfcHJvamVjdFRvQXhpc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHt9IHByb2plY3Rpb25cbiAgICAgKiBAcGFyYW0ge30gdmVydGljZXNcbiAgICAgKiBAcGFyYW0ge30gYXhpc1xuICAgICAqL1xuICAgIFNBVC5fcHJvamVjdFRvQXhpcyA9IGZ1bmN0aW9uKHByb2plY3Rpb24sIHZlcnRpY2VzLCBheGlzKSB7XG4gICAgICAgIHZhciBtaW4gPSBWZWN0b3IuZG90KHZlcnRpY2VzWzBdLCBheGlzKSxcbiAgICAgICAgICAgIG1heCA9IG1pbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgZG90ID0gVmVjdG9yLmRvdCh2ZXJ0aWNlc1tpXSwgYXhpcyk7XG5cbiAgICAgICAgICAgIGlmIChkb3QgPiBtYXgpIHsgXG4gICAgICAgICAgICAgICAgbWF4ID0gZG90OyBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG90IDwgbWluKSB7IFxuICAgICAgICAgICAgICAgIG1pbiA9IGRvdDsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm9qZWN0aW9uLm1pbiA9IG1pbjtcbiAgICAgICAgcHJvamVjdGlvbi5tYXggPSBtYXg7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBGaW5kcyBzdXBwb3J0aW5nIHZlcnRpY2VzIGdpdmVuIHR3byBib2RpZXMgYWxvbmcgYSBnaXZlbiBkaXJlY3Rpb24gdXNpbmcgaGlsbC1jbGltYmluZy5cbiAgICAgKiBAbWV0aG9kIF9maW5kU3VwcG9ydHNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7fSBib2R5QVxuICAgICAqIEBwYXJhbSB7fSBib2R5QlxuICAgICAqIEBwYXJhbSB7fSBub3JtYWxcbiAgICAgKiBAcmV0dXJuIFt2ZWN0b3JdXG4gICAgICovXG4gICAgU0FULl9maW5kU3VwcG9ydHMgPSBmdW5jdGlvbihib2R5QSwgYm9keUIsIG5vcm1hbCkge1xuICAgICAgICB2YXIgbmVhcmVzdERpc3RhbmNlID0gTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgIHZlcnRleFRvQm9keSA9IFZlY3Rvci5fdGVtcFswXSxcbiAgICAgICAgICAgIHZlcnRpY2VzID0gYm9keUIudmVydGljZXMsXG4gICAgICAgICAgICBib2R5QVBvc2l0aW9uID0gYm9keUEucG9zaXRpb24sXG4gICAgICAgICAgICBkaXN0YW5jZSxcbiAgICAgICAgICAgIHZlcnRleCxcbiAgICAgICAgICAgIHZlcnRleEEsXG4gICAgICAgICAgICB2ZXJ0ZXhCO1xuXG4gICAgICAgIC8vIGZpbmQgY2xvc2VzdCB2ZXJ0ZXggb24gYm9keUJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmVydGV4ID0gdmVydGljZXNbaV07XG4gICAgICAgICAgICB2ZXJ0ZXhUb0JvZHkueCA9IHZlcnRleC54IC0gYm9keUFQb3NpdGlvbi54O1xuICAgICAgICAgICAgdmVydGV4VG9Cb2R5LnkgPSB2ZXJ0ZXgueSAtIGJvZHlBUG9zaXRpb24ueTtcbiAgICAgICAgICAgIGRpc3RhbmNlID0gLVZlY3Rvci5kb3Qobm9ybWFsLCB2ZXJ0ZXhUb0JvZHkpO1xuXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBuZWFyZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBuZWFyZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhBID0gdmVydGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCBuZXh0IGNsb3Nlc3QgdmVydGV4IHVzaW5nIHRoZSB0d28gY29ubmVjdGVkIHRvIGl0XG4gICAgICAgIHZhciBwcmV2SW5kZXggPSB2ZXJ0ZXhBLmluZGV4IC0gMSA+PSAwID8gdmVydGV4QS5pbmRleCAtIDEgOiB2ZXJ0aWNlcy5sZW5ndGggLSAxO1xuICAgICAgICB2ZXJ0ZXggPSB2ZXJ0aWNlc1twcmV2SW5kZXhdO1xuICAgICAgICB2ZXJ0ZXhUb0JvZHkueCA9IHZlcnRleC54IC0gYm9keUFQb3NpdGlvbi54O1xuICAgICAgICB2ZXJ0ZXhUb0JvZHkueSA9IHZlcnRleC55IC0gYm9keUFQb3NpdGlvbi55O1xuICAgICAgICBuZWFyZXN0RGlzdGFuY2UgPSAtVmVjdG9yLmRvdChub3JtYWwsIHZlcnRleFRvQm9keSk7XG4gICAgICAgIHZlcnRleEIgPSB2ZXJ0ZXg7XG5cbiAgICAgICAgdmFyIG5leHRJbmRleCA9ICh2ZXJ0ZXhBLmluZGV4ICsgMSkgJSB2ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgIHZlcnRleCA9IHZlcnRpY2VzW25leHRJbmRleF07XG4gICAgICAgIHZlcnRleFRvQm9keS54ID0gdmVydGV4LnggLSBib2R5QVBvc2l0aW9uLng7XG4gICAgICAgIHZlcnRleFRvQm9keS55ID0gdmVydGV4LnkgLSBib2R5QVBvc2l0aW9uLnk7XG4gICAgICAgIGRpc3RhbmNlID0gLVZlY3Rvci5kb3Qobm9ybWFsLCB2ZXJ0ZXhUb0JvZHkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCBuZWFyZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHZlcnRleEIgPSB2ZXJ0ZXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3ZlcnRleEEsIHZlcnRleEJdO1xuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi4vZ2VvbWV0cnkvVmVjdG9yXCI6MjgsXCIuLi9nZW9tZXRyeS9WZXJ0aWNlc1wiOjI5fV0sMTI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkNvbnN0cmFpbnRgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIGNvbnN0cmFpbnRzLlxuKiBDb25zdHJhaW50cyBhcmUgdXNlZCBmb3Igc3BlY2lmeWluZyB0aGF0IGEgZml4ZWQgZGlzdGFuY2UgbXVzdCBiZSBtYWludGFpbmVkIGJldHdlZW4gdHdvIGJvZGllcyAob3IgYSBib2R5IGFuZCBhIGZpeGVkIHdvcmxkLXNwYWNlIHBvc2l0aW9uKS5cbiogVGhlIHN0aWZmbmVzcyBvZiBjb25zdHJhaW50cyBjYW4gYmUgbW9kaWZpZWQgdG8gY3JlYXRlIHNwcmluZ3Mgb3IgZWxhc3RpYy5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIENvbnN0cmFpbnRcbiovXG5cbnZhciBDb25zdHJhaW50ID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gQ29uc3RyYWludDtcblxudmFyIFZlcnRpY2VzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVydGljZXMnKTtcbnZhciBWZWN0b3IgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZWN0b3InKTtcbnZhciBTbGVlcGluZyA9IF9kZXJlcV8oJy4uL2NvcmUvU2xlZXBpbmcnKTtcbnZhciBCb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcbnZhciBBeGVzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQXhlcycpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIENvbnN0cmFpbnQuX3dhcm1pbmcgPSAwLjQ7XG4gICAgQ29uc3RyYWludC5fdG9ycXVlRGFtcGVuID0gMTtcbiAgICBDb25zdHJhaW50Ll9taW5MZW5ndGggPSAwLjAwMDAwMTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgY29uc3RyYWludC5cbiAgICAgKiBBbGwgcHJvcGVydGllcyBoYXZlIGRlZmF1bHQgdmFsdWVzLCBhbmQgbWFueSBhcmUgcHJlLWNhbGN1bGF0ZWQgYXV0b21hdGljYWxseSBiYXNlZCBvbiBvdGhlciBwcm9wZXJ0aWVzLlxuICAgICAqIFRvIHNpbXVsYXRlIGEgcmV2b2x1dGUgY29uc3RyYWludCAob3IgcGluIGpvaW50KSBzZXQgYGxlbmd0aDogMGAgYW5kIGEgaGlnaCBgc3RpZmZuZXNzYCB2YWx1ZSAoZS5nLiBgMC43YCBvciBhYm92ZSkuXG4gICAgICogSWYgdGhlIGNvbnN0cmFpbnQgaXMgdW5zdGFibGUsIHRyeSBsb3dlcmluZyB0aGUgYHN0aWZmbmVzc2AgdmFsdWUgYW5kIC8gb3IgaW5jcmVhc2luZyBgZW5naW5lLmNvbnN0cmFpbnRJdGVyYXRpb25zYC5cbiAgICAgKiBGb3IgY29tcG91bmQgYm9kaWVzLCBjb25zdHJhaW50cyBtdXN0IGJlIGFwcGxpZWQgdG8gdGhlIHBhcmVudCBib2R5IChub3Qgb25lIG9mIGl0cyBwYXJ0cykuXG4gICAgICogU2VlIHRoZSBwcm9wZXJ0aWVzIHNlY3Rpb24gYmVsb3cgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7Y29uc3RyYWludH0gY29uc3RyYWludFxuICAgICAqL1xuICAgIENvbnN0cmFpbnQuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgY29uc3RyYWludCA9IG9wdGlvbnM7XG5cbiAgICAgICAgLy8gaWYgYm9kaWVzIGRlZmluZWQgYnV0IG5vIHBvaW50cywgdXNlIGJvZHkgY2VudHJlXG4gICAgICAgIGlmIChjb25zdHJhaW50LmJvZHlBICYmICFjb25zdHJhaW50LnBvaW50QSlcbiAgICAgICAgICAgIGNvbnN0cmFpbnQucG9pbnRBID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIGlmIChjb25zdHJhaW50LmJvZHlCICYmICFjb25zdHJhaW50LnBvaW50QilcbiAgICAgICAgICAgIGNvbnN0cmFpbnQucG9pbnRCID0geyB4OiAwLCB5OiAwIH07XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHN0YXRpYyBsZW5ndGggdXNpbmcgaW5pdGlhbCB3b3JsZCBzcGFjZSBwb2ludHNcbiAgICAgICAgdmFyIGluaXRpYWxQb2ludEEgPSBjb25zdHJhaW50LmJvZHlBID8gVmVjdG9yLmFkZChjb25zdHJhaW50LmJvZHlBLnBvc2l0aW9uLCBjb25zdHJhaW50LnBvaW50QSkgOiBjb25zdHJhaW50LnBvaW50QSxcbiAgICAgICAgICAgIGluaXRpYWxQb2ludEIgPSBjb25zdHJhaW50LmJvZHlCID8gVmVjdG9yLmFkZChjb25zdHJhaW50LmJvZHlCLnBvc2l0aW9uLCBjb25zdHJhaW50LnBvaW50QikgOiBjb25zdHJhaW50LnBvaW50QixcbiAgICAgICAgICAgIGxlbmd0aCA9IFZlY3Rvci5tYWduaXR1ZGUoVmVjdG9yLnN1Yihpbml0aWFsUG9pbnRBLCBpbml0aWFsUG9pbnRCKSk7XG4gICAgXG4gICAgICAgIGNvbnN0cmFpbnQubGVuZ3RoID0gdHlwZW9mIGNvbnN0cmFpbnQubGVuZ3RoICE9PSAndW5kZWZpbmVkJyA/IGNvbnN0cmFpbnQubGVuZ3RoIDogbGVuZ3RoO1xuXG4gICAgICAgIC8vIG9wdGlvbiBkZWZhdWx0c1xuICAgICAgICBjb25zdHJhaW50LmlkID0gY29uc3RyYWludC5pZCB8fCBDb21tb24ubmV4dElkKCk7XG4gICAgICAgIGNvbnN0cmFpbnQubGFiZWwgPSBjb25zdHJhaW50LmxhYmVsIHx8ICdDb25zdHJhaW50JztcbiAgICAgICAgY29uc3RyYWludC50eXBlID0gJ2NvbnN0cmFpbnQnO1xuICAgICAgICBjb25zdHJhaW50LnN0aWZmbmVzcyA9IGNvbnN0cmFpbnQuc3RpZmZuZXNzIHx8IChjb25zdHJhaW50Lmxlbmd0aCA+IDAgPyAxIDogMC43KTtcbiAgICAgICAgY29uc3RyYWludC5kYW1waW5nID0gY29uc3RyYWludC5kYW1waW5nIHx8IDA7XG4gICAgICAgIGNvbnN0cmFpbnQuYW5ndWxhclN0aWZmbmVzcyA9IGNvbnN0cmFpbnQuYW5ndWxhclN0aWZmbmVzcyB8fCAwO1xuICAgICAgICBjb25zdHJhaW50LmFuZ2xlQSA9IGNvbnN0cmFpbnQuYm9keUEgPyBjb25zdHJhaW50LmJvZHlBLmFuZ2xlIDogY29uc3RyYWludC5hbmdsZUE7XG4gICAgICAgIGNvbnN0cmFpbnQuYW5nbGVCID0gY29uc3RyYWludC5ib2R5QiA/IGNvbnN0cmFpbnQuYm9keUIuYW5nbGUgOiBjb25zdHJhaW50LmFuZ2xlQjtcbiAgICAgICAgY29uc3RyYWludC5wbHVnaW4gPSB7fTtcblxuICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgdmFyIHJlbmRlciA9IHtcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICBzdHJva2VTdHlsZTogJyNmZmZmZmYnLFxuICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgYW5jaG9yczogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb25zdHJhaW50Lmxlbmd0aCA9PT0gMCAmJiBjb25zdHJhaW50LnN0aWZmbmVzcyA+IDAuMSkge1xuICAgICAgICAgICAgcmVuZGVyLnR5cGUgPSAncGluJztcbiAgICAgICAgICAgIHJlbmRlci5hbmNob3JzID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uc3RyYWludC5zdGlmZm5lc3MgPCAwLjkpIHtcbiAgICAgICAgICAgIHJlbmRlci50eXBlID0gJ3NwcmluZyc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJhaW50LnJlbmRlciA9IENvbW1vbi5leHRlbmQocmVuZGVyLCBjb25zdHJhaW50LnJlbmRlcik7XG5cbiAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByZXBhcmVzIGZvciBzb2x2aW5nIGJ5IGNvbnN0cmFpbnQgd2FybWluZy5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgcHJlU29sdmVBbGxcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICovXG4gICAgQ29uc3RyYWludC5wcmVTb2x2ZUFsbCA9IGZ1bmN0aW9uKGJvZGllcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV0sXG4gICAgICAgICAgICAgICAgaW1wdWxzZSA9IGJvZHkuY29uc3RyYWludEltcHVsc2U7XG5cbiAgICAgICAgICAgIGlmIChib2R5LmlzU3RhdGljIHx8IChpbXB1bHNlLnggPT09IDAgJiYgaW1wdWxzZS55ID09PSAwICYmIGltcHVsc2UuYW5nbGUgPT09IDApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJvZHkucG9zaXRpb24ueCArPSBpbXB1bHNlLng7XG4gICAgICAgICAgICBib2R5LnBvc2l0aW9uLnkgKz0gaW1wdWxzZS55O1xuICAgICAgICAgICAgYm9keS5hbmdsZSArPSBpbXB1bHNlLmFuZ2xlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNvbHZlcyBhbGwgY29uc3RyYWludHMgaW4gYSBsaXN0IG9mIGNvbGxpc2lvbnMuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHNvbHZlQWxsXG4gICAgICogQHBhcmFtIHtjb25zdHJhaW50W119IGNvbnN0cmFpbnRzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVTY2FsZVxuICAgICAqL1xuICAgIENvbnN0cmFpbnQuc29sdmVBbGwgPSBmdW5jdGlvbihjb25zdHJhaW50cywgdGltZVNjYWxlKSB7XG4gICAgICAgIC8vIFNvbHZlIGZpeGVkIGNvbnN0cmFpbnRzIGZpcnN0LlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnN0cmFpbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgY29uc3RyYWludCA9IGNvbnN0cmFpbnRzW2ldLFxuICAgICAgICAgICAgICAgIGZpeGVkQSA9ICFjb25zdHJhaW50LmJvZHlBIHx8IChjb25zdHJhaW50LmJvZHlBICYmIGNvbnN0cmFpbnQuYm9keUEuaXNTdGF0aWMpLFxuICAgICAgICAgICAgICAgIGZpeGVkQiA9ICFjb25zdHJhaW50LmJvZHlCIHx8IChjb25zdHJhaW50LmJvZHlCICYmIGNvbnN0cmFpbnQuYm9keUIuaXNTdGF0aWMpO1xuXG4gICAgICAgICAgICBpZiAoZml4ZWRBIHx8IGZpeGVkQikge1xuICAgICAgICAgICAgICAgIENvbnN0cmFpbnQuc29sdmUoY29uc3RyYWludHNbaV0sIHRpbWVTY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb2x2ZSBmcmVlIGNvbnN0cmFpbnRzIGxhc3QuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb25zdHJhaW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3RyYWludCA9IGNvbnN0cmFpbnRzW2ldO1xuICAgICAgICAgICAgZml4ZWRBID0gIWNvbnN0cmFpbnQuYm9keUEgfHwgKGNvbnN0cmFpbnQuYm9keUEgJiYgY29uc3RyYWludC5ib2R5QS5pc1N0YXRpYyk7XG4gICAgICAgICAgICBmaXhlZEIgPSAhY29uc3RyYWludC5ib2R5QiB8fCAoY29uc3RyYWludC5ib2R5QiAmJiBjb25zdHJhaW50LmJvZHlCLmlzU3RhdGljKTtcblxuICAgICAgICAgICAgaWYgKCFmaXhlZEEgJiYgIWZpeGVkQikge1xuICAgICAgICAgICAgICAgIENvbnN0cmFpbnQuc29sdmUoY29uc3RyYWludHNbaV0sIHRpbWVTY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU29sdmVzIGEgZGlzdGFuY2UgY29uc3RyYWludCB3aXRoIEdhdXNzLVNpZWRlbCBtZXRob2QuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHNvbHZlXG4gICAgICogQHBhcmFtIHtjb25zdHJhaW50fSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVTY2FsZVxuICAgICAqL1xuICAgIENvbnN0cmFpbnQuc29sdmUgPSBmdW5jdGlvbihjb25zdHJhaW50LCB0aW1lU2NhbGUpIHtcbiAgICAgICAgdmFyIGJvZHlBID0gY29uc3RyYWludC5ib2R5QSxcbiAgICAgICAgICAgIGJvZHlCID0gY29uc3RyYWludC5ib2R5QixcbiAgICAgICAgICAgIHBvaW50QSA9IGNvbnN0cmFpbnQucG9pbnRBLFxuICAgICAgICAgICAgcG9pbnRCID0gY29uc3RyYWludC5wb2ludEI7XG5cbiAgICAgICAgaWYgKCFib2R5QSAmJiAhYm9keUIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLy8gdXBkYXRlIHJlZmVyZW5jZSBhbmdsZVxuICAgICAgICBpZiAoYm9keUEgJiYgIWJvZHlBLmlzU3RhdGljKSB7XG4gICAgICAgICAgICBWZWN0b3Iucm90YXRlKHBvaW50QSwgYm9keUEuYW5nbGUgLSBjb25zdHJhaW50LmFuZ2xlQSwgcG9pbnRBKTtcbiAgICAgICAgICAgIGNvbnN0cmFpbnQuYW5nbGVBID0gYm9keUEuYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIHVwZGF0ZSByZWZlcmVuY2UgYW5nbGVcbiAgICAgICAgaWYgKGJvZHlCICYmICFib2R5Qi5pc1N0YXRpYykge1xuICAgICAgICAgICAgVmVjdG9yLnJvdGF0ZShwb2ludEIsIGJvZHlCLmFuZ2xlIC0gY29uc3RyYWludC5hbmdsZUIsIHBvaW50Qik7XG4gICAgICAgICAgICBjb25zdHJhaW50LmFuZ2xlQiA9IGJvZHlCLmFuZ2xlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvaW50QVdvcmxkID0gcG9pbnRBLFxuICAgICAgICAgICAgcG9pbnRCV29ybGQgPSBwb2ludEI7XG5cbiAgICAgICAgaWYgKGJvZHlBKSBwb2ludEFXb3JsZCA9IFZlY3Rvci5hZGQoYm9keUEucG9zaXRpb24sIHBvaW50QSk7XG4gICAgICAgIGlmIChib2R5QikgcG9pbnRCV29ybGQgPSBWZWN0b3IuYWRkKGJvZHlCLnBvc2l0aW9uLCBwb2ludEIpO1xuXG4gICAgICAgIGlmICghcG9pbnRBV29ybGQgfHwgIXBvaW50QldvcmxkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBkZWx0YSA9IFZlY3Rvci5zdWIocG9pbnRBV29ybGQsIHBvaW50QldvcmxkKSxcbiAgICAgICAgICAgIGN1cnJlbnRMZW5ndGggPSBWZWN0b3IubWFnbml0dWRlKGRlbHRhKTtcblxuICAgICAgICAvLyBwcmV2ZW50IHNpbmd1bGFyaXR5XG4gICAgICAgIGlmIChjdXJyZW50TGVuZ3RoIDwgQ29uc3RyYWludC5fbWluTGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50TGVuZ3RoID0gQ29uc3RyYWludC5fbWluTGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc29sdmUgZGlzdGFuY2UgY29uc3RyYWludCB3aXRoIEdhdXNzLVNpZWRlbCBtZXRob2RcbiAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSAoY3VycmVudExlbmd0aCAtIGNvbnN0cmFpbnQubGVuZ3RoKSAvIGN1cnJlbnRMZW5ndGgsXG4gICAgICAgICAgICBzdGlmZm5lc3MgPSBjb25zdHJhaW50LnN0aWZmbmVzcyA8IDEgPyBjb25zdHJhaW50LnN0aWZmbmVzcyAqIHRpbWVTY2FsZSA6IGNvbnN0cmFpbnQuc3RpZmZuZXNzLFxuICAgICAgICAgICAgZm9yY2UgPSBWZWN0b3IubXVsdChkZWx0YSwgZGlmZmVyZW5jZSAqIHN0aWZmbmVzcyksXG4gICAgICAgICAgICBtYXNzVG90YWwgPSAoYm9keUEgPyBib2R5QS5pbnZlcnNlTWFzcyA6IDApICsgKGJvZHlCID8gYm9keUIuaW52ZXJzZU1hc3MgOiAwKSxcbiAgICAgICAgICAgIGluZXJ0aWFUb3RhbCA9IChib2R5QSA/IGJvZHlBLmludmVyc2VJbmVydGlhIDogMCkgKyAoYm9keUIgPyBib2R5Qi5pbnZlcnNlSW5lcnRpYSA6IDApLFxuICAgICAgICAgICAgcmVzaXN0YW5jZVRvdGFsID0gbWFzc1RvdGFsICsgaW5lcnRpYVRvdGFsLFxuICAgICAgICAgICAgdG9ycXVlLFxuICAgICAgICAgICAgc2hhcmUsXG4gICAgICAgICAgICBub3JtYWwsXG4gICAgICAgICAgICBub3JtYWxWZWxvY2l0eSxcbiAgICAgICAgICAgIHJlbGF0aXZlVmVsb2NpdHk7XG5cbiAgICAgICAgaWYgKGNvbnN0cmFpbnQuZGFtcGluZykge1xuICAgICAgICAgICAgdmFyIHplcm8gPSBWZWN0b3IuY3JlYXRlKCk7XG4gICAgICAgICAgICBub3JtYWwgPSBWZWN0b3IuZGl2KGRlbHRhLCBjdXJyZW50TGVuZ3RoKTtcblxuICAgICAgICAgICAgcmVsYXRpdmVWZWxvY2l0eSA9IFZlY3Rvci5zdWIoXG4gICAgICAgICAgICAgICAgYm9keUIgJiYgVmVjdG9yLnN1Yihib2R5Qi5wb3NpdGlvbiwgYm9keUIucG9zaXRpb25QcmV2KSB8fCB6ZXJvLFxuICAgICAgICAgICAgICAgIGJvZHlBICYmIFZlY3Rvci5zdWIoYm9keUEucG9zaXRpb24sIGJvZHlBLnBvc2l0aW9uUHJldikgfHwgemVyb1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbm9ybWFsVmVsb2NpdHkgPSBWZWN0b3IuZG90KG5vcm1hbCwgcmVsYXRpdmVWZWxvY2l0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keUEgJiYgIWJvZHlBLmlzU3RhdGljKSB7XG4gICAgICAgICAgICBzaGFyZSA9IGJvZHlBLmludmVyc2VNYXNzIC8gbWFzc1RvdGFsO1xuXG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGFwcGxpZWQgaW1wdWxzZXMgZm9yIHBvc3Qgc29sdmluZ1xuICAgICAgICAgICAgYm9keUEuY29uc3RyYWludEltcHVsc2UueCAtPSBmb3JjZS54ICogc2hhcmU7XG4gICAgICAgICAgICBib2R5QS5jb25zdHJhaW50SW1wdWxzZS55IC09IGZvcmNlLnkgKiBzaGFyZTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgZm9yY2VzXG4gICAgICAgICAgICBib2R5QS5wb3NpdGlvbi54IC09IGZvcmNlLnggKiBzaGFyZTtcbiAgICAgICAgICAgIGJvZHlBLnBvc2l0aW9uLnkgLT0gZm9yY2UueSAqIHNoYXJlO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBkYW1waW5nXG4gICAgICAgICAgICBpZiAoY29uc3RyYWludC5kYW1waW5nKSB7XG4gICAgICAgICAgICAgICAgYm9keUEucG9zaXRpb25QcmV2LnggLT0gY29uc3RyYWludC5kYW1waW5nICogbm9ybWFsLnggKiBub3JtYWxWZWxvY2l0eSAqIHNoYXJlO1xuICAgICAgICAgICAgICAgIGJvZHlBLnBvc2l0aW9uUHJldi55IC09IGNvbnN0cmFpbnQuZGFtcGluZyAqIG5vcm1hbC55ICogbm9ybWFsVmVsb2NpdHkgKiBzaGFyZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYXBwbHkgdG9ycXVlXG4gICAgICAgICAgICB0b3JxdWUgPSAoVmVjdG9yLmNyb3NzKHBvaW50QSwgZm9yY2UpIC8gcmVzaXN0YW5jZVRvdGFsKSAqIENvbnN0cmFpbnQuX3RvcnF1ZURhbXBlbiAqIGJvZHlBLmludmVyc2VJbmVydGlhICogKDEgLSBjb25zdHJhaW50LmFuZ3VsYXJTdGlmZm5lc3MpO1xuICAgICAgICAgICAgYm9keUEuY29uc3RyYWludEltcHVsc2UuYW5nbGUgLT0gdG9ycXVlO1xuICAgICAgICAgICAgYm9keUEuYW5nbGUgLT0gdG9ycXVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvZHlCICYmICFib2R5Qi5pc1N0YXRpYykge1xuICAgICAgICAgICAgc2hhcmUgPSBib2R5Qi5pbnZlcnNlTWFzcyAvIG1hc3NUb3RhbDtcblxuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBhcHBsaWVkIGltcHVsc2VzIGZvciBwb3N0IHNvbHZpbmdcbiAgICAgICAgICAgIGJvZHlCLmNvbnN0cmFpbnRJbXB1bHNlLnggKz0gZm9yY2UueCAqIHNoYXJlO1xuICAgICAgICAgICAgYm9keUIuY29uc3RyYWludEltcHVsc2UueSArPSBmb3JjZS55ICogc2hhcmU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGFwcGx5IGZvcmNlc1xuICAgICAgICAgICAgYm9keUIucG9zaXRpb24ueCArPSBmb3JjZS54ICogc2hhcmU7XG4gICAgICAgICAgICBib2R5Qi5wb3NpdGlvbi55ICs9IGZvcmNlLnkgKiBzaGFyZTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgZGFtcGluZ1xuICAgICAgICAgICAgaWYgKGNvbnN0cmFpbnQuZGFtcGluZykge1xuICAgICAgICAgICAgICAgIGJvZHlCLnBvc2l0aW9uUHJldi54ICs9IGNvbnN0cmFpbnQuZGFtcGluZyAqIG5vcm1hbC54ICogbm9ybWFsVmVsb2NpdHkgKiBzaGFyZTtcbiAgICAgICAgICAgICAgICBib2R5Qi5wb3NpdGlvblByZXYueSArPSBjb25zdHJhaW50LmRhbXBpbmcgKiBub3JtYWwueSAqIG5vcm1hbFZlbG9jaXR5ICogc2hhcmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHRvcnF1ZVxuICAgICAgICAgICAgdG9ycXVlID0gKFZlY3Rvci5jcm9zcyhwb2ludEIsIGZvcmNlKSAvIHJlc2lzdGFuY2VUb3RhbCkgKiBDb25zdHJhaW50Ll90b3JxdWVEYW1wZW4gKiBib2R5Qi5pbnZlcnNlSW5lcnRpYSAqICgxIC0gY29uc3RyYWludC5hbmd1bGFyU3RpZmZuZXNzKTtcbiAgICAgICAgICAgIGJvZHlCLmNvbnN0cmFpbnRJbXB1bHNlLmFuZ2xlICs9IHRvcnF1ZTtcbiAgICAgICAgICAgIGJvZHlCLmFuZ2xlICs9IHRvcnF1ZTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGJvZHkgdXBkYXRlcyByZXF1aXJlZCBhZnRlciBzb2x2aW5nIGNvbnN0cmFpbnRzLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBwb3N0U29sdmVBbGxcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICovXG4gICAgQ29uc3RyYWludC5wb3N0U29sdmVBbGwgPSBmdW5jdGlvbihib2RpZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldLFxuICAgICAgICAgICAgICAgIGltcHVsc2UgPSBib2R5LmNvbnN0cmFpbnRJbXB1bHNlO1xuXG4gICAgICAgICAgICBpZiAoYm9keS5pc1N0YXRpYyB8fCAoaW1wdWxzZS54ID09PSAwICYmIGltcHVsc2UueSA9PT0gMCAmJiBpbXB1bHNlLmFuZ2xlID09PSAwKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBTbGVlcGluZy5zZXQoYm9keSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZ2VvbWV0cnkgYW5kIHJlc2V0XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJvZHkucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGJvZHkucGFydHNbal07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgVmVydGljZXMudHJhbnNsYXRlKHBhcnQudmVydGljZXMsIGltcHVsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQucG9zaXRpb24ueCArPSBpbXB1bHNlLng7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQucG9zaXRpb24ueSArPSBpbXB1bHNlLnk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGltcHVsc2UuYW5nbGUgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgVmVydGljZXMucm90YXRlKHBhcnQudmVydGljZXMsIGltcHVsc2UuYW5nbGUsIGJvZHkucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBBeGVzLnJvdGF0ZShwYXJ0LmF4ZXMsIGltcHVsc2UuYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlY3Rvci5yb3RhdGVBYm91dChwYXJ0LnBvc2l0aW9uLCBpbXB1bHNlLmFuZ2xlLCBib2R5LnBvc2l0aW9uLCBwYXJ0LnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIEJvdW5kcy51cGRhdGUocGFydC5ib3VuZHMsIHBhcnQudmVydGljZXMsIGJvZHkudmVsb2NpdHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkYW1wZW4gdGhlIGNhY2hlZCBpbXB1bHNlIGZvciB3YXJtaW5nIG5leHQgc3RlcFxuICAgICAgICAgICAgaW1wdWxzZS5hbmdsZSAqPSBDb25zdHJhaW50Ll93YXJtaW5nO1xuICAgICAgICAgICAgaW1wdWxzZS54ICo9IENvbnN0cmFpbnQuX3dhcm1pbmc7XG4gICAgICAgICAgICBpbXB1bHNlLnkgKj0gQ29uc3RyYWludC5fd2FybWluZztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKlxuICAgICpcbiAgICAqICBQcm9wZXJ0aWVzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGludGVnZXIgYE51bWJlcmAgdW5pcXVlbHkgaWRlbnRpZnlpbmcgbnVtYmVyIGdlbmVyYXRlZCBpbiBgQ29tcG9zaXRlLmNyZWF0ZWAgYnkgYENvbW1vbi5uZXh0SWRgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBTdHJpbmdgIGRlbm90aW5nIHRoZSB0eXBlIG9mIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAgICogQHR5cGUgc3RyaW5nXG4gICAgICogQGRlZmF1bHQgXCJjb25zdHJhaW50XCJcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGFyYml0cmFyeSBgU3RyaW5nYCBuYW1lIHRvIGhlbHAgdGhlIHVzZXIgaWRlbnRpZnkgYW5kIG1hbmFnZSBib2RpZXMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbGFiZWxcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBcIkNvbnN0cmFpbnRcIlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYE9iamVjdGAgdGhhdCBkZWZpbmVzIHRoZSByZW5kZXJpbmcgcHJvcGVydGllcyB0byBiZSBjb25zdW1lZCBieSB0aGUgbW9kdWxlIGBNYXR0ZXIuUmVuZGVyYC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXJcbiAgICAgKiBAdHlwZSBvYmplY3RcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0aGF0IGluZGljYXRlcyBpZiB0aGUgY29uc3RyYWludCBzaG91bGQgYmUgcmVuZGVyZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLnZpc2libGVcbiAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IGRlZmluZXMgdGhlIGxpbmUgd2lkdGggdG8gdXNlIHdoZW4gcmVuZGVyaW5nIHRoZSBjb25zdHJhaW50IG91dGxpbmUuXG4gICAgICogQSB2YWx1ZSBvZiBgMGAgbWVhbnMgbm8gb3V0bGluZSB3aWxsIGJlIHJlbmRlcmVkLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlbmRlci5saW5lV2lkdGhcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBTdHJpbmdgIHRoYXQgZGVmaW5lcyB0aGUgc3Ryb2tlIHN0eWxlIHRvIHVzZSB3aGVuIHJlbmRlcmluZyB0aGUgY29uc3RyYWludCBvdXRsaW5lLlxuICAgICAqIEl0IGlzIHRoZSBzYW1lIGFzIHdoZW4gdXNpbmcgYSBjYW52YXMsIHNvIGl0IGFjY2VwdHMgQ1NTIHN0eWxlIHByb3BlcnR5IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIuc3Ryb2tlU3R5bGVcbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBhIHJhbmRvbSBjb2xvdXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYFN0cmluZ2AgdGhhdCBkZWZpbmVzIHRoZSBjb25zdHJhaW50IHJlbmRlcmluZyB0eXBlLiBcbiAgICAgKiBUaGUgcG9zc2libGUgdmFsdWVzIGFyZSAnbGluZScsICdwaW4nLCAnc3ByaW5nJy5cbiAgICAgKiBBbiBhcHByb3ByaWF0ZSByZW5kZXIgdHlwZSB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgY2hvc2VuIHVubGVzcyBvbmUgaXMgZ2l2ZW4gaW4gb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXIudHlwZVxuICAgICAqIEB0eXBlIHN0cmluZ1xuICAgICAqIEBkZWZhdWx0ICdsaW5lJ1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgQm9vbGVhbmAgdGhhdCBkZWZpbmVzIGlmIHRoZSBjb25zdHJhaW50J3MgYW5jaG9yIHBvaW50cyBzaG91bGQgYmUgcmVuZGVyZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyLmFuY2hvcnNcbiAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZpcnN0IHBvc3NpYmxlIGBCb2R5YCB0aGF0IHRoaXMgY29uc3RyYWludCBpcyBhdHRhY2hlZCB0by5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBib2R5QVxuICAgICAqIEB0eXBlIGJvZHlcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2Vjb25kIHBvc3NpYmxlIGBCb2R5YCB0aGF0IHRoaXMgY29uc3RyYWludCBpcyBhdHRhY2hlZCB0by5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBib2R5QlxuICAgICAqIEB0eXBlIGJvZHlcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBWZWN0b3JgIHRoYXQgc3BlY2lmaWVzIHRoZSBvZmZzZXQgb2YgdGhlIGNvbnN0cmFpbnQgZnJvbSBjZW50ZXIgb2YgdGhlIGBjb25zdHJhaW50LmJvZHlBYCBpZiBkZWZpbmVkLCBvdGhlcndpc2UgYSB3b3JsZC1zcGFjZSBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwb2ludEFcbiAgICAgKiBAdHlwZSB2ZWN0b3JcbiAgICAgKiBAZGVmYXVsdCB7IHg6IDAsIHk6IDAgfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgVmVjdG9yYCB0aGF0IHNwZWNpZmllcyB0aGUgb2Zmc2V0IG9mIHRoZSBjb25zdHJhaW50IGZyb20gY2VudGVyIG9mIHRoZSBgY29uc3RyYWludC5ib2R5QWAgaWYgZGVmaW5lZCwgb3RoZXJ3aXNlIGEgd29ybGQtc3BhY2UgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcG9pbnRCXG4gICAgICogQHR5cGUgdmVjdG9yXG4gICAgICogQGRlZmF1bHQgeyB4OiAwLCB5OiAwIH1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgdGhlIHN0aWZmbmVzcyBvZiB0aGUgY29uc3RyYWludCwgaS5lLiB0aGUgcmF0ZSBhdCB3aGljaCBpdCByZXR1cm5zIHRvIGl0cyByZXN0aW5nIGBjb25zdHJhaW50Lmxlbmd0aGAuXG4gICAgICogQSB2YWx1ZSBvZiBgMWAgbWVhbnMgdGhlIGNvbnN0cmFpbnQgc2hvdWxkIGJlIHZlcnkgc3RpZmYuXG4gICAgICogQSB2YWx1ZSBvZiBgMC4yYCBtZWFucyB0aGUgY29uc3RyYWludCBhY3RzIGxpa2UgYSBzb2Z0IHNwcmluZy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBzdGlmZm5lc3NcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgc3BlY2lmaWVzIHRoZSBkYW1waW5nIG9mIHRoZSBjb25zdHJhaW50LCBcbiAgICAgKiBpLmUuIHRoZSBhbW91bnQgb2YgcmVzaXN0YW5jZSBhcHBsaWVkIHRvIGVhY2ggYm9keSBiYXNlZCBvbiB0aGVpciB2ZWxvY2l0aWVzIHRvIGxpbWl0IHRoZSBhbW91bnQgb2Ygb3NjaWxsYXRpb24uXG4gICAgICogRGFtcGluZyB3aWxsIG9ubHkgYmUgYXBwYXJlbnQgd2hlbiB0aGUgY29uc3RyYWludCBhbHNvIGhhcyBhIHZlcnkgbG93IGBzdGlmZm5lc3NgLlxuICAgICAqIEEgdmFsdWUgb2YgYDAuMWAgbWVhbnMgdGhlIGNvbnN0cmFpbnQgd2lsbCBhcHBseSBoZWF2eSBkYW1waW5nLCByZXN1bHRpbmcgaW4gbGl0dGxlIHRvIG5vIG9zY2lsbGF0aW9uLlxuICAgICAqIEEgdmFsdWUgb2YgYDBgIG1lYW5zIHRoZSBjb25zdHJhaW50IHdpbGwgYXBwbHkgbm8gZGFtcGluZy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBkYW1waW5nXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IHNwZWNpZmllcyB0aGUgdGFyZ2V0IHJlc3RpbmcgbGVuZ3RoIG9mIHRoZSBjb25zdHJhaW50LiBcbiAgICAgKiBJdCBpcyBjYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHkgaW4gYENvbnN0cmFpbnQuY3JlYXRlYCBmcm9tIGluaXRpYWwgcG9zaXRpb25zIG9mIHRoZSBgY29uc3RyYWludC5ib2R5QWAgYW5kIGBjb25zdHJhaW50LmJvZHlCYC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBsZW5ndGhcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIG9iamVjdCByZXNlcnZlZCBmb3Igc3RvcmluZyBwbHVnaW4tc3BlY2lmaWMgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBwbHVnaW5cbiAgICAgKiBAdHlwZSB7fVxuICAgICAqL1xuXG59KSgpO1xuXG59LHtcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuLi9jb3JlL1NsZWVwaW5nXCI6MjIsXCIuLi9nZW9tZXRyeS9BeGVzXCI6MjUsXCIuLi9nZW9tZXRyeS9Cb3VuZHNcIjoyNixcIi4uL2dlb21ldHJ5L1ZlY3RvclwiOjI4LFwiLi4vZ2VvbWV0cnkvVmVydGljZXNcIjoyOX1dLDEzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5Nb3VzZUNvbnN0cmFpbnRgIG1vZHVsZSBjb250YWlucyBtZXRob2RzIGZvciBjcmVhdGluZyBtb3VzZSBjb25zdHJhaW50cy5cbiogTW91c2UgY29uc3RyYWludHMgYXJlIHVzZWQgZm9yIGFsbG93aW5nIHVzZXIgaW50ZXJhY3Rpb24sIHByb3ZpZGluZyB0aGUgYWJpbGl0eSB0byBtb3ZlIGJvZGllcyB2aWEgdGhlIG1vdXNlIG9yIHRvdWNoLlxuKlxuKiBTZWUgdGhlIGluY2x1ZGVkIHVzYWdlIFtleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL2xpYWJydS9tYXR0ZXItanMvdHJlZS9tYXN0ZXIvZXhhbXBsZXMpLlxuKlxuKiBAY2xhc3MgTW91c2VDb25zdHJhaW50XG4qL1xuXG52YXIgTW91c2VDb25zdHJhaW50ID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gTW91c2VDb25zdHJhaW50O1xuXG52YXIgVmVydGljZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZXJ0aWNlcycpO1xudmFyIFNsZWVwaW5nID0gX2RlcmVxXygnLi4vY29yZS9TbGVlcGluZycpO1xudmFyIE1vdXNlID0gX2RlcmVxXygnLi4vY29yZS9Nb3VzZScpO1xudmFyIEV2ZW50cyA9IF9kZXJlcV8oJy4uL2NvcmUvRXZlbnRzJyk7XG52YXIgRGV0ZWN0b3IgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vRGV0ZWN0b3InKTtcbnZhciBDb25zdHJhaW50ID0gX2RlcmVxXygnLi9Db25zdHJhaW50Jyk7XG52YXIgQ29tcG9zaXRlID0gX2RlcmVxXygnLi4vYm9keS9Db21wb3NpdGUnKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xudmFyIEJvdW5kcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L0JvdW5kcycpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IG1vdXNlIGNvbnN0cmFpbnQuXG4gICAgICogQWxsIHByb3BlcnRpZXMgaGF2ZSBkZWZhdWx0IHZhbHVlcywgYW5kIG1hbnkgYXJlIHByZS1jYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gb3RoZXIgcHJvcGVydGllcy5cbiAgICAgKiBTZWUgdGhlIHByb3BlcnRpZXMgc2VjdGlvbiBiZWxvdyBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb24gb24gd2hhdCB5b3UgY2FuIHBhc3MgdmlhIHRoZSBgb3B0aW9uc2Agb2JqZWN0LlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqIEBwYXJhbSB7fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7TW91c2VDb25zdHJhaW50fSBBIG5ldyBNb3VzZUNvbnN0cmFpbnRcbiAgICAgKi9cbiAgICBNb3VzZUNvbnN0cmFpbnQuY3JlYXRlID0gZnVuY3Rpb24oZW5naW5lLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBtb3VzZSA9IChlbmdpbmUgPyBlbmdpbmUubW91c2UgOiBudWxsKSB8fCAob3B0aW9ucyA/IG9wdGlvbnMubW91c2UgOiBudWxsKTtcblxuICAgICAgICBpZiAoIW1vdXNlKSB7XG4gICAgICAgICAgICBpZiAoZW5naW5lICYmIGVuZ2luZS5yZW5kZXIgJiYgZW5naW5lLnJlbmRlci5jYW52YXMpIHtcbiAgICAgICAgICAgICAgICBtb3VzZSA9IE1vdXNlLmNyZWF0ZShlbmdpbmUucmVuZGVyLmNhbnZhcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbW91c2UgPSBNb3VzZS5jcmVhdGUob3B0aW9ucy5lbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW91c2UgPSBNb3VzZS5jcmVhdGUoKTtcbiAgICAgICAgICAgICAgICBDb21tb24ud2FybignTW91c2VDb25zdHJhaW50LmNyZWF0ZTogb3B0aW9ucy5tb3VzZSB3YXMgdW5kZWZpbmVkLCBvcHRpb25zLmVsZW1lbnQgd2FzIHVuZGVmaW5lZCwgbWF5IG5vdCBmdW5jdGlvbiBhcyBleHBlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbnN0cmFpbnQgPSBDb25zdHJhaW50LmNyZWF0ZSh7IFxuICAgICAgICAgICAgbGFiZWw6ICdNb3VzZSBDb25zdHJhaW50JyxcbiAgICAgICAgICAgIHBvaW50QTogbW91c2UucG9zaXRpb24sXG4gICAgICAgICAgICBwb2ludEI6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgbGVuZ3RoOiAwLjAxLCBcbiAgICAgICAgICAgIHN0aWZmbmVzczogMC4xLFxuICAgICAgICAgICAgYW5ndWxhclN0aWZmbmVzczogMSxcbiAgICAgICAgICAgIHJlbmRlcjoge1xuICAgICAgICAgICAgICAgIHN0cm9rZVN0eWxlOiAnIzkwRUU5MCcsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdtb3VzZUNvbnN0cmFpbnQnLFxuICAgICAgICAgICAgbW91c2U6IG1vdXNlLFxuICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcbiAgICAgICAgICAgIGJvZHk6IG51bGwsXG4gICAgICAgICAgICBjb25zdHJhaW50OiBjb25zdHJhaW50LFxuICAgICAgICAgICAgY29sbGlzaW9uRmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IDB4MDAwMSxcbiAgICAgICAgICAgICAgICBtYXNrOiAweEZGRkZGRkZGLFxuICAgICAgICAgICAgICAgIGdyb3VwOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vdXNlQ29uc3RyYWludCA9IENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIEV2ZW50cy5vbihlbmdpbmUsICdiZWZvcmVVcGRhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhbGxCb2RpZXMgPSBDb21wb3NpdGUuYWxsQm9kaWVzKGVuZ2luZS53b3JsZCk7XG4gICAgICAgICAgICBNb3VzZUNvbnN0cmFpbnQudXBkYXRlKG1vdXNlQ29uc3RyYWludCwgYWxsQm9kaWVzKTtcbiAgICAgICAgICAgIE1vdXNlQ29uc3RyYWludC5fdHJpZ2dlckV2ZW50cyhtb3VzZUNvbnN0cmFpbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbW91c2VDb25zdHJhaW50O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBnaXZlbiBtb3VzZSBjb25zdHJhaW50LlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge01vdXNlQ29uc3RyYWludH0gbW91c2VDb25zdHJhaW50XG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqL1xuICAgIE1vdXNlQ29uc3RyYWludC51cGRhdGUgPSBmdW5jdGlvbihtb3VzZUNvbnN0cmFpbnQsIGJvZGllcykge1xuICAgICAgICB2YXIgbW91c2UgPSBtb3VzZUNvbnN0cmFpbnQubW91c2UsXG4gICAgICAgICAgICBjb25zdHJhaW50ID0gbW91c2VDb25zdHJhaW50LmNvbnN0cmFpbnQsXG4gICAgICAgICAgICBib2R5ID0gbW91c2VDb25zdHJhaW50LmJvZHk7XG5cbiAgICAgICAgaWYgKG1vdXNlLmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKCFjb25zdHJhaW50LmJvZHlCKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IGJvZGllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEJvdW5kcy5jb250YWlucyhib2R5LmJvdW5kcywgbW91c2UucG9zaXRpb24pIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIERldGVjdG9yLmNhbkNvbGxpZGUoYm9keS5jb2xsaXNpb25GaWx0ZXIsIG1vdXNlQ29uc3RyYWludC5jb2xsaXNpb25GaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gYm9keS5wYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGogPCBib2R5LnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBib2R5LnBhcnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWZXJ0aWNlcy5jb250YWlucyhwYXJ0LnZlcnRpY2VzLCBtb3VzZS5wb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludC5wb2ludEEgPSBtb3VzZS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludC5ib2R5QiA9IG1vdXNlQ29uc3RyYWludC5ib2R5ID0gYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludC5wb2ludEIgPSB7IHg6IG1vdXNlLnBvc2l0aW9uLnggLSBib2R5LnBvc2l0aW9uLngsIHk6IG1vdXNlLnBvc2l0aW9uLnkgLSBib2R5LnBvc2l0aW9uLnkgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludC5hbmdsZUIgPSBib2R5LmFuZ2xlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNsZWVwaW5nLnNldChib2R5LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKG1vdXNlQ29uc3RyYWludCwgJ3N0YXJ0ZHJhZycsIHsgbW91c2U6IG1vdXNlLCBib2R5OiBib2R5IH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgU2xlZXBpbmcuc2V0KGNvbnN0cmFpbnQuYm9keUIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb25zdHJhaW50LnBvaW50QSA9IG1vdXNlLnBvc2l0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3RyYWludC5ib2R5QiA9IG1vdXNlQ29uc3RyYWludC5ib2R5ID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0cmFpbnQucG9pbnRCID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKGJvZHkpXG4gICAgICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIobW91c2VDb25zdHJhaW50LCAnZW5kZHJhZycsIHsgbW91c2U6IG1vdXNlLCBib2R5OiBib2R5IH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIG1vdXNlIGNvbnN0cmFpbnQgZXZlbnRzLlxuICAgICAqIEBtZXRob2QgX3RyaWdnZXJFdmVudHNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7bW91c2V9IG1vdXNlQ29uc3RyYWludFxuICAgICAqL1xuICAgIE1vdXNlQ29uc3RyYWludC5fdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKG1vdXNlQ29uc3RyYWludCkge1xuICAgICAgICB2YXIgbW91c2UgPSBtb3VzZUNvbnN0cmFpbnQubW91c2UsXG4gICAgICAgICAgICBtb3VzZUV2ZW50cyA9IG1vdXNlLnNvdXJjZUV2ZW50cztcblxuICAgICAgICBpZiAobW91c2VFdmVudHMubW91c2Vtb3ZlKVxuICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIobW91c2VDb25zdHJhaW50LCAnbW91c2Vtb3ZlJywgeyBtb3VzZTogbW91c2UgfSk7XG5cbiAgICAgICAgaWYgKG1vdXNlRXZlbnRzLm1vdXNlZG93bilcbiAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKG1vdXNlQ29uc3RyYWludCwgJ21vdXNlZG93bicsIHsgbW91c2U6IG1vdXNlIH0pO1xuXG4gICAgICAgIGlmIChtb3VzZUV2ZW50cy5tb3VzZXVwKVxuICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIobW91c2VDb25zdHJhaW50LCAnbW91c2V1cCcsIHsgbW91c2U6IG1vdXNlIH0pO1xuXG4gICAgICAgIC8vIHJlc2V0IHRoZSBtb3VzZSBzdGF0ZSByZWFkeSBmb3IgdGhlIG5leHQgc3RlcFxuICAgICAgICBNb3VzZS5jbGVhclNvdXJjZUV2ZW50cyhtb3VzZSk7XG4gICAgfTtcblxuICAgIC8qXG4gICAgKlxuICAgICogIEV2ZW50cyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIHdoZW4gdGhlIG1vdXNlIGhhcyBtb3ZlZCAob3IgYSB0b3VjaCBtb3ZlcykgZHVyaW5nIHRoZSBsYXN0IHN0ZXBcbiAgICAqXG4gICAgKiBAZXZlbnQgbW91c2Vtb3ZlXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge21vdXNlfSBldmVudC5tb3VzZSBUaGUgZW5naW5lJ3MgbW91c2UgaW5zdGFuY2VcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCB3aGVuIHRoZSBtb3VzZSBpcyBkb3duIChvciBhIHRvdWNoIGhhcyBzdGFydGVkKSBkdXJpbmcgdGhlIGxhc3Qgc3RlcFxuICAgICpcbiAgICAqIEBldmVudCBtb3VzZWRvd25cbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7bW91c2V9IGV2ZW50Lm1vdXNlIFRoZSBlbmdpbmUncyBtb3VzZSBpbnN0YW5jZVxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIHdoZW4gdGhlIG1vdXNlIGlzIHVwIChvciBhIHRvdWNoIGhhcyBlbmRlZCkgZHVyaW5nIHRoZSBsYXN0IHN0ZXBcbiAgICAqXG4gICAgKiBAZXZlbnQgbW91c2V1cFxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHttb3VzZX0gZXZlbnQubW91c2UgVGhlIGVuZ2luZSdzIG1vdXNlIGluc3RhbmNlXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgYSBib2R5XG4gICAgKlxuICAgICogQGV2ZW50IHN0YXJ0ZHJhZ1xuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHttb3VzZX0gZXZlbnQubW91c2UgVGhlIGVuZ2luZSdzIG1vdXNlIGluc3RhbmNlXG4gICAgKiBAcGFyYW0ge2JvZHl9IGV2ZW50LmJvZHkgVGhlIGJvZHkgYmVpbmcgZHJhZ2dlZFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIHdoZW4gdGhlIHVzZXIgZW5kcyBkcmFnZ2luZyBhIGJvZHlcbiAgICAqXG4gICAgKiBAZXZlbnQgZW5kZHJhZ1xuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHttb3VzZX0gZXZlbnQubW91c2UgVGhlIGVuZ2luZSdzIG1vdXNlIGluc3RhbmNlXG4gICAgKiBAcGFyYW0ge2JvZHl9IGV2ZW50LmJvZHkgVGhlIGJvZHkgdGhhdCBoYXMgc3RvcHBlZCBiZWluZyBkcmFnZ2VkXG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qXG4gICAgKlxuICAgICogIFByb3BlcnRpZXMgRG9jdW1lbnRhdGlvblxuICAgICpcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgU3RyaW5nYCBkZW5vdGluZyB0aGUgdHlwZSBvZiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdHlwZVxuICAgICAqIEB0eXBlIHN0cmluZ1xuICAgICAqIEBkZWZhdWx0IFwiY29uc3RyYWludFwiXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgYE1vdXNlYCBpbnN0YW5jZSBpbiB1c2UuIElmIG5vdCBzdXBwbGllZCBpbiBgTW91c2VDb25zdHJhaW50LmNyZWF0ZWAsIG9uZSB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbW91c2VcbiAgICAgKiBAdHlwZSBtb3VzZVxuICAgICAqIEBkZWZhdWx0IG1vdXNlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgYEJvZHlgIHRoYXQgaXMgY3VycmVudGx5IGJlaW5nIG1vdmVkIGJ5IHRoZSB1c2VyLCBvciBgbnVsbGAgaWYgbm8gYm9keS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBib2R5XG4gICAgICogQHR5cGUgYm9keVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSBgQ29uc3RyYWludGAgb2JqZWN0IHRoYXQgaXMgdXNlZCB0byBtb3ZlIHRoZSBib2R5IGR1cmluZyBpbnRlcmFjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb25zdHJhaW50XG4gICAgICogQHR5cGUgY29uc3RyYWludFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYE9iamVjdGAgdGhhdCBzcGVjaWZpZXMgdGhlIGNvbGxpc2lvbiBmaWx0ZXIgcHJvcGVydGllcy5cbiAgICAgKiBUaGUgY29sbGlzaW9uIGZpbHRlciBhbGxvd3MgdGhlIHVzZXIgdG8gZGVmaW5lIHdoaWNoIHR5cGVzIG9mIGJvZHkgdGhpcyBtb3VzZSBjb25zdHJhaW50IGNhbiBpbnRlcmFjdCB3aXRoLlxuICAgICAqIFNlZSBgYm9keS5jb2xsaXNpb25GaWx0ZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGNvbGxpc2lvbkZpbHRlclxuICAgICAqIEB0eXBlIG9iamVjdFxuICAgICAqL1xuXG59KSgpO1xuXG59LHtcIi4uL2JvZHkvQ29tcG9zaXRlXCI6MixcIi4uL2NvbGxpc2lvbi9EZXRlY3RvclwiOjUsXCIuLi9jb3JlL0NvbW1vblwiOjE0LFwiLi4vY29yZS9FdmVudHNcIjoxNixcIi4uL2NvcmUvTW91c2VcIjoxOSxcIi4uL2NvcmUvU2xlZXBpbmdcIjoyMixcIi4uL2dlb21ldHJ5L0JvdW5kc1wiOjI2LFwiLi4vZ2VvbWV0cnkvVmVydGljZXNcIjoyOSxcIi4vQ29uc3RyYWludFwiOjEyfV0sMTQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkNvbW1vbmAgbW9kdWxlIGNvbnRhaW5zIHV0aWxpdHkgZnVuY3Rpb25zIHRoYXQgYXJlIGNvbW1vbiB0byBhbGwgbW9kdWxlcy5cbipcbiogQGNsYXNzIENvbW1vblxuKi9cblxudmFyIENvbW1vbiA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1vbjtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgQ29tbW9uLl9uZXh0SWQgPSAwO1xuICAgIENvbW1vbi5fc2VlZCA9IDA7XG4gICAgQ29tbW9uLl9ub3dTdGFydFRpbWUgPSArKG5ldyBEYXRlKCkpO1xuXG4gICAgLyoqXG4gICAgICogRXh0ZW5kcyB0aGUgb2JqZWN0IGluIHRoZSBmaXJzdCBhcmd1bWVudCB1c2luZyB0aGUgb2JqZWN0IGluIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgICogQG1ldGhvZCBleHRlbmRcbiAgICAgKiBAcGFyYW0ge30gb2JqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZWVwXG4gICAgICogQHJldHVybiB7fSBvYmogZXh0ZW5kZWRcbiAgICAgKi9cbiAgICBDb21tb24uZXh0ZW5kID0gZnVuY3Rpb24ob2JqLCBkZWVwKSB7XG4gICAgICAgIHZhciBhcmdzU3RhcnQsXG4gICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgZGVlcENsb25lO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGVlcCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBhcmdzU3RhcnQgPSAyO1xuICAgICAgICAgICAgZGVlcENsb25lID0gZGVlcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3NTdGFydCA9IDE7XG4gICAgICAgICAgICBkZWVwQ2xvbmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IGFyZ3NTdGFydDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWVwQ2xvbmUgJiYgc291cmNlW3Byb3BdICYmIHNvdXJjZVtwcm9wXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9ialtwcm9wXSB8fCBvYmpbcHJvcF0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialtwcm9wXSA9IG9ialtwcm9wXSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uZXh0ZW5kKG9ialtwcm9wXSwgZGVlcENsb25lLCBzb3VyY2VbcHJvcF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgY2xvbmUgb2YgdGhlIG9iamVjdCwgaWYgZGVlcCBpcyB0cnVlIHJlZmVyZW5jZXMgd2lsbCBhbHNvIGJlIGNsb25lZC5cbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHBhcmFtIHt9IG9ialxuICAgICAqIEBwYXJhbSB7Ym9vbH0gZGVlcFxuICAgICAqIEByZXR1cm4ge30gb2JqIGNsb25lZFxuICAgICAqL1xuICAgIENvbW1vbi5jbG9uZSA9IGZ1bmN0aW9uKG9iaiwgZGVlcCkge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmV4dGVuZCh7fSwgZGVlcCwgb2JqKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCBvZiBrZXlzIGZvciB0aGUgZ2l2ZW4gb2JqZWN0LlxuICAgICAqIEBtZXRob2Qga2V5c1xuICAgICAqIEBwYXJhbSB7fSBvYmpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmdbXX0ga2V5c1xuICAgICAqL1xuICAgIENvbW1vbi5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cylcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopO1xuXG4gICAgICAgIC8vIGF2b2lkIGhhc093blByb3BlcnR5IGZvciBwZXJmb3JtYW5jZVxuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIHZhbHVlcyBmb3IgdGhlIGdpdmVuIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7fSBvYmpcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gQXJyYXkgb2YgdGhlIG9iamVjdHMgcHJvcGVydHkgdmFsdWVzXG4gICAgICovXG4gICAgQ29tbW9uLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgIFxuICAgICAgICBpZiAoT2JqZWN0LmtleXMpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKG9ialtrZXlzW2ldXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBhdm9pZCBoYXNPd25Qcm9wZXJ0eSBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKG9ialtrZXldKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHZhbHVlIGZyb20gYGJhc2VgIHJlbGF0aXZlIHRvIHRoZSBgcGF0aGAgc3RyaW5nLlxuICAgICAqIEBtZXRob2QgZ2V0XG4gICAgICogQHBhcmFtIHt9IG9iaiBUaGUgYmFzZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCByZWxhdGl2ZSB0byBgYmFzZWAsIGUuZy4gJ0Zvby5CYXIuYmF6J1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbYmVnaW5dIFBhdGggc2xpY2UgYmVnaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2VuZF0gUGF0aCBzbGljZSBlbmRcbiAgICAgKiBAcmV0dXJuIHt9IFRoZSBvYmplY3QgYXQgdGhlIGdpdmVuIHBhdGhcbiAgICAgKi9cbiAgICBDb21tb24uZ2V0ID0gZnVuY3Rpb24ob2JqLCBwYXRoLCBiZWdpbiwgZW5kKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnNwbGl0KCcuJykuc2xpY2UoYmVnaW4sIGVuZCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBvYmogPSBvYmpbcGF0aFtpXV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgdmFsdWUgb24gYGJhc2VgIHJlbGF0aXZlIHRvIHRoZSBnaXZlbiBgcGF0aGAgc3RyaW5nLlxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHBhcmFtIHt9IG9iaiBUaGUgYmFzZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCByZWxhdGl2ZSB0byBgYmFzZWAsIGUuZy4gJ0Zvby5CYXIuYmF6J1xuICAgICAqIEBwYXJhbSB7fSB2YWwgVGhlIHZhbHVlIHRvIHNldFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbYmVnaW5dIFBhdGggc2xpY2UgYmVnaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2VuZF0gUGF0aCBzbGljZSBlbmRcbiAgICAgKiBAcmV0dXJuIHt9IFBhc3MgdGhyb3VnaCBgdmFsYCBmb3IgY2hhaW5pbmdcbiAgICAgKi9cbiAgICBDb21tb24uc2V0ID0gZnVuY3Rpb24ob2JqLCBwYXRoLCB2YWwsIGJlZ2luLCBlbmQpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgnLicpLnNsaWNlKGJlZ2luLCBlbmQpO1xuICAgICAgICBDb21tb24uZ2V0KG9iaiwgcGF0aCwgMCwgLTEpW3BhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXSA9IHZhbDtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2h1ZmZsZXMgdGhlIGdpdmVuIGFycmF5IGluLXBsYWNlLlxuICAgICAqIFRoZSBmdW5jdGlvbiB1c2VzIGEgc2VlZGVkIHJhbmRvbSBnZW5lcmF0b3IuXG4gICAgICogQG1ldGhvZCBzaHVmZmxlXG4gICAgICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gYXJyYXkgc2h1ZmZsZWQgcmFuZG9tbHlcbiAgICAgKi9cbiAgICBDb21tb24uc2h1ZmZsZSA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgaiA9IE1hdGguZmxvb3IoQ29tbW9uLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgICAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xuICAgICAgICAgICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICAgICAgICAgIGFycmF5W2pdID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJhbmRvbWx5IGNob29zZXMgYSB2YWx1ZSBmcm9tIGEgbGlzdCB3aXRoIGVxdWFsIHByb2JhYmlsaXR5LlxuICAgICAqIFRoZSBmdW5jdGlvbiB1c2VzIGEgc2VlZGVkIHJhbmRvbSBnZW5lcmF0b3IuXG4gICAgICogQG1ldGhvZCBjaG9vc2VcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBjaG9pY2VzXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBBIHJhbmRvbSBjaG9pY2Ugb2JqZWN0IGZyb20gdGhlIGFycmF5XG4gICAgICovXG4gICAgQ29tbW9uLmNob29zZSA9IGZ1bmN0aW9uKGNob2ljZXMpIHtcbiAgICAgICAgcmV0dXJuIGNob2ljZXNbTWF0aC5mbG9vcihDb21tb24ucmFuZG9tKCkgKiBjaG9pY2VzLmxlbmd0aCldO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG9iamVjdCBpcyBhIEhUTUxFbGVtZW50LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICogQG1ldGhvZCBpc0VsZW1lbnRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGEgSFRNTEVsZW1lbnQsIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIENvbW1vbi5pc0VsZW1lbnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlICYmIG9iai5ub2RlTmFtZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGFuIGFycmF5LlxuICAgICAqIEBtZXRob2QgaXNBcnJheVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBvYmplY3QgaXMgYW4gYXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIENvbW1vbi5pc0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBvYmplY3QgaXMgYSBmdW5jdGlvbi5cbiAgICAgKiBAbWV0aG9kIGlzRnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGEgZnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIENvbW1vbi5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGEgcGxhaW4gb2JqZWN0LlxuICAgICAqIEBtZXRob2QgaXNQbGFpbk9iamVjdFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBvYmplY3QgaXMgYSBwbGFpbiBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIENvbW1vbi5pc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmouY29uc3RydWN0b3IgPT09IE9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBvYmplY3QgaXMgYSBzdHJpbmcuXG4gICAgICogQG1ldGhvZCBpc1N0cmluZ1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBvYmplY3QgaXMgYSBzdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIENvbW1vbi5pc1N0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGNsYW1wZWQgYmV0d2VlbiBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUuXG4gICAgICogQG1ldGhvZCBjbGFtcFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmFsdWUgY2xhbXBlZCBiZXR3ZWVuIG1pbiBhbmQgbWF4IGluY2x1c2l2ZVxuICAgICAqL1xuICAgIENvbW1vbi5jbGFtcCA9IGZ1bmN0aW9uKHZhbHVlLCBtaW4sIG1heCkge1xuICAgICAgICBpZiAodmFsdWUgPCBtaW4pXG4gICAgICAgICAgICByZXR1cm4gbWluO1xuICAgICAgICBpZiAodmFsdWUgPiBtYXgpXG4gICAgICAgICAgICByZXR1cm4gbWF4O1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzaWduIG9mIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICAgKiBAbWV0aG9kIHNpZ25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0xIGlmIG5lZ2F0aXZlLCArMSBpZiAwIG9yIHBvc2l0aXZlXG4gICAgICovXG4gICAgQ29tbW9uLnNpZ24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPCAwID8gLTEgOiAxO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCB0aW1lc3RhbXAgc2luY2UgdGhlIHRpbWUgb3JpZ2luIChlLmcuIGZyb20gcGFnZSBsb2FkKS5cbiAgICAgKiBUaGUgcmVzdWx0IHdpbGwgYmUgaGlnaC1yZXNvbHV0aW9uIGluY2x1ZGluZyBkZWNpbWFsIHBsYWNlcyBpZiBhdmFpbGFibGUuXG4gICAgICogQG1ldGhvZCBub3dcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBjdXJyZW50IHRpbWVzdGFtcFxuICAgICAqL1xuICAgIENvbW1vbi5ub3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5wZXJmb3JtYW5jZSkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cucGVyZm9ybWFuY2Uud2Via2l0Tm93KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZS53ZWJraXROb3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAobmV3IERhdGUoKSkgLSBDb21tb24uX25vd1N0YXJ0VGltZTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByYW5kb20gdmFsdWUgYmV0d2VlbiBhIG1pbmltdW0gYW5kIGEgbWF4aW11bSB2YWx1ZSBpbmNsdXNpdmUuXG4gICAgICogVGhlIGZ1bmN0aW9uIHVzZXMgYSBzZWVkZWQgcmFuZG9tIGdlbmVyYXRvci5cbiAgICAgKiBAbWV0aG9kIHJhbmRvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICogQHJldHVybiB7bnVtYmVyfSBBIHJhbmRvbSBudW1iZXIgYmV0d2VlbiBtaW4gYW5kIG1heCBpbmNsdXNpdmVcbiAgICAgKi9cbiAgICBDb21tb24ucmFuZG9tID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICAgICAgbWluID0gKHR5cGVvZiBtaW4gIT09IFwidW5kZWZpbmVkXCIpID8gbWluIDogMDtcbiAgICAgICAgbWF4ID0gKHR5cGVvZiBtYXggIT09IFwidW5kZWZpbmVkXCIpID8gbWF4IDogMTtcbiAgICAgICAgcmV0dXJuIG1pbiArIF9zZWVkZWRSYW5kb20oKSAqIChtYXggLSBtaW4pO1xuICAgIH07XG5cbiAgICB2YXIgX3NlZWRlZFJhbmRvbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaW5lYXJfY29uZ3J1ZW50aWFsX2dlbmVyYXRvclxuICAgICAgICBDb21tb24uX3NlZWQgPSAoQ29tbW9uLl9zZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgICAgICAgcmV0dXJuIENvbW1vbi5fc2VlZCAvIDIzMzI4MDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBDU1MgaGV4IGNvbG91ciBzdHJpbmcgaW50byBhbiBpbnRlZ2VyLlxuICAgICAqIEBtZXRob2QgY29sb3JUb051bWJlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclN0cmluZ1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gQW4gaW50ZWdlciByZXByZXNlbnRpbmcgdGhlIENTUyBoZXggc3RyaW5nXG4gICAgICovXG4gICAgQ29tbW9uLmNvbG9yVG9OdW1iZXIgPSBmdW5jdGlvbihjb2xvclN0cmluZykge1xuICAgICAgICBjb2xvclN0cmluZyA9IGNvbG9yU3RyaW5nLnJlcGxhY2UoJyMnLCcnKTtcblxuICAgICAgICBpZiAoY29sb3JTdHJpbmcubGVuZ3RoID09IDMpIHtcbiAgICAgICAgICAgIGNvbG9yU3RyaW5nID0gY29sb3JTdHJpbmcuY2hhckF0KDApICsgY29sb3JTdHJpbmcuY2hhckF0KDApXG4gICAgICAgICAgICAgICAgICAgICAgICArIGNvbG9yU3RyaW5nLmNoYXJBdCgxKSArIGNvbG9yU3RyaW5nLmNoYXJBdCgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgKyBjb2xvclN0cmluZy5jaGFyQXQoMikgKyBjb2xvclN0cmluZy5jaGFyQXQoMik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnNvbGUgbG9nZ2luZyBsZXZlbCB0byB1c2UsIHdoZXJlIGVhY2ggbGV2ZWwgaW5jbHVkZXMgYWxsIGxldmVscyBhYm92ZSBhbmQgZXhjbHVkZXMgdGhlIGxldmVscyBiZWxvdy5cbiAgICAgKiBUaGUgZGVmYXVsdCBsZXZlbCBpcyAnZGVidWcnIHdoaWNoIHNob3dzIGFsbCBjb25zb2xlIG1lc3NhZ2VzLiAgXG4gICAgICpcbiAgICAgKiBQb3NzaWJsZSBsZXZlbCB2YWx1ZXMgYXJlOlxuICAgICAqIC0gMCA9IE5vbmVcbiAgICAgKiAtIDEgPSBEZWJ1Z1xuICAgICAqIC0gMiA9IEluZm9cbiAgICAgKiAtIDMgPSBXYXJuXG4gICAgICogLSA0ID0gRXJyb3JcbiAgICAgKiBAcHJvcGVydHkgQ29tbW9uLmxvZ0xldmVsXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgQ29tbW9uLmxvZ0xldmVsID0gMTtcblxuICAgIC8qKlxuICAgICAqIFNob3dzIGEgYGNvbnNvbGUubG9nYCBtZXNzYWdlIG9ubHkgaWYgdGhlIGN1cnJlbnQgYENvbW1vbi5sb2dMZXZlbGAgYWxsb3dzIGl0LlxuICAgICAqIFRoZSBtZXNzYWdlIHdpbGwgYmUgcHJlZml4ZWQgd2l0aCAnbWF0dGVyLWpzJyB0byBtYWtlIGl0IGVhc2lseSBpZGVudGlmaWFibGUuXG4gICAgICogQG1ldGhvZCBsb2dcbiAgICAgKiBAcGFyYW0gLi4ub2JqcyB7fSBUaGUgb2JqZWN0cyB0byBsb2cuXG4gICAgICovXG4gICAgQ29tbW9uLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY29uc29sZSAmJiBDb21tb24ubG9nTGV2ZWwgPiAwICYmIENvbW1vbi5sb2dMZXZlbCA8PSAzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBbJ21hdHRlci1qczonXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNob3dzIGEgYGNvbnNvbGUuaW5mb2AgbWVzc2FnZSBvbmx5IGlmIHRoZSBjdXJyZW50IGBDb21tb24ubG9nTGV2ZWxgIGFsbG93cyBpdC5cbiAgICAgKiBUaGUgbWVzc2FnZSB3aWxsIGJlIHByZWZpeGVkIHdpdGggJ21hdHRlci1qcycgdG8gbWFrZSBpdCBlYXNpbHkgaWRlbnRpZmlhYmxlLlxuICAgICAqIEBtZXRob2QgaW5mb1xuICAgICAqIEBwYXJhbSAuLi5vYmpzIHt9IFRoZSBvYmplY3RzIHRvIGxvZy5cbiAgICAgKi9cbiAgICBDb21tb24uaW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY29uc29sZSAmJiBDb21tb24ubG9nTGV2ZWwgPiAwICYmIENvbW1vbi5sb2dMZXZlbCA8PSAyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgWydtYXR0ZXItanM6J10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyBhIGBjb25zb2xlLndhcm5gIG1lc3NhZ2Ugb25seSBpZiB0aGUgY3VycmVudCBgQ29tbW9uLmxvZ0xldmVsYCBhbGxvd3MgaXQuXG4gICAgICogVGhlIG1lc3NhZ2Ugd2lsbCBiZSBwcmVmaXhlZCB3aXRoICdtYXR0ZXItanMnIHRvIG1ha2UgaXQgZWFzaWx5IGlkZW50aWZpYWJsZS5cbiAgICAgKiBAbWV0aG9kIHdhcm5cbiAgICAgKiBAcGFyYW0gLi4ub2JqcyB7fSBUaGUgb2JqZWN0cyB0byBsb2cuXG4gICAgICovXG4gICAgQ29tbW9uLndhcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNvbnNvbGUgJiYgQ29tbW9uLmxvZ0xldmVsID4gMCAmJiBDb21tb24ubG9nTGV2ZWwgPD0gMykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIFsnbWF0dGVyLWpzOiddLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmV4dCB1bmlxdWUgc2VxdWVudGlhbCBJRC5cbiAgICAgKiBAbWV0aG9kIG5leHRJZFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVW5pcXVlIHNlcXVlbnRpYWwgSURcbiAgICAgKi9cbiAgICBDb21tb24ubmV4dElkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBDb21tb24uX25leHRJZCsrO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBIGNyb3NzIGJyb3dzZXIgY29tcGF0aWJsZSBpbmRleE9mIGltcGxlbWVudGF0aW9uLlxuICAgICAqIEBtZXRob2QgaW5kZXhPZlxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGhheXN0YWNrXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG5lZWRsZVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gVGhlIHBvc2l0aW9uIG9mIG5lZWRsZSBpbiBoYXlzdGFjaywgb3RoZXJ3aXNlIC0xLlxuICAgICAqL1xuICAgIENvbW1vbi5pbmRleE9mID0gZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgICBpZiAoaGF5c3RhY2suaW5kZXhPZilcbiAgICAgICAgICAgIHJldHVybiBoYXlzdGFjay5pbmRleE9mKG5lZWRsZSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYXlzdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGhheXN0YWNrW2ldID09PSBuZWVkbGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEEgY3Jvc3MgYnJvd3NlciBjb21wYXRpYmxlIGFycmF5IG1hcCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKiBAbWV0aG9kIG1hcFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGxpc3RcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gICAgICogQHJldHVybiB7YXJyYXl9IFZhbHVlcyBmcm9tIGxpc3QgdHJhbnNmb3JtZWQgYnkgZnVuYy5cbiAgICAgKi9cbiAgICBDb21tb24ubWFwID0gZnVuY3Rpb24obGlzdCwgZnVuYykge1xuICAgICAgICBpZiAobGlzdC5tYXApIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm1hcChmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXBwZWQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG1hcHBlZC5wdXNoKGZ1bmMobGlzdFtpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcHBlZDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBkaXJlY3RlZCBncmFwaCBhbmQgcmV0dXJucyB0aGUgcGFydGlhbGx5IG9yZGVyZWQgc2V0IG9mIHZlcnRpY2VzIGluIHRvcG9sb2dpY2FsIG9yZGVyLlxuICAgICAqIENpcmN1bGFyIGRlcGVuZGVuY2llcyBhcmUgYWxsb3dlZC5cbiAgICAgKiBAbWV0aG9kIHRvcG9sb2dpY2FsU29ydFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBncmFwaFxuICAgICAqIEByZXR1cm4ge2FycmF5fSBQYXJ0aWFsbHkgb3JkZXJlZCBzZXQgb2YgdmVydGljZXMgaW4gdG9wb2xvZ2ljYWwgb3JkZXIuXG4gICAgICovXG4gICAgQ29tbW9uLnRvcG9sb2dpY2FsU29ydCA9IGZ1bmN0aW9uKGdyYXBoKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tZ2VjaGV2L2phdmFzY3JpcHQtYWxnb3JpdGhtc1xuICAgICAgICAvLyBDb3B5cmlnaHQgKGMpIE1pbmtvIEdlY2hldiAoTUlUIGxpY2Vuc2UpXG4gICAgICAgIC8vIE1vZGlmaWNhdGlvbnM6IHRpZHkgZm9ybWF0dGluZyBhbmQgbmFtaW5nXG4gICAgICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgICAgICAgIHZpc2l0ZWQgPSBbXSxcbiAgICAgICAgICAgIHRlbXAgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBub2RlIGluIGdyYXBoKSB7XG4gICAgICAgICAgICBpZiAoIXZpc2l0ZWRbbm9kZV0gJiYgIXRlbXBbbm9kZV0pIHtcbiAgICAgICAgICAgICAgICBDb21tb24uX3RvcG9sb2dpY2FsU29ydChub2RlLCB2aXNpdGVkLCB0ZW1wLCBncmFwaCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIENvbW1vbi5fdG9wb2xvZ2ljYWxTb3J0ID0gZnVuY3Rpb24obm9kZSwgdmlzaXRlZCwgdGVtcCwgZ3JhcGgsIHJlc3VsdCkge1xuICAgICAgICB2YXIgbmVpZ2hib3JzID0gZ3JhcGhbbm9kZV0gfHwgW107XG4gICAgICAgIHRlbXBbbm9kZV0gPSB0cnVlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XG5cbiAgICAgICAgICAgIGlmICh0ZW1wW25laWdoYm9yXSkge1xuICAgICAgICAgICAgICAgIC8vIHNraXAgY2lyY3VsYXIgZGVwZW5kZW5jaWVzXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdmlzaXRlZFtuZWlnaGJvcl0pIHtcbiAgICAgICAgICAgICAgICBDb21tb24uX3RvcG9sb2dpY2FsU29ydChuZWlnaGJvciwgdmlzaXRlZCwgdGVtcCwgZ3JhcGgsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0ZW1wW25vZGVdID0gZmFsc2U7XG4gICAgICAgIHZpc2l0ZWRbbm9kZV0gPSB0cnVlO1xuXG4gICAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBfbl8gZnVuY3Rpb25zIGFzIGFyZ3VtZW50cyBhbmQgcmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZW0gaW4gb3JkZXIuXG4gICAgICogVGhlIGFyZ3VtZW50cyBhcHBsaWVkIHdoZW4gY2FsbGluZyB0aGUgbmV3IGZ1bmN0aW9uIHdpbGwgYWxzbyBiZSBhcHBsaWVkIHRvIGV2ZXJ5IGZ1bmN0aW9uIHBhc3NlZC5cbiAgICAgKiBUaGUgdmFsdWUgb2YgYHRoaXNgIHJlZmVycyB0byB0aGUgbGFzdCB2YWx1ZSByZXR1cm5lZCBpbiB0aGUgY2hhaW4gdGhhdCB3YXMgbm90IGB1bmRlZmluZWRgLlxuICAgICAqIFRoZXJlZm9yZSBpZiBhIHBhc3NlZCBmdW5jdGlvbiBkb2VzIG5vdCByZXR1cm4gYSB2YWx1ZSwgdGhlIHByZXZpb3VzbHkgcmV0dXJuZWQgdmFsdWUgaXMgbWFpbnRhaW5lZC5cbiAgICAgKiBBZnRlciBhbGwgcGFzc2VkIGZ1bmN0aW9ucyBoYXZlIGJlZW4gY2FsbGVkIHRoZSBuZXcgZnVuY3Rpb24gcmV0dXJucyB0aGUgbGFzdCByZXR1cm5lZCB2YWx1ZSAoaWYgYW55KS5cbiAgICAgKiBJZiBhbnkgb2YgdGhlIHBhc3NlZCBmdW5jdGlvbnMgYXJlIGEgY2hhaW4sIHRoZW4gdGhlIGNoYWluIHdpbGwgYmUgZmxhdHRlbmVkLlxuICAgICAqIEBtZXRob2QgY2hhaW5cbiAgICAgKiBAcGFyYW0gLi4uZnVuY3Mge2Z1bmN0aW9ufSBUaGUgZnVuY3Rpb25zIHRvIGNoYWluLlxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBwYXNzZWQgZnVuY3Rpb25zIGluIG9yZGVyLlxuICAgICAqL1xuICAgIENvbW1vbi5jaGFpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZnVuY3MgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGZ1bmMgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgICAgIGlmIChmdW5jLl9jaGFpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gZmxhdHRlbiBhbHJlYWR5IGNoYWluZWQgZnVuY3Rpb25zXG4gICAgICAgICAgICAgICAgZnVuY3MucHVzaC5hcHBseShmdW5jcywgZnVuYy5fY2hhaW5lZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZ1bmNzLnB1c2goZnVuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hhaW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvZGV2dG9vbHMtZG9jcy9pc3N1ZXMvNTMjaXNzdWVjb21tZW50LTUxOTQxMzU4XG4gICAgICAgICAgICB2YXIgbGFzdFJlc3VsdCxcbiAgICAgICAgICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZnVuY3NbaV0uYXBwbHkobGFzdFJlc3VsdCwgYXJncyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNoYWluLl9jaGFpbmVkID0gZnVuY3M7XG5cbiAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGFpbnMgYSBmdW5jdGlvbiB0byBleGN1dGUgYmVmb3JlIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBvbiB0aGUgZ2l2ZW4gYHBhdGhgIHJlbGF0aXZlIHRvIGBiYXNlYC5cbiAgICAgKiBTZWUgYWxzbyBkb2NzIGZvciBgQ29tbW9uLmNoYWluYC5cbiAgICAgKiBAbWV0aG9kIGNoYWluUGF0aEJlZm9yZVxuICAgICAqIEBwYXJhbSB7fSBiYXNlIFRoZSBiYXNlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHJlbGF0aXZlIHRvIGBiYXNlYFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoYWluIGJlZm9yZSB0aGUgb3JpZ2luYWxcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIGNoYWluZWQgZnVuY3Rpb24gdGhhdCByZXBsYWNlZCB0aGUgb3JpZ2luYWxcbiAgICAgKi9cbiAgICBDb21tb24uY2hhaW5QYXRoQmVmb3JlID0gZnVuY3Rpb24oYmFzZSwgcGF0aCwgZnVuYykge1xuICAgICAgICByZXR1cm4gQ29tbW9uLnNldChiYXNlLCBwYXRoLCBDb21tb24uY2hhaW4oXG4gICAgICAgICAgICBmdW5jLFxuICAgICAgICAgICAgQ29tbW9uLmdldChiYXNlLCBwYXRoKVxuICAgICAgICApKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hhaW5zIGEgZnVuY3Rpb24gdG8gZXhjdXRlIGFmdGVyIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBvbiB0aGUgZ2l2ZW4gYHBhdGhgIHJlbGF0aXZlIHRvIGBiYXNlYC5cbiAgICAgKiBTZWUgYWxzbyBkb2NzIGZvciBgQ29tbW9uLmNoYWluYC5cbiAgICAgKiBAbWV0aG9kIGNoYWluUGF0aEFmdGVyXG4gICAgICogQHBhcmFtIHt9IGJhc2UgVGhlIGJhc2Ugb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggcmVsYXRpdmUgdG8gYGJhc2VgXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hhaW4gYWZ0ZXIgdGhlIG9yaWdpbmFsXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBjaGFpbmVkIGZ1bmN0aW9uIHRoYXQgcmVwbGFjZWQgdGhlIG9yaWdpbmFsXG4gICAgICovXG4gICAgQ29tbW9uLmNoYWluUGF0aEFmdGVyID0gZnVuY3Rpb24oYmFzZSwgcGF0aCwgZnVuYykge1xuICAgICAgICByZXR1cm4gQ29tbW9uLnNldChiYXNlLCBwYXRoLCBDb21tb24uY2hhaW4oXG4gICAgICAgICAgICBDb21tb24uZ2V0KGJhc2UsIHBhdGgpLFxuICAgICAgICAgICAgZnVuY1xuICAgICAgICApKTtcbiAgICB9O1xuXG59KSgpO1xuXG59LHt9XSwxNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuRW5naW5lYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyBlbmdpbmVzLlxuKiBBbiBlbmdpbmUgaXMgYSBjb250cm9sbGVyIHRoYXQgbWFuYWdlcyB1cGRhdGluZyB0aGUgc2ltdWxhdGlvbiBvZiB0aGUgd29ybGQuXG4qIFNlZSBgTWF0dGVyLlJ1bm5lcmAgZm9yIGFuIG9wdGlvbmFsIGdhbWUgbG9vcCB1dGlsaXR5LlxuKlxuKiBTZWUgdGhlIGluY2x1ZGVkIHVzYWdlIFtleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL2xpYWJydS9tYXR0ZXItanMvdHJlZS9tYXN0ZXIvZXhhbXBsZXMpLlxuKlxuKiBAY2xhc3MgRW5naW5lXG4qL1xuXG52YXIgRW5naW5lID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gRW5naW5lO1xuXG52YXIgV29ybGQgPSBfZGVyZXFfKCcuLi9ib2R5L1dvcmxkJyk7XG52YXIgU2xlZXBpbmcgPSBfZGVyZXFfKCcuL1NsZWVwaW5nJyk7XG52YXIgUmVzb2x2ZXIgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vUmVzb2x2ZXInKTtcbnZhciBSZW5kZXIgPSBfZGVyZXFfKCcuLi9yZW5kZXIvUmVuZGVyJyk7XG52YXIgUGFpcnMgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vUGFpcnMnKTtcbnZhciBNZXRyaWNzID0gX2RlcmVxXygnLi9NZXRyaWNzJyk7XG52YXIgR3JpZCA9IF9kZXJlcV8oJy4uL2NvbGxpc2lvbi9HcmlkJyk7XG52YXIgRXZlbnRzID0gX2RlcmVxXygnLi9FdmVudHMnKTtcbnZhciBDb21wb3NpdGUgPSBfZGVyZXFfKCcuLi9ib2R5L0NvbXBvc2l0ZScpO1xudmFyIENvbnN0cmFpbnQgPSBfZGVyZXFfKCcuLi9jb25zdHJhaW50L0NvbnN0cmFpbnQnKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuL0NvbW1vbicpO1xudmFyIEJvZHkgPSBfZGVyZXFfKCcuLi9ib2R5L0JvZHknKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBlbmdpbmUuIFRoZSBvcHRpb25zIHBhcmFtZXRlciBpcyBhbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgYW55IHByb3BlcnRpZXMgeW91IHdpc2ggdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzLlxuICAgICAqIEFsbCBwcm9wZXJ0aWVzIGhhdmUgZGVmYXVsdCB2YWx1ZXMsIGFuZCBtYW55IGFyZSBwcmUtY2FsY3VsYXRlZCBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIG90aGVyIHByb3BlcnRpZXMuXG4gICAgICogU2VlIHRoZSBwcm9wZXJ0aWVzIHNlY3Rpb24gYmVsb3cgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcmV0dXJuIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqL1xuICAgIEVuZ2luZS5jcmVhdGUgPSBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIG9wdGlvbnMgbWF5IGJlIHBhc3NlZCBhcyB0aGUgZmlyc3QgKGFuZCBvbmx5KSBhcmd1bWVudFxuICAgICAgICBvcHRpb25zID0gQ29tbW9uLmlzRWxlbWVudChlbGVtZW50KSA/IG9wdGlvbnMgOiBlbGVtZW50O1xuICAgICAgICBlbGVtZW50ID0gQ29tbW9uLmlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQgOiBudWxsO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZiAoZWxlbWVudCB8fCBvcHRpb25zLnJlbmRlcikge1xuICAgICAgICAgICAgQ29tbW9uLndhcm4oJ0VuZ2luZS5jcmVhdGU6IGVuZ2luZS5yZW5kZXIgaXMgZGVwcmVjYXRlZCAoc2VlIGRvY3MpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbkl0ZXJhdGlvbnM6IDYsXG4gICAgICAgICAgICB2ZWxvY2l0eUl0ZXJhdGlvbnM6IDQsXG4gICAgICAgICAgICBjb25zdHJhaW50SXRlcmF0aW9uczogMixcbiAgICAgICAgICAgIGVuYWJsZVNsZWVwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICBwbHVnaW46IHt9LFxuICAgICAgICAgICAgdGltaW5nOiB7XG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiAwLFxuICAgICAgICAgICAgICAgIHRpbWVTY2FsZTogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyb2FkcGhhc2U6IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBHcmlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGVuZ2luZSA9IENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIEBkZXByZWNhdGVkXG4gICAgICAgIGlmIChlbGVtZW50IHx8IGVuZ2luZS5yZW5kZXIpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXJEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFJlbmRlclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW5naW5lLnJlbmRlciA9IENvbW1vbi5leHRlbmQocmVuZGVyRGVmYXVsdHMsIGVuZ2luZS5yZW5kZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQGRlcHJlY2F0ZWRcbiAgICAgICAgaWYgKGVuZ2luZS5yZW5kZXIgJiYgZW5naW5lLnJlbmRlci5jb250cm9sbGVyKSB7XG4gICAgICAgICAgICBlbmdpbmUucmVuZGVyID0gZW5naW5lLnJlbmRlci5jb250cm9sbGVyLmNyZWF0ZShlbmdpbmUucmVuZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEBkZXByZWNhdGVkXG4gICAgICAgIGlmIChlbmdpbmUucmVuZGVyKSB7XG4gICAgICAgICAgICBlbmdpbmUucmVuZGVyLmVuZ2luZSA9IGVuZ2luZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuZ2luZS53b3JsZCA9IG9wdGlvbnMud29ybGQgfHwgV29ybGQuY3JlYXRlKGVuZ2luZS53b3JsZCk7XG4gICAgICAgIGVuZ2luZS5wYWlycyA9IFBhaXJzLmNyZWF0ZSgpO1xuICAgICAgICBlbmdpbmUuYnJvYWRwaGFzZSA9IGVuZ2luZS5icm9hZHBoYXNlLmNvbnRyb2xsZXIuY3JlYXRlKGVuZ2luZS5icm9hZHBoYXNlKTtcbiAgICAgICAgZW5naW5lLm1ldHJpY3MgPSBlbmdpbmUubWV0cmljcyB8fCB7IGV4dGVuZGVkOiBmYWxzZSB9O1xuXG5cbiAgICAgICAgcmV0dXJuIGVuZ2luZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTW92ZXMgdGhlIHNpbXVsYXRpb24gZm9yd2FyZCBpbiB0aW1lIGJ5IGBkZWx0YWAgbXMuXG4gICAgICogVGhlIGBjb3JyZWN0aW9uYCBhcmd1bWVudCBpcyBhbiBvcHRpb25hbCBgTnVtYmVyYCB0aGF0IHNwZWNpZmllcyB0aGUgdGltZSBjb3JyZWN0aW9uIGZhY3RvciB0byBhcHBseSB0byB0aGUgdXBkYXRlLlxuICAgICAqIFRoaXMgY2FuIGhlbHAgaW1wcm92ZSB0aGUgYWNjdXJhY3kgb2YgdGhlIHNpbXVsYXRpb24gaW4gY2FzZXMgd2hlcmUgYGRlbHRhYCBpcyBjaGFuZ2luZyBiZXR3ZWVuIHVwZGF0ZXMuXG4gICAgICogVGhlIHZhbHVlIG9mIGBjb3JyZWN0aW9uYCBpcyBkZWZpbmVkIGFzIGBkZWx0YSAvIGxhc3REZWx0YWAsIGkuZS4gdGhlIHBlcmNlbnRhZ2UgY2hhbmdlIG9mIGBkZWx0YWAgb3ZlciB0aGUgbGFzdCBzdGVwLlxuICAgICAqIFRoZXJlZm9yZSB0aGUgdmFsdWUgaXMgYWx3YXlzIGAxYCAobm8gY29ycmVjdGlvbikgd2hlbiBgZGVsdGFgIGNvbnN0YW50IChvciB3aGVuIG5vIGNvcnJlY3Rpb24gaXMgZGVzaXJlZCwgd2hpY2ggaXMgdGhlIGRlZmF1bHQpLlxuICAgICAqIFNlZSB0aGUgcGFwZXIgb24gPGEgaHJlZj1cImh0dHA6Ly9sb25lc29jay5uZXQvYXJ0aWNsZS92ZXJsZXQuaHRtbFwiPlRpbWUgQ29ycmVjdGVkIFZlcmxldDwvYT4gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBUcmlnZ2VycyBgYmVmb3JlVXBkYXRlYCBhbmQgYGFmdGVyVXBkYXRlYCBldmVudHMuXG4gICAgICogVHJpZ2dlcnMgYGNvbGxpc2lvblN0YXJ0YCwgYGNvbGxpc2lvbkFjdGl2ZWAgYW5kIGBjb2xsaXNpb25FbmRgIGV2ZW50cy5cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2RlbHRhPTE2LjY2Nl1cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvcnJlY3Rpb249MV1cbiAgICAgKi9cbiAgICBFbmdpbmUudXBkYXRlID0gZnVuY3Rpb24oZW5naW5lLCBkZWx0YSwgY29ycmVjdGlvbikge1xuICAgICAgICBkZWx0YSA9IGRlbHRhIHx8IDEwMDAgLyA2MDtcbiAgICAgICAgY29ycmVjdGlvbiA9IGNvcnJlY3Rpb24gfHwgMTtcblxuICAgICAgICB2YXIgd29ybGQgPSBlbmdpbmUud29ybGQsXG4gICAgICAgICAgICB0aW1pbmcgPSBlbmdpbmUudGltaW5nLFxuICAgICAgICAgICAgYnJvYWRwaGFzZSA9IGVuZ2luZS5icm9hZHBoYXNlLFxuICAgICAgICAgICAgYnJvYWRwaGFzZVBhaXJzID0gW10sXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIC8vIGluY3JlbWVudCB0aW1lc3RhbXBcbiAgICAgICAgdGltaW5nLnRpbWVzdGFtcCArPSBkZWx0YSAqIHRpbWluZy50aW1lU2NhbGU7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGV2ZW50IG9iamVjdFxuICAgICAgICB2YXIgZXZlbnQgPSB7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IHRpbWluZy50aW1lc3RhbXBcbiAgICAgICAgfTtcblxuICAgICAgICBFdmVudHMudHJpZ2dlcihlbmdpbmUsICdiZWZvcmVVcGRhdGUnLCBldmVudCk7XG5cbiAgICAgICAgLy8gZ2V0IGxpc3RzIG9mIGFsbCBib2RpZXMgYW5kIGNvbnN0cmFpbnRzLCBubyBtYXR0ZXIgd2hhdCBjb21wb3NpdGVzIHRoZXkgYXJlIGluXG4gICAgICAgIHZhciBhbGxCb2RpZXMgPSBDb21wb3NpdGUuYWxsQm9kaWVzKHdvcmxkKSxcbiAgICAgICAgICAgIGFsbENvbnN0cmFpbnRzID0gQ29tcG9zaXRlLmFsbENvbnN0cmFpbnRzKHdvcmxkKTtcblxuXG4gICAgICAgIC8vIGlmIHNsZWVwaW5nIGVuYWJsZWQsIGNhbGwgdGhlIHNsZWVwaW5nIGNvbnRyb2xsZXJcbiAgICAgICAgaWYgKGVuZ2luZS5lbmFibGVTbGVlcGluZylcbiAgICAgICAgICAgIFNsZWVwaW5nLnVwZGF0ZShhbGxCb2RpZXMsIHRpbWluZy50aW1lU2NhbGUpO1xuXG4gICAgICAgIC8vIGFwcGxpZXMgZ3Jhdml0eSB0byBhbGwgYm9kaWVzXG4gICAgICAgIEVuZ2luZS5fYm9kaWVzQXBwbHlHcmF2aXR5KGFsbEJvZGllcywgd29ybGQuZ3Jhdml0eSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGFsbCBib2R5IHBvc2l0aW9uIGFuZCByb3RhdGlvbiBieSBpbnRlZ3JhdGlvblxuICAgICAgICBFbmdpbmUuX2JvZGllc1VwZGF0ZShhbGxCb2RpZXMsIGRlbHRhLCB0aW1pbmcudGltZVNjYWxlLCBjb3JyZWN0aW9uLCB3b3JsZC5ib3VuZHMpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBhbGwgY29uc3RyYWludHMgKGZpcnN0IHBhc3MpXG4gICAgICAgIENvbnN0cmFpbnQucHJlU29sdmVBbGwoYWxsQm9kaWVzKTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGVuZ2luZS5jb25zdHJhaW50SXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICBDb25zdHJhaW50LnNvbHZlQWxsKGFsbENvbnN0cmFpbnRzLCB0aW1pbmcudGltZVNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBDb25zdHJhaW50LnBvc3RTb2x2ZUFsbChhbGxCb2RpZXMpO1xuXG4gICAgICAgIC8vIGJyb2FkcGhhc2UgcGFzczogZmluZCBwb3RlbnRpYWwgY29sbGlzaW9uIHBhaXJzXG4gICAgICAgIGlmIChicm9hZHBoYXNlLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIC8vIGlmIHdvcmxkIGlzIGRpcnR5LCB3ZSBtdXN0IGZsdXNoIHRoZSB3aG9sZSBncmlkXG4gICAgICAgICAgICBpZiAod29ybGQuaXNNb2RpZmllZClcbiAgICAgICAgICAgICAgICBicm9hZHBoYXNlLmNvbnRyb2xsZXIuY2xlYXIoYnJvYWRwaGFzZSk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZ3JpZCBidWNrZXRzIGJhc2VkIG9uIGN1cnJlbnQgYm9kaWVzXG4gICAgICAgICAgICBicm9hZHBoYXNlLmNvbnRyb2xsZXIudXBkYXRlKGJyb2FkcGhhc2UsIGFsbEJvZGllcywgZW5naW5lLCB3b3JsZC5pc01vZGlmaWVkKTtcbiAgICAgICAgICAgIGJyb2FkcGhhc2VQYWlycyA9IGJyb2FkcGhhc2UucGFpcnNMaXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgbm8gYnJvYWRwaGFzZSBzZXQsIHdlIGp1c3QgcGFzcyBhbGwgYm9kaWVzXG4gICAgICAgICAgICBicm9hZHBoYXNlUGFpcnMgPSBhbGxCb2RpZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciBhbGwgY29tcG9zaXRlIG1vZGlmaWVkIGZsYWdzXG4gICAgICAgIGlmICh3b3JsZC5pc01vZGlmaWVkKSB7XG4gICAgICAgICAgICBDb21wb3NpdGUuc2V0TW9kaWZpZWQod29ybGQsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBuYXJyb3dwaGFzZSBwYXNzOiBmaW5kIGFjdHVhbCBjb2xsaXNpb25zLCB0aGVuIGNyZWF0ZSBvciB1cGRhdGUgY29sbGlzaW9uIHBhaXJzXG4gICAgICAgIHZhciBjb2xsaXNpb25zID0gYnJvYWRwaGFzZS5kZXRlY3Rvcihicm9hZHBoYXNlUGFpcnMsIGVuZ2luZSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGNvbGxpc2lvbiBwYWlyc1xuICAgICAgICB2YXIgcGFpcnMgPSBlbmdpbmUucGFpcnMsXG4gICAgICAgICAgICB0aW1lc3RhbXAgPSB0aW1pbmcudGltZXN0YW1wO1xuICAgICAgICBQYWlycy51cGRhdGUocGFpcnMsIGNvbGxpc2lvbnMsIHRpbWVzdGFtcCk7XG4gICAgICAgIFBhaXJzLnJlbW92ZU9sZChwYWlycywgdGltZXN0YW1wKTtcblxuICAgICAgICAvLyB3YWtlIHVwIGJvZGllcyBpbnZvbHZlZCBpbiBjb2xsaXNpb25zXG4gICAgICAgIGlmIChlbmdpbmUuZW5hYmxlU2xlZXBpbmcpXG4gICAgICAgICAgICBTbGVlcGluZy5hZnRlckNvbGxpc2lvbnMocGFpcnMubGlzdCwgdGltaW5nLnRpbWVTY2FsZSk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBjb2xsaXNpb24gZXZlbnRzXG4gICAgICAgIGlmIChwYWlycy5jb2xsaXNpb25TdGFydC5sZW5ndGggPiAwKVxuICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIoZW5naW5lLCAnY29sbGlzaW9uU3RhcnQnLCB7IHBhaXJzOiBwYWlycy5jb2xsaXNpb25TdGFydCB9KTtcblxuICAgICAgICAvLyBpdGVyYXRpdmVseSByZXNvbHZlIHBvc2l0aW9uIGJldHdlZW4gY29sbGlzaW9uc1xuICAgICAgICBSZXNvbHZlci5wcmVTb2x2ZVBvc2l0aW9uKHBhaXJzLmxpc3QpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZW5naW5lLnBvc2l0aW9uSXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICBSZXNvbHZlci5zb2x2ZVBvc2l0aW9uKHBhaXJzLmxpc3QsIHRpbWluZy50aW1lU2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIFJlc29sdmVyLnBvc3RTb2x2ZVBvc2l0aW9uKGFsbEJvZGllcyk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGFsbCBjb25zdHJhaW50cyAoc2Vjb25kIHBhc3MpXG4gICAgICAgIENvbnN0cmFpbnQucHJlU29sdmVBbGwoYWxsQm9kaWVzKTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGVuZ2luZS5jb25zdHJhaW50SXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICBDb25zdHJhaW50LnNvbHZlQWxsKGFsbENvbnN0cmFpbnRzLCB0aW1pbmcudGltZVNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBDb25zdHJhaW50LnBvc3RTb2x2ZUFsbChhbGxCb2RpZXMpO1xuXG4gICAgICAgIC8vIGl0ZXJhdGl2ZWx5IHJlc29sdmUgdmVsb2NpdHkgYmV0d2VlbiBjb2xsaXNpb25zXG4gICAgICAgIFJlc29sdmVyLnByZVNvbHZlVmVsb2NpdHkocGFpcnMubGlzdCk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBlbmdpbmUudmVsb2NpdHlJdGVyYXRpb25zOyBpKyspIHtcbiAgICAgICAgICAgIFJlc29sdmVyLnNvbHZlVmVsb2NpdHkocGFpcnMubGlzdCwgdGltaW5nLnRpbWVTY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmlnZ2VyIGNvbGxpc2lvbiBldmVudHNcbiAgICAgICAgaWYgKHBhaXJzLmNvbGxpc2lvbkFjdGl2ZS5sZW5ndGggPiAwKVxuICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIoZW5naW5lLCAnY29sbGlzaW9uQWN0aXZlJywgeyBwYWlyczogcGFpcnMuY29sbGlzaW9uQWN0aXZlIH0pO1xuXG4gICAgICAgIGlmIChwYWlycy5jb2xsaXNpb25FbmQubGVuZ3RoID4gMClcbiAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKGVuZ2luZSwgJ2NvbGxpc2lvbkVuZCcsIHsgcGFpcnM6IHBhaXJzLmNvbGxpc2lvbkVuZCB9KTtcblxuXG4gICAgICAgIC8vIGNsZWFyIGZvcmNlIGJ1ZmZlcnNcbiAgICAgICAgRW5naW5lLl9ib2RpZXNDbGVhckZvcmNlcyhhbGxCb2RpZXMpO1xuXG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKGVuZ2luZSwgJ2FmdGVyVXBkYXRlJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybiBlbmdpbmU7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBNZXJnZXMgdHdvIGVuZ2luZXMgYnkga2VlcGluZyB0aGUgY29uZmlndXJhdGlvbiBvZiBgZW5naW5lQWAgYnV0IHJlcGxhY2luZyB0aGUgd29ybGQgd2l0aCB0aGUgb25lIGZyb20gYGVuZ2luZUJgLlxuICAgICAqIEBtZXRob2QgbWVyZ2VcbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lQVxuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVCXG4gICAgICovXG4gICAgRW5naW5lLm1lcmdlID0gZnVuY3Rpb24oZW5naW5lQSwgZW5naW5lQikge1xuICAgICAgICBDb21tb24uZXh0ZW5kKGVuZ2luZUEsIGVuZ2luZUIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVuZ2luZUIud29ybGQpIHtcbiAgICAgICAgICAgIGVuZ2luZUEud29ybGQgPSBlbmdpbmVCLndvcmxkO1xuXG4gICAgICAgICAgICBFbmdpbmUuY2xlYXIoZW5naW5lQSk7XG5cbiAgICAgICAgICAgIHZhciBib2RpZXMgPSBDb21wb3NpdGUuYWxsQm9kaWVzKGVuZ2luZUEud29ybGQpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuICAgICAgICAgICAgICAgIFNsZWVwaW5nLnNldChib2R5LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgYm9keS5pZCA9IENvbW1vbi5uZXh0SWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGVuZ2luZSBpbmNsdWRpbmcgdGhlIHdvcmxkLCBwYWlycyBhbmQgYnJvYWRwaGFzZS5cbiAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqL1xuICAgIEVuZ2luZS5jbGVhciA9IGZ1bmN0aW9uKGVuZ2luZSkge1xuICAgICAgICB2YXIgd29ybGQgPSBlbmdpbmUud29ybGQ7XG4gICAgICAgIFxuICAgICAgICBQYWlycy5jbGVhcihlbmdpbmUucGFpcnMpO1xuXG4gICAgICAgIHZhciBicm9hZHBoYXNlID0gZW5naW5lLmJyb2FkcGhhc2U7XG4gICAgICAgIGlmIChicm9hZHBoYXNlLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHZhciBib2RpZXMgPSBDb21wb3NpdGUuYWxsQm9kaWVzKHdvcmxkKTtcbiAgICAgICAgICAgIGJyb2FkcGhhc2UuY29udHJvbGxlci5jbGVhcihicm9hZHBoYXNlKTtcbiAgICAgICAgICAgIGJyb2FkcGhhc2UuY29udHJvbGxlci51cGRhdGUoYnJvYWRwaGFzZSwgYm9kaWVzLCBlbmdpbmUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFplcm9lcyB0aGUgYGJvZHkuZm9yY2VgIGFuZCBgYm9keS50b3JxdWVgIGZvcmNlIGJ1ZmZlcnMuXG4gICAgICogQG1ldGhvZCBfYm9kaWVzQ2xlYXJGb3JjZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKi9cbiAgICBFbmdpbmUuX2JvZGllc0NsZWFyRm9yY2VzID0gZnVuY3Rpb24oYm9kaWVzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgZm9yY2UgYnVmZmVyc1xuICAgICAgICAgICAgYm9keS5mb3JjZS54ID0gMDtcbiAgICAgICAgICAgIGJvZHkuZm9yY2UueSA9IDA7XG4gICAgICAgICAgICBib2R5LnRvcnF1ZSA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwbHlzIGEgbWFzcyBkZXBlbmRhbnQgZm9yY2UgdG8gYWxsIGdpdmVuIGJvZGllcy5cbiAgICAgKiBAbWV0aG9kIF9ib2RpZXNBcHBseUdyYXZpdHlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gZ3Jhdml0eVxuICAgICAqL1xuICAgIEVuZ2luZS5fYm9kaWVzQXBwbHlHcmF2aXR5ID0gZnVuY3Rpb24oYm9kaWVzLCBncmF2aXR5KSB7XG4gICAgICAgIHZhciBncmF2aXR5U2NhbGUgPSB0eXBlb2YgZ3Jhdml0eS5zY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBncmF2aXR5LnNjYWxlIDogMC4wMDE7XG5cbiAgICAgICAgaWYgKChncmF2aXR5LnggPT09IDAgJiYgZ3Jhdml0eS55ID09PSAwKSB8fCBncmF2aXR5U2NhbGUgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoYm9keS5pc1N0YXRpYyB8fCBib2R5LmlzU2xlZXBpbmcpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IGdyYXZpdHlcbiAgICAgICAgICAgIGJvZHkuZm9yY2UueSArPSBib2R5Lm1hc3MgKiBncmF2aXR5LnkgKiBncmF2aXR5U2NhbGU7XG4gICAgICAgICAgICBib2R5LmZvcmNlLnggKz0gYm9keS5tYXNzICogZ3Jhdml0eS54ICogZ3Jhdml0eVNjYWxlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGx5cyBgQm9keS51cGRhdGVgIHRvIGFsbCBnaXZlbiBgYm9kaWVzYC5cbiAgICAgKiBAbWV0aG9kIF9ib2RpZXNVcGRhdGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVsdGFUaW1lIFxuICAgICAqIFRoZSBhbW91bnQgb2YgdGltZSBlbGFwc2VkIGJldHdlZW4gdXBkYXRlc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lU2NhbGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29ycmVjdGlvbiBcbiAgICAgKiBUaGUgVmVybGV0IGNvcnJlY3Rpb24gZmFjdG9yIChkZWx0YVRpbWUgLyBsYXN0RGVsdGFUaW1lKVxuICAgICAqIEBwYXJhbSB7Ym91bmRzfSB3b3JsZEJvdW5kc1xuICAgICAqL1xuICAgIEVuZ2luZS5fYm9kaWVzVXBkYXRlID0gZnVuY3Rpb24oYm9kaWVzLCBkZWx0YVRpbWUsIHRpbWVTY2FsZSwgY29ycmVjdGlvbiwgd29ybGRCb3VuZHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoYm9keS5pc1N0YXRpYyB8fCBib2R5LmlzU2xlZXBpbmcpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIEJvZHkudXBkYXRlKGJvZHksIGRlbHRhVGltZSwgdGltZVNjYWxlLCBjb3JyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbiBhbGlhcyBmb3IgYFJ1bm5lci5ydW5gLCBzZWUgYE1hdHRlci5SdW5uZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqIEBtZXRob2QgcnVuXG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBqdXN0IGJlZm9yZSBhbiB1cGRhdGVcbiAgICAqXG4gICAgKiBAZXZlbnQgYmVmb3JlVXBkYXRlXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBhZnRlciBlbmdpbmUgdXBkYXRlIGFuZCBhbGwgY29sbGlzaW9uIGV2ZW50c1xuICAgICpcbiAgICAqIEBldmVudCBhZnRlclVwZGF0ZVxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgYWZ0ZXIgZW5naW5lIHVwZGF0ZSwgcHJvdmlkZXMgYSBsaXN0IG9mIGFsbCBwYWlycyB0aGF0IGhhdmUgc3RhcnRlZCB0byBjb2xsaWRlIGluIHRoZSBjdXJyZW50IHRpY2sgKGlmIGFueSlcbiAgICAqXG4gICAgKiBAZXZlbnQgY29sbGlzaW9uU3RhcnRcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7fSBldmVudC5wYWlycyBMaXN0IG9mIGFmZmVjdGVkIHBhaXJzXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBhZnRlciBlbmdpbmUgdXBkYXRlLCBwcm92aWRlcyBhIGxpc3Qgb2YgYWxsIHBhaXJzIHRoYXQgYXJlIGNvbGxpZGluZyBpbiB0aGUgY3VycmVudCB0aWNrIChpZiBhbnkpXG4gICAgKlxuICAgICogQGV2ZW50IGNvbGxpc2lvbkFjdGl2ZVxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnBhaXJzIExpc3Qgb2YgYWZmZWN0ZWQgcGFpcnNcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC50aW1lc3RhbXAgVGhlIGVuZ2luZS50aW1pbmcudGltZXN0YW1wIG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGFmdGVyIGVuZ2luZSB1cGRhdGUsIHByb3ZpZGVzIGEgbGlzdCBvZiBhbGwgcGFpcnMgdGhhdCBoYXZlIGVuZGVkIGNvbGxpc2lvbiBpbiB0aGUgY3VycmVudCB0aWNrIChpZiBhbnkpXG4gICAgKlxuICAgICogQGV2ZW50IGNvbGxpc2lvbkVuZFxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnBhaXJzIExpc3Qgb2YgYWZmZWN0ZWQgcGFpcnNcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC50aW1lc3RhbXAgVGhlIGVuZ2luZS50aW1pbmcudGltZXN0YW1wIG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKlxuICAgICpcbiAgICAqICBQcm9wZXJ0aWVzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGludGVnZXIgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgdGhlIG51bWJlciBvZiBwb3NpdGlvbiBpdGVyYXRpb25zIHRvIHBlcmZvcm0gZWFjaCB1cGRhdGUuXG4gICAgICogVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoaWdoZXIgcXVhbGl0eSB0aGUgc2ltdWxhdGlvbiB3aWxsIGJlIGF0IHRoZSBleHBlbnNlIG9mIHBlcmZvcm1hbmNlLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBvc2l0aW9uSXRlcmF0aW9uc1xuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDZcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGludGVnZXIgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgdGhlIG51bWJlciBvZiB2ZWxvY2l0eSBpdGVyYXRpb25zIHRvIHBlcmZvcm0gZWFjaCB1cGRhdGUuXG4gICAgICogVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBoaWdoZXIgcXVhbGl0eSB0aGUgc2ltdWxhdGlvbiB3aWxsIGJlIGF0IHRoZSBleHBlbnNlIG9mIHBlcmZvcm1hbmNlLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHZlbG9jaXR5SXRlcmF0aW9uc1xuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGludGVnZXIgYE51bWJlcmAgdGhhdCBzcGVjaWZpZXMgdGhlIG51bWJlciBvZiBjb25zdHJhaW50IGl0ZXJhdGlvbnMgdG8gcGVyZm9ybSBlYWNoIHVwZGF0ZS5cbiAgICAgKiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGhpZ2hlciBxdWFsaXR5IHRoZSBzaW11bGF0aW9uIHdpbGwgYmUgYXQgdGhlIGV4cGVuc2Ugb2YgcGVyZm9ybWFuY2UuXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgb2YgYDJgIGlzIHVzdWFsbHkgdmVyeSBhZGVxdWF0ZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb25zdHJhaW50SXRlcmF0aW9uc1xuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDJcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIHRoZSBlbmdpbmUgc2hvdWxkIGFsbG93IHNsZWVwaW5nIHZpYSB0aGUgYE1hdHRlci5TbGVlcGluZ2AgbW9kdWxlLlxuICAgICAqIFNsZWVwaW5nIGNhbiBpbXByb3ZlIHN0YWJpbGl0eSBhbmQgcGVyZm9ybWFuY2UsIGJ1dCBvZnRlbiBhdCB0aGUgZXhwZW5zZSBvZiBhY2N1cmFjeS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBlbmFibGVTbGVlcGluZ1xuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gYE9iamVjdGAgY29udGFpbmluZyBwcm9wZXJ0aWVzIHJlZ2FyZGluZyB0aGUgdGltaW5nIHN5c3RlbXMgb2YgdGhlIGVuZ2luZS4gXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdGltaW5nXG4gICAgICogQHR5cGUgb2JqZWN0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgc3BlY2lmaWVzIHRoZSBnbG9iYWwgc2NhbGluZyBmYWN0b3Igb2YgdGltZSBmb3IgYWxsIGJvZGllcy5cbiAgICAgKiBBIHZhbHVlIG9mIGAwYCBmcmVlemVzIHRoZSBzaW11bGF0aW9uLlxuICAgICAqIEEgdmFsdWUgb2YgYDAuMWAgZ2l2ZXMgYSBzbG93LW1vdGlvbiBlZmZlY3QuXG4gICAgICogQSB2YWx1ZSBvZiBgMS4yYCBnaXZlcyBhIHNwZWVkLXVwIGVmZmVjdC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0aW1pbmcudGltZVNjYWxlXG4gICAgICogQHR5cGUgbnVtYmVyXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgTnVtYmVyYCB0aGF0IHNwZWNpZmllcyB0aGUgY3VycmVudCBzaW11bGF0aW9uLXRpbWUgaW4gbWlsbGlzZWNvbmRzIHN0YXJ0aW5nIGZyb20gYDBgLiBcbiAgICAgKiBJdCBpcyBpbmNyZW1lbnRlZCBvbiBldmVyeSBgRW5naW5lLnVwZGF0ZWAgYnkgdGhlIGdpdmVuIGBkZWx0YWAgYXJndW1lbnQuIFxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHRpbWluZy50aW1lc3RhbXBcbiAgICAgKiBAdHlwZSBudW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBpbnN0YW5jZSBvZiBhIGBSZW5kZXJgIGNvbnRyb2xsZXIuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGEgYE1hdHRlci5SZW5kZXJgIGluc3RhbmNlIGNyZWF0ZWQgYnkgYEVuZ2luZS5jcmVhdGVgLlxuICAgICAqIE9uZSBtYXkgYWxzbyBkZXZlbG9wIGEgY3VzdG9tIHJlbmRlcmVyIG1vZHVsZSBiYXNlZCBvbiBgTWF0dGVyLlJlbmRlcmAgYW5kIHBhc3MgYW4gaW5zdGFuY2Ugb2YgaXQgdG8gYEVuZ2luZS5jcmVhdGVgIHZpYSBgb3B0aW9ucy5yZW5kZXJgLlxuICAgICAqXG4gICAgICogQSBtaW5pbWFsIGN1c3RvbSByZW5kZXJlciBvYmplY3QgbXVzdCBkZWZpbmUgYXQgbGVhc3QgdGhyZWUgZnVuY3Rpb25zOiBgY3JlYXRlYCwgYGNsZWFyYCBhbmQgYHdvcmxkYCAoc2VlIGBNYXR0ZXIuUmVuZGVyYCkuXG4gICAgICogSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBpbnN0ZWFkIHBhc3MgdGhlIF9tb2R1bGVfIHJlZmVyZW5jZSB2aWEgYG9wdGlvbnMucmVuZGVyLmNvbnRyb2xsZXJgIGFuZCBgRW5naW5lLmNyZWF0ZWAgd2lsbCBpbnN0YW50aWF0ZSBvbmUgZm9yIHlvdS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSByZW5kZXJcbiAgICAgKiBAdHlwZSByZW5kZXJcbiAgICAgKiBAZGVwcmVjYXRlZCBzZWUgRGVtby5qcyBmb3IgYW4gZXhhbXBsZSBvZiBjcmVhdGluZyBhIHJlbmRlcmVyXG4gICAgICogQGRlZmF1bHQgYSBNYXR0ZXIuUmVuZGVyIGluc3RhbmNlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbiBpbnN0YW5jZSBvZiBhIGJyb2FkcGhhc2UgY29udHJvbGxlci4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgYSBgTWF0dGVyLkdyaWRgIGluc3RhbmNlIGNyZWF0ZWQgYnkgYEVuZ2luZS5jcmVhdGVgLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGJyb2FkcGhhc2VcbiAgICAgKiBAdHlwZSBncmlkXG4gICAgICogQGRlZmF1bHQgYSBNYXR0ZXIuR3JpZCBpbnN0YW5jZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgV29ybGRgIGNvbXBvc2l0ZSBvYmplY3QgdGhhdCB3aWxsIGNvbnRhaW4gYWxsIHNpbXVsYXRlZCBib2RpZXMgYW5kIGNvbnN0cmFpbnRzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHdvcmxkXG4gICAgICogQHR5cGUgd29ybGRcbiAgICAgKiBAZGVmYXVsdCBhIE1hdHRlci5Xb3JsZCBpbnN0YW5jZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQW4gb2JqZWN0IHJlc2VydmVkIGZvciBzdG9yaW5nIHBsdWdpbi1zcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHBsdWdpblxuICAgICAqIEB0eXBlIHt9XG4gICAgICovXG5cbn0pKCk7XG5cbn0se1wiLi4vYm9keS9Cb2R5XCI6MSxcIi4uL2JvZHkvQ29tcG9zaXRlXCI6MixcIi4uL2JvZHkvV29ybGRcIjozLFwiLi4vY29sbGlzaW9uL0dyaWRcIjo2LFwiLi4vY29sbGlzaW9uL1BhaXJzXCI6OCxcIi4uL2NvbGxpc2lvbi9SZXNvbHZlclwiOjEwLFwiLi4vY29uc3RyYWludC9Db25zdHJhaW50XCI6MTIsXCIuLi9yZW5kZXIvUmVuZGVyXCI6MzEsXCIuL0NvbW1vblwiOjE0LFwiLi9FdmVudHNcIjoxNixcIi4vTWV0cmljc1wiOjE4LFwiLi9TbGVlcGluZ1wiOjIyfV0sMTY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkV2ZW50c2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgdG8gZmlyZSBhbmQgbGlzdGVuIHRvIGV2ZW50cyBvbiBvdGhlciBvYmplY3RzLlxuKlxuKiBTZWUgdGhlIGluY2x1ZGVkIHVzYWdlIFtleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL2xpYWJydS9tYXR0ZXItanMvdHJlZS9tYXN0ZXIvZXhhbXBsZXMpLlxuKlxuKiBAY2xhc3MgRXZlbnRzXG4qL1xuXG52YXIgRXZlbnRzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRzO1xuXG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHRoZSBnaXZlbiBvYmplY3QncyBgZXZlbnROYW1lYC5cbiAgICAgKiBAbWV0aG9kIG9uXG4gICAgICogQHBhcmFtIHt9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBFdmVudHMub24gPSBmdW5jdGlvbihvYmplY3QsIGV2ZW50TmFtZXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBuYW1lcyA9IGV2ZW50TmFtZXMuc3BsaXQoJyAnKSxcbiAgICAgICAgICAgIG5hbWU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgb2JqZWN0LmV2ZW50cyA9IG9iamVjdC5ldmVudHMgfHwge307XG4gICAgICAgICAgICBvYmplY3QuZXZlbnRzW25hbWVdID0gb2JqZWN0LmV2ZW50c1tuYW1lXSB8fCBbXTtcbiAgICAgICAgICAgIG9iamVjdC5ldmVudHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FsbGJhY2s7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIGV2ZW50IGNhbGxiYWNrLiBJZiBubyBjYWxsYmFjaywgY2xlYXJzIGFsbCBjYWxsYmFja3MgaW4gYGV2ZW50TmFtZXNgLiBJZiBubyBgZXZlbnROYW1lc2AsIGNsZWFycyBhbGwgZXZlbnRzLlxuICAgICAqIEBtZXRob2Qgb2ZmXG4gICAgICogQHBhcmFtIHt9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBFdmVudHMub2ZmID0gZnVuY3Rpb24ob2JqZWN0LCBldmVudE5hbWVzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoIWV2ZW50TmFtZXMpIHtcbiAgICAgICAgICAgIG9iamVjdC5ldmVudHMgPSB7fTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhhbmRsZSBFdmVudHMub2ZmKG9iamVjdCwgY2FsbGJhY2spXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnROYW1lcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBldmVudE5hbWVzO1xuICAgICAgICAgICAgZXZlbnROYW1lcyA9IENvbW1vbi5rZXlzKG9iamVjdC5ldmVudHMpLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuYW1lcyA9IGV2ZW50TmFtZXMuc3BsaXQoJyAnKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gb2JqZWN0LmV2ZW50c1tuYW1lc1tpXV0sXG4gICAgICAgICAgICAgICAgbmV3Q2FsbGJhY2tzID0gW107XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNhbGxiYWNrcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2pdICE9PSBjYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrc1tqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYmplY3QuZXZlbnRzW25hbWVzW2ldXSA9IG5ld0NhbGxiYWNrcztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyBhbGwgdGhlIGNhbGxiYWNrcyBzdWJzY3JpYmVkIHRvIHRoZSBnaXZlbiBvYmplY3QncyBgZXZlbnROYW1lYCwgaW4gdGhlIG9yZGVyIHRoZXkgc3Vic2NyaWJlZCwgaWYgYW55LlxuICAgICAqIEBtZXRob2QgdHJpZ2dlclxuICAgICAqIEBwYXJhbSB7fSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lc1xuICAgICAqIEBwYXJhbSB7fSBldmVudFxuICAgICAqL1xuICAgIEV2ZW50cy50cmlnZ2VyID0gZnVuY3Rpb24ob2JqZWN0LCBldmVudE5hbWVzLCBldmVudCkge1xuICAgICAgICB2YXIgbmFtZXMsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2FsbGJhY2tzLFxuICAgICAgICAgICAgZXZlbnRDbG9uZTtcblxuICAgICAgICBpZiAob2JqZWN0LmV2ZW50cykge1xuICAgICAgICAgICAgaWYgKCFldmVudClcbiAgICAgICAgICAgICAgICBldmVudCA9IHt9O1xuXG4gICAgICAgICAgICBuYW1lcyA9IGV2ZW50TmFtZXMuc3BsaXQoJyAnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3MgPSBvYmplY3QuZXZlbnRzW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICAgICBldmVudENsb25lID0gQ29tbW9uLmNsb25lKGV2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Q2xvbmUubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Q2xvbmUuc291cmNlID0gb2JqZWN0O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FsbGJhY2tzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Nbal0uYXBwbHkob2JqZWN0LCBbZXZlbnRDbG9uZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuL0NvbW1vblwiOjE0fV0sMTc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyYCBtb2R1bGUgaXMgdGhlIHRvcCBsZXZlbCBuYW1lc3BhY2UuIEl0IGFsc28gaW5jbHVkZXMgYSBmdW5jdGlvbiBmb3IgaW5zdGFsbGluZyBwbHVnaW5zIG9uIHRvcCBvZiB0aGUgbGlicmFyeS5cbipcbiogQGNsYXNzIE1hdHRlclxuKi9cblxudmFyIE1hdHRlciA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hdHRlcjtcblxudmFyIFBsdWdpbiA9IF9kZXJlcV8oJy4vUGx1Z2luJyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxpYnJhcnkgbmFtZS5cbiAgICAgKiBAcHJvcGVydHkgbmFtZVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgTWF0dGVyLm5hbWUgPSAnbWF0dGVyLWpzJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBsaWJyYXJ5IHZlcnNpb24uXG4gICAgICogQHByb3BlcnR5IHZlcnNpb25cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIE1hdHRlci52ZXJzaW9uID0gJzAuMTQuMSc7XG5cbiAgICAvKipcbiAgICAgKiBBIGxpc3Qgb2YgcGx1Z2luIGRlcGVuZGVuY2llcyB0byBiZSBpbnN0YWxsZWQuIFRoZXNlIGFyZSBub3JtYWxseSBzZXQgYW5kIGluc3RhbGxlZCB0aHJvdWdoIGBNYXR0ZXIudXNlYC5cbiAgICAgKiBBbHRlcm5hdGl2ZWx5IHlvdSBtYXkgc2V0IGBNYXR0ZXIudXNlc2AgbWFudWFsbHkgYW5kIGluc3RhbGwgdGhlbSBieSBjYWxsaW5nIGBQbHVnaW4udXNlKE1hdHRlcilgLlxuICAgICAqIEBwcm9wZXJ0eSB1c2VzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIE1hdHRlci51c2VzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGx1Z2lucyB0aGF0IGhhdmUgYmVlbiBpbnN0YWxsZWQgdGhyb3VnaCBgTWF0dGVyLlBsdWdpbi5pbnN0YWxsYC4gUmVhZCBvbmx5LlxuICAgICAqIEBwcm9wZXJ0eSB1c2VkXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIE1hdHRlci51c2VkID0gW107XG5cbiAgICAvKipcbiAgICAgKiBJbnN0YWxscyB0aGUgZ2l2ZW4gcGx1Z2lucyBvbiB0aGUgYE1hdHRlcmAgbmFtZXNwYWNlLlxuICAgICAqIFRoaXMgaXMgYSBzaG9ydC1oYW5kIGZvciBgUGx1Z2luLnVzZWAsIHNlZSBpdCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBDYWxsIHRoaXMgZnVuY3Rpb24gb25jZSBhdCB0aGUgc3RhcnQgb2YgeW91ciBjb2RlLCB3aXRoIGFsbCBvZiB0aGUgcGx1Z2lucyB5b3Ugd2lzaCB0byBpbnN0YWxsIGFzIGFyZ3VtZW50cy5cbiAgICAgKiBBdm9pZCBjYWxsaW5nIHRoaXMgZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMgdW5sZXNzIHlvdSBpbnRlbmQgdG8gbWFudWFsbHkgY29udHJvbCBpbnN0YWxsYXRpb24gb3JkZXIuXG4gICAgICogQG1ldGhvZCB1c2VcbiAgICAgKiBAcGFyYW0gLi4ucGx1Z2luIHtGdW5jdGlvbn0gVGhlIHBsdWdpbihzKSB0byBpbnN0YWxsIG9uIGBiYXNlYCAobXVsdGktYXJndW1lbnQpLlxuICAgICAqL1xuICAgIE1hdHRlci51c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgUGx1Z2luLnVzZShNYXR0ZXIsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGFpbnMgYSBmdW5jdGlvbiB0byBleGN1dGUgYmVmb3JlIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBvbiB0aGUgZ2l2ZW4gYHBhdGhgIHJlbGF0aXZlIHRvIGBNYXR0ZXJgLlxuICAgICAqIFNlZSBhbHNvIGRvY3MgZm9yIGBDb21tb24uY2hhaW5gLlxuICAgICAqIEBtZXRob2QgYmVmb3JlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggcmVsYXRpdmUgdG8gYE1hdHRlcmBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGFpbiBiZWZvcmUgdGhlIG9yaWdpbmFsXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBjaGFpbmVkIGZ1bmN0aW9uIHRoYXQgcmVwbGFjZWQgdGhlIG9yaWdpbmFsXG4gICAgICovXG4gICAgTWF0dGVyLmJlZm9yZSA9IGZ1bmN0aW9uKHBhdGgsIGZ1bmMpIHtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXk1hdHRlci4vLCAnJyk7XG4gICAgICAgIHJldHVybiBDb21tb24uY2hhaW5QYXRoQmVmb3JlKE1hdHRlciwgcGF0aCwgZnVuYyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoYWlucyBhIGZ1bmN0aW9uIHRvIGV4Y3V0ZSBhZnRlciB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gb24gdGhlIGdpdmVuIGBwYXRoYCByZWxhdGl2ZSB0byBgTWF0dGVyYC5cbiAgICAgKiBTZWUgYWxzbyBkb2NzIGZvciBgQ29tbW9uLmNoYWluYC5cbiAgICAgKiBAbWV0aG9kIGFmdGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggcmVsYXRpdmUgdG8gYE1hdHRlcmBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGFpbiBhZnRlciB0aGUgb3JpZ2luYWxcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIGNoYWluZWQgZnVuY3Rpb24gdGhhdCByZXBsYWNlZCB0aGUgb3JpZ2luYWxcbiAgICAgKi9cbiAgICBNYXR0ZXIuYWZ0ZXIgPSBmdW5jdGlvbihwYXRoLCBmdW5jKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15NYXR0ZXIuLywgJycpO1xuICAgICAgICByZXR1cm4gQ29tbW9uLmNoYWluUGF0aEFmdGVyKE1hdHRlciwgcGF0aCwgZnVuYyk7XG4gICAgfTtcblxufSkoKTtcblxufSx7XCIuL0NvbW1vblwiOjE0LFwiLi9QbHVnaW5cIjoyMH1dLDE4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblxufSx7XCIuLi9ib2R5L0NvbXBvc2l0ZVwiOjIsXCIuL0NvbW1vblwiOjE0fV0sMTk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLk1vdXNlYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyBtb3VzZSBpbnB1dHMuXG4qXG4qIEBjbGFzcyBNb3VzZVxuKi9cblxudmFyIE1vdXNlID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gTW91c2U7XG5cbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbW91c2UgaW5wdXQuXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7bW91c2V9IEEgbmV3IG1vdXNlXG4gICAgICovXG4gICAgTW91c2UuY3JlYXRlID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICB2YXIgbW91c2UgPSB7fTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIENvbW1vbi5sb2coJ01vdXNlLmNyZWF0ZTogZWxlbWVudCB3YXMgdW5kZWZpbmVkLCBkZWZhdWx0aW5nIHRvIGRvY3VtZW50LmJvZHknLCAnd2FybicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBtb3VzZS5lbGVtZW50ID0gZWxlbWVudCB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICBtb3VzZS5hYnNvbHV0ZSA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBtb3VzZS5wb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBtb3VzZS5tb3VzZWRvd25Qb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBtb3VzZS5tb3VzZXVwUG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgbW91c2Uub2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIG1vdXNlLnNjYWxlID0geyB4OiAxLCB5OiAxIH07XG4gICAgICAgIG1vdXNlLndoZWVsRGVsdGEgPSAwO1xuICAgICAgICBtb3VzZS5idXR0b24gPSAtMTtcbiAgICAgICAgbW91c2UucGl4ZWxSYXRpbyA9IG1vdXNlLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpeGVsLXJhdGlvJykgfHwgMTtcblxuICAgICAgICBtb3VzZS5zb3VyY2VFdmVudHMgPSB7XG4gICAgICAgICAgICBtb3VzZW1vdmU6IG51bGwsXG4gICAgICAgICAgICBtb3VzZWRvd246IG51bGwsXG4gICAgICAgICAgICBtb3VzZXVwOiBudWxsLFxuICAgICAgICAgICAgbW91c2V3aGVlbDogbnVsbFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgbW91c2UubW91c2Vtb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHsgXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBNb3VzZS5fZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uKGV2ZW50LCBtb3VzZS5lbGVtZW50LCBtb3VzZS5waXhlbFJhdGlvKSxcbiAgICAgICAgICAgICAgICB0b3VjaGVzID0gZXZlbnQuY2hhbmdlZFRvdWNoZXM7XG5cbiAgICAgICAgICAgIGlmICh0b3VjaGVzKSB7XG4gICAgICAgICAgICAgICAgbW91c2UuYnV0dG9uID0gMDtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3VzZS5hYnNvbHV0ZS54ID0gcG9zaXRpb24ueDtcbiAgICAgICAgICAgIG1vdXNlLmFic29sdXRlLnkgPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgbW91c2UucG9zaXRpb24ueCA9IG1vdXNlLmFic29sdXRlLnggKiBtb3VzZS5zY2FsZS54ICsgbW91c2Uub2Zmc2V0Lng7XG4gICAgICAgICAgICBtb3VzZS5wb3NpdGlvbi55ID0gbW91c2UuYWJzb2x1dGUueSAqIG1vdXNlLnNjYWxlLnkgKyBtb3VzZS5vZmZzZXQueTtcbiAgICAgICAgICAgIG1vdXNlLnNvdXJjZUV2ZW50cy5tb3VzZW1vdmUgPSBldmVudDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIG1vdXNlLm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBNb3VzZS5fZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uKGV2ZW50LCBtb3VzZS5lbGVtZW50LCBtb3VzZS5waXhlbFJhdGlvKSxcbiAgICAgICAgICAgICAgICB0b3VjaGVzID0gZXZlbnQuY2hhbmdlZFRvdWNoZXM7XG5cbiAgICAgICAgICAgIGlmICh0b3VjaGVzKSB7XG4gICAgICAgICAgICAgICAgbW91c2UuYnV0dG9uID0gMDtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb3VzZS5idXR0b24gPSBldmVudC5idXR0b247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vdXNlLmFic29sdXRlLnggPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgbW91c2UuYWJzb2x1dGUueSA9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICBtb3VzZS5wb3NpdGlvbi54ID0gbW91c2UuYWJzb2x1dGUueCAqIG1vdXNlLnNjYWxlLnggKyBtb3VzZS5vZmZzZXQueDtcbiAgICAgICAgICAgIG1vdXNlLnBvc2l0aW9uLnkgPSBtb3VzZS5hYnNvbHV0ZS55ICogbW91c2Uuc2NhbGUueSArIG1vdXNlLm9mZnNldC55O1xuICAgICAgICAgICAgbW91c2UubW91c2Vkb3duUG9zaXRpb24ueCA9IG1vdXNlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICBtb3VzZS5tb3VzZWRvd25Qb3NpdGlvbi55ID0gbW91c2UucG9zaXRpb24ueTtcbiAgICAgICAgICAgIG1vdXNlLnNvdXJjZUV2ZW50cy5tb3VzZWRvd24gPSBldmVudDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIG1vdXNlLm1vdXNldXAgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gTW91c2UuX2dldFJlbGF0aXZlTW91c2VQb3NpdGlvbihldmVudCwgbW91c2UuZWxlbWVudCwgbW91c2UucGl4ZWxSYXRpbyksXG4gICAgICAgICAgICAgICAgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzO1xuXG4gICAgICAgICAgICBpZiAodG91Y2hlcykge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1vdXNlLmJ1dHRvbiA9IC0xO1xuICAgICAgICAgICAgbW91c2UuYWJzb2x1dGUueCA9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICBtb3VzZS5hYnNvbHV0ZS55ID0gcG9zaXRpb24ueTtcbiAgICAgICAgICAgIG1vdXNlLnBvc2l0aW9uLnggPSBtb3VzZS5hYnNvbHV0ZS54ICogbW91c2Uuc2NhbGUueCArIG1vdXNlLm9mZnNldC54O1xuICAgICAgICAgICAgbW91c2UucG9zaXRpb24ueSA9IG1vdXNlLmFic29sdXRlLnkgKiBtb3VzZS5zY2FsZS55ICsgbW91c2Uub2Zmc2V0Lnk7XG4gICAgICAgICAgICBtb3VzZS5tb3VzZXVwUG9zaXRpb24ueCA9IG1vdXNlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICBtb3VzZS5tb3VzZXVwUG9zaXRpb24ueSA9IG1vdXNlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICBtb3VzZS5zb3VyY2VFdmVudHMubW91c2V1cCA9IGV2ZW50O1xuICAgICAgICB9O1xuXG4gICAgICAgIG1vdXNlLm1vdXNld2hlZWwgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgbW91c2Uud2hlZWxEZWx0YSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBldmVudC53aGVlbERlbHRhIHx8IC1ldmVudC5kZXRhaWwpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgTW91c2Uuc2V0RWxlbWVudChtb3VzZSwgbW91c2UuZWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIG1vdXNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBlbGVtZW50IHRoZSBtb3VzZSBpcyBib3VuZCB0byAoYW5kIHJlbGF0aXZlIHRvKS5cbiAgICAgKiBAbWV0aG9kIHNldEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge21vdXNlfSBtb3VzZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBNb3VzZS5zZXRFbGVtZW50ID0gZnVuY3Rpb24obW91c2UsIGVsZW1lbnQpIHtcbiAgICAgICAgbW91c2UuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZS5tb3VzZW1vdmUpO1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlLm1vdXNlZG93bik7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlLm1vdXNldXApO1xuICAgICAgICBcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgbW91c2UubW91c2V3aGVlbCk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBtb3VzZS5tb3VzZXdoZWVsKTtcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlLm1vdXNlbW92ZSk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG1vdXNlLm1vdXNlZG93bik7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZS5tb3VzZXVwKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGFsbCBjYXB0dXJlZCBzb3VyY2UgZXZlbnRzLlxuICAgICAqIEBtZXRob2QgY2xlYXJTb3VyY2VFdmVudHNcbiAgICAgKiBAcGFyYW0ge21vdXNlfSBtb3VzZVxuICAgICAqL1xuICAgIE1vdXNlLmNsZWFyU291cmNlRXZlbnRzID0gZnVuY3Rpb24obW91c2UpIHtcbiAgICAgICAgbW91c2Uuc291cmNlRXZlbnRzLm1vdXNlbW92ZSA9IG51bGw7XG4gICAgICAgIG1vdXNlLnNvdXJjZUV2ZW50cy5tb3VzZWRvd24gPSBudWxsO1xuICAgICAgICBtb3VzZS5zb3VyY2VFdmVudHMubW91c2V1cCA9IG51bGw7XG4gICAgICAgIG1vdXNlLnNvdXJjZUV2ZW50cy5tb3VzZXdoZWVsID0gbnVsbDtcbiAgICAgICAgbW91c2Uud2hlZWxEZWx0YSA9IDA7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1vdXNlIHBvc2l0aW9uIG9mZnNldC5cbiAgICAgKiBAbWV0aG9kIHNldE9mZnNldFxuICAgICAqIEBwYXJhbSB7bW91c2V9IG1vdXNlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IG9mZnNldFxuICAgICAqL1xuICAgIE1vdXNlLnNldE9mZnNldCA9IGZ1bmN0aW9uKG1vdXNlLCBvZmZzZXQpIHtcbiAgICAgICAgbW91c2Uub2Zmc2V0LnggPSBvZmZzZXQueDtcbiAgICAgICAgbW91c2Uub2Zmc2V0LnkgPSBvZmZzZXQueTtcbiAgICAgICAgbW91c2UucG9zaXRpb24ueCA9IG1vdXNlLmFic29sdXRlLnggKiBtb3VzZS5zY2FsZS54ICsgbW91c2Uub2Zmc2V0Lng7XG4gICAgICAgIG1vdXNlLnBvc2l0aW9uLnkgPSBtb3VzZS5hYnNvbHV0ZS55ICogbW91c2Uuc2NhbGUueSArIG1vdXNlLm9mZnNldC55O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtb3VzZSBwb3NpdGlvbiBzY2FsZS5cbiAgICAgKiBAbWV0aG9kIHNldFNjYWxlXG4gICAgICogQHBhcmFtIHttb3VzZX0gbW91c2VcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gc2NhbGVcbiAgICAgKi9cbiAgICBNb3VzZS5zZXRTY2FsZSA9IGZ1bmN0aW9uKG1vdXNlLCBzY2FsZSkge1xuICAgICAgICBtb3VzZS5zY2FsZS54ID0gc2NhbGUueDtcbiAgICAgICAgbW91c2Uuc2NhbGUueSA9IHNjYWxlLnk7XG4gICAgICAgIG1vdXNlLnBvc2l0aW9uLnggPSBtb3VzZS5hYnNvbHV0ZS54ICogbW91c2Uuc2NhbGUueCArIG1vdXNlLm9mZnNldC54O1xuICAgICAgICBtb3VzZS5wb3NpdGlvbi55ID0gbW91c2UuYWJzb2x1dGUueSAqIG1vdXNlLnNjYWxlLnkgKyBtb3VzZS5vZmZzZXQueTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1vdXNlIHBvc2l0aW9uIHJlbGF0aXZlIHRvIGFuIGVsZW1lbnQgZ2l2ZW4gYSBzY3JlZW4gcGl4ZWwgcmF0aW8uXG4gICAgICogQG1ldGhvZCBfZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge30gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbFJhdGlvXG4gICAgICogQHJldHVybiB7fVxuICAgICAqL1xuICAgIE1vdXNlLl9nZXRSZWxhdGl2ZU1vdXNlUG9zaXRpb24gPSBmdW5jdGlvbihldmVudCwgZWxlbWVudCwgcGl4ZWxSYXRpbykge1xuICAgICAgICB2YXIgZWxlbWVudEJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICByb290Tm9kZSA9IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlIHx8IGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgICAgc2Nyb2xsWCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgIT09IHVuZGVmaW5lZCkgPyB3aW5kb3cucGFnZVhPZmZzZXQgOiByb290Tm9kZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgc2Nyb2xsWSA9ICh3aW5kb3cucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCkgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiByb290Tm9kZS5zY3JvbGxUb3AsXG4gICAgICAgICAgICB0b3VjaGVzID0gZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICB4LCB5O1xuICAgICAgICBcbiAgICAgICAgaWYgKHRvdWNoZXMpIHtcbiAgICAgICAgICAgIHggPSB0b3VjaGVzWzBdLnBhZ2VYIC0gZWxlbWVudEJvdW5kcy5sZWZ0IC0gc2Nyb2xsWDtcbiAgICAgICAgICAgIHkgPSB0b3VjaGVzWzBdLnBhZ2VZIC0gZWxlbWVudEJvdW5kcy50b3AgLSBzY3JvbGxZO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IGV2ZW50LnBhZ2VYIC0gZWxlbWVudEJvdW5kcy5sZWZ0IC0gc2Nyb2xsWDtcbiAgICAgICAgICAgIHkgPSBldmVudC5wYWdlWSAtIGVsZW1lbnRCb3VuZHMudG9wIC0gc2Nyb2xsWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IFxuICAgICAgICAgICAgeDogeCAvIChlbGVtZW50LmNsaWVudFdpZHRoIC8gKGVsZW1lbnQud2lkdGggfHwgZWxlbWVudC5jbGllbnRXaWR0aCkgKiBwaXhlbFJhdGlvKSxcbiAgICAgICAgICAgIHk6IHkgLyAoZWxlbWVudC5jbGllbnRIZWlnaHQgLyAoZWxlbWVudC5oZWlnaHQgfHwgZWxlbWVudC5jbGllbnRIZWlnaHQpICogcGl4ZWxSYXRpbylcbiAgICAgICAgfTtcbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4uL2NvcmUvQ29tbW9uXCI6MTR9XSwyMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuUGx1Z2luYCBtb2R1bGUgY29udGFpbnMgZnVuY3Rpb25zIGZvciByZWdpc3RlcmluZyBhbmQgaW5zdGFsbGluZyBwbHVnaW5zIG9uIG1vZHVsZXMuXG4qXG4qIEBjbGFzcyBQbHVnaW5cbiovXG5cbnZhciBQbHVnaW4gPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbHVnaW47XG5cbnZhciBDb21tb24gPSBfZGVyZXFfKCcuL0NvbW1vbicpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBQbHVnaW4uX3JlZ2lzdHJ5ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBwbHVnaW4gb2JqZWN0IHNvIGl0IGNhbiBiZSByZXNvbHZlZCBsYXRlciBieSBuYW1lLlxuICAgICAqIEBtZXRob2QgcmVnaXN0ZXJcbiAgICAgKiBAcGFyYW0gcGx1Z2luIHt9IFRoZSBwbHVnaW4gdG8gcmVnaXN0ZXIuXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgcGx1Z2luLlxuICAgICAqL1xuICAgIFBsdWdpbi5yZWdpc3RlciA9IGZ1bmN0aW9uKHBsdWdpbikge1xuICAgICAgICBpZiAoIVBsdWdpbi5pc1BsdWdpbihwbHVnaW4pKSB7XG4gICAgICAgICAgICBDb21tb24ud2FybignUGx1Z2luLnJlZ2lzdGVyOicsIFBsdWdpbi50b1N0cmluZyhwbHVnaW4pLCAnZG9lcyBub3QgaW1wbGVtZW50IGFsbCByZXF1aXJlZCBmaWVsZHMuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGx1Z2luLm5hbWUgaW4gUGx1Z2luLl9yZWdpc3RyeSkge1xuICAgICAgICAgICAgdmFyIHJlZ2lzdGVyZWQgPSBQbHVnaW4uX3JlZ2lzdHJ5W3BsdWdpbi5uYW1lXSxcbiAgICAgICAgICAgICAgICBwbHVnaW5WZXJzaW9uID0gUGx1Z2luLnZlcnNpb25QYXJzZShwbHVnaW4udmVyc2lvbikubnVtYmVyLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWRWZXJzaW9uID0gUGx1Z2luLnZlcnNpb25QYXJzZShyZWdpc3RlcmVkLnZlcnNpb24pLm51bWJlcjtcblxuICAgICAgICAgICAgaWYgKHBsdWdpblZlcnNpb24gPiByZWdpc3RlcmVkVmVyc2lvbikge1xuICAgICAgICAgICAgICAgIENvbW1vbi53YXJuKCdQbHVnaW4ucmVnaXN0ZXI6JywgUGx1Z2luLnRvU3RyaW5nKHJlZ2lzdGVyZWQpLCAnd2FzIHVwZ3JhZGVkIHRvJywgUGx1Z2luLnRvU3RyaW5nKHBsdWdpbikpO1xuICAgICAgICAgICAgICAgIFBsdWdpbi5fcmVnaXN0cnlbcGx1Z2luLm5hbWVdID0gcGx1Z2luO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwbHVnaW5WZXJzaW9uIDwgcmVnaXN0ZXJlZFZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICBDb21tb24ud2FybignUGx1Z2luLnJlZ2lzdGVyOicsIFBsdWdpbi50b1N0cmluZyhyZWdpc3RlcmVkKSwgJ2NhbiBub3QgYmUgZG93bmdyYWRlZCB0bycsIFBsdWdpbi50b1N0cmluZyhwbHVnaW4pKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGx1Z2luICE9PSByZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1BsdWdpbi5yZWdpc3RlcjonLCBQbHVnaW4udG9TdHJpbmcocGx1Z2luKSwgJ2lzIGFscmVhZHkgcmVnaXN0ZXJlZCB0byBkaWZmZXJlbnQgcGx1Z2luIG9iamVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGx1Z2luLl9yZWdpc3RyeVtwbHVnaW4ubmFtZV0gPSBwbHVnaW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGx1Z2luO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyBhIGRlcGVuZGVuY3kgdG8gYSBwbHVnaW4gb2JqZWN0IGZyb20gdGhlIHJlZ2lzdHJ5IGlmIGl0IGV4aXN0cy4gXG4gICAgICogVGhlIGBkZXBlbmRlbmN5YCBtYXkgY29udGFpbiBhIHZlcnNpb24sIGJ1dCBvbmx5IHRoZSBuYW1lIG1hdHRlcnMgd2hlbiByZXNvbHZpbmcuXG4gICAgICogQG1ldGhvZCByZXNvbHZlXG4gICAgICogQHBhcmFtIGRlcGVuZGVuY3kge3N0cmluZ30gVGhlIGRlcGVuZGVuY3kuXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgcGx1Z2luIGlmIHJlc29sdmVkLCBvdGhlcndpc2UgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGx1Z2luLnJlc29sdmUgPSBmdW5jdGlvbihkZXBlbmRlbmN5KSB7XG4gICAgICAgIHJldHVybiBQbHVnaW4uX3JlZ2lzdHJ5W1BsdWdpbi5kZXBlbmRlbmN5UGFyc2UoZGVwZW5kZW5jeSkubmFtZV07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcmV0dHkgcHJpbnRlZCBwbHVnaW4gbmFtZSBhbmQgdmVyc2lvbi5cbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXG4gICAgICogQHBhcmFtIHBsdWdpbiB7fSBUaGUgcGx1Z2luLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gUHJldHR5IHByaW50ZWQgcGx1Z2luIG5hbWUgYW5kIHZlcnNpb24uXG4gICAgICovXG4gICAgUGx1Z2luLnRvU3RyaW5nID0gZnVuY3Rpb24ocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcGx1Z2luID09PSAnc3RyaW5nJyA/IHBsdWdpbiA6IChwbHVnaW4ubmFtZSB8fCAnYW5vbnltb3VzJykgKyAnQCcgKyAocGx1Z2luLnZlcnNpb24gfHwgcGx1Z2luLnJhbmdlIHx8ICcwLjAuMCcpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0IG1lZXRzIHRoZSBtaW5pbXVtIHN0YW5kYXJkIHRvIGJlIGNvbnNpZGVyZWQgYSBwbHVnaW4uXG4gICAgICogVGhpcyBtZWFucyBpdCBtdXN0IGRlZmluZSB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAgICogLSBgbmFtZWBcbiAgICAgKiAtIGB2ZXJzaW9uYFxuICAgICAqIC0gYGluc3RhbGxgXG4gICAgICogQG1ldGhvZCBpc1BsdWdpblxuICAgICAqIEBwYXJhbSBvYmoge30gVGhlIG9iaiB0byB0ZXN0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgb2JqZWN0IGNhbiBiZSBjb25zaWRlcmVkIGEgcGx1Z2luIG90aGVyd2lzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIFBsdWdpbi5pc1BsdWdpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIG9iai5uYW1lICYmIG9iai52ZXJzaW9uICYmIG9iai5pbnN0YWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBhIHBsdWdpbiB3aXRoIHRoZSBnaXZlbiBgbmFtZWAgYmVlbiBpbnN0YWxsZWQgb24gYG1vZHVsZWAuXG4gICAgICogQG1ldGhvZCBpc1VzZWRcbiAgICAgKiBAcGFyYW0gbW9kdWxlIHt9IFRoZSBtb2R1bGUuXG4gICAgICogQHBhcmFtIG5hbWUge3N0cmluZ30gVGhlIHBsdWdpbiBuYW1lLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCBpZiBhIHBsdWdpbiB3aXRoIHRoZSBnaXZlbiBgbmFtZWAgYmVlbiBpbnN0YWxsZWQgb24gYG1vZHVsZWAsIG90aGVyd2lzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIFBsdWdpbi5pc1VzZWQgPSBmdW5jdGlvbihtb2R1bGUsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZS51c2VkLmluZGV4T2YobmFtZSkgPiAtMTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYHBsdWdpbi5mb3JgIGlzIGFwcGxpY2FibGUgdG8gYG1vZHVsZWAgYnkgY29tcGFyaW5nIGFnYWluc3QgYG1vZHVsZS5uYW1lYCBhbmQgYG1vZHVsZS52ZXJzaW9uYC5cbiAgICAgKiBJZiBgcGx1Z2luLmZvcmAgaXMgbm90IHNwZWNpZmllZCB0aGVuIGl0IGlzIGFzc3VtZWQgdG8gYmUgYXBwbGljYWJsZS5cbiAgICAgKiBUaGUgdmFsdWUgb2YgYHBsdWdpbi5mb3JgIGlzIGEgc3RyaW5nIG9mIHRoZSBmb3JtYXQgYCdtb2R1bGUtbmFtZSdgIG9yIGAnbW9kdWxlLW5hbWVAdmVyc2lvbidgLlxuICAgICAqIEBtZXRob2QgaXNGb3JcbiAgICAgKiBAcGFyYW0gcGx1Z2luIHt9IFRoZSBwbHVnaW4uXG4gICAgICogQHBhcmFtIG1vZHVsZSB7fSBUaGUgbW9kdWxlLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCBpZiBgcGx1Z2luLmZvcmAgaXMgYXBwbGljYWJsZSB0byBgbW9kdWxlYCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgUGx1Z2luLmlzRm9yID0gZnVuY3Rpb24ocGx1Z2luLCBtb2R1bGUpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9IHBsdWdpbi5mb3IgJiYgUGx1Z2luLmRlcGVuZGVuY3lQYXJzZShwbHVnaW4uZm9yKTtcbiAgICAgICAgcmV0dXJuICFwbHVnaW4uZm9yIHx8IChtb2R1bGUubmFtZSA9PT0gcGFyc2VkLm5hbWUgJiYgUGx1Z2luLnZlcnNpb25TYXRpc2ZpZXMobW9kdWxlLnZlcnNpb24sIHBhcnNlZC5yYW5nZSkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbnN0YWxscyB0aGUgcGx1Z2lucyBieSBjYWxsaW5nIGBwbHVnaW4uaW5zdGFsbGAgb24gZWFjaCBwbHVnaW4gc3BlY2lmaWVkIGluIGBwbHVnaW5zYCBpZiBwYXNzZWQsIG90aGVyd2lzZSBgbW9kdWxlLnVzZXNgLlxuICAgICAqIEZvciBpbnN0YWxsaW5nIHBsdWdpbnMgb24gYE1hdHRlcmAgc2VlIHRoZSBjb252ZW5pZW5jZSBmdW5jdGlvbiBgTWF0dGVyLnVzZWAuXG4gICAgICogUGx1Z2lucyBtYXkgYmUgc3BlY2lmaWVkIGVpdGhlciBieSB0aGVpciBuYW1lIG9yIGEgcmVmZXJlbmNlIHRvIHRoZSBwbHVnaW4gb2JqZWN0LlxuICAgICAqIFBsdWdpbnMgdGhlbXNlbHZlcyBtYXkgc3BlY2lmeSBmdXJ0aGVyIGRlcGVuZGVuY2llcywgYnV0IGVhY2ggcGx1Z2luIGlzIGluc3RhbGxlZCBvbmx5IG9uY2UuXG4gICAgICogT3JkZXIgaXMgaW1wb3J0YW50LCBhIHRvcG9sb2dpY2FsIHNvcnQgaXMgcGVyZm9ybWVkIHRvIGZpbmQgdGhlIGJlc3QgcmVzdWx0aW5nIG9yZGVyIG9mIGluc3RhbGxhdGlvbi5cbiAgICAgKiBUaGlzIHNvcnRpbmcgYXR0ZW1wdHMgdG8gc2F0aXNmeSBldmVyeSBkZXBlbmRlbmN5J3MgcmVxdWVzdGVkIG9yZGVyaW5nLCBidXQgbWF5IG5vdCBiZSBleGFjdCBpbiBhbGwgY2FzZXMuXG4gICAgICogVGhpcyBmdW5jdGlvbiBsb2dzIHRoZSByZXN1bHRpbmcgc3RhdHVzIG9mIGVhY2ggZGVwZW5kZW5jeSBpbiB0aGUgY29uc29sZSwgYWxvbmcgd2l0aCBhbnkgd2FybmluZ3MuXG4gICAgICogLSBBIGdyZWVuIHRpY2sg4pyFIGluZGljYXRlcyBhIGRlcGVuZGVuY3kgd2FzIHJlc29sdmVkIGFuZCBpbnN0YWxsZWQuXG4gICAgICogLSBBbiBvcmFuZ2UgZGlhbW9uZCDwn5S2IGluZGljYXRlcyBhIGRlcGVuZGVuY3kgd2FzIHJlc29sdmVkIGJ1dCBhIHdhcm5pbmcgd2FzIHRocm93biBmb3IgaXQgb3Igb25lIGlmIGl0cyBkZXBlbmRlbmNpZXMuXG4gICAgICogLSBBIHJlZCBjcm9zcyDinYwgaW5kaWNhdGVzIGEgZGVwZW5kZW5jeSBjb3VsZCBub3QgYmUgcmVzb2x2ZWQuXG4gICAgICogQXZvaWQgY2FsbGluZyB0aGlzIGZ1bmN0aW9uIG11bHRpcGxlIHRpbWVzIG9uIHRoZSBzYW1lIG1vZHVsZSB1bmxlc3MgeW91IGludGVuZCB0byBtYW51YWxseSBjb250cm9sIGluc3RhbGxhdGlvbiBvcmRlci5cbiAgICAgKiBAbWV0aG9kIHVzZVxuICAgICAqIEBwYXJhbSBtb2R1bGUge30gVGhlIG1vZHVsZSBpbnN0YWxsIHBsdWdpbnMgb24uXG4gICAgICogQHBhcmFtIFtwbHVnaW5zPW1vZHVsZS51c2VzXSB7fSBUaGUgcGx1Z2lucyB0byBpbnN0YWxsIG9uIG1vZHVsZSAob3B0aW9uYWwsIGRlZmF1bHRzIHRvIGBtb2R1bGUudXNlc2ApLlxuICAgICAqL1xuICAgIFBsdWdpbi51c2UgPSBmdW5jdGlvbihtb2R1bGUsIHBsdWdpbnMpIHtcbiAgICAgICAgbW9kdWxlLnVzZXMgPSAobW9kdWxlLnVzZXMgfHwgW10pLmNvbmNhdChwbHVnaW5zIHx8IFtdKTtcblxuICAgICAgICBpZiAobW9kdWxlLnVzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBDb21tb24ud2FybignUGx1Z2luLnVzZTonLCBQbHVnaW4udG9TdHJpbmcobW9kdWxlKSwgJ2RvZXMgbm90IHNwZWNpZnkgYW55IGRlcGVuZGVuY2llcyB0byBpbnN0YWxsLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlcGVuZGVuY2llcyA9IFBsdWdpbi5kZXBlbmRlbmNpZXMobW9kdWxlKSxcbiAgICAgICAgICAgIHNvcnRlZERlcGVuZGVuY2llcyA9IENvbW1vbi50b3BvbG9naWNhbFNvcnQoZGVwZW5kZW5jaWVzKSxcbiAgICAgICAgICAgIHN0YXR1cyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc29ydGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoc29ydGVkRGVwZW5kZW5jaWVzW2ldID09PSBtb2R1bGUubmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gUGx1Z2luLnJlc29sdmUoc29ydGVkRGVwZW5kZW5jaWVzW2ldKTtcblxuICAgICAgICAgICAgaWYgKCFwbHVnaW4pIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMucHVzaCgn4p2MICcgKyBzb3J0ZWREZXBlbmRlbmNpZXNbaV0pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoUGx1Z2luLmlzVXNlZChtb2R1bGUsIHBsdWdpbi5uYW1lKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIVBsdWdpbi5pc0ZvcihwbHVnaW4sIG1vZHVsZSkpIHtcbiAgICAgICAgICAgICAgICBDb21tb24ud2FybignUGx1Z2luLnVzZTonLCBQbHVnaW4udG9TdHJpbmcocGx1Z2luKSwgJ2lzIGZvcicsIHBsdWdpbi5mb3IsICdidXQgaW5zdGFsbGVkIG9uJywgUGx1Z2luLnRvU3RyaW5nKG1vZHVsZSkgKyAnLicpO1xuICAgICAgICAgICAgICAgIHBsdWdpbi5fd2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsdWdpbi5pbnN0YWxsKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluc3RhbGwobW9kdWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1BsdWdpbi51c2U6JywgUGx1Z2luLnRvU3RyaW5nKHBsdWdpbiksICdkb2VzIG5vdCBzcGVjaWZ5IGFuIGluc3RhbGwgZnVuY3Rpb24uJyk7XG4gICAgICAgICAgICAgICAgcGx1Z2luLl93YXJuZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGx1Z2luLl93YXJuZWQpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMucHVzaCgn8J+UtiAnICsgUGx1Z2luLnRvU3RyaW5nKHBsdWdpbikpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbHVnaW4uX3dhcm5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goJ+KchSAnICsgUGx1Z2luLnRvU3RyaW5nKHBsdWdpbikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb2R1bGUudXNlZC5wdXNoKHBsdWdpbi5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgQ29tbW9uLmluZm8oc3RhdHVzLmpvaW4oJyAgJykpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IGZpbmRzIGFsbCBvZiBhIG1vZHVsZSdzIGRlcGVuZGVuY2llcyBhbmQgcmV0dXJucyBhIGZsYXQgZGVwZW5kZW5jeSBncmFwaC5cbiAgICAgKiBAbWV0aG9kIGRlcGVuZGVuY2llc1xuICAgICAqIEBwYXJhbSBtb2R1bGUge30gVGhlIG1vZHVsZS5cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IEEgZGVwZW5kZW5jeSBncmFwaC5cbiAgICAgKi9cbiAgICBQbHVnaW4uZGVwZW5kZW5jaWVzID0gZnVuY3Rpb24obW9kdWxlLCB0cmFja2VkKSB7XG4gICAgICAgIHZhciBwYXJzZWRCYXNlID0gUGx1Z2luLmRlcGVuZGVuY3lQYXJzZShtb2R1bGUpLFxuICAgICAgICAgICAgbmFtZSA9IHBhcnNlZEJhc2UubmFtZTtcblxuICAgICAgICB0cmFja2VkID0gdHJhY2tlZCB8fCB7fTtcblxuICAgICAgICBpZiAobmFtZSBpbiB0cmFja2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBtb2R1bGUgPSBQbHVnaW4ucmVzb2x2ZShtb2R1bGUpIHx8IG1vZHVsZTtcblxuICAgICAgICB0cmFja2VkW25hbWVdID0gQ29tbW9uLm1hcChtb2R1bGUudXNlcyB8fCBbXSwgZnVuY3Rpb24oZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgaWYgKFBsdWdpbi5pc1BsdWdpbihkZXBlbmRlbmN5KSkge1xuICAgICAgICAgICAgICAgIFBsdWdpbi5yZWdpc3RlcihkZXBlbmRlbmN5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IFBsdWdpbi5kZXBlbmRlbmN5UGFyc2UoZGVwZW5kZW5jeSksXG4gICAgICAgICAgICAgICAgcmVzb2x2ZWQgPSBQbHVnaW4ucmVzb2x2ZShkZXBlbmRlbmN5KTtcblxuICAgICAgICAgICAgaWYgKHJlc29sdmVkICYmICFQbHVnaW4udmVyc2lvblNhdGlzZmllcyhyZXNvbHZlZC52ZXJzaW9uLCBwYXJzZWQucmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICdQbHVnaW4uZGVwZW5kZW5jaWVzOicsIFBsdWdpbi50b1N0cmluZyhyZXNvbHZlZCksICdkb2VzIG5vdCBzYXRpc2Z5JyxcbiAgICAgICAgICAgICAgICAgICAgUGx1Z2luLnRvU3RyaW5nKHBhcnNlZCksICd1c2VkIGJ5JywgUGx1Z2luLnRvU3RyaW5nKHBhcnNlZEJhc2UpICsgJy4nXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmVkLl93YXJuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1vZHVsZS5fd2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICdQbHVnaW4uZGVwZW5kZW5jaWVzOicsIFBsdWdpbi50b1N0cmluZyhkZXBlbmRlbmN5KSwgJ3VzZWQgYnknLFxuICAgICAgICAgICAgICAgICAgICBQbHVnaW4udG9TdHJpbmcocGFyc2VkQmFzZSksICdjb3VsZCBub3QgYmUgcmVzb2x2ZWQuJ1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBtb2R1bGUuX3dhcm5lZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJzZWQubmFtZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFja2VkW25hbWVdLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBQbHVnaW4uZGVwZW5kZW5jaWVzKHRyYWNrZWRbbmFtZV1baV0sIHRyYWNrZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRyYWNrZWQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIGRlcGVuZGVuY3kgc3RyaW5nIGludG8gaXRzIGNvbXBvbmVudHMuXG4gICAgICogVGhlIGBkZXBlbmRlbmN5YCBpcyBhIHN0cmluZyBvZiB0aGUgZm9ybWF0IGAnbW9kdWxlLW5hbWUnYCBvciBgJ21vZHVsZS1uYW1lQHZlcnNpb24nYC5cbiAgICAgKiBTZWUgZG9jdW1lbnRhdGlvbiBmb3IgYFBsdWdpbi52ZXJzaW9uUGFyc2VgIGZvciBhIGRlc2NyaXB0aW9uIG9mIHRoZSBmb3JtYXQuXG4gICAgICogVGhpcyBmdW5jdGlvbiBjYW4gYWxzbyBoYW5kbGUgZGVwZW5kZW5jaWVzIHRoYXQgYXJlIGFscmVhZHkgcmVzb2x2ZWQgKGUuZy4gYSBtb2R1bGUgb2JqZWN0KS5cbiAgICAgKiBAbWV0aG9kIGRlcGVuZGVuY3lQYXJzZVxuICAgICAqIEBwYXJhbSBkZXBlbmRlbmN5IHtzdHJpbmd9IFRoZSBkZXBlbmRlbmN5IG9mIHRoZSBmb3JtYXQgYCdtb2R1bGUtbmFtZSdgIG9yIGAnbW9kdWxlLW5hbWVAdmVyc2lvbidgLlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gVGhlIGRlcGVuZGVuY3kgcGFyc2VkIGludG8gaXRzIGNvbXBvbmVudHMuXG4gICAgICovXG4gICAgUGx1Z2luLmRlcGVuZGVuY3lQYXJzZSA9IGZ1bmN0aW9uKGRlcGVuZGVuY3kpIHtcbiAgICAgICAgaWYgKENvbW1vbi5pc1N0cmluZyhkZXBlbmRlbmN5KSkge1xuICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvXltcXHctXSsoQChcXCp8W1xcXn5dP1xcZCtcXC5cXGQrXFwuXFxkKygtWzAtOUEtWmEtei1dKyk/KSk/JC87XG5cbiAgICAgICAgICAgIGlmICghcGF0dGVybi50ZXN0KGRlcGVuZGVuY3kpKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1BsdWdpbi5kZXBlbmRlbmN5UGFyc2U6JywgZGVwZW5kZW5jeSwgJ2lzIG5vdCBhIHZhbGlkIGRlcGVuZGVuY3kgc3RyaW5nLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kuc3BsaXQoJ0AnKVswXSxcbiAgICAgICAgICAgICAgICByYW5nZTogZGVwZW5kZW5jeS5zcGxpdCgnQCcpWzFdIHx8ICcqJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICByYW5nZTogZGVwZW5kZW5jeS5yYW5nZSB8fCBkZXBlbmRlbmN5LnZlcnNpb25cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgdmVyc2lvbiBzdHJpbmcgaW50byBpdHMgY29tcG9uZW50cy4gIFxuICAgICAqIFZlcnNpb25zIGFyZSBzdHJpY3RseSBvZiB0aGUgZm9ybWF0IGB4LnkuemAgKGFzIGluIFtzZW12ZXJdKGh0dHA6Ly9zZW12ZXIub3JnLykpLlxuICAgICAqIFZlcnNpb25zIG1heSBvcHRpb25hbGx5IGhhdmUgYSBwcmVyZWxlYXNlIHRhZyBpbiB0aGUgZm9ybWF0IGB4Lnkuei1hbHBoYWAuXG4gICAgICogUmFuZ2VzIGFyZSBhIHN0cmljdCBzdWJzZXQgb2YgW25wbSByYW5nZXNdKGh0dHBzOi8vZG9jcy5ucG1qcy5jb20vbWlzYy9zZW12ZXIjYWR2YW5jZWQtcmFuZ2Utc3ludGF4KS5cbiAgICAgKiBPbmx5IHRoZSBmb2xsb3dpbmcgcmFuZ2UgdHlwZXMgYXJlIHN1cHBvcnRlZDpcbiAgICAgKiAtIFRpbGRlIHJhbmdlcyBlLmcuIGB+MS4yLjNgXG4gICAgICogLSBDYXJldCByYW5nZXMgZS5nLiBgXjEuMi4zYFxuICAgICAqIC0gRXhhY3QgdmVyc2lvbiBlLmcuIGAxLjIuM2BcbiAgICAgKiAtIEFueSB2ZXJzaW9uIGAqYFxuICAgICAqIEBtZXRob2QgdmVyc2lvblBhcnNlXG4gICAgICogQHBhcmFtIHJhbmdlIHtzdHJpbmd9IFRoZSB2ZXJzaW9uIHN0cmluZy5cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSB2ZXJzaW9uIHJhbmdlIHBhcnNlZCBpbnRvIGl0cyBjb21wb25lbnRzLlxuICAgICAqL1xuICAgIFBsdWdpbi52ZXJzaW9uUGFyc2UgPSBmdW5jdGlvbihyYW5nZSkge1xuICAgICAgICB2YXIgcGF0dGVybiA9IC9eXFwqfFtcXF5+XT9cXGQrXFwuXFxkK1xcLlxcZCsoLVswLTlBLVphLXotXSspPyQvO1xuXG4gICAgICAgIGlmICghcGF0dGVybi50ZXN0KHJhbmdlKSkge1xuICAgICAgICAgICAgQ29tbW9uLndhcm4oJ1BsdWdpbi52ZXJzaW9uUGFyc2U6JywgcmFuZ2UsICdpcyBub3QgYSB2YWxpZCB2ZXJzaW9uIG9yIHJhbmdlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlkZW50aWZpZXJzID0gcmFuZ2Uuc3BsaXQoJy0nKTtcbiAgICAgICAgcmFuZ2UgPSBpZGVudGlmaWVyc1swXTtcblxuICAgICAgICB2YXIgaXNSYW5nZSA9IGlzTmFOKE51bWJlcihyYW5nZVswXSkpLFxuICAgICAgICAgICAgdmVyc2lvbiA9IGlzUmFuZ2UgPyByYW5nZS5zdWJzdHIoMSkgOiByYW5nZSxcbiAgICAgICAgICAgIHBhcnRzID0gQ29tbW9uLm1hcCh2ZXJzaW9uLnNwbGl0KCcuJyksIGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHBhcnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzUmFuZ2U6IGlzUmFuZ2UsXG4gICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgb3BlcmF0b3I6IGlzUmFuZ2UgPyByYW5nZVswXSA6ICcnLFxuICAgICAgICAgICAgcGFydHM6IHBhcnRzLFxuICAgICAgICAgICAgcHJlcmVsZWFzZTogaWRlbnRpZmllcnNbMV0sXG4gICAgICAgICAgICBudW1iZXI6IHBhcnRzWzBdICogMWU4ICsgcGFydHNbMV0gKiAxZTQgKyBwYXJ0c1syXVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBgdmVyc2lvbmAgc2F0aXNmaWVzIHRoZSBnaXZlbiBgcmFuZ2VgLlxuICAgICAqIFNlZSBkb2N1bWVudGF0aW9uIGZvciBgUGx1Z2luLnZlcnNpb25QYXJzZWAgZm9yIGEgZGVzY3JpcHRpb24gb2YgdGhlIGZvcm1hdC5cbiAgICAgKiBJZiBhIHZlcnNpb24gb3IgcmFuZ2UgaXMgbm90IHNwZWNpZmllZCwgdGhlbiBhbnkgdmVyc2lvbiAoYCpgKSBpcyBhc3N1bWVkIHRvIHNhdGlzZnkuXG4gICAgICogQG1ldGhvZCB2ZXJzaW9uU2F0aXNmaWVzXG4gICAgICogQHBhcmFtIHZlcnNpb24ge3N0cmluZ30gVGhlIHZlcnNpb24gc3RyaW5nLlxuICAgICAqIEBwYXJhbSByYW5nZSB7c3RyaW5nfSBUaGUgcmFuZ2Ugc3RyaW5nLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCBpZiBgdmVyc2lvbmAgc2F0aXNmaWVzIGByYW5nZWAsIG90aGVyd2lzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIFBsdWdpbi52ZXJzaW9uU2F0aXNmaWVzID0gZnVuY3Rpb24odmVyc2lvbiwgcmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSByYW5nZSB8fCAnKic7XG5cbiAgICAgICAgdmFyIHJhbmdlUGFyc2VkID0gUGx1Z2luLnZlcnNpb25QYXJzZShyYW5nZSksXG4gICAgICAgICAgICByYW5nZVBhcnRzID0gcmFuZ2VQYXJzZWQucGFydHMsXG4gICAgICAgICAgICB2ZXJzaW9uUGFyc2VkID0gUGx1Z2luLnZlcnNpb25QYXJzZSh2ZXJzaW9uKSxcbiAgICAgICAgICAgIHZlcnNpb25QYXJ0cyA9IHZlcnNpb25QYXJzZWQucGFydHM7XG5cbiAgICAgICAgaWYgKHJhbmdlUGFyc2VkLmlzUmFuZ2UpIHtcbiAgICAgICAgICAgIGlmIChyYW5nZVBhcnNlZC5vcGVyYXRvciA9PT0gJyonIHx8IHZlcnNpb24gPT09ICcqJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmFuZ2VQYXJzZWQub3BlcmF0b3IgPT09ICd+Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uUGFydHNbMF0gPT09IHJhbmdlUGFydHNbMF0gJiYgdmVyc2lvblBhcnRzWzFdID09PSByYW5nZVBhcnRzWzFdICYmIHZlcnNpb25QYXJ0c1syXSA+PSByYW5nZVBhcnRzWzJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmFuZ2VQYXJzZWQub3BlcmF0b3IgPT09ICdeJykge1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZVBhcnRzWzBdID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmVyc2lvblBhcnRzWzBdID09PSByYW5nZVBhcnRzWzBdICYmIHZlcnNpb25QYXJzZWQubnVtYmVyID49IHJhbmdlUGFyc2VkLm51bWJlcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VQYXJ0c1sxXSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZlcnNpb25QYXJ0c1sxXSA9PT0gcmFuZ2VQYXJ0c1sxXSAmJiB2ZXJzaW9uUGFydHNbMl0gPj0gcmFuZ2VQYXJ0c1syXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmVyc2lvblBhcnRzWzJdID09PSByYW5nZVBhcnRzWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZlcnNpb24gPT09IHJhbmdlIHx8IHZlcnNpb24gPT09ICcqJztcbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4vQ29tbW9uXCI6MTR9XSwyMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuUnVubmVyYCBtb2R1bGUgaXMgYW4gb3B0aW9uYWwgdXRpbGl0eSB3aGljaCBwcm92aWRlcyBhIGdhbWUgbG9vcCwgXG4qIHRoYXQgaGFuZGxlcyBjb250aW51b3VzbHkgdXBkYXRpbmcgYSBgTWF0dGVyLkVuZ2luZWAgZm9yIHlvdSB3aXRoaW4gYSBicm93c2VyLlxuKiBJdCBpcyBpbnRlbmRlZCBmb3IgZGV2ZWxvcG1lbnQgYW5kIGRlYnVnZ2luZyBwdXJwb3NlcywgYnV0IG1heSBhbHNvIGJlIHN1aXRhYmxlIGZvciBzaW1wbGUgZ2FtZXMuXG4qIElmIHlvdSBhcmUgdXNpbmcgeW91ciBvd24gZ2FtZSBsb29wIGluc3RlYWQsIHRoZW4geW91IGRvIG5vdCBuZWVkIHRoZSBgTWF0dGVyLlJ1bm5lcmAgbW9kdWxlLlxuKiBJbnN0ZWFkIGp1c3QgY2FsbCBgRW5naW5lLnVwZGF0ZShlbmdpbmUsIGRlbHRhKWAgaW4geW91ciBvd24gbG9vcC5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIFJ1bm5lclxuKi9cblxudmFyIFJ1bm5lciA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1bm5lcjtcblxudmFyIEV2ZW50cyA9IF9kZXJlcV8oJy4vRXZlbnRzJyk7XG52YXIgRW5naW5lID0gX2RlcmVxXygnLi9FbmdpbmUnKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuL0NvbW1vbicpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX3JlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gICBcbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc0NhbmNlbEFuaW1hdGlvbkZyYW1lO1xuICAgIH1cblxuICAgIGlmICghX3JlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICB2YXIgX2ZyYW1lVGltZW91dDtcblxuICAgICAgICBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2speyBcbiAgICAgICAgICAgIF9mcmFtZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhDb21tb24ubm93KCkpOyBcbiAgICAgICAgICAgIH0sIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX2ZyYW1lVGltZW91dCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBSdW5uZXIuIFRoZSBvcHRpb25zIHBhcmFtZXRlciBpcyBhbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgYW55IHByb3BlcnRpZXMgeW91IHdpc2ggdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzLlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHt9IG9wdGlvbnNcbiAgICAgKi9cbiAgICBSdW5uZXIuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBmcHM6IDYwLFxuICAgICAgICAgICAgY29ycmVjdGlvbjogMSxcbiAgICAgICAgICAgIGRlbHRhU2FtcGxlU2l6ZTogNjAsXG4gICAgICAgICAgICBjb3VudGVyVGltZXN0YW1wOiAwLFxuICAgICAgICAgICAgZnJhbWVDb3VudGVyOiAwLFxuICAgICAgICAgICAgZGVsdGFIaXN0b3J5OiBbXSxcbiAgICAgICAgICAgIHRpbWVQcmV2OiBudWxsLFxuICAgICAgICAgICAgdGltZVNjYWxlUHJldjogMSxcbiAgICAgICAgICAgIGZyYW1lUmVxdWVzdElkOiBudWxsLFxuICAgICAgICAgICAgaXNGaXhlZDogZmFsc2UsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJ1bm5lciA9IENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHJ1bm5lci5kZWx0YSA9IHJ1bm5lci5kZWx0YSB8fCAxMDAwIC8gcnVubmVyLmZwcztcbiAgICAgICAgcnVubmVyLmRlbHRhTWluID0gcnVubmVyLmRlbHRhTWluIHx8IDEwMDAgLyBydW5uZXIuZnBzO1xuICAgICAgICBydW5uZXIuZGVsdGFNYXggPSBydW5uZXIuZGVsdGFNYXggfHwgMTAwMCAvIChydW5uZXIuZnBzICogMC41KTtcbiAgICAgICAgcnVubmVyLmZwcyA9IDEwMDAgLyBydW5uZXIuZGVsdGE7XG5cbiAgICAgICAgcmV0dXJuIHJ1bm5lcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udGludW91c2x5IHRpY2tzIGEgYE1hdHRlci5FbmdpbmVgIGJ5IGNhbGxpbmcgYFJ1bm5lci50aWNrYCBvbiB0aGUgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgZXZlbnQuXG4gICAgICogQG1ldGhvZCBydW5cbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lXG4gICAgICovXG4gICAgUnVubmVyLnJ1biA9IGZ1bmN0aW9uKHJ1bm5lciwgZW5naW5lKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBydW5uZXIgaWYgZW5naW5lIGlzIGZpcnN0IGFyZ3VtZW50XG4gICAgICAgIGlmICh0eXBlb2YgcnVubmVyLnBvc2l0aW9uSXRlcmF0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGVuZ2luZSA9IHJ1bm5lcjtcbiAgICAgICAgICAgIHJ1bm5lciA9IFJ1bm5lci5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIChmdW5jdGlvbiByZW5kZXIodGltZSl7XG4gICAgICAgICAgICBydW5uZXIuZnJhbWVSZXF1ZXN0SWQgPSBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cbiAgICAgICAgICAgIGlmICh0aW1lICYmIHJ1bm5lci5lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgUnVubmVyLnRpY2socnVubmVyLCBlbmdpbmUsIHRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuXG4gICAgICAgIHJldHVybiBydW5uZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEEgZ2FtZSBsb29wIHV0aWxpdHkgdGhhdCB1cGRhdGVzIHRoZSBlbmdpbmUgYW5kIHJlbmRlcmVyIGJ5IG9uZSBzdGVwIChhICd0aWNrJykuXG4gICAgICogRmVhdHVyZXMgZGVsdGEgc21vb3RoaW5nLCB0aW1lIGNvcnJlY3Rpb24gYW5kIGZpeGVkIG9yIGR5bmFtaWMgdGltaW5nLlxuICAgICAqIFRyaWdnZXJzIGBiZWZvcmVUaWNrYCwgYHRpY2tgIGFuZCBgYWZ0ZXJUaWNrYCBldmVudHMgb24gdGhlIGVuZ2luZS5cbiAgICAgKiBDb25zaWRlciBqdXN0IGBFbmdpbmUudXBkYXRlKGVuZ2luZSwgZGVsdGEpYCBpZiB5b3UncmUgdXNpbmcgeW91ciBvd24gbG9vcC5cbiAgICAgKiBAbWV0aG9kIHRpY2tcbiAgICAgKiBAcGFyYW0ge3J1bm5lcn0gcnVubmVyXG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gICAgICovXG4gICAgUnVubmVyLnRpY2sgPSBmdW5jdGlvbihydW5uZXIsIGVuZ2luZSwgdGltZSkge1xuICAgICAgICB2YXIgdGltaW5nID0gZW5naW5lLnRpbWluZyxcbiAgICAgICAgICAgIGNvcnJlY3Rpb24gPSAxLFxuICAgICAgICAgICAgZGVsdGE7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGV2ZW50IG9iamVjdFxuICAgICAgICB2YXIgZXZlbnQgPSB7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IHRpbWluZy50aW1lc3RhbXBcbiAgICAgICAgfTtcblxuICAgICAgICBFdmVudHMudHJpZ2dlcihydW5uZXIsICdiZWZvcmVUaWNrJywgZXZlbnQpO1xuICAgICAgICBFdmVudHMudHJpZ2dlcihlbmdpbmUsICdiZWZvcmVUaWNrJywgZXZlbnQpOyAvLyBAZGVwcmVjYXRlZFxuXG4gICAgICAgIGlmIChydW5uZXIuaXNGaXhlZCkge1xuICAgICAgICAgICAgLy8gZml4ZWQgdGltZXN0ZXBcbiAgICAgICAgICAgIGRlbHRhID0gcnVubmVyLmRlbHRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZHluYW1pYyB0aW1lc3RlcCBiYXNlZCBvbiB3YWxsIGNsb2NrIGJldHdlZW4gY2FsbHNcbiAgICAgICAgICAgIGRlbHRhID0gKHRpbWUgLSBydW5uZXIudGltZVByZXYpIHx8IHJ1bm5lci5kZWx0YTtcbiAgICAgICAgICAgIHJ1bm5lci50aW1lUHJldiA9IHRpbWU7XG5cbiAgICAgICAgICAgIC8vIG9wdGltaXN0aWNhbGx5IGZpbHRlciBkZWx0YSBvdmVyIGEgZmV3IGZyYW1lcywgdG8gaW1wcm92ZSBzdGFiaWxpdHlcbiAgICAgICAgICAgIHJ1bm5lci5kZWx0YUhpc3RvcnkucHVzaChkZWx0YSk7XG4gICAgICAgICAgICBydW5uZXIuZGVsdGFIaXN0b3J5ID0gcnVubmVyLmRlbHRhSGlzdG9yeS5zbGljZSgtcnVubmVyLmRlbHRhU2FtcGxlU2l6ZSk7XG4gICAgICAgICAgICBkZWx0YSA9IE1hdGgubWluLmFwcGx5KG51bGwsIHJ1bm5lci5kZWx0YUhpc3RvcnkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBsaW1pdCBkZWx0YVxuICAgICAgICAgICAgZGVsdGEgPSBkZWx0YSA8IHJ1bm5lci5kZWx0YU1pbiA/IHJ1bm5lci5kZWx0YU1pbiA6IGRlbHRhO1xuICAgICAgICAgICAgZGVsdGEgPSBkZWx0YSA+IHJ1bm5lci5kZWx0YU1heCA/IHJ1bm5lci5kZWx0YU1heCA6IGRlbHRhO1xuXG4gICAgICAgICAgICAvLyBjb3JyZWN0aW9uIGZvciBkZWx0YVxuICAgICAgICAgICAgY29ycmVjdGlvbiA9IGRlbHRhIC8gcnVubmVyLmRlbHRhO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZW5naW5lIHRpbWluZyBvYmplY3RcbiAgICAgICAgICAgIHJ1bm5lci5kZWx0YSA9IGRlbHRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGltZSBjb3JyZWN0aW9uIGZvciB0aW1lIHNjYWxpbmdcbiAgICAgICAgaWYgKHJ1bm5lci50aW1lU2NhbGVQcmV2ICE9PSAwKVxuICAgICAgICAgICAgY29ycmVjdGlvbiAqPSB0aW1pbmcudGltZVNjYWxlIC8gcnVubmVyLnRpbWVTY2FsZVByZXY7XG5cbiAgICAgICAgaWYgKHRpbWluZy50aW1lU2NhbGUgPT09IDApXG4gICAgICAgICAgICBjb3JyZWN0aW9uID0gMDtcblxuICAgICAgICBydW5uZXIudGltZVNjYWxlUHJldiA9IHRpbWluZy50aW1lU2NhbGU7XG4gICAgICAgIHJ1bm5lci5jb3JyZWN0aW9uID0gY29ycmVjdGlvbjtcblxuICAgICAgICAvLyBmcHMgY291bnRlclxuICAgICAgICBydW5uZXIuZnJhbWVDb3VudGVyICs9IDE7XG4gICAgICAgIGlmICh0aW1lIC0gcnVubmVyLmNvdW50ZXJUaW1lc3RhbXAgPj0gMTAwMCkge1xuICAgICAgICAgICAgcnVubmVyLmZwcyA9IHJ1bm5lci5mcmFtZUNvdW50ZXIgKiAoKHRpbWUgLSBydW5uZXIuY291bnRlclRpbWVzdGFtcCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHJ1bm5lci5jb3VudGVyVGltZXN0YW1wID0gdGltZTtcbiAgICAgICAgICAgIHJ1bm5lci5mcmFtZUNvdW50ZXIgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIocnVubmVyLCAndGljaycsIGV2ZW50KTtcbiAgICAgICAgRXZlbnRzLnRyaWdnZXIoZW5naW5lLCAndGljaycsIGV2ZW50KTsgLy8gQGRlcHJlY2F0ZWRcblxuICAgICAgICAvLyBpZiB3b3JsZCBoYXMgYmVlbiBtb2RpZmllZCwgY2xlYXIgdGhlIHJlbmRlciBzY2VuZSBncmFwaFxuICAgICAgICBpZiAoZW5naW5lLndvcmxkLmlzTW9kaWZpZWQgXG4gICAgICAgICAgICAmJiBlbmdpbmUucmVuZGVyXG4gICAgICAgICAgICAmJiBlbmdpbmUucmVuZGVyLmNvbnRyb2xsZXJcbiAgICAgICAgICAgICYmIGVuZ2luZS5yZW5kZXIuY29udHJvbGxlci5jbGVhcikge1xuICAgICAgICAgICAgZW5naW5lLnJlbmRlci5jb250cm9sbGVyLmNsZWFyKGVuZ2luZS5yZW5kZXIpOyAvLyBAZGVwcmVjYXRlZFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlXG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKHJ1bm5lciwgJ2JlZm9yZVVwZGF0ZScsIGV2ZW50KTtcbiAgICAgICAgRW5naW5lLnVwZGF0ZShlbmdpbmUsIGRlbHRhLCBjb3JyZWN0aW9uKTtcbiAgICAgICAgRXZlbnRzLnRyaWdnZXIocnVubmVyLCAnYWZ0ZXJVcGRhdGUnLCBldmVudCk7XG5cbiAgICAgICAgLy8gcmVuZGVyXG4gICAgICAgIC8vIEBkZXByZWNhdGVkXG4gICAgICAgIGlmIChlbmdpbmUucmVuZGVyICYmIGVuZ2luZS5yZW5kZXIuY29udHJvbGxlcikge1xuICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIocnVubmVyLCAnYmVmb3JlUmVuZGVyJywgZXZlbnQpO1xuICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIoZW5naW5lLCAnYmVmb3JlUmVuZGVyJywgZXZlbnQpOyAvLyBAZGVwcmVjYXRlZFxuXG4gICAgICAgICAgICBlbmdpbmUucmVuZGVyLmNvbnRyb2xsZXIud29ybGQoZW5naW5lLnJlbmRlcik7XG5cbiAgICAgICAgICAgIEV2ZW50cy50cmlnZ2VyKHJ1bm5lciwgJ2FmdGVyUmVuZGVyJywgZXZlbnQpO1xuICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIoZW5naW5lLCAnYWZ0ZXJSZW5kZXInLCBldmVudCk7IC8vIEBkZXByZWNhdGVkXG4gICAgICAgIH1cblxuICAgICAgICBFdmVudHMudHJpZ2dlcihydW5uZXIsICdhZnRlclRpY2snLCBldmVudCk7XG4gICAgICAgIEV2ZW50cy50cmlnZ2VyKGVuZ2luZSwgJ2FmdGVyVGljaycsIGV2ZW50KTsgLy8gQGRlcHJlY2F0ZWRcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5kcyBleGVjdXRpb24gb2YgYFJ1bm5lci5ydW5gIG9uIHRoZSBnaXZlbiBgcnVubmVyYCwgYnkgY2FuY2VsaW5nIHRoZSBhbmltYXRpb24gZnJhbWUgcmVxdWVzdCBldmVudCBsb29wLlxuICAgICAqIElmIHlvdSB3aXNoIHRvIG9ubHkgdGVtcG9yYXJpbHkgcGF1c2UgdGhlIGVuZ2luZSwgc2VlIGBlbmdpbmUuZW5hYmxlZGAgaW5zdGVhZC5cbiAgICAgKiBAbWV0aG9kIHN0b3BcbiAgICAgKiBAcGFyYW0ge3J1bm5lcn0gcnVubmVyXG4gICAgICovXG4gICAgUnVubmVyLnN0b3AgPSBmdW5jdGlvbihydW5uZXIpIHtcbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lKHJ1bm5lci5mcmFtZVJlcXVlc3RJZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBgUnVubmVyLnJ1bmAuXG4gICAgICogQG1ldGhvZCBzdGFydFxuICAgICAqIEBwYXJhbSB7cnVubmVyfSBydW5uZXJcbiAgICAgKiBAcGFyYW0ge2VuZ2luZX0gZW5naW5lXG4gICAgICovXG4gICAgUnVubmVyLnN0YXJ0ID0gZnVuY3Rpb24ocnVubmVyLCBlbmdpbmUpIHtcbiAgICAgICAgUnVubmVyLnJ1bihydW5uZXIsIGVuZ2luZSk7XG4gICAgfTtcblxuICAgIC8qXG4gICAgKlxuICAgICogIEV2ZW50cyBEb2N1bWVudGF0aW9uXG4gICAgKlxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGF0IHRoZSBzdGFydCBvZiBhIHRpY2ssIGJlZm9yZSBhbnkgdXBkYXRlcyB0byB0aGUgZW5naW5lIG9yIHRpbWluZ1xuICAgICpcbiAgICAqIEBldmVudCBiZWZvcmVUaWNrXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBhZnRlciBlbmdpbmUgdGltaW5nIHVwZGF0ZWQsIGJ1dCBqdXN0IGJlZm9yZSB1cGRhdGVcbiAgICAqXG4gICAgKiBAZXZlbnQgdGlja1xuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgYXQgdGhlIGVuZCBvZiBhIHRpY2ssIGFmdGVyIGVuZ2luZSB1cGRhdGUgYW5kIGFmdGVyIHJlbmRlcmluZ1xuICAgICpcbiAgICAqIEBldmVudCBhZnRlclRpY2tcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC50aW1lc3RhbXAgVGhlIGVuZ2luZS50aW1pbmcudGltZXN0YW1wIG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGJlZm9yZSB1cGRhdGVcbiAgICAqXG4gICAgKiBAZXZlbnQgYmVmb3JlVXBkYXRlXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBGaXJlZCBhZnRlciB1cGRhdGVcbiAgICAqXG4gICAgKiBAZXZlbnQgYWZ0ZXJVcGRhdGVcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC50aW1lc3RhbXAgVGhlIGVuZ2luZS50aW1pbmcudGltZXN0YW1wIG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGJlZm9yZSByZW5kZXJpbmdcbiAgICAqXG4gICAgKiBAZXZlbnQgYmVmb3JlUmVuZGVyXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqIEBkZXByZWNhdGVkXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgYWZ0ZXIgcmVuZGVyaW5nXG4gICAgKlxuICAgICogQGV2ZW50IGFmdGVyUmVuZGVyXG4gICAgKiBAcGFyYW0ge30gZXZlbnQgQW4gZXZlbnQgb2JqZWN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGltZXN0YW1wIFRoZSBlbmdpbmUudGltaW5nLnRpbWVzdGFtcCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5zb3VyY2UgVGhlIHNvdXJjZSBvYmplY3Qgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQubmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqIEBkZXByZWNhdGVkXG4gICAgKi9cblxuICAgIC8qXG4gICAgKlxuICAgICogIFByb3BlcnRpZXMgRG9jdW1lbnRhdGlvblxuICAgICpcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRoYXQgc3BlY2lmaWVzIHdoZXRoZXIgdGhlIHJ1bm5lciBpcyBydW5uaW5nIG9yIG5vdC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBlbmFibGVkXG4gICAgICogQHR5cGUgYm9vbGVhblxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEEgYEJvb2xlYW5gIHRoYXQgc3BlY2lmaWVzIGlmIHRoZSBydW5uZXIgc2hvdWxkIHVzZSBhIGZpeGVkIHRpbWVzdGVwIChvdGhlcndpc2UgaXQgaXMgdmFyaWFibGUpLlxuICAgICAqIElmIHRpbWluZyBpcyBmaXhlZCwgdGhlbiB0aGUgYXBwYXJlbnQgc2ltdWxhdGlvbiBzcGVlZCB3aWxsIGNoYW5nZSBkZXBlbmRpbmcgb24gdGhlIGZyYW1lIHJhdGUgKGJ1dCBiZWhhdmlvdXIgd2lsbCBiZSBkZXRlcm1pbmlzdGljKS5cbiAgICAgKiBJZiB0aGUgdGltaW5nIGlzIHZhcmlhYmxlLCB0aGVuIHRoZSBhcHBhcmVudCBzaW11bGF0aW9uIHNwZWVkIHdpbGwgYmUgY29uc3RhbnQgKGFwcHJveGltYXRlbHksIGJ1dCBhdCB0aGUgY29zdCBvZiBkZXRlcm1pbmluaXNtKS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBpc0ZpeGVkXG4gICAgICogQHR5cGUgYm9vbGVhblxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIGBOdW1iZXJgIHRoYXQgc3BlY2lmaWVzIHRoZSB0aW1lIHN0ZXAgYmV0d2VlbiB1cGRhdGVzIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBJZiBgZW5naW5lLnRpbWluZy5pc0ZpeGVkYCBpcyBzZXQgdG8gYHRydWVgLCB0aGVuIGBkZWx0YWAgaXMgZml4ZWQuXG4gICAgICogSWYgaXQgaXMgYGZhbHNlYCwgdGhlbiBgZGVsdGFgIGNhbiBkeW5hbWljYWxseSBjaGFuZ2UgdG8gbWFpbnRhaW4gdGhlIGNvcnJlY3QgYXBwYXJlbnQgc2ltdWxhdGlvbiBzcGVlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBkZWx0YVxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDEwMDAgLyA2MFxuICAgICAqL1xuXG59KSgpO1xuXG59LHtcIi4vQ29tbW9uXCI6MTQsXCIuL0VuZ2luZVwiOjE1LFwiLi9FdmVudHNcIjoxNn1dLDIyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5TbGVlcGluZ2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgdG8gbWFuYWdlIHRoZSBzbGVlcGluZyBzdGF0ZSBvZiBib2RpZXMuXG4qXG4qIEBjbGFzcyBTbGVlcGluZ1xuKi9cblxudmFyIFNsZWVwaW5nID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gU2xlZXBpbmc7XG5cbnZhciBFdmVudHMgPSBfZGVyZXFfKCcuL0V2ZW50cycpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBTbGVlcGluZy5fbW90aW9uV2FrZVRocmVzaG9sZCA9IDAuMTg7XG4gICAgU2xlZXBpbmcuX21vdGlvblNsZWVwVGhyZXNob2xkID0gMC4wODtcbiAgICBTbGVlcGluZy5fbWluQmlhcyA9IDAuOTtcblxuICAgIC8qKlxuICAgICAqIFB1dHMgYm9kaWVzIHRvIHNsZWVwIG9yIHdha2VzIHRoZW0gdXAgZGVwZW5kaW5nIG9uIHRoZWlyIG1vdGlvbi5cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVNjYWxlXG4gICAgICovXG4gICAgU2xlZXBpbmcudXBkYXRlID0gZnVuY3Rpb24oYm9kaWVzLCB0aW1lU2NhbGUpIHtcbiAgICAgICAgdmFyIHRpbWVGYWN0b3IgPSB0aW1lU2NhbGUgKiB0aW1lU2NhbGUgKiB0aW1lU2NhbGU7XG5cbiAgICAgICAgLy8gdXBkYXRlIGJvZGllcyBzbGVlcGluZyBzdGF0dXNcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldLFxuICAgICAgICAgICAgICAgIG1vdGlvbiA9IGJvZHkuc3BlZWQgKiBib2R5LnNwZWVkICsgYm9keS5hbmd1bGFyU3BlZWQgKiBib2R5LmFuZ3VsYXJTcGVlZDtcblxuICAgICAgICAgICAgLy8gd2FrZSB1cCBib2RpZXMgaWYgdGhleSBoYXZlIGEgZm9yY2UgYXBwbGllZFxuICAgICAgICAgICAgaWYgKGJvZHkuZm9yY2UueCAhPT0gMCB8fCBib2R5LmZvcmNlLnkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBTbGVlcGluZy5zZXQoYm9keSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWluTW90aW9uID0gTWF0aC5taW4oYm9keS5tb3Rpb24sIG1vdGlvbiksXG4gICAgICAgICAgICAgICAgbWF4TW90aW9uID0gTWF0aC5tYXgoYm9keS5tb3Rpb24sIG1vdGlvbik7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gYmlhc2VkIGF2ZXJhZ2UgbW90aW9uIGVzdGltYXRpb24gYmV0d2VlbiBmcmFtZXNcbiAgICAgICAgICAgIGJvZHkubW90aW9uID0gU2xlZXBpbmcuX21pbkJpYXMgKiBtaW5Nb3Rpb24gKyAoMSAtIFNsZWVwaW5nLl9taW5CaWFzKSAqIG1heE1vdGlvbjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGJvZHkuc2xlZXBUaHJlc2hvbGQgPiAwICYmIGJvZHkubW90aW9uIDwgU2xlZXBpbmcuX21vdGlvblNsZWVwVGhyZXNob2xkICogdGltZUZhY3Rvcikge1xuICAgICAgICAgICAgICAgIGJvZHkuc2xlZXBDb3VudGVyICs9IDE7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGJvZHkuc2xlZXBDb3VudGVyID49IGJvZHkuc2xlZXBUaHJlc2hvbGQpXG4gICAgICAgICAgICAgICAgICAgIFNsZWVwaW5nLnNldChib2R5LCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9keS5zbGVlcENvdW50ZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgYm9keS5zbGVlcENvdW50ZXIgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIHNldCBvZiBjb2xsaWRpbmcgcGFpcnMsIHdha2VzIHRoZSBzbGVlcGluZyBib2RpZXMgaW52b2x2ZWQuXG4gICAgICogQG1ldGhvZCBhZnRlckNvbGxpc2lvbnNcbiAgICAgKiBAcGFyYW0ge3BhaXJbXX0gcGFpcnNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVNjYWxlXG4gICAgICovXG4gICAgU2xlZXBpbmcuYWZ0ZXJDb2xsaXNpb25zID0gZnVuY3Rpb24ocGFpcnMsIHRpbWVTY2FsZSkge1xuICAgICAgICB2YXIgdGltZUZhY3RvciA9IHRpbWVTY2FsZSAqIHRpbWVTY2FsZSAqIHRpbWVTY2FsZTtcblxuICAgICAgICAvLyB3YWtlIHVwIGJvZGllcyBpbnZvbHZlZCBpbiBjb2xsaXNpb25zXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYWlyID0gcGFpcnNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGRvbid0IHdha2UgaW5hY3RpdmUgcGFpcnNcbiAgICAgICAgICAgIGlmICghcGFpci5pc0FjdGl2ZSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbiA9IHBhaXIuY29sbGlzaW9uLFxuICAgICAgICAgICAgICAgIGJvZHlBID0gY29sbGlzaW9uLmJvZHlBLnBhcmVudCwgXG4gICAgICAgICAgICAgICAgYm9keUIgPSBjb2xsaXNpb24uYm9keUIucGFyZW50O1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIGRvbid0IHdha2UgaWYgYXQgbGVhc3Qgb25lIGJvZHkgaXMgc3RhdGljXG4gICAgICAgICAgICBpZiAoKGJvZHlBLmlzU2xlZXBpbmcgJiYgYm9keUIuaXNTbGVlcGluZykgfHwgYm9keUEuaXNTdGF0aWMgfHwgYm9keUIuaXNTdGF0aWMpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKGJvZHlBLmlzU2xlZXBpbmcgfHwgYm9keUIuaXNTbGVlcGluZykge1xuICAgICAgICAgICAgICAgIHZhciBzbGVlcGluZ0JvZHkgPSAoYm9keUEuaXNTbGVlcGluZyAmJiAhYm9keUEuaXNTdGF0aWMpID8gYm9keUEgOiBib2R5QixcbiAgICAgICAgICAgICAgICAgICAgbW92aW5nQm9keSA9IHNsZWVwaW5nQm9keSA9PT0gYm9keUEgPyBib2R5QiA6IGJvZHlBO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzbGVlcGluZ0JvZHkuaXNTdGF0aWMgJiYgbW92aW5nQm9keS5tb3Rpb24gPiBTbGVlcGluZy5fbW90aW9uV2FrZVRocmVzaG9sZCAqIHRpbWVGYWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgU2xlZXBpbmcuc2V0KHNsZWVwaW5nQm9keSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gIFxuICAgIC8qKlxuICAgICAqIFNldCBhIGJvZHkgYXMgc2xlZXBpbmcgb3IgYXdha2UuXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzU2xlZXBpbmdcbiAgICAgKi9cbiAgICBTbGVlcGluZy5zZXQgPSBmdW5jdGlvbihib2R5LCBpc1NsZWVwaW5nKSB7XG4gICAgICAgIHZhciB3YXNTbGVlcGluZyA9IGJvZHkuaXNTbGVlcGluZztcblxuICAgICAgICBpZiAoaXNTbGVlcGluZykge1xuICAgICAgICAgICAgYm9keS5pc1NsZWVwaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGJvZHkuc2xlZXBDb3VudGVyID0gYm9keS5zbGVlcFRocmVzaG9sZDtcblxuICAgICAgICAgICAgYm9keS5wb3NpdGlvbkltcHVsc2UueCA9IDA7XG4gICAgICAgICAgICBib2R5LnBvc2l0aW9uSW1wdWxzZS55ID0gMDtcblxuICAgICAgICAgICAgYm9keS5wb3NpdGlvblByZXYueCA9IGJvZHkucG9zaXRpb24ueDtcbiAgICAgICAgICAgIGJvZHkucG9zaXRpb25QcmV2LnkgPSBib2R5LnBvc2l0aW9uLnk7XG5cbiAgICAgICAgICAgIGJvZHkuYW5nbGVQcmV2ID0gYm9keS5hbmdsZTtcbiAgICAgICAgICAgIGJvZHkuc3BlZWQgPSAwO1xuICAgICAgICAgICAgYm9keS5hbmd1bGFyU3BlZWQgPSAwO1xuICAgICAgICAgICAgYm9keS5tb3Rpb24gPSAwO1xuXG4gICAgICAgICAgICBpZiAoIXdhc1NsZWVwaW5nKSB7XG4gICAgICAgICAgICAgICAgRXZlbnRzLnRyaWdnZXIoYm9keSwgJ3NsZWVwU3RhcnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkuaXNTbGVlcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgYm9keS5zbGVlcENvdW50ZXIgPSAwO1xuXG4gICAgICAgICAgICBpZiAod2FzU2xlZXBpbmcpIHtcbiAgICAgICAgICAgICAgICBFdmVudHMudHJpZ2dlcihib2R5LCAnc2xlZXBFbmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi9FdmVudHNcIjoxNn1dLDIzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5Cb2RpZXNgIG1vZHVsZSBjb250YWlucyBmYWN0b3J5IG1ldGhvZHMgZm9yIGNyZWF0aW5nIHJpZ2lkIGJvZHkgbW9kZWxzIFxuKiB3aXRoIGNvbW1vbmx5IHVzZWQgYm9keSBjb25maWd1cmF0aW9ucyAoc3VjaCBhcyByZWN0YW5nbGVzLCBjaXJjbGVzIGFuZCBvdGhlciBwb2x5Z29ucykuXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBCb2RpZXNcbiovXG5cbi8vIFRPRE86IHRydWUgY2lyY2xlIGJvZGllc1xuXG52YXIgQm9kaWVzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gQm9kaWVzO1xuXG52YXIgVmVydGljZXMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZXJ0aWNlcycpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG52YXIgQm9keSA9IF9kZXJlcV8oJy4uL2JvZHkvQm9keScpO1xudmFyIEJvdW5kcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L0JvdW5kcycpO1xudmFyIFZlY3RvciA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlY3RvcicpO1xudmFyIGRlY29tcCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydkZWNvbXAnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2RlY29tcCddIDogbnVsbCk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcmlnaWQgYm9keSBtb2RlbCB3aXRoIGEgcmVjdGFuZ2xlIGh1bGwuIFxuICAgICAqIFRoZSBvcHRpb25zIHBhcmFtZXRlciBpcyBhbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgYW55IHByb3BlcnRpZXMgeW91IHdpc2ggdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzLlxuICAgICAqIFNlZSB0aGUgcHJvcGVydGllcyBzZWN0aW9uIG9mIHRoZSBgTWF0dGVyLkJvZHlgIG1vZHVsZSBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb24gb24gd2hhdCB5b3UgY2FuIHBhc3MgdmlhIHRoZSBgb3B0aW9uc2Agb2JqZWN0LlxuICAgICAqIEBtZXRob2QgcmVjdGFuZ2xlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHJldHVybiB7Ym9keX0gQSBuZXcgcmVjdGFuZ2xlIGJvZHlcbiAgICAgKi9cbiAgICBCb2RpZXMucmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB2YXIgcmVjdGFuZ2xlID0geyBcbiAgICAgICAgICAgIGxhYmVsOiAnUmVjdGFuZ2xlIEJvZHknLFxuICAgICAgICAgICAgcG9zaXRpb246IHsgeDogeCwgeTogeSB9LFxuICAgICAgICAgICAgdmVydGljZXM6IFZlcnRpY2VzLmZyb21QYXRoKCdMIDAgMCBMICcgKyB3aWR0aCArICcgMCBMICcgKyB3aWR0aCArICcgJyArIGhlaWdodCArICcgTCAwICcgKyBoZWlnaHQpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhbWZlcikge1xuICAgICAgICAgICAgdmFyIGNoYW1mZXIgPSBvcHRpb25zLmNoYW1mZXI7XG4gICAgICAgICAgICByZWN0YW5nbGUudmVydGljZXMgPSBWZXJ0aWNlcy5jaGFtZmVyKHJlY3RhbmdsZS52ZXJ0aWNlcywgY2hhbWZlci5yYWRpdXMsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbWZlci5xdWFsaXR5LCBjaGFtZmVyLnF1YWxpdHlNaW4sIGNoYW1mZXIucXVhbGl0eU1heCk7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5jaGFtZmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEJvZHkuY3JlYXRlKENvbW1vbi5leHRlbmQoe30sIHJlY3RhbmdsZSwgb3B0aW9ucykpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyByaWdpZCBib2R5IG1vZGVsIHdpdGggYSB0cmFwZXpvaWQgaHVsbC4gXG4gICAgICogVGhlIG9wdGlvbnMgcGFyYW1ldGVyIGlzIGFuIG9iamVjdCB0aGF0IHNwZWNpZmllcyBhbnkgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICogU2VlIHRoZSBwcm9wZXJ0aWVzIHNlY3Rpb24gb2YgdGhlIGBNYXR0ZXIuQm9keWAgbW9kdWxlIGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCB0cmFwZXpvaWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzbG9wZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcmV0dXJuIHtib2R5fSBBIG5ldyB0cmFwZXpvaWQgYm9keVxuICAgICAqL1xuICAgIEJvZGllcy50cmFwZXpvaWQgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBzbG9wZSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBzbG9wZSAqPSAwLjU7XG4gICAgICAgIHZhciByb29mID0gKDEgLSAoc2xvcGUgKiAyKSkgKiB3aWR0aDtcbiAgICAgICAgXG4gICAgICAgIHZhciB4MSA9IHdpZHRoICogc2xvcGUsXG4gICAgICAgICAgICB4MiA9IHgxICsgcm9vZixcbiAgICAgICAgICAgIHgzID0geDIgKyB4MSxcbiAgICAgICAgICAgIHZlcnRpY2VzUGF0aDtcblxuICAgICAgICBpZiAoc2xvcGUgPCAwLjUpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzUGF0aCA9ICdMIDAgMCBMICcgKyB4MSArICcgJyArICgtaGVpZ2h0KSArICcgTCAnICsgeDIgKyAnICcgKyAoLWhlaWdodCkgKyAnIEwgJyArIHgzICsgJyAwJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZlcnRpY2VzUGF0aCA9ICdMIDAgMCBMICcgKyB4MiArICcgJyArICgtaGVpZ2h0KSArICcgTCAnICsgeDMgKyAnIDAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyYXBlem9pZCA9IHsgXG4gICAgICAgICAgICBsYWJlbDogJ1RyYXBlem9pZCBCb2R5JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IHg6IHgsIHk6IHkgfSxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBWZXJ0aWNlcy5mcm9tUGF0aCh2ZXJ0aWNlc1BhdGgpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhbWZlcikge1xuICAgICAgICAgICAgdmFyIGNoYW1mZXIgPSBvcHRpb25zLmNoYW1mZXI7XG4gICAgICAgICAgICB0cmFwZXpvaWQudmVydGljZXMgPSBWZXJ0aWNlcy5jaGFtZmVyKHRyYXBlem9pZC52ZXJ0aWNlcywgY2hhbWZlci5yYWRpdXMsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbWZlci5xdWFsaXR5LCBjaGFtZmVyLnF1YWxpdHlNaW4sIGNoYW1mZXIucXVhbGl0eU1heCk7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5jaGFtZmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEJvZHkuY3JlYXRlKENvbW1vbi5leHRlbmQoe30sIHRyYXBlem9pZCwgb3B0aW9ucykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHJpZ2lkIGJvZHkgbW9kZWwgd2l0aCBhIGNpcmNsZSBodWxsLiBcbiAgICAgKiBUaGUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGFueSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0cy5cbiAgICAgKiBTZWUgdGhlIHByb3BlcnRpZXMgc2VjdGlvbiBvZiB0aGUgYE1hdHRlci5Cb2R5YCBtb2R1bGUgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIGNpcmNsZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4U2lkZXNdXG4gICAgICogQHJldHVybiB7Ym9keX0gQSBuZXcgY2lyY2xlIGJvZHlcbiAgICAgKi9cbiAgICBCb2RpZXMuY2lyY2xlID0gZnVuY3Rpb24oeCwgeSwgcmFkaXVzLCBvcHRpb25zLCBtYXhTaWRlcykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB2YXIgY2lyY2xlID0ge1xuICAgICAgICAgICAgbGFiZWw6ICdDaXJjbGUgQm9keScsXG4gICAgICAgICAgICBjaXJjbGVSYWRpdXM6IHJhZGl1c1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gYXBwcm94aW1hdGUgY2lyY2xlcyB3aXRoIHBvbHlnb25zIHVudGlsIHRydWUgY2lyY2xlcyBpbXBsZW1lbnRlZCBpbiBTQVRcbiAgICAgICAgbWF4U2lkZXMgPSBtYXhTaWRlcyB8fCAyNTtcbiAgICAgICAgdmFyIHNpZGVzID0gTWF0aC5jZWlsKE1hdGgubWF4KDEwLCBNYXRoLm1pbihtYXhTaWRlcywgcmFkaXVzKSkpO1xuXG4gICAgICAgIC8vIG9wdGltaXNhdGlvbjogYWx3YXlzIHVzZSBldmVuIG51bWJlciBvZiBzaWRlcyAoaGFsZiB0aGUgbnVtYmVyIG9mIHVuaXF1ZSBheGVzKVxuICAgICAgICBpZiAoc2lkZXMgJSAyID09PSAxKVxuICAgICAgICAgICAgc2lkZXMgKz0gMTtcblxuICAgICAgICByZXR1cm4gQm9kaWVzLnBvbHlnb24oeCwgeSwgc2lkZXMsIHJhZGl1cywgQ29tbW9uLmV4dGVuZCh7fSwgY2lyY2xlLCBvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcmlnaWQgYm9keSBtb2RlbCB3aXRoIGEgcmVndWxhciBwb2x5Z29uIGh1bGwgd2l0aCB0aGUgZ2l2ZW4gbnVtYmVyIG9mIHNpZGVzLiBcbiAgICAgKiBUaGUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGFueSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0cy5cbiAgICAgKiBTZWUgdGhlIHByb3BlcnRpZXMgc2VjdGlvbiBvZiB0aGUgYE1hdHRlci5Cb2R5YCBtb2R1bGUgZm9yIGRldGFpbGVkIGluZm9ybWF0aW9uIG9uIHdoYXQgeW91IGNhbiBwYXNzIHZpYSB0aGUgYG9wdGlvbnNgIG9iamVjdC5cbiAgICAgKiBAbWV0aG9kIHBvbHlnb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZGVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcmV0dXJuIHtib2R5fSBBIG5ldyByZWd1bGFyIHBvbHlnb24gYm9keVxuICAgICAqL1xuICAgIEJvZGllcy5wb2x5Z29uID0gZnVuY3Rpb24oeCwgeSwgc2lkZXMsIHJhZGl1cywgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZiAoc2lkZXMgPCAzKVxuICAgICAgICAgICAgcmV0dXJuIEJvZGllcy5jaXJjbGUoeCwgeSwgcmFkaXVzLCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgdGhldGEgPSAyICogTWF0aC5QSSAvIHNpZGVzLFxuICAgICAgICAgICAgcGF0aCA9ICcnLFxuICAgICAgICAgICAgb2Zmc2V0ID0gdGhldGEgKiAwLjU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWRlczsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYW5nbGUgPSBvZmZzZXQgKyAoaSAqIHRoZXRhKSxcbiAgICAgICAgICAgICAgICB4eCA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cyxcbiAgICAgICAgICAgICAgICB5eSA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcblxuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgeHgudG9GaXhlZCgzKSArICcgJyArIHl5LnRvRml4ZWQoMykgKyAnICc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9seWdvbiA9IHsgXG4gICAgICAgICAgICBsYWJlbDogJ1BvbHlnb24gQm9keScsXG4gICAgICAgICAgICBwb3NpdGlvbjogeyB4OiB4LCB5OiB5IH0sXG4gICAgICAgICAgICB2ZXJ0aWNlczogVmVydGljZXMuZnJvbVBhdGgocGF0aClcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob3B0aW9ucy5jaGFtZmVyKSB7XG4gICAgICAgICAgICB2YXIgY2hhbWZlciA9IG9wdGlvbnMuY2hhbWZlcjtcbiAgICAgICAgICAgIHBvbHlnb24udmVydGljZXMgPSBWZXJ0aWNlcy5jaGFtZmVyKHBvbHlnb24udmVydGljZXMsIGNoYW1mZXIucmFkaXVzLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW1mZXIucXVhbGl0eSwgY2hhbWZlci5xdWFsaXR5TWluLCBjaGFtZmVyLnF1YWxpdHlNYXgpO1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuY2hhbWZlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBCb2R5LmNyZWF0ZShDb21tb24uZXh0ZW5kKHt9LCBwb2x5Z29uLCBvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBib2R5IHVzaW5nIHRoZSBzdXBwbGllZCB2ZXJ0aWNlcyAob3IgYW4gYXJyYXkgY29udGFpbmluZyBtdWx0aXBsZSBzZXRzIG9mIHZlcnRpY2VzKS5cbiAgICAgKiBJZiB0aGUgdmVydGljZXMgYXJlIGNvbnZleCwgdGhleSB3aWxsIHBhc3MgdGhyb3VnaCBhcyBzdXBwbGllZC5cbiAgICAgKiBPdGhlcndpc2UgaWYgdGhlIHZlcnRpY2VzIGFyZSBjb25jYXZlLCB0aGV5IHdpbGwgYmUgZGVjb21wb3NlZCBpZiBbcG9seS1kZWNvbXAuanNdKGh0dHBzOi8vZ2l0aHViLmNvbS9zY2h0ZXBwZS9wb2x5LWRlY29tcC5qcykgaXMgYXZhaWxhYmxlLlxuICAgICAqIE5vdGUgdGhhdCB0aGlzIHByb2Nlc3MgaXMgbm90IGd1YXJhbnRlZWQgdG8gc3VwcG9ydCBjb21wbGV4IHNldHMgb2YgdmVydGljZXMgKGUuZy4gdGhvc2Ugd2l0aCBob2xlcyBtYXkgZmFpbCkuXG4gICAgICogQnkgZGVmYXVsdCB0aGUgZGVjb21wb3NpdGlvbiB3aWxsIGRpc2NhcmQgY29sbGluZWFyIGVkZ2VzICh0byBpbXByb3ZlIHBlcmZvcm1hbmNlKS5cbiAgICAgKiBJdCBjYW4gYWxzbyBvcHRpb25hbGx5IGRpc2NhcmQgYW55IHBhcnRzIHRoYXQgaGF2ZSBhbiBhcmVhIGxlc3MgdGhhbiBgbWluaW11bUFyZWFgLlxuICAgICAqIElmIHRoZSB2ZXJ0aWNlcyBjYW4gbm90IGJlIGRlY29tcG9zZWQsIHRoZSByZXN1bHQgd2lsbCBmYWxsIGJhY2sgdG8gdXNpbmcgdGhlIGNvbnZleCBodWxsLlxuICAgICAqIFRoZSBvcHRpb25zIHBhcmFtZXRlciBpcyBhbiBvYmplY3QgdGhhdCBzcGVjaWZpZXMgYW55IGBNYXR0ZXIuQm9keWAgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHMuXG4gICAgICogU2VlIHRoZSBwcm9wZXJ0aWVzIHNlY3Rpb24gb2YgdGhlIGBNYXR0ZXIuQm9keWAgbW9kdWxlIGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCBmcm9tVmVydGljZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHBhcmFtIFtbdmVjdG9yXV0gdmVydGV4U2V0c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge2Jvb2x9IFtmbGFnSW50ZXJuYWw9ZmFsc2VdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtyZW1vdmVDb2xsaW5lYXI9MC4wMV1cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW21pbmltdW1BcmVhPTEwXVxuICAgICAqIEByZXR1cm4ge2JvZHl9XG4gICAgICovXG4gICAgQm9kaWVzLmZyb21WZXJ0aWNlcyA9IGZ1bmN0aW9uKHgsIHksIHZlcnRleFNldHMsIG9wdGlvbnMsIGZsYWdJbnRlcm5hbCwgcmVtb3ZlQ29sbGluZWFyLCBtaW5pbXVtQXJlYSkge1xuICAgICAgICB2YXIgYm9keSxcbiAgICAgICAgICAgIHBhcnRzLFxuICAgICAgICAgICAgaXNDb252ZXgsXG4gICAgICAgICAgICB2ZXJ0aWNlcyxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgayxcbiAgICAgICAgICAgIHYsXG4gICAgICAgICAgICB6O1xuXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBwYXJ0cyA9IFtdO1xuXG4gICAgICAgIGZsYWdJbnRlcm5hbCA9IHR5cGVvZiBmbGFnSW50ZXJuYWwgIT09ICd1bmRlZmluZWQnID8gZmxhZ0ludGVybmFsIDogZmFsc2U7XG4gICAgICAgIHJlbW92ZUNvbGxpbmVhciA9IHR5cGVvZiByZW1vdmVDb2xsaW5lYXIgIT09ICd1bmRlZmluZWQnID8gcmVtb3ZlQ29sbGluZWFyIDogMC4wMTtcbiAgICAgICAgbWluaW11bUFyZWEgPSB0eXBlb2YgbWluaW11bUFyZWEgIT09ICd1bmRlZmluZWQnID8gbWluaW11bUFyZWEgOiAxMDtcblxuICAgICAgICBpZiAoIWRlY29tcCkge1xuICAgICAgICAgICAgQ29tbW9uLndhcm4oJ0JvZGllcy5mcm9tVmVydGljZXM6IHBvbHktZGVjb21wLmpzIHJlcXVpcmVkLiBDb3VsZCBub3QgZGVjb21wb3NlIHZlcnRpY2VzLiBGYWxsYmFjayB0byBjb252ZXggaHVsbC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuc3VyZSB2ZXJ0ZXhTZXRzIGlzIGFuIGFycmF5IG9mIGFycmF5c1xuICAgICAgICBpZiAoIUNvbW1vbi5pc0FycmF5KHZlcnRleFNldHNbMF0pKSB7XG4gICAgICAgICAgICB2ZXJ0ZXhTZXRzID0gW3ZlcnRleFNldHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2ID0gMDsgdiA8IHZlcnRleFNldHMubGVuZ3RoOyB2ICs9IDEpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzID0gdmVydGV4U2V0c1t2XTtcbiAgICAgICAgICAgIGlzQ29udmV4ID0gVmVydGljZXMuaXNDb252ZXgodmVydGljZXMpO1xuXG4gICAgICAgICAgICBpZiAoaXNDb252ZXggfHwgIWRlY29tcCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0NvbnZleCkge1xuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcyA9IFZlcnRpY2VzLmNsb2Nrd2lzZVNvcnQodmVydGljZXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIGNvbnZleCBodWxsIHdoZW4gZGVjb21wb3NpdGlvbiBpcyBub3QgcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMgPSBWZXJ0aWNlcy5odWxsKHZlcnRpY2VzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHsgeDogeCwgeTogeSB9LFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlczogdmVydGljZXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhbGlzZSBhIGRlY29tcG9zaXRpb25cbiAgICAgICAgICAgICAgICB2YXIgY29uY2F2ZSA9IHZlcnRpY2VzLm1hcChmdW5jdGlvbih2ZXJ0ZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFt2ZXJ0ZXgueCwgdmVydGV4LnldO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gdmVydGljZXMgYXJlIGNvbmNhdmUgYW5kIHNpbXBsZSwgd2UgY2FuIGRlY29tcG9zZSBpbnRvIHBhcnRzXG4gICAgICAgICAgICAgICAgZGVjb21wLm1ha2VDQ1coY29uY2F2ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlbW92ZUNvbGxpbmVhciAhPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIGRlY29tcC5yZW1vdmVDb2xsaW5lYXJQb2ludHMoY29uY2F2ZSwgcmVtb3ZlQ29sbGluZWFyKTtcblxuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgcXVpY2sgZGVjb21wb3NpdGlvbiBhbGdvcml0aG0gKEJheWF6aXQpXG4gICAgICAgICAgICAgICAgdmFyIGRlY29tcG9zZWQgPSBkZWNvbXAucXVpY2tEZWNvbXAoY29uY2F2ZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBkZWNvbXBvc2VkIGNodW5rXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRlY29tcG9zZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNodW5rID0gZGVjb21wb3NlZFtpXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHZlcnRpY2VzIGludG8gdGhlIGNvcnJlY3Qgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaHVua1ZlcnRpY2VzID0gY2h1bmsubWFwKGZ1bmN0aW9uKHZlcnRpY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHZlcnRpY2VzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHZlcnRpY2VzWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBza2lwIHNtYWxsIGNodW5rc1xuICAgICAgICAgICAgICAgICAgICBpZiAobWluaW11bUFyZWEgPiAwICYmIFZlcnRpY2VzLmFyZWEoY2h1bmtWZXJ0aWNlcykgPCBtaW5pbXVtQXJlYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGNvbXBvdW5kIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogVmVydGljZXMuY2VudHJlKGNodW5rVmVydGljZXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljZXM6IGNodW5rVmVydGljZXNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGJvZHkgcGFydHNcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXJ0c1tpXSA9IEJvZHkuY3JlYXRlKENvbW1vbi5leHRlbmQocGFydHNbaV0sIG9wdGlvbnMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZsYWcgaW50ZXJuYWwgZWRnZXMgKGNvaW5jaWRlbnQgcGFydCBlZGdlcylcbiAgICAgICAgaWYgKGZsYWdJbnRlcm5hbCkge1xuICAgICAgICAgICAgdmFyIGNvaW5jaWRlbnRfbWF4X2Rpc3QgPSA1O1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydEEgPSBwYXJ0c1tpXTtcblxuICAgICAgICAgICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRCID0gcGFydHNbal07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKEJvdW5kcy5vdmVybGFwcyhwYXJ0QS5ib3VuZHMsIHBhcnRCLmJvdW5kcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXYgPSBwYXJ0QS52ZXJ0aWNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYnYgPSBwYXJ0Qi52ZXJ0aWNlcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXRlcmF0ZSB2ZXJ0aWNlcyBvZiBib3RoIHBhcnRzXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgcGFydEEudmVydGljZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHogPSAwOyB6IDwgcGFydEIudmVydGljZXMubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmluZCBkaXN0YW5jZXMgYmV0d2VlbiB0aGUgdmVydGljZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhID0gVmVjdG9yLm1hZ25pdHVkZVNxdWFyZWQoVmVjdG9yLnN1YihwYXZbKGsgKyAxKSAlIHBhdi5sZW5ndGhdLCBwYnZbel0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRiID0gVmVjdG9yLm1hZ25pdHVkZVNxdWFyZWQoVmVjdG9yLnN1YihwYXZba10sIHBidlsoeiArIDEpICUgcGJ2Lmxlbmd0aF0pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBib3RoIHZlcnRpY2VzIGFyZSB2ZXJ5IGNsb3NlLCBjb25zaWRlciB0aGUgZWRnZSBjb25jaWRlbnQgKGludGVybmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGEgPCBjb2luY2lkZW50X21heF9kaXN0ICYmIGRiIDwgY29pbmNpZGVudF9tYXhfZGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF2W2tdLmlzSW50ZXJuYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGJ2W3pdLmlzSW50ZXJuYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBwYXJlbnQgYm9keSB0byBiZSByZXR1cm5lZCwgdGhhdCBjb250YWlucyBnZW5lcmF0ZWQgY29tcG91bmQgcGFydHNcbiAgICAgICAgICAgIGJvZHkgPSBCb2R5LmNyZWF0ZShDb21tb24uZXh0ZW5kKHsgcGFydHM6IHBhcnRzLnNsaWNlKDApIH0sIG9wdGlvbnMpKTtcbiAgICAgICAgICAgIEJvZHkuc2V0UG9zaXRpb24oYm9keSwgeyB4OiB4LCB5OiB5IH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJ0c1swXTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pKCk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIuLi9ib2R5L0JvZHlcIjoxLFwiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2dlb21ldHJ5L0JvdW5kc1wiOjI2LFwiLi4vZ2VvbWV0cnkvVmVjdG9yXCI6MjgsXCIuLi9nZW9tZXRyeS9WZXJ0aWNlc1wiOjI5fV0sMjQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkNvbXBvc2l0ZXNgIG1vZHVsZSBjb250YWlucyBmYWN0b3J5IG1ldGhvZHMgZm9yIGNyZWF0aW5nIGNvbXBvc2l0ZSBib2RpZXNcbiogd2l0aCBjb21tb25seSB1c2VkIGNvbmZpZ3VyYXRpb25zIChzdWNoIGFzIHN0YWNrcyBhbmQgY2hhaW5zKS5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIENvbXBvc2l0ZXNcbiovXG5cbnZhciBDb21wb3NpdGVzID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9zaXRlcztcblxudmFyIENvbXBvc2l0ZSA9IF9kZXJlcV8oJy4uL2JvZHkvQ29tcG9zaXRlJyk7XG52YXIgQ29uc3RyYWludCA9IF9kZXJlcV8oJy4uL2NvbnN0cmFpbnQvQ29uc3RyYWludCcpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG52YXIgQm9keSA9IF9kZXJlcV8oJy4uL2JvZHkvQm9keScpO1xudmFyIEJvZGllcyA9IF9kZXJlcV8oJy4vQm9kaWVzJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjb21wb3NpdGUgY29udGFpbmluZyBib2RpZXMgY3JlYXRlZCBpbiB0aGUgY2FsbGJhY2sgaW4gYSBncmlkIGFycmFuZ2VtZW50LlxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXNlcyB0aGUgYm9keSdzIGJvdW5kcyB0byBwcmV2ZW50IG92ZXJsYXBzLlxuICAgICAqIEBtZXRob2Qgc3RhY2tcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geHhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtbkdhcFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dHYXBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gQSBuZXcgY29tcG9zaXRlIGNvbnRhaW5pbmcgb2JqZWN0cyBjcmVhdGVkIGluIHRoZSBjYWxsYmFja1xuICAgICAqL1xuICAgIENvbXBvc2l0ZXMuc3RhY2sgPSBmdW5jdGlvbih4eCwgeXksIGNvbHVtbnMsIHJvd3MsIGNvbHVtbkdhcCwgcm93R2FwLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgc3RhY2sgPSBDb21wb3NpdGUuY3JlYXRlKHsgbGFiZWw6ICdTdGFjaycgfSksXG4gICAgICAgICAgICB4ID0geHgsXG4gICAgICAgICAgICB5ID0geXksXG4gICAgICAgICAgICBsYXN0Qm9keSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgY29sdW1uID0gMDsgY29sdW1uIDwgY29sdW1uczsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9IGNhbGxiYWNrKHgsIHksIGNvbHVtbiwgcm93LCBsYXN0Qm9keSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBib2R5SGVpZ2h0ID0gYm9keS5ib3VuZHMubWF4LnkgLSBib2R5LmJvdW5kcy5taW4ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlXaWR0aCA9IGJvZHkuYm91bmRzLm1heC54IC0gYm9keS5ib3VuZHMubWluLng7IFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5SGVpZ2h0ID4gbWF4SGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0ID0gYm9keUhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIEJvZHkudHJhbnNsYXRlKGJvZHksIHsgeDogYm9keVdpZHRoICogMC41LCB5OiBib2R5SGVpZ2h0ICogMC41IH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHggPSBib2R5LmJvdW5kcy5tYXgueCArIGNvbHVtbkdhcDtcblxuICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQm9keShzdGFjaywgYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0Qm9keSA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB4ICs9IGNvbHVtbkdhcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHkgKz0gbWF4SGVpZ2h0ICsgcm93R2FwO1xuICAgICAgICAgICAgeCA9IHh4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ2hhaW5zIGFsbCBib2RpZXMgaW4gdGhlIGdpdmVuIGNvbXBvc2l0ZSB0b2dldGhlciB1c2luZyBjb25zdHJhaW50cy5cbiAgICAgKiBAbWV0aG9kIGNoYWluXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4T2Zmc2V0QVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5T2Zmc2V0QVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4T2Zmc2V0QlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5T2Zmc2V0QlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7Y29tcG9zaXRlfSBBIG5ldyBjb21wb3NpdGUgY29udGFpbmluZyBvYmplY3RzIGNoYWluZWQgdG9nZXRoZXIgd2l0aCBjb25zdHJhaW50c1xuICAgICAqL1xuICAgIENvbXBvc2l0ZXMuY2hhaW4gPSBmdW5jdGlvbihjb21wb3NpdGUsIHhPZmZzZXRBLCB5T2Zmc2V0QSwgeE9mZnNldEIsIHlPZmZzZXRCLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBib2RpZXMgPSBjb21wb3NpdGUuYm9kaWVzO1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5QSA9IGJvZGllc1tpIC0gMV0sXG4gICAgICAgICAgICAgICAgYm9keUIgPSBib2RpZXNbaV0sXG4gICAgICAgICAgICAgICAgYm9keUFIZWlnaHQgPSBib2R5QS5ib3VuZHMubWF4LnkgLSBib2R5QS5ib3VuZHMubWluLnksXG4gICAgICAgICAgICAgICAgYm9keUFXaWR0aCA9IGJvZHlBLmJvdW5kcy5tYXgueCAtIGJvZHlBLmJvdW5kcy5taW4ueCwgXG4gICAgICAgICAgICAgICAgYm9keUJIZWlnaHQgPSBib2R5Qi5ib3VuZHMubWF4LnkgLSBib2R5Qi5ib3VuZHMubWluLnksXG4gICAgICAgICAgICAgICAgYm9keUJXaWR0aCA9IGJvZHlCLmJvdW5kcy5tYXgueCAtIGJvZHlCLmJvdW5kcy5taW4ueDtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgYm9keUE6IGJvZHlBLFxuICAgICAgICAgICAgICAgIHBvaW50QTogeyB4OiBib2R5QVdpZHRoICogeE9mZnNldEEsIHk6IGJvZHlBSGVpZ2h0ICogeU9mZnNldEEgfSxcbiAgICAgICAgICAgICAgICBib2R5QjogYm9keUIsXG4gICAgICAgICAgICAgICAgcG9pbnRCOiB7IHg6IGJvZHlCV2lkdGggKiB4T2Zmc2V0QiwgeTogYm9keUJIZWlnaHQgKiB5T2Zmc2V0QiB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgY29uc3RyYWludCA9IENvbW1vbi5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICBcbiAgICAgICAgICAgIENvbXBvc2l0ZS5hZGRDb25zdHJhaW50KGNvbXBvc2l0ZSwgQ29uc3RyYWludC5jcmVhdGUoY29uc3RyYWludCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9zaXRlLmxhYmVsICs9ICcgQ2hhaW4nO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgYm9kaWVzIGluIHRoZSBjb21wb3NpdGUgd2l0aCBjb25zdHJhaW50cyBpbiBhIGdyaWQgcGF0dGVybiwgd2l0aCBvcHRpb25hbCBjcm9zcyBicmFjZXMuXG4gICAgICogQG1ldGhvZCBtZXNoXG4gICAgICogQHBhcmFtIHtjb21wb3NpdGV9IGNvbXBvc2l0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5zXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd3NcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNyb3NzQnJhY2VcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gVGhlIGNvbXBvc2l0ZSBjb250YWluaW5nIG9iamVjdHMgbWVzaGVkIHRvZ2V0aGVyIHdpdGggY29uc3RyYWludHNcbiAgICAgKi9cbiAgICBDb21wb3NpdGVzLm1lc2ggPSBmdW5jdGlvbihjb21wb3NpdGUsIGNvbHVtbnMsIHJvd3MsIGNyb3NzQnJhY2UsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGJvZGllcyA9IGNvbXBvc2l0ZS5ib2RpZXMsXG4gICAgICAgICAgICByb3csXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBib2R5QSxcbiAgICAgICAgICAgIGJvZHlCLFxuICAgICAgICAgICAgYm9keUM7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHJvdyA9IDA7IHJvdyA8IHJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGNvbCA9IDE7IGNvbCA8IGNvbHVtbnM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgYm9keUEgPSBib2RpZXNbKGNvbCAtIDEpICsgKHJvdyAqIGNvbHVtbnMpXTtcbiAgICAgICAgICAgICAgICBib2R5QiA9IGJvZGllc1tjb2wgKyAocm93ICogY29sdW1ucyldO1xuICAgICAgICAgICAgICAgIENvbXBvc2l0ZS5hZGRDb25zdHJhaW50KGNvbXBvc2l0ZSwgQ29uc3RyYWludC5jcmVhdGUoQ29tbW9uLmV4dGVuZCh7IGJvZHlBOiBib2R5QSwgYm9keUI6IGJvZHlCIH0sIG9wdGlvbnMpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyb3cgPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb2wgPSAwOyBjb2wgPCBjb2x1bW5zOyBjb2wrKykge1xuICAgICAgICAgICAgICAgICAgICBib2R5QSA9IGJvZGllc1tjb2wgKyAoKHJvdyAtIDEpICogY29sdW1ucyldO1xuICAgICAgICAgICAgICAgICAgICBib2R5QiA9IGJvZGllc1tjb2wgKyAocm93ICogY29sdW1ucyldO1xuICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjb21wb3NpdGUsIENvbnN0cmFpbnQuY3JlYXRlKENvbW1vbi5leHRlbmQoeyBib2R5QTogYm9keUEsIGJvZHlCOiBib2R5QiB9LCBvcHRpb25zKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjcm9zc0JyYWNlICYmIGNvbCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlDID0gYm9kaWVzWyhjb2wgLSAxKSArICgocm93IC0gMSkgKiBjb2x1bW5zKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjb21wb3NpdGUsIENvbnN0cmFpbnQuY3JlYXRlKENvbW1vbi5leHRlbmQoeyBib2R5QTogYm9keUMsIGJvZHlCOiBib2R5QiB9LCBvcHRpb25zKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNyb3NzQnJhY2UgJiYgY29sIDwgY29sdW1ucyAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlDID0gYm9kaWVzWyhjb2wgKyAxKSArICgocm93IC0gMSkgKiBjb2x1bW5zKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjb21wb3NpdGUsIENvbnN0cmFpbnQuY3JlYXRlKENvbW1vbi5leHRlbmQoeyBib2R5QTogYm9keUMsIGJvZHlCOiBib2R5QiB9LCBvcHRpb25zKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9zaXRlLmxhYmVsICs9ICcgTWVzaCc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9zaXRlO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGNvbXBvc2l0ZSBjb250YWluaW5nIGJvZGllcyBjcmVhdGVkIGluIHRoZSBjYWxsYmFjayBpbiBhIHB5cmFtaWQgYXJyYW5nZW1lbnQuXG4gICAgICogVGhpcyBmdW5jdGlvbiB1c2VzIHRoZSBib2R5J3MgYm91bmRzIHRvIHByZXZlbnQgb3ZlcmxhcHMuXG4gICAgICogQG1ldGhvZCBweXJhbWlkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHh4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHl5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtbnNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93c1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5HYXBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93R2FwXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IEEgbmV3IGNvbXBvc2l0ZSBjb250YWluaW5nIG9iamVjdHMgY3JlYXRlZCBpbiB0aGUgY2FsbGJhY2tcbiAgICAgKi9cbiAgICBDb21wb3NpdGVzLnB5cmFtaWQgPSBmdW5jdGlvbih4eCwgeXksIGNvbHVtbnMsIHJvd3MsIGNvbHVtbkdhcCwgcm93R2FwLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gQ29tcG9zaXRlcy5zdGFjayh4eCwgeXksIGNvbHVtbnMsIHJvd3MsIGNvbHVtbkdhcCwgcm93R2FwLCBmdW5jdGlvbih4LCB5LCBjb2x1bW4sIHJvdywgbGFzdEJvZHksIGkpIHtcbiAgICAgICAgICAgIHZhciBhY3R1YWxSb3dzID0gTWF0aC5taW4ocm93cywgTWF0aC5jZWlsKGNvbHVtbnMgLyAyKSksXG4gICAgICAgICAgICAgICAgbGFzdEJvZHlXaWR0aCA9IGxhc3RCb2R5ID8gbGFzdEJvZHkuYm91bmRzLm1heC54IC0gbGFzdEJvZHkuYm91bmRzLm1pbi54IDogMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJvdyA+IGFjdHVhbFJvd3MpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyByZXZlcnNlIHJvdyBvcmRlclxuICAgICAgICAgICAgcm93ID0gYWN0dWFsUm93cyAtIHJvdztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gcm93LFxuICAgICAgICAgICAgICAgIGVuZCA9IGNvbHVtbnMgLSAxIC0gcm93O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uIDwgc3RhcnQgfHwgY29sdW1uID4gZW5kKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcmV0cm9hY3RpdmVseSBmaXggdGhlIGZpcnN0IGJvZHkncyBwb3NpdGlvbiwgc2luY2Ugd2lkdGggd2FzIHVua25vd25cbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgQm9keS50cmFuc2xhdGUobGFzdEJvZHksIHsgeDogKGNvbHVtbiArIChjb2x1bW5zICUgMiA9PT0gMSA/IDEgOiAtMSkpICogbGFzdEJvZHlXaWR0aCwgeTogMCB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHhPZmZzZXQgPSBsYXN0Qm9keSA/IGNvbHVtbiAqIGxhc3RCb2R5V2lkdGggOiAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soeHggKyB4T2Zmc2V0ICsgY29sdW1uICogY29sdW1uR2FwLCB5LCBjb2x1bW4sIHJvdywgbGFzdEJvZHksIGkpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSB3aXRoIGEgTmV3dG9uJ3MgQ3JhZGxlIHNldHVwIG9mIGJvZGllcyBhbmQgY29uc3RyYWludHMuXG4gICAgICogQG1ldGhvZCBuZXd0b25zQ3JhZGxlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHh4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHl5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gQSBuZXcgY29tcG9zaXRlIG5ld3RvbnNDcmFkbGUgYm9keVxuICAgICAqL1xuICAgIENvbXBvc2l0ZXMubmV3dG9uc0NyYWRsZSA9IGZ1bmN0aW9uKHh4LCB5eSwgbnVtYmVyLCBzaXplLCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIG5ld3RvbnNDcmFkbGUgPSBDb21wb3NpdGUuY3JlYXRlKHsgbGFiZWw6ICdOZXd0b25zIENyYWRsZScgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNlcGFyYXRpb24gPSAxLjksXG4gICAgICAgICAgICAgICAgY2lyY2xlID0gQm9kaWVzLmNpcmNsZSh4eCArIGkgKiAoc2l6ZSAqIHNlcGFyYXRpb24pLCB5eSArIGxlbmd0aCwgc2l6ZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpbmVydGlhOiBJbmZpbml0eSwgcmVzdGl0dXRpb246IDEsIGZyaWN0aW9uOiAwLCBmcmljdGlvbkFpcjogMC4wMDAxLCBzbG9wOiAxIH0pLFxuICAgICAgICAgICAgICAgIGNvbnN0cmFpbnQgPSBDb25zdHJhaW50LmNyZWF0ZSh7IHBvaW50QTogeyB4OiB4eCArIGkgKiAoc2l6ZSAqIHNlcGFyYXRpb24pLCB5OiB5eSB9LCBib2R5QjogY2lyY2xlIH0pO1xuXG4gICAgICAgICAgICBDb21wb3NpdGUuYWRkQm9keShuZXd0b25zQ3JhZGxlLCBjaXJjbGUpO1xuICAgICAgICAgICAgQ29tcG9zaXRlLmFkZENvbnN0cmFpbnQobmV3dG9uc0NyYWRsZSwgY29uc3RyYWludCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3dG9uc0NyYWRsZTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb21wb3NpdGUgd2l0aCBzaW1wbGUgY2FyIHNldHVwIG9mIGJvZGllcyBhbmQgY29uc3RyYWludHMuXG4gICAgICogQG1ldGhvZCBjYXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geHhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdoZWVsU2l6ZVxuICAgICAqIEByZXR1cm4ge2NvbXBvc2l0ZX0gQSBuZXcgY29tcG9zaXRlIGNhciBib2R5XG4gICAgICovXG4gICAgQ29tcG9zaXRlcy5jYXIgPSBmdW5jdGlvbih4eCwgeXksIHdpZHRoLCBoZWlnaHQsIHdoZWVsU2l6ZSkge1xuICAgICAgICB2YXIgZ3JvdXAgPSBCb2R5Lm5leHRHcm91cCh0cnVlKSxcbiAgICAgICAgICAgIHdoZWVsQmFzZSA9IDIwLFxuICAgICAgICAgICAgd2hlZWxBT2Zmc2V0ID0gLXdpZHRoICogMC41ICsgd2hlZWxCYXNlLFxuICAgICAgICAgICAgd2hlZWxCT2Zmc2V0ID0gd2lkdGggKiAwLjUgLSB3aGVlbEJhc2UsXG4gICAgICAgICAgICB3aGVlbFlPZmZzZXQgPSAwO1xuICAgIFxuICAgICAgICB2YXIgY2FyID0gQ29tcG9zaXRlLmNyZWF0ZSh7IGxhYmVsOiAnQ2FyJyB9KSxcbiAgICAgICAgICAgIGJvZHkgPSBCb2RpZXMucmVjdGFuZ2xlKHh4LCB5eSwgd2lkdGgsIGhlaWdodCwgeyBcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IGdyb3VwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGFtZmVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHJhZGl1czogaGVpZ2h0ICogMC41XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZW5zaXR5OiAwLjAwMDJcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICB2YXIgd2hlZWxBID0gQm9kaWVzLmNpcmNsZSh4eCArIHdoZWVsQU9mZnNldCwgeXkgKyB3aGVlbFlPZmZzZXQsIHdoZWVsU2l6ZSwgeyBcbiAgICAgICAgICAgIGNvbGxpc2lvbkZpbHRlcjoge1xuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyaWN0aW9uOiAwLjhcbiAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgd2hlZWxCID0gQm9kaWVzLmNpcmNsZSh4eCArIHdoZWVsQk9mZnNldCwgeXkgKyB3aGVlbFlPZmZzZXQsIHdoZWVsU2l6ZSwgeyBcbiAgICAgICAgICAgIGNvbGxpc2lvbkZpbHRlcjoge1xuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyaWN0aW9uOiAwLjhcbiAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgYXhlbEEgPSBDb25zdHJhaW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBib2R5QjogYm9keSxcbiAgICAgICAgICAgIHBvaW50QjogeyB4OiB3aGVlbEFPZmZzZXQsIHk6IHdoZWVsWU9mZnNldCB9LFxuICAgICAgICAgICAgYm9keUE6IHdoZWVsQSxcbiAgICAgICAgICAgIHN0aWZmbmVzczogMSxcbiAgICAgICAgICAgIGxlbmd0aDogMFxuICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB2YXIgYXhlbEIgPSBDb25zdHJhaW50LmNyZWF0ZSh7XG4gICAgICAgICAgICBib2R5QjogYm9keSxcbiAgICAgICAgICAgIHBvaW50QjogeyB4OiB3aGVlbEJPZmZzZXQsIHk6IHdoZWVsWU9mZnNldCB9LFxuICAgICAgICAgICAgYm9keUE6IHdoZWVsQixcbiAgICAgICAgICAgIHN0aWZmbmVzczogMSxcbiAgICAgICAgICAgIGxlbmd0aDogMFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIENvbXBvc2l0ZS5hZGRCb2R5KGNhciwgYm9keSk7XG4gICAgICAgIENvbXBvc2l0ZS5hZGRCb2R5KGNhciwgd2hlZWxBKTtcbiAgICAgICAgQ29tcG9zaXRlLmFkZEJvZHkoY2FyLCB3aGVlbEIpO1xuICAgICAgICBDb21wb3NpdGUuYWRkQ29uc3RyYWludChjYXIsIGF4ZWxBKTtcbiAgICAgICAgQ29tcG9zaXRlLmFkZENvbnN0cmFpbnQoY2FyLCBheGVsQik7XG5cbiAgICAgICAgcmV0dXJuIGNhcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHNpbXBsZSBzb2Z0IGJvZHkgbGlrZSBvYmplY3QuXG4gICAgICogQG1ldGhvZCBzb2Z0Qm9keVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4eFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5eVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5zXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd3NcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uR2FwXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd0dhcFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY3Jvc3NCcmFjZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYXJ0aWNsZVJhZGl1c1xuICAgICAqIEBwYXJhbSB7fSBwYXJ0aWNsZU9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge30gY29uc3RyYWludE9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtjb21wb3NpdGV9IEEgbmV3IGNvbXBvc2l0ZSBzb2Z0Qm9keVxuICAgICAqL1xuICAgIENvbXBvc2l0ZXMuc29mdEJvZHkgPSBmdW5jdGlvbih4eCwgeXksIGNvbHVtbnMsIHJvd3MsIGNvbHVtbkdhcCwgcm93R2FwLCBjcm9zc0JyYWNlLCBwYXJ0aWNsZVJhZGl1cywgcGFydGljbGVPcHRpb25zLCBjb25zdHJhaW50T3B0aW9ucykge1xuICAgICAgICBwYXJ0aWNsZU9wdGlvbnMgPSBDb21tb24uZXh0ZW5kKHsgaW5lcnRpYTogSW5maW5pdHkgfSwgcGFydGljbGVPcHRpb25zKTtcbiAgICAgICAgY29uc3RyYWludE9wdGlvbnMgPSBDb21tb24uZXh0ZW5kKHsgc3RpZmZuZXNzOiAwLjIsIHJlbmRlcjogeyB0eXBlOiAnbGluZScsIGFuY2hvcnM6IGZhbHNlIH0gfSwgY29uc3RyYWludE9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBzb2Z0Qm9keSA9IENvbXBvc2l0ZXMuc3RhY2soeHgsIHl5LCBjb2x1bW5zLCByb3dzLCBjb2x1bW5HYXAsIHJvd0dhcCwgZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIEJvZGllcy5jaXJjbGUoeCwgeSwgcGFydGljbGVSYWRpdXMsIHBhcnRpY2xlT3B0aW9ucyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbXBvc2l0ZXMubWVzaChzb2Z0Qm9keSwgY29sdW1ucywgcm93cywgY3Jvc3NCcmFjZSwgY29uc3RyYWludE9wdGlvbnMpO1xuXG4gICAgICAgIHNvZnRCb2R5LmxhYmVsID0gJ1NvZnQgQm9keSc7XG5cbiAgICAgICAgcmV0dXJuIHNvZnRCb2R5O1xuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi4vYm9keS9Cb2R5XCI6MSxcIi4uL2JvZHkvQ29tcG9zaXRlXCI6MixcIi4uL2NvbnN0cmFpbnQvQ29uc3RyYWludFwiOjEyLFwiLi4vY29yZS9Db21tb25cIjoxNCxcIi4vQm9kaWVzXCI6MjN9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuQXhlc2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgc2V0cyBvZiBheGVzLlxuKlxuKiBAY2xhc3MgQXhlc1xuKi9cblxudmFyIEF4ZXMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGVzO1xuXG52YXIgVmVjdG9yID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVjdG9yJyk7XG52YXIgQ29tbW9uID0gX2RlcmVxXygnLi4vY29yZS9Db21tb24nKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzZXQgb2YgYXhlcyBmcm9tIHRoZSBnaXZlbiB2ZXJ0aWNlcy5cbiAgICAgKiBAbWV0aG9kIGZyb21WZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHJldHVybiB7YXhlc30gQSBuZXcgYXhlcyBmcm9tIHRoZSBnaXZlbiB2ZXJ0aWNlc1xuICAgICAqL1xuICAgIEF4ZXMuZnJvbVZlcnRpY2VzID0gZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICAgICAgdmFyIGF4ZXMgPSB7fTtcblxuICAgICAgICAvLyBmaW5kIHRoZSB1bmlxdWUgYXhlcywgdXNpbmcgZWRnZSBub3JtYWwgZ3JhZGllbnRzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBqID0gKGkgKyAxKSAlIHZlcnRpY2VzLmxlbmd0aCwgXG4gICAgICAgICAgICAgICAgbm9ybWFsID0gVmVjdG9yLm5vcm1hbGlzZSh7IFxuICAgICAgICAgICAgICAgICAgICB4OiB2ZXJ0aWNlc1tqXS55IC0gdmVydGljZXNbaV0ueSwgXG4gICAgICAgICAgICAgICAgICAgIHk6IHZlcnRpY2VzW2ldLnggLSB2ZXJ0aWNlc1tqXS54XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZ3JhZGllbnQgPSAobm9ybWFsLnkgPT09IDApID8gSW5maW5pdHkgOiAobm9ybWFsLnggLyBub3JtYWwueSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGxpbWl0IHByZWNpc2lvblxuICAgICAgICAgICAgZ3JhZGllbnQgPSBncmFkaWVudC50b0ZpeGVkKDMpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBheGVzW2dyYWRpZW50XSA9IG5vcm1hbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBDb21tb24udmFsdWVzKGF4ZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGEgc2V0IG9mIGF4ZXMgYnkgdGhlIGdpdmVuIGFuZ2xlLlxuICAgICAqIEBtZXRob2Qgcm90YXRlXG4gICAgICogQHBhcmFtIHtheGVzfSBheGVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXG4gICAgICovXG4gICAgQXhlcy5yb3RhdGUgPSBmdW5jdGlvbihheGVzLCBhbmdsZSkge1xuICAgICAgICBpZiAoYW5nbGUgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFxuICAgICAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICAgICAgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGF4aXMgPSBheGVzW2ldLFxuICAgICAgICAgICAgICAgIHh4O1xuICAgICAgICAgICAgeHggPSBheGlzLnggKiBjb3MgLSBheGlzLnkgKiBzaW47XG4gICAgICAgICAgICBheGlzLnkgPSBheGlzLnggKiBzaW4gKyBheGlzLnkgKiBjb3M7XG4gICAgICAgICAgICBheGlzLnggPSB4eDtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2dlb21ldHJ5L1ZlY3RvclwiOjI4fV0sMjY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLkJvdW5kc2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveGVzIChBQUJCKS5cbipcbiogQGNsYXNzIEJvdW5kc1xuKi9cblxudmFyIEJvdW5kcyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kcztcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBheGlzLWFsaWduZWQgYm91bmRpbmcgYm94IChBQUJCKSBmb3IgdGhlIGdpdmVuIHZlcnRpY2VzLlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcmV0dXJuIHtib3VuZHN9IEEgbmV3IGJvdW5kcyBvYmplY3RcbiAgICAgKi9cbiAgICBCb3VuZHMuY3JlYXRlID0gZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICAgICAgdmFyIGJvdW5kcyA9IHsgXG4gICAgICAgICAgICBtaW46IHsgeDogMCwgeTogMCB9LCBcbiAgICAgICAgICAgIG1heDogeyB4OiAwLCB5OiAwIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodmVydGljZXMpXG4gICAgICAgICAgICBCb3VuZHMudXBkYXRlKGJvdW5kcywgdmVydGljZXMpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGJvdW5kcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBib3VuZHMgdXNpbmcgdGhlIGdpdmVuIHZlcnRpY2VzIGFuZCBleHRlbmRzIHRoZSBib3VuZHMgZ2l2ZW4gYSB2ZWxvY2l0eS5cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7Ym91bmRzfSBib3VuZHNcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWxvY2l0eVxuICAgICAqL1xuICAgIEJvdW5kcy51cGRhdGUgPSBmdW5jdGlvbihib3VuZHMsIHZlcnRpY2VzLCB2ZWxvY2l0eSkge1xuICAgICAgICBib3VuZHMubWluLnggPSBJbmZpbml0eTtcbiAgICAgICAgYm91bmRzLm1heC54ID0gLUluZmluaXR5O1xuICAgICAgICBib3VuZHMubWluLnkgPSBJbmZpbml0eTtcbiAgICAgICAgYm91bmRzLm1heC55ID0gLUluZmluaXR5O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB2ZXJ0ZXggPSB2ZXJ0aWNlc1tpXTtcbiAgICAgICAgICAgIGlmICh2ZXJ0ZXgueCA+IGJvdW5kcy5tYXgueCkgYm91bmRzLm1heC54ID0gdmVydGV4Lng7XG4gICAgICAgICAgICBpZiAodmVydGV4LnggPCBib3VuZHMubWluLngpIGJvdW5kcy5taW4ueCA9IHZlcnRleC54O1xuICAgICAgICAgICAgaWYgKHZlcnRleC55ID4gYm91bmRzLm1heC55KSBib3VuZHMubWF4LnkgPSB2ZXJ0ZXgueTtcbiAgICAgICAgICAgIGlmICh2ZXJ0ZXgueSA8IGJvdW5kcy5taW4ueSkgYm91bmRzLm1pbi55ID0gdmVydGV4Lnk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh2ZWxvY2l0eSkge1xuICAgICAgICAgICAgaWYgKHZlbG9jaXR5LnggPiAwKSB7XG4gICAgICAgICAgICAgICAgYm91bmRzLm1heC54ICs9IHZlbG9jaXR5Lng7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvdW5kcy5taW4ueCArPSB2ZWxvY2l0eS54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodmVsb2NpdHkueSA+IDApIHtcbiAgICAgICAgICAgICAgICBib3VuZHMubWF4LnkgKz0gdmVsb2NpdHkueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYm91bmRzLm1pbi55ICs9IHZlbG9jaXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBib3VuZHMgY29udGFpbnMgdGhlIGdpdmVuIHBvaW50LlxuICAgICAqIEBtZXRob2QgY29udGFpbnNcbiAgICAgKiBAcGFyYW0ge2JvdW5kc30gYm91bmRzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgYm91bmRzIGNvbnRhaW4gdGhlIHBvaW50LCBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICBCb3VuZHMuY29udGFpbnMgPSBmdW5jdGlvbihib3VuZHMsIHBvaW50KSB7XG4gICAgICAgIHJldHVybiBwb2ludC54ID49IGJvdW5kcy5taW4ueCAmJiBwb2ludC54IDw9IGJvdW5kcy5tYXgueCBcbiAgICAgICAgICAgICAgICYmIHBvaW50LnkgPj0gYm91bmRzLm1pbi55ICYmIHBvaW50LnkgPD0gYm91bmRzLm1heC55O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBib3VuZHMgaW50ZXJzZWN0LlxuICAgICAqIEBtZXRob2Qgb3ZlcmxhcHNcbiAgICAgKiBAcGFyYW0ge2JvdW5kc30gYm91bmRzQVxuICAgICAqIEBwYXJhbSB7Ym91bmRzfSBib3VuZHNCXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgYm91bmRzIG92ZXJsYXAsIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIEJvdW5kcy5vdmVybGFwcyA9IGZ1bmN0aW9uKGJvdW5kc0EsIGJvdW5kc0IpIHtcbiAgICAgICAgcmV0dXJuIChib3VuZHNBLm1pbi54IDw9IGJvdW5kc0IubWF4LnggJiYgYm91bmRzQS5tYXgueCA+PSBib3VuZHNCLm1pbi54XG4gICAgICAgICAgICAgICAgJiYgYm91bmRzQS5tYXgueSA+PSBib3VuZHNCLm1pbi55ICYmIGJvdW5kc0EubWluLnkgPD0gYm91bmRzQi5tYXgueSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZXMgdGhlIGJvdW5kcyBieSB0aGUgZ2l2ZW4gdmVjdG9yLlxuICAgICAqIEBtZXRob2QgdHJhbnNsYXRlXG4gICAgICogQHBhcmFtIHtib3VuZHN9IGJvdW5kc1xuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JcbiAgICAgKi9cbiAgICBCb3VuZHMudHJhbnNsYXRlID0gZnVuY3Rpb24oYm91bmRzLCB2ZWN0b3IpIHtcbiAgICAgICAgYm91bmRzLm1pbi54ICs9IHZlY3Rvci54O1xuICAgICAgICBib3VuZHMubWF4LnggKz0gdmVjdG9yLng7XG4gICAgICAgIGJvdW5kcy5taW4ueSArPSB2ZWN0b3IueTtcbiAgICAgICAgYm91bmRzLm1heC55ICs9IHZlY3Rvci55O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTaGlmdHMgdGhlIGJvdW5kcyB0byB0aGUgZ2l2ZW4gcG9zaXRpb24uXG4gICAgICogQG1ldGhvZCBzaGlmdFxuICAgICAqIEBwYXJhbSB7Ym91bmRzfSBib3VuZHNcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gcG9zaXRpb25cbiAgICAgKi9cbiAgICBCb3VuZHMuc2hpZnQgPSBmdW5jdGlvbihib3VuZHMsIHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBkZWx0YVggPSBib3VuZHMubWF4LnggLSBib3VuZHMubWluLngsXG4gICAgICAgICAgICBkZWx0YVkgPSBib3VuZHMubWF4LnkgLSBib3VuZHMubWluLnk7XG4gICAgICAgICAgICBcbiAgICAgICAgYm91bmRzLm1pbi54ID0gcG9zaXRpb24ueDtcbiAgICAgICAgYm91bmRzLm1heC54ID0gcG9zaXRpb24ueCArIGRlbHRhWDtcbiAgICAgICAgYm91bmRzLm1pbi55ID0gcG9zaXRpb24ueTtcbiAgICAgICAgYm91bmRzLm1heC55ID0gcG9zaXRpb24ueSArIGRlbHRhWTtcbiAgICB9O1xuICAgIFxufSkoKTtcblxufSx7fV0sMjc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4qIFRoZSBgTWF0dGVyLlN2Z2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNvbnZlcnRpbmcgU1ZHIGltYWdlcyBpbnRvIGFuIGFycmF5IG9mIHZlY3RvciBwb2ludHMuXG4qXG4qIFRvIHVzZSB0aGlzIG1vZHVsZSB5b3UgYWxzbyBuZWVkIHRoZSBTVkdQYXRoU2VnIHBvbHlmaWxsOiBodHRwczovL2dpdGh1Yi5jb20vcHJvZ2Vycy9wYXRoc2VnXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBTdmdcbiovXG5cbnZhciBTdmcgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdmc7XG5cbnZhciBCb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYW4gU1ZHIHBhdGggaW50byBhbiBhcnJheSBvZiB2ZWN0b3IgcG9pbnRzLlxuICAgICAqIElmIHRoZSBpbnB1dCBwYXRoIGZvcm1zIGEgY29uY2F2ZSBzaGFwZSwgeW91IG11c3QgZGVjb21wb3NlIHRoZSByZXN1bHQgaW50byBjb252ZXggcGFydHMgYmVmb3JlIHVzZS5cbiAgICAgKiBTZWUgYEJvZGllcy5mcm9tVmVydGljZXNgIHdoaWNoIHByb3ZpZGVzIHN1cHBvcnQgZm9yIHRoaXMuXG4gICAgICogTm90ZSB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgbm90IGd1YXJhbnRlZWQgdG8gc3VwcG9ydCBjb21wbGV4IHBhdGhzIChzdWNoIGFzIHRob3NlIHdpdGggaG9sZXMpLlxuICAgICAqIEBtZXRob2QgcGF0aFRvVmVydGljZXNcbiAgICAgKiBAcGFyYW0ge1NWR1BhdGhFbGVtZW50fSBwYXRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVMZW5ndGg9MTVdXG4gICAgICogQHJldHVybiB7VmVjdG9yW119IHBvaW50c1xuICAgICAqL1xuICAgIFN2Zy5wYXRoVG9WZXJ0aWNlcyA9IGZ1bmN0aW9uKHBhdGgsIHNhbXBsZUxlbmd0aCkge1xuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd291dC9zdmcudG9wb2x5LmpzL2Jsb2IvbWFzdGVyL3N2Zy50b3BvbHkuanNcbiAgICAgICAgdmFyIGksIGlsLCB0b3RhbCwgcG9pbnQsIHNlZ21lbnQsIHNlZ21lbnRzLCBcbiAgICAgICAgICAgIHNlZ21lbnRzUXVldWUsIGxhc3RTZWdtZW50LCBcbiAgICAgICAgICAgIGxhc3RQb2ludCwgc2VnbWVudEluZGV4LCBwb2ludHMgPSBbXSxcbiAgICAgICAgICAgIGx4LCBseSwgbGVuZ3RoID0gMCwgeCA9IDAsIHkgPSAwO1xuXG4gICAgICAgIHNhbXBsZUxlbmd0aCA9IHNhbXBsZUxlbmd0aCB8fCAxNTtcblxuICAgICAgICB2YXIgYWRkUG9pbnQgPSBmdW5jdGlvbihweCwgcHksIHBhdGhTZWdUeXBlKSB7XG4gICAgICAgICAgICAvLyBhbGwgb2RkLW51bWJlcmVkIHBhdGggdHlwZXMgYXJlIHJlbGF0aXZlIGV4Y2VwdCBQQVRIU0VHX0NMT1NFUEFUSCAoMSlcbiAgICAgICAgICAgIHZhciBpc1JlbGF0aXZlID0gcGF0aFNlZ1R5cGUgJSAyID09PSAxICYmIHBhdGhTZWdUeXBlID4gMTtcblxuICAgICAgICAgICAgLy8gd2hlbiB0aGUgbGFzdCBwb2ludCBkb2Vzbid0IGVxdWFsIHRoZSBjdXJyZW50IHBvaW50IGFkZCB0aGUgY3VycmVudCBwb2ludFxuICAgICAgICAgICAgaWYgKCFsYXN0UG9pbnQgfHwgcHggIT0gbGFzdFBvaW50LnggfHwgcHkgIT0gbGFzdFBvaW50LnkpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFBvaW50ICYmIGlzUmVsYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgbHggPSBsYXN0UG9pbnQueDtcbiAgICAgICAgICAgICAgICAgICAgbHkgPSBsYXN0UG9pbnQueTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBseCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGx5ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGx4ICsgcHgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGx5ICsgcHlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGxhc3QgcG9pbnRcbiAgICAgICAgICAgICAgICBpZiAoaXNSZWxhdGl2ZSB8fCAhbGFzdFBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RQb2ludCA9IHBvaW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKHBvaW50KTtcblxuICAgICAgICAgICAgICAgIHggPSBseCArIHB4O1xuICAgICAgICAgICAgICAgIHkgPSBseSArIHB5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhZGRTZWdtZW50UG9pbnQgPSBmdW5jdGlvbihzZWdtZW50KSB7XG4gICAgICAgICAgICB2YXIgc2VnVHlwZSA9IHNlZ21lbnQucGF0aFNlZ1R5cGVBc0xldHRlci50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgICAgICAvLyBza2lwIHBhdGggZW5kc1xuICAgICAgICAgICAgaWYgKHNlZ1R5cGUgPT09ICdaJykgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBtYXAgc2VnbWVudCB0byB4IGFuZCB5XG4gICAgICAgICAgICBzd2l0Y2ggKHNlZ1R5cGUpIHtcblxuICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgY2FzZSAnQyc6XG4gICAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgICAgIHggPSBzZWdtZW50Lng7XG4gICAgICAgICAgICAgICAgeSA9IHNlZ21lbnQueTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0gnOlxuICAgICAgICAgICAgICAgIHggPSBzZWdtZW50Lng7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdWJzpcbiAgICAgICAgICAgICAgICB5ID0gc2VnbWVudC55O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGRQb2ludCh4LCB5LCBzZWdtZW50LnBhdGhTZWdUeXBlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBlbnN1cmUgcGF0aCBpcyBhYnNvbHV0ZVxuICAgICAgICBTdmcuX3N2Z1BhdGhUb0Fic29sdXRlKHBhdGgpO1xuXG4gICAgICAgIC8vIGdldCB0b3RhbCBsZW5ndGhcbiAgICAgICAgdG90YWwgPSBwYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG5cbiAgICAgICAgLy8gcXVldWUgc2VnbWVudHNcbiAgICAgICAgc2VnbWVudHMgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdGgucGF0aFNlZ0xpc3QubnVtYmVyT2ZJdGVtczsgaSArPSAxKVxuICAgICAgICAgICAgc2VnbWVudHMucHVzaChwYXRoLnBhdGhTZWdMaXN0LmdldEl0ZW0oaSkpO1xuXG4gICAgICAgIHNlZ21lbnRzUXVldWUgPSBzZWdtZW50cy5jb25jYXQoKTtcblxuICAgICAgICAvLyBzYW1wbGUgdGhyb3VnaCBwYXRoXG4gICAgICAgIHdoaWxlIChsZW5ndGggPCB0b3RhbCkge1xuICAgICAgICAgICAgLy8gZ2V0IHNlZ21lbnQgYXQgcG9zaXRpb25cbiAgICAgICAgICAgIHNlZ21lbnRJbmRleCA9IHBhdGguZ2V0UGF0aFNlZ0F0TGVuZ3RoKGxlbmd0aCk7XG4gICAgICAgICAgICBzZWdtZW50ID0gc2VnbWVudHNbc2VnbWVudEluZGV4XTtcblxuICAgICAgICAgICAgLy8gbmV3IHNlZ21lbnRcbiAgICAgICAgICAgIGlmIChzZWdtZW50ICE9IGxhc3RTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHNlZ21lbnRzUXVldWUubGVuZ3RoICYmIHNlZ21lbnRzUXVldWVbMF0gIT0gc2VnbWVudClcbiAgICAgICAgICAgICAgICAgICAgYWRkU2VnbWVudFBvaW50KHNlZ21lbnRzUXVldWUuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudCA9IHNlZ21lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBwb2ludHMgaW4gYmV0d2VlbiB3aGVuIGN1cnZpbmdcbiAgICAgICAgICAgIC8vIFRPRE86IGFkYXB0aXZlIHNhbXBsaW5nXG4gICAgICAgICAgICBzd2l0Y2ggKHNlZ21lbnQucGF0aFNlZ1R5cGVBc0xldHRlci50b1VwcGVyQ2FzZSgpKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ0MnOlxuICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgICAgICAgcG9pbnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgobGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBhZGRQb2ludChwb2ludC54LCBwb2ludC55LCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbmNyZW1lbnQgYnkgc2FtcGxlIHZhbHVlXG4gICAgICAgICAgICBsZW5ndGggKz0gc2FtcGxlTGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHJlbWFpbmluZyBzZWdtZW50cyBub3QgcGFzc2VkIGJ5IHNhbXBsaW5nXG4gICAgICAgIGZvciAoaSA9IDAsIGlsID0gc2VnbWVudHNRdWV1ZS5sZW5ndGg7IGkgPCBpbDsgKytpKVxuICAgICAgICAgICAgYWRkU2VnbWVudFBvaW50KHNlZ21lbnRzUXVldWVbaV0pO1xuXG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfTtcblxuICAgIFN2Zy5fc3ZnUGF0aFRvQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIC8vIGh0dHA6Ly9waHJvZ3oubmV0L2NvbnZlcnQtc3ZnLXBhdGgtdG8tYWxsLWFic29sdXRlLWNvbW1hbmRzXG4gICAgICAgIC8vIENvcHlyaWdodCAoYykgR2F2aW4gS2lzdG5lclxuICAgICAgICAvLyBodHRwOi8vcGhyb2d6Lm5ldC9qcy9fUmV1c2VMaWNlbnNlLnR4dFxuICAgICAgICAvLyBNb2RpZmljYXRpb25zOiB0aWR5IGZvcm1hdHRpbmcgYW5kIG5hbWluZ1xuICAgICAgICB2YXIgeDAsIHkwLCB4MSwgeTEsIHgyLCB5Miwgc2VncyA9IHBhdGgucGF0aFNlZ0xpc3QsXG4gICAgICAgICAgICB4ID0gMCwgeSA9IDAsIGxlbiA9IHNlZ3MubnVtYmVyT2ZJdGVtcztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIgc2VnID0gc2Vncy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgIHNlZ1R5cGUgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgaWYgKC9bTUxIVkNTUVRBXS8udGVzdChzZWdUeXBlKSkge1xuICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSB4ID0gc2VnLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyBpbiBzZWcpIHkgPSBzZWcueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHggKyBzZWcueDE7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHggKyBzZWcueDI7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHkgKyBzZWcueTE7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHkgKyBzZWcueTI7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIHggKz0gc2VnLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyBpbiBzZWcpIHkgKz0gc2VnLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlZ1R5cGUpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0Ficyh4LCB5KSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0xpbmV0b0Ficyh4LCB5KSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0xpbmV0b0hvcml6b250YWxBYnMoeCksIGkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgc2Vncy5yZXBsYWNlSXRlbShwYXRoLmNyZWF0ZVNWR1BhdGhTZWdMaW5ldG9WZXJ0aWNhbEFicyh5KSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY0Ficyh4LCB5LCB4MSwgeTEsIHgyLCB5MiksIGkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgc2Vncy5yZXBsYWNlSXRlbShwYXRoLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNTbW9vdGhBYnMoeCwgeSwgeDIsIHkyKSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3EnOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNBYnMoeCwgeSwgeDEsIHkxKSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9RdWFkcmF0aWNTbW9vdGhBYnMoeCwgeSksIGkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICAgICAgc2Vncy5yZXBsYWNlSXRlbShwYXRoLmNyZWF0ZVNWR1BhdGhTZWdBcmNBYnMoeCwgeSwgc2VnLnIxLCBzZWcucjIsIHNlZy5hbmdsZSwgc2VnLmxhcmdlQXJjRmxhZywgc2VnLnN3ZWVwRmxhZyksIGkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd6JzpcbiAgICAgICAgICAgICAgICBjYXNlICdaJzpcbiAgICAgICAgICAgICAgICAgICAgeCA9IHgwO1xuICAgICAgICAgICAgICAgICAgICB5ID0geTA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VnVHlwZSA9PSAnTScgfHwgc2VnVHlwZSA9PSAnbScpIHtcbiAgICAgICAgICAgICAgICB4MCA9IHg7XG4gICAgICAgICAgICAgICAgeTAgPSB5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufSkoKTtcbn0se1wiLi4vZ2VvbWV0cnkvQm91bmRzXCI6MjZ9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiogVGhlIGBNYXR0ZXIuVmVjdG9yYCBtb2R1bGUgY29udGFpbnMgbWV0aG9kcyBmb3IgY3JlYXRpbmcgYW5kIG1hbmlwdWxhdGluZyB2ZWN0b3JzLlxuKiBWZWN0b3JzIGFyZSB0aGUgYmFzaXMgb2YgYWxsIHRoZSBnZW9tZXRyeSByZWxhdGVkIG9wZXJhdGlvbnMgaW4gdGhlIGVuZ2luZS5cbiogQSBgTWF0dGVyLlZlY3RvcmAgb2JqZWN0IGlzIG9mIHRoZSBmb3JtIGB7IHg6IDAsIHk6IDAgfWAuXG4qXG4qIFNlZSB0aGUgaW5jbHVkZWQgdXNhZ2UgW2V4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbGlhYnJ1L21hdHRlci1qcy90cmVlL21hc3Rlci9leGFtcGxlcykuXG4qXG4qIEBjbGFzcyBWZWN0b3JcbiovXG5cbi8vIFRPRE86IGNvbnNpZGVyIHBhcmFtcyBmb3IgcmV1c2luZyB2ZWN0b3Igb2JqZWN0c1xuXG52YXIgVmVjdG9yID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHZlY3Rvci5cbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IEEgbmV3IHZlY3RvclxuICAgICAqL1xuICAgIFZlY3Rvci5jcmVhdGUgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiB7IHg6IHggfHwgMCwgeTogeSB8fCAwIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgdmVjdG9yIHdpdGggYHhgIGFuZCBgeWAgY29waWVkIGZyb20gdGhlIGdpdmVuIGB2ZWN0b3JgLlxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBBIG5ldyBjbG9uZWQgdmVjdG9yXG4gICAgICovXG4gICAgVmVjdG9yLmNsb25lID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgIHJldHVybiB7IHg6IHZlY3Rvci54LCB5OiB2ZWN0b3IueSB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtYWduaXR1ZGUgKGxlbmd0aCkgb2YgYSB2ZWN0b3IuXG4gICAgICogQG1ldGhvZCBtYWduaXR1ZGVcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3JcbiAgICAgKi9cbiAgICBWZWN0b3IubWFnbml0dWRlID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoKHZlY3Rvci54ICogdmVjdG9yLngpICsgKHZlY3Rvci55ICogdmVjdG9yLnkpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWFnbml0dWRlIChsZW5ndGgpIG9mIGEgdmVjdG9yICh0aGVyZWZvcmUgc2F2aW5nIGEgYHNxcnRgIG9wZXJhdGlvbikuXG4gICAgICogQG1ldGhvZCBtYWduaXR1ZGVTcXVhcmVkXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gVGhlIHNxdWFyZWQgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3JcbiAgICAgKi9cbiAgICBWZWN0b3IubWFnbml0dWRlU3F1YXJlZCA9IGZ1bmN0aW9uKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gKHZlY3Rvci54ICogdmVjdG9yLngpICsgKHZlY3Rvci55ICogdmVjdG9yLnkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIHRoZSB2ZWN0b3IgYWJvdXQgKDAsIDApIGJ5IHNwZWNpZmllZCBhbmdsZS5cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGVcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gW291dHB1dF1cbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IFRoZSB2ZWN0b3Igcm90YXRlZCBhYm91dCAoMCwgMClcbiAgICAgKi9cbiAgICBWZWN0b3Iucm90YXRlID0gZnVuY3Rpb24odmVjdG9yLCBhbmdsZSwgb3V0cHV0KSB7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSksIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgaWYgKCFvdXRwdXQpIG91dHB1dCA9IHt9O1xuICAgICAgICB2YXIgeCA9IHZlY3Rvci54ICogY29zIC0gdmVjdG9yLnkgKiBzaW47XG4gICAgICAgIG91dHB1dC55ID0gdmVjdG9yLnggKiBzaW4gKyB2ZWN0b3IueSAqIGNvcztcbiAgICAgICAgb3V0cHV0LnggPSB4O1xuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIHRoZSB2ZWN0b3IgYWJvdXQgYSBzcGVjaWZpZWQgcG9pbnQgYnkgc3BlY2lmaWVkIGFuZ2xlLlxuICAgICAqIEBtZXRob2Qgcm90YXRlQWJvdXRcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtvdXRwdXRdXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBBIG5ldyB2ZWN0b3Igcm90YXRlZCBhYm91dCB0aGUgcG9pbnRcbiAgICAgKi9cbiAgICBWZWN0b3Iucm90YXRlQWJvdXQgPSBmdW5jdGlvbih2ZWN0b3IsIGFuZ2xlLCBwb2ludCwgb3V0cHV0KSB7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSksIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgaWYgKCFvdXRwdXQpIG91dHB1dCA9IHt9O1xuICAgICAgICB2YXIgeCA9IHBvaW50LnggKyAoKHZlY3Rvci54IC0gcG9pbnQueCkgKiBjb3MgLSAodmVjdG9yLnkgLSBwb2ludC55KSAqIHNpbik7XG4gICAgICAgIG91dHB1dC55ID0gcG9pbnQueSArICgodmVjdG9yLnggLSBwb2ludC54KSAqIHNpbiArICh2ZWN0b3IueSAtIHBvaW50LnkpICogY29zKTtcbiAgICAgICAgb3V0cHV0LnggPSB4O1xuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpc2VzIGEgdmVjdG9yIChzdWNoIHRoYXQgaXRzIG1hZ25pdHVkZSBpcyBgMWApLlxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXNlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge3ZlY3Rvcn0gQSBuZXcgdmVjdG9yIG5vcm1hbGlzZWRcbiAgICAgKi9cbiAgICBWZWN0b3Iubm9ybWFsaXNlID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgIHZhciBtYWduaXR1ZGUgPSBWZWN0b3IubWFnbml0dWRlKHZlY3Rvcik7XG4gICAgICAgIGlmIChtYWduaXR1ZGUgPT09IDApXG4gICAgICAgICAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIHJldHVybiB7IHg6IHZlY3Rvci54IC8gbWFnbml0dWRlLCB5OiB2ZWN0b3IueSAvIG1hZ25pdHVkZSB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkb3QtcHJvZHVjdCBvZiB0d28gdmVjdG9ycy5cbiAgICAgKiBAbWV0aG9kIGRvdFxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JBXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvckJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgdHdvIHZlY3RvcnNcbiAgICAgKi9cbiAgICBWZWN0b3IuZG90ID0gZnVuY3Rpb24odmVjdG9yQSwgdmVjdG9yQikge1xuICAgICAgICByZXR1cm4gKHZlY3RvckEueCAqIHZlY3RvckIueCkgKyAodmVjdG9yQS55ICogdmVjdG9yQi55KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3Jvc3MtcHJvZHVjdCBvZiB0d28gdmVjdG9ycy5cbiAgICAgKiBAbWV0aG9kIGNyb3NzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvckFcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byB2ZWN0b3JzXG4gICAgICovXG4gICAgVmVjdG9yLmNyb3NzID0gZnVuY3Rpb24odmVjdG9yQSwgdmVjdG9yQikge1xuICAgICAgICByZXR1cm4gKHZlY3RvckEueCAqIHZlY3RvckIueSkgLSAodmVjdG9yQS55ICogdmVjdG9yQi54KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3Jvc3MtcHJvZHVjdCBvZiB0aHJlZSB2ZWN0b3JzLlxuICAgICAqIEBtZXRob2QgY3Jvc3MzXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvckFcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQlxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JDXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgdGhyZWUgdmVjdG9yc1xuICAgICAqL1xuICAgIFZlY3Rvci5jcm9zczMgPSBmdW5jdGlvbih2ZWN0b3JBLCB2ZWN0b3JCLCB2ZWN0b3JDKSB7XG4gICAgICAgIHJldHVybiAodmVjdG9yQi54IC0gdmVjdG9yQS54KSAqICh2ZWN0b3JDLnkgLSB2ZWN0b3JBLnkpIC0gKHZlY3RvckIueSAtIHZlY3RvckEueSkgKiAodmVjdG9yQy54IC0gdmVjdG9yQS54KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgdHdvIHZlY3RvcnMuXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JCXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtvdXRwdXRdXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBBIG5ldyB2ZWN0b3Igb2YgdmVjdG9yQSBhbmQgdmVjdG9yQiBhZGRlZFxuICAgICAqL1xuICAgIFZlY3Rvci5hZGQgPSBmdW5jdGlvbih2ZWN0b3JBLCB2ZWN0b3JCLCBvdXRwdXQpIHtcbiAgICAgICAgaWYgKCFvdXRwdXQpIG91dHB1dCA9IHt9O1xuICAgICAgICBvdXRwdXQueCA9IHZlY3RvckEueCArIHZlY3RvckIueDtcbiAgICAgICAgb3V0cHV0LnkgPSB2ZWN0b3JBLnkgKyB2ZWN0b3JCLnk7XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFN1YnRyYWN0cyB0aGUgdHdvIHZlY3RvcnMuXG4gICAgICogQG1ldGhvZCBzdWJcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JCXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IFtvdXRwdXRdXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBBIG5ldyB2ZWN0b3Igb2YgdmVjdG9yQSBhbmQgdmVjdG9yQiBzdWJ0cmFjdGVkXG4gICAgICovXG4gICAgVmVjdG9yLnN1YiA9IGZ1bmN0aW9uKHZlY3RvckEsIHZlY3RvckIsIG91dHB1dCkge1xuICAgICAgICBpZiAoIW91dHB1dCkgb3V0cHV0ID0ge307XG4gICAgICAgIG91dHB1dC54ID0gdmVjdG9yQS54IC0gdmVjdG9yQi54O1xuICAgICAgICBvdXRwdXQueSA9IHZlY3RvckEueSAtIHZlY3RvckIueTtcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbGllcyBhIHZlY3RvciBhbmQgYSBzY2FsYXIuXG4gICAgICogQG1ldGhvZCBtdWx0XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsYXJcbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IEEgbmV3IHZlY3RvciBtdWx0aXBsaWVkIGJ5IHNjYWxhclxuICAgICAqL1xuICAgIFZlY3Rvci5tdWx0ID0gZnVuY3Rpb24odmVjdG9yLCBzY2FsYXIpIHtcbiAgICAgICAgcmV0dXJuIHsgeDogdmVjdG9yLnggKiBzY2FsYXIsIHk6IHZlY3Rvci55ICogc2NhbGFyIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERpdmlkZXMgYSB2ZWN0b3IgYW5kIGEgc2NhbGFyLlxuICAgICAqIEBtZXRob2QgZGl2XG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsYXJcbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IEEgbmV3IHZlY3RvciBkaXZpZGVkIGJ5IHNjYWxhclxuICAgICAqL1xuICAgIFZlY3Rvci5kaXYgPSBmdW5jdGlvbih2ZWN0b3IsIHNjYWxhcikge1xuICAgICAgICByZXR1cm4geyB4OiB2ZWN0b3IueCAvIHNjYWxhciwgeTogdmVjdG9yLnkgLyBzY2FsYXIgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGVycGVuZGljdWxhciB2ZWN0b3IuIFNldCBgbmVnYXRlYCB0byB0cnVlIGZvciB0aGUgcGVycGVuZGljdWxhciBpbiB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uLlxuICAgICAqIEBtZXRob2QgcGVycFxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IFtuZWdhdGU9ZmFsc2VdXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBUaGUgcGVycGVuZGljdWxhciB2ZWN0b3JcbiAgICAgKi9cbiAgICBWZWN0b3IucGVycCA9IGZ1bmN0aW9uKHZlY3RvciwgbmVnYXRlKSB7XG4gICAgICAgIG5lZ2F0ZSA9IG5lZ2F0ZSA9PT0gdHJ1ZSA/IC0xIDogMTtcbiAgICAgICAgcmV0dXJuIHsgeDogbmVnYXRlICogLXZlY3Rvci55LCB5OiBuZWdhdGUgKiB2ZWN0b3IueCB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBOZWdhdGVzIGJvdGggY29tcG9uZW50cyBvZiBhIHZlY3RvciBzdWNoIHRoYXQgaXQgcG9pbnRzIGluIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24uXG4gICAgICogQG1ldGhvZCBuZWdcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7dmVjdG9yfSBUaGUgbmVnYXRlZCB2ZWN0b3JcbiAgICAgKi9cbiAgICBWZWN0b3IubmVnID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgIHJldHVybiB7IHg6IC12ZWN0b3IueCwgeTogLXZlY3Rvci55IH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFuZ2xlIGluIHJhZGlhbnMgYmV0d2VlbiB0aGUgdHdvIHZlY3RvcnMgcmVsYXRpdmUgdG8gdGhlIHgtYXhpcy5cbiAgICAgKiBAbWV0aG9kIGFuZ2xlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHZlY3RvckFcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gdmVjdG9yQlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAgICAgKi9cbiAgICBWZWN0b3IuYW5nbGUgPSBmdW5jdGlvbih2ZWN0b3JBLCB2ZWN0b3JCKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHZlY3RvckIueSAtIHZlY3RvckEueSwgdmVjdG9yQi54IC0gdmVjdG9yQS54KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGVtcG9yYXJ5IHZlY3RvciBwb29sIChub3QgdGhyZWFkLXNhZmUpLlxuICAgICAqIEBwcm9wZXJ0eSBfdGVtcFxuICAgICAqIEB0eXBlIHt2ZWN0b3JbXX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFZlY3Rvci5fdGVtcCA9IFtcbiAgICAgICAgVmVjdG9yLmNyZWF0ZSgpLCBWZWN0b3IuY3JlYXRlKCksIFxuICAgICAgICBWZWN0b3IuY3JlYXRlKCksIFZlY3Rvci5jcmVhdGUoKSwgXG4gICAgICAgIFZlY3Rvci5jcmVhdGUoKSwgVmVjdG9yLmNyZWF0ZSgpXG4gICAgXTtcblxufSkoKTtcbn0se31dLDI5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5WZXJ0aWNlc2AgbW9kdWxlIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgc2V0cyBvZiB2ZXJ0aWNlcy5cbiogQSBzZXQgb2YgdmVydGljZXMgaXMgYW4gYXJyYXkgb2YgYE1hdHRlci5WZWN0b3JgIHdpdGggYWRkaXRpb25hbCBpbmRleGluZyBwcm9wZXJ0aWVzIGluc2VydGVkIGJ5IGBWZXJ0aWNlcy5jcmVhdGVgLlxuKiBBIGBNYXR0ZXIuQm9keWAgbWFpbnRhaW5zIGEgc2V0IG9mIHZlcnRpY2VzIHRvIHJlcHJlc2VudCB0aGUgc2hhcGUgb2YgdGhlIG9iamVjdCAoaXRzIGNvbnZleCBodWxsKS5cbipcbiogU2VlIHRoZSBpbmNsdWRlZCB1c2FnZSBbZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9saWFicnUvbWF0dGVyLWpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzKS5cbipcbiogQGNsYXNzIFZlcnRpY2VzXG4qL1xuXG52YXIgVmVydGljZXMgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBWZXJ0aWNlcztcblxudmFyIFZlY3RvciA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlY3RvcicpO1xudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc2V0IG9mIGBNYXR0ZXIuQm9keWAgY29tcGF0aWJsZSB2ZXJ0aWNlcy5cbiAgICAgKiBUaGUgYHBvaW50c2AgYXJndW1lbnQgYWNjZXB0cyBhbiBhcnJheSBvZiBgTWF0dGVyLlZlY3RvcmAgcG9pbnRzIG9yaWVudGF0ZWQgYXJvdW5kIHRoZSBvcmlnaW4gYCgwLCAwKWAsIGZvciBleGFtcGxlOlxuICAgICAqXG4gICAgICogICAgIFt7IHg6IDAsIHk6IDAgfSwgeyB4OiAyNSwgeTogNTAgfSwgeyB4OiA1MCwgeTogMCB9XVxuICAgICAqXG4gICAgICogVGhlIGBWZXJ0aWNlcy5jcmVhdGVgIG1ldGhvZCByZXR1cm5zIGEgbmV3IGFycmF5IG9mIHZlcnRpY2VzLCB3aGljaCBhcmUgc2ltaWxhciB0byBNYXR0ZXIuVmVjdG9yIG9iamVjdHMsXG4gICAgICogYnV0IHdpdGggc29tZSBhZGRpdGlvbmFsIHJlZmVyZW5jZXMgcmVxdWlyZWQgZm9yIGVmZmljaWVudCBjb2xsaXNpb24gZGV0ZWN0aW9uIHJvdXRpbmVzLlxuICAgICAqXG4gICAgICogVmVydGljZXMgbXVzdCBiZSBzcGVjaWZpZWQgaW4gY2xvY2t3aXNlIG9yZGVyLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoZSBgYm9keWAgYXJndW1lbnQgaXMgbm90IG9wdGlvbmFsLCBhIGBNYXR0ZXIuQm9keWAgcmVmZXJlbmNlIG11c3QgYmUgcHJvdmlkZWQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7dmVjdG9yW119IHBvaW50c1xuICAgICAqIEBwYXJhbSB7Ym9keX0gYm9keVxuICAgICAqL1xuICAgIFZlcnRpY2VzLmNyZWF0ZSA9IGZ1bmN0aW9uKHBvaW50cywgYm9keSkge1xuICAgICAgICB2YXIgdmVydGljZXMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBvaW50ID0gcG9pbnRzW2ldLFxuICAgICAgICAgICAgICAgIHZlcnRleCA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnQueSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgICAgICAgICAgICAgIGlzSW50ZXJuYWw6IGZhbHNlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0ZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZlcnRpY2VzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBzdHJpbmcgY29udGFpbmluZyBvcmRlcmVkIHggeSBwYWlycyBzZXBhcmF0ZWQgYnkgc3BhY2VzIChhbmQgb3B0aW9uYWxseSBjb21tYXMpLCBcbiAgICAgKiBpbnRvIGEgYE1hdHRlci5WZXJ0aWNlc2Agb2JqZWN0IGZvciB0aGUgZ2l2ZW4gYE1hdHRlci5Cb2R5YC5cbiAgICAgKiBGb3IgcGFyc2luZyBTVkcgcGF0aHMsIHNlZSBgU3ZnLnBhdGhUb1ZlcnRpY2VzYC5cbiAgICAgKiBAbWV0aG9kIGZyb21QYXRoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcmV0dXJuIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKi9cbiAgICBWZXJ0aWNlcy5mcm9tUGF0aCA9IGZ1bmN0aW9uKHBhdGgsIGJvZHkpIHtcbiAgICAgICAgdmFyIHBhdGhQYXR0ZXJuID0gL0w/XFxzKihbXFwtXFxkXFwuZV0rKVtcXHMsXSooW1xcLVxcZFxcLmVdKykqL2lnLFxuICAgICAgICAgICAgcG9pbnRzID0gW107XG5cbiAgICAgICAgcGF0aC5yZXBsYWNlKHBhdGhQYXR0ZXJuLCBmdW5jdGlvbihtYXRjaCwgeCwgeSkge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goeyB4OiBwYXJzZUZsb2F0KHgpLCB5OiBwYXJzZUZsb2F0KHkpIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gVmVydGljZXMuY3JlYXRlKHBvaW50cywgYm9keSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNlbnRyZSAoY2VudHJvaWQpIG9mIHRoZSBzZXQgb2YgdmVydGljZXMuXG4gICAgICogQG1ldGhvZCBjZW50cmVcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEByZXR1cm4ge3ZlY3Rvcn0gVGhlIGNlbnRyZSBwb2ludFxuICAgICAqL1xuICAgIFZlcnRpY2VzLmNlbnRyZSA9IGZ1bmN0aW9uKHZlcnRpY2VzKSB7XG4gICAgICAgIHZhciBhcmVhID0gVmVydGljZXMuYXJlYSh2ZXJ0aWNlcywgdHJ1ZSksXG4gICAgICAgICAgICBjZW50cmUgPSB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIGNyb3NzLFxuICAgICAgICAgICAgdGVtcCxcbiAgICAgICAgICAgIGo7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaiA9IChpICsgMSkgJSB2ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICBjcm9zcyA9IFZlY3Rvci5jcm9zcyh2ZXJ0aWNlc1tpXSwgdmVydGljZXNbal0pO1xuICAgICAgICAgICAgdGVtcCA9IFZlY3Rvci5tdWx0KFZlY3Rvci5hZGQodmVydGljZXNbaV0sIHZlcnRpY2VzW2pdKSwgY3Jvc3MpO1xuICAgICAgICAgICAgY2VudHJlID0gVmVjdG9yLmFkZChjZW50cmUsIHRlbXApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFZlY3Rvci5kaXYoY2VudHJlLCA2ICogYXJlYSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGF2ZXJhZ2UgKG1lYW4pIG9mIHRoZSBzZXQgb2YgdmVydGljZXMuXG4gICAgICogQG1ldGhvZCBtZWFuXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcmV0dXJuIHt2ZWN0b3J9IFRoZSBhdmVyYWdlIHBvaW50XG4gICAgICovXG4gICAgVmVydGljZXMubWVhbiA9IGZ1bmN0aW9uKHZlcnRpY2VzKSB7XG4gICAgICAgIHZhciBhdmVyYWdlID0geyB4OiAwLCB5OiAwIH07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXZlcmFnZS54ICs9IHZlcnRpY2VzW2ldLng7XG4gICAgICAgICAgICBhdmVyYWdlLnkgKz0gdmVydGljZXNbaV0ueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBWZWN0b3IuZGl2KGF2ZXJhZ2UsIHZlcnRpY2VzLmxlbmd0aCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFyZWEgb2YgdGhlIHNldCBvZiB2ZXJ0aWNlcy5cbiAgICAgKiBAbWV0aG9kIGFyZWFcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7Ym9vbH0gc2lnbmVkXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgYXJlYVxuICAgICAqL1xuICAgIFZlcnRpY2VzLmFyZWEgPSBmdW5jdGlvbih2ZXJ0aWNlcywgc2lnbmVkKSB7XG4gICAgICAgIHZhciBhcmVhID0gMCxcbiAgICAgICAgICAgIGogPSB2ZXJ0aWNlcy5sZW5ndGggLSAxO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZWEgKz0gKHZlcnRpY2VzW2pdLnggLSB2ZXJ0aWNlc1tpXS54KSAqICh2ZXJ0aWNlc1tqXS55ICsgdmVydGljZXNbaV0ueSk7XG4gICAgICAgICAgICBqID0gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaWduZWQpXG4gICAgICAgICAgICByZXR1cm4gYXJlYSAvIDI7XG5cbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGFyZWEpIC8gMjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbW9tZW50IG9mIGluZXJ0aWEgKHNlY29uZCBtb21lbnQgb2YgYXJlYSkgb2YgdGhlIHNldCBvZiB2ZXJ0aWNlcyBnaXZlbiB0aGUgdG90YWwgbWFzcy5cbiAgICAgKiBAbWV0aG9kIGluZXJ0aWFcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXNzXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgcG9seWdvbidzIG1vbWVudCBvZiBpbmVydGlhXG4gICAgICovXG4gICAgVmVydGljZXMuaW5lcnRpYSA9IGZ1bmN0aW9uKHZlcnRpY2VzLCBtYXNzKSB7XG4gICAgICAgIHZhciBudW1lcmF0b3IgPSAwLFxuICAgICAgICAgICAgZGVub21pbmF0b3IgPSAwLFxuICAgICAgICAgICAgdiA9IHZlcnRpY2VzLFxuICAgICAgICAgICAgY3Jvc3MsXG4gICAgICAgICAgICBqO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIHBvbHlnb24ncyBtb21lbnQgb2YgaW5lcnRpYSwgdXNpbmcgc2Vjb25kIG1vbWVudCBvZiBhcmVhXG4gICAgICAgIC8vIGZyb20gZXF1YXRpb25zIGF0IGh0dHA6Ly93d3cucGh5c2ljc2ZvcnVtcy5jb20vc2hvd3RocmVhZC5waHA/dD0yNTI5M1xuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHYubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgICAgIGogPSAobiArIDEpICUgdi5sZW5ndGg7XG4gICAgICAgICAgICBjcm9zcyA9IE1hdGguYWJzKFZlY3Rvci5jcm9zcyh2W2pdLCB2W25dKSk7XG4gICAgICAgICAgICBudW1lcmF0b3IgKz0gY3Jvc3MgKiAoVmVjdG9yLmRvdCh2W2pdLCB2W2pdKSArIFZlY3Rvci5kb3QodltqXSwgdltuXSkgKyBWZWN0b3IuZG90KHZbbl0sIHZbbl0pKTtcbiAgICAgICAgICAgIGRlbm9taW5hdG9yICs9IGNyb3NzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChtYXNzIC8gNikgKiAobnVtZXJhdG9yIC8gZGVub21pbmF0b3IpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGVzIHRoZSBzZXQgb2YgdmVydGljZXMgaW4tcGxhY2UuXG4gICAgICogQG1ldGhvZCB0cmFuc2xhdGVcbiAgICAgKiBAcGFyYW0ge3ZlcnRpY2VzfSB2ZXJ0aWNlc1xuICAgICAqIEBwYXJhbSB7dmVjdG9yfSB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGFyXG4gICAgICovXG4gICAgVmVydGljZXMudHJhbnNsYXRlID0gZnVuY3Rpb24odmVydGljZXMsIHZlY3Rvciwgc2NhbGFyKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBpZiAoc2NhbGFyKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlc1tpXS54ICs9IHZlY3Rvci54ICogc2NhbGFyO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzW2ldLnkgKz0gdmVjdG9yLnkgKiBzY2FsYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlc1tpXS54ICs9IHZlY3Rvci54O1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzW2ldLnkgKz0gdmVjdG9yLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmVydGljZXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJvdGF0ZXMgdGhlIHNldCBvZiB2ZXJ0aWNlcyBpbi1wbGFjZS5cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVxuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXG4gICAgICogQHBhcmFtIHt2ZWN0b3J9IHBvaW50XG4gICAgICovXG4gICAgVmVydGljZXMucm90YXRlID0gZnVuY3Rpb24odmVydGljZXMsIGFuZ2xlLCBwb2ludCkge1xuICAgICAgICBpZiAoYW5nbGUgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgICAgIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdmVydGljZSA9IHZlcnRpY2VzW2ldLFxuICAgICAgICAgICAgICAgIGR4ID0gdmVydGljZS54IC0gcG9pbnQueCxcbiAgICAgICAgICAgICAgICBkeSA9IHZlcnRpY2UueSAtIHBvaW50Lnk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2ZXJ0aWNlLnggPSBwb2ludC54ICsgKGR4ICogY29zIC0gZHkgKiBzaW4pO1xuICAgICAgICAgICAgdmVydGljZS55ID0gcG9pbnQueSArIChkeCAqIHNpbiArIGR5ICogY29zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGBwb2ludGAgaXMgaW5zaWRlIHRoZSBzZXQgb2YgYHZlcnRpY2VzYC5cbiAgICAgKiBAbWV0aG9kIGNvbnRhaW5zXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2ZXJ0aWNlcyBjb250YWlucyBwb2ludCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgICovXG4gICAgVmVydGljZXMuY29udGFpbnMgPSBmdW5jdGlvbih2ZXJ0aWNlcywgcG9pbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHZlcnRpY2UgPSB2ZXJ0aWNlc1tpXSxcbiAgICAgICAgICAgICAgICBuZXh0VmVydGljZSA9IHZlcnRpY2VzWyhpICsgMSkgJSB2ZXJ0aWNlcy5sZW5ndGhdO1xuICAgICAgICAgICAgaWYgKChwb2ludC54IC0gdmVydGljZS54KSAqIChuZXh0VmVydGljZS55IC0gdmVydGljZS55KSArIChwb2ludC55IC0gdmVydGljZS55KSAqICh2ZXJ0aWNlLnggLSBuZXh0VmVydGljZS54KSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2NhbGVzIHRoZSB2ZXJ0aWNlcyBmcm9tIGEgcG9pbnQgKGRlZmF1bHQgaXMgY2VudHJlKSBpbi1wbGFjZS5cbiAgICAgKiBAbWV0aG9kIHNjYWxlXG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2NhbGVYXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlWVxuICAgICAqIEBwYXJhbSB7dmVjdG9yfSBwb2ludFxuICAgICAqL1xuICAgIFZlcnRpY2VzLnNjYWxlID0gZnVuY3Rpb24odmVydGljZXMsIHNjYWxlWCwgc2NhbGVZLCBwb2ludCkge1xuICAgICAgICBpZiAoc2NhbGVYID09PSAxICYmIHNjYWxlWSA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiB2ZXJ0aWNlcztcblxuICAgICAgICBwb2ludCA9IHBvaW50IHx8IFZlcnRpY2VzLmNlbnRyZSh2ZXJ0aWNlcyk7XG5cbiAgICAgICAgdmFyIHZlcnRleCxcbiAgICAgICAgICAgIGRlbHRhO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZlcnRleCA9IHZlcnRpY2VzW2ldO1xuICAgICAgICAgICAgZGVsdGEgPSBWZWN0b3Iuc3ViKHZlcnRleCwgcG9pbnQpO1xuICAgICAgICAgICAgdmVydGljZXNbaV0ueCA9IHBvaW50LnggKyBkZWx0YS54ICogc2NhbGVYO1xuICAgICAgICAgICAgdmVydGljZXNbaV0ueSA9IHBvaW50LnkgKyBkZWx0YS55ICogc2NhbGVZO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZlcnRpY2VzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGFtZmVycyBhIHNldCBvZiB2ZXJ0aWNlcyBieSBnaXZpbmcgdGhlbSByb3VuZGVkIGNvcm5lcnMsIHJldHVybnMgYSBuZXcgc2V0IG9mIHZlcnRpY2VzLlxuICAgICAqIFRoZSByYWRpdXMgcGFyYW1ldGVyIGlzIGEgc2luZ2xlIG51bWJlciBvciBhbiBhcnJheSB0byBzcGVjaWZ5IHRoZSByYWRpdXMgZm9yIGVhY2ggdmVydGV4LlxuICAgICAqIEBtZXRob2QgY2hhbWZlclxuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHF1YWxpdHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcXVhbGl0eU1pblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBxdWFsaXR5TWF4XG4gICAgICovXG4gICAgVmVydGljZXMuY2hhbWZlciA9IGZ1bmN0aW9uKHZlcnRpY2VzLCByYWRpdXMsIHF1YWxpdHksIHF1YWxpdHlNaW4sIHF1YWxpdHlNYXgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByYWRpdXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByYWRpdXMgPSBbcmFkaXVzXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IHJhZGl1cyB8fCBbOF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBxdWFsaXR5IGRlZmF1bHRzIHRvIC0xLCB3aGljaCBpcyBhdXRvXG4gICAgICAgIHF1YWxpdHkgPSAodHlwZW9mIHF1YWxpdHkgIT09ICd1bmRlZmluZWQnKSA/IHF1YWxpdHkgOiAtMTtcbiAgICAgICAgcXVhbGl0eU1pbiA9IHF1YWxpdHlNaW4gfHwgMjtcbiAgICAgICAgcXVhbGl0eU1heCA9IHF1YWxpdHlNYXggfHwgMTQ7XG5cbiAgICAgICAgdmFyIG5ld1ZlcnRpY2VzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByZXZWZXJ0ZXggPSB2ZXJ0aWNlc1tpIC0gMSA+PSAwID8gaSAtIDEgOiB2ZXJ0aWNlcy5sZW5ndGggLSAxXSxcbiAgICAgICAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0aWNlc1tpXSxcbiAgICAgICAgICAgICAgICBuZXh0VmVydGV4ID0gdmVydGljZXNbKGkgKyAxKSAlIHZlcnRpY2VzLmxlbmd0aF0sXG4gICAgICAgICAgICAgICAgY3VycmVudFJhZGl1cyA9IHJhZGl1c1tpIDwgcmFkaXVzLmxlbmd0aCA/IGkgOiByYWRpdXMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50UmFkaXVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbmV3VmVydGljZXMucHVzaCh2ZXJ0ZXgpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJldk5vcm1hbCA9IFZlY3Rvci5ub3JtYWxpc2UoeyBcbiAgICAgICAgICAgICAgICB4OiB2ZXJ0ZXgueSAtIHByZXZWZXJ0ZXgueSwgXG4gICAgICAgICAgICAgICAgeTogcHJldlZlcnRleC54IC0gdmVydGV4LnhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgbmV4dE5vcm1hbCA9IFZlY3Rvci5ub3JtYWxpc2UoeyBcbiAgICAgICAgICAgICAgICB4OiBuZXh0VmVydGV4LnkgLSB2ZXJ0ZXgueSwgXG4gICAgICAgICAgICAgICAgeTogdmVydGV4LnggLSBuZXh0VmVydGV4LnhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgZGlhZ29uYWxSYWRpdXMgPSBNYXRoLnNxcnQoMiAqIE1hdGgucG93KGN1cnJlbnRSYWRpdXMsIDIpKSxcbiAgICAgICAgICAgICAgICByYWRpdXNWZWN0b3IgPSBWZWN0b3IubXVsdChDb21tb24uY2xvbmUocHJldk5vcm1hbCksIGN1cnJlbnRSYWRpdXMpLFxuICAgICAgICAgICAgICAgIG1pZE5vcm1hbCA9IFZlY3Rvci5ub3JtYWxpc2UoVmVjdG9yLm11bHQoVmVjdG9yLmFkZChwcmV2Tm9ybWFsLCBuZXh0Tm9ybWFsKSwgMC41KSksXG4gICAgICAgICAgICAgICAgc2NhbGVkVmVydGV4ID0gVmVjdG9yLnN1Yih2ZXJ0ZXgsIFZlY3Rvci5tdWx0KG1pZE5vcm1hbCwgZGlhZ29uYWxSYWRpdXMpKTtcblxuICAgICAgICAgICAgdmFyIHByZWNpc2lvbiA9IHF1YWxpdHk7XG5cbiAgICAgICAgICAgIGlmIChxdWFsaXR5ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgZGVjaWRlIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9IE1hdGgucG93KGN1cnJlbnRSYWRpdXMsIDAuMzIpICogMS43NTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJlY2lzaW9uID0gQ29tbW9uLmNsYW1wKHByZWNpc2lvbiwgcXVhbGl0eU1pbiwgcXVhbGl0eU1heCk7XG5cbiAgICAgICAgICAgIC8vIHVzZSBhbiBldmVuIHZhbHVlIGZvciBwcmVjaXNpb24sIG1vcmUgbGlrZWx5IHRvIHJlZHVjZSBheGVzIGJ5IHVzaW5nIHN5bW1ldHJ5XG4gICAgICAgICAgICBpZiAocHJlY2lzaW9uICUgMiA9PT0gMSlcbiAgICAgICAgICAgICAgICBwcmVjaXNpb24gKz0gMTtcblxuICAgICAgICAgICAgdmFyIGFscGhhID0gTWF0aC5hY29zKFZlY3Rvci5kb3QocHJldk5vcm1hbCwgbmV4dE5vcm1hbCkpLFxuICAgICAgICAgICAgICAgIHRoZXRhID0gYWxwaGEgLyBwcmVjaXNpb247XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcHJlY2lzaW9uOyBqKyspIHtcbiAgICAgICAgICAgICAgICBuZXdWZXJ0aWNlcy5wdXNoKFZlY3Rvci5hZGQoVmVjdG9yLnJvdGF0ZShyYWRpdXNWZWN0b3IsIHRoZXRhICogaiksIHNjYWxlZFZlcnRleCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld1ZlcnRpY2VzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTb3J0cyB0aGUgaW5wdXQgdmVydGljZXMgaW50byBjbG9ja3dpc2Ugb3JkZXIgaW4gcGxhY2UuXG4gICAgICogQG1ldGhvZCBjbG9ja3dpc2VTb3J0XG4gICAgICogQHBhcmFtIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKiBAcmV0dXJuIHt2ZXJ0aWNlc30gdmVydGljZXNcbiAgICAgKi9cbiAgICBWZXJ0aWNlcy5jbG9ja3dpc2VTb3J0ID0gZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICAgICAgdmFyIGNlbnRyZSA9IFZlcnRpY2VzLm1lYW4odmVydGljZXMpO1xuXG4gICAgICAgIHZlcnRpY2VzLnNvcnQoZnVuY3Rpb24odmVydGV4QSwgdmVydGV4Qikge1xuICAgICAgICAgICAgcmV0dXJuIFZlY3Rvci5hbmdsZShjZW50cmUsIHZlcnRleEEpIC0gVmVjdG9yLmFuZ2xlKGNlbnRyZSwgdmVydGV4Qik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB2ZXJ0aWNlcyBmb3JtIGEgY29udmV4IHNoYXBlICh2ZXJ0aWNlcyBtdXN0IGJlIGluIGNsb2Nrd2lzZSBvcmRlcikuXG4gICAgICogQG1ldGhvZCBpc0NvbnZleFxuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHJldHVybiB7Ym9vbH0gYHRydWVgIGlmIHRoZSBgdmVydGljZXNgIGFyZSBjb252ZXgsIGBmYWxzZWAgaWYgbm90IChvciBgbnVsbGAgaWYgbm90IGNvbXB1dGFibGUpLlxuICAgICAqL1xuICAgIFZlcnRpY2VzLmlzQ29udmV4ID0gZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICAgICAgLy8gaHR0cDovL3BhdWxib3Vya2UubmV0L2dlb21ldHJ5L3BvbHlnb25tZXNoL1xuICAgICAgICAvLyBDb3B5cmlnaHQgKGMpIFBhdWwgQm91cmtlICh1c2UgcGVybWl0dGVkKVxuXG4gICAgICAgIHZhciBmbGFnID0gMCxcbiAgICAgICAgICAgIG4gPSB2ZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgaixcbiAgICAgICAgICAgIGssXG4gICAgICAgICAgICB6O1xuXG4gICAgICAgIGlmIChuIDwgMylcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGogPSAoaSArIDEpICUgbjtcbiAgICAgICAgICAgIGsgPSAoaSArIDIpICUgbjtcbiAgICAgICAgICAgIHogPSAodmVydGljZXNbal0ueCAtIHZlcnRpY2VzW2ldLngpICogKHZlcnRpY2VzW2tdLnkgLSB2ZXJ0aWNlc1tqXS55KTtcbiAgICAgICAgICAgIHogLT0gKHZlcnRpY2VzW2pdLnkgLSB2ZXJ0aWNlc1tpXS55KSAqICh2ZXJ0aWNlc1trXS54IC0gdmVydGljZXNbal0ueCk7XG5cbiAgICAgICAgICAgIGlmICh6IDwgMCkge1xuICAgICAgICAgICAgICAgIGZsYWcgfD0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeiA+IDApIHtcbiAgICAgICAgICAgICAgICBmbGFnIHw9IDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmbGFnID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZsYWcgIT09IDApe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb252ZXggaHVsbCBvZiB0aGUgaW5wdXQgdmVydGljZXMgYXMgYSBuZXcgYXJyYXkgb2YgcG9pbnRzLlxuICAgICAqIEBtZXRob2QgaHVsbFxuICAgICAqIEBwYXJhbSB7dmVydGljZXN9IHZlcnRpY2VzXG4gICAgICogQHJldHVybiBbdmVydGV4XSB2ZXJ0aWNlc1xuICAgICAqL1xuICAgIFZlcnRpY2VzLmh1bGwgPSBmdW5jdGlvbih2ZXJ0aWNlcykge1xuICAgICAgICAvLyBodHRwOi8vZ2VvbWFsZ29yaXRobXMuY29tL2ExMC1faHVsbC0xLmh0bWxcblxuICAgICAgICB2YXIgdXBwZXIgPSBbXSxcbiAgICAgICAgICAgIGxvd2VyID0gW10sIFxuICAgICAgICAgICAgdmVydGV4LFxuICAgICAgICAgICAgaTtcblxuICAgICAgICAvLyBzb3J0IHZlcnRpY2VzIG9uIHgtYXhpcyAoeS1heGlzIGZvciB0aWVzKVxuICAgICAgICB2ZXJ0aWNlcyA9IHZlcnRpY2VzLnNsaWNlKDApO1xuICAgICAgICB2ZXJ0aWNlcy5zb3J0KGZ1bmN0aW9uKHZlcnRleEEsIHZlcnRleEIpIHtcbiAgICAgICAgICAgIHZhciBkeCA9IHZlcnRleEEueCAtIHZlcnRleEIueDtcbiAgICAgICAgICAgIHJldHVybiBkeCAhPT0gMCA/IGR4IDogdmVydGV4QS55IC0gdmVydGV4Qi55O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBidWlsZCBsb3dlciBodWxsXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmVydGV4ID0gdmVydGljZXNbaV07XG5cbiAgICAgICAgICAgIHdoaWxlIChsb3dlci5sZW5ndGggPj0gMiBcbiAgICAgICAgICAgICAgICAgICAmJiBWZWN0b3IuY3Jvc3MzKGxvd2VyW2xvd2VyLmxlbmd0aCAtIDJdLCBsb3dlcltsb3dlci5sZW5ndGggLSAxXSwgdmVydGV4KSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgbG93ZXIucG9wKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvd2VyLnB1c2godmVydGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJ1aWxkIHVwcGVyIGh1bGxcbiAgICAgICAgZm9yIChpID0gdmVydGljZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICAgIHZlcnRleCA9IHZlcnRpY2VzW2ldO1xuXG4gICAgICAgICAgICB3aGlsZSAodXBwZXIubGVuZ3RoID49IDIgXG4gICAgICAgICAgICAgICAgICAgJiYgVmVjdG9yLmNyb3NzMyh1cHBlclt1cHBlci5sZW5ndGggLSAyXSwgdXBwZXJbdXBwZXIubGVuZ3RoIC0gMV0sIHZlcnRleCkgPD0gMCkge1xuICAgICAgICAgICAgICAgIHVwcGVyLnBvcCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1cHBlci5wdXNoKHZlcnRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25jYXRlbmF0aW9uIG9mIHRoZSBsb3dlciBhbmQgdXBwZXIgaHVsbHMgZ2l2ZXMgdGhlIGNvbnZleCBodWxsXG4gICAgICAgIC8vIG9taXQgbGFzdCBwb2ludHMgYmVjYXVzZSB0aGV5IGFyZSByZXBlYXRlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBvdGhlciBsaXN0XG4gICAgICAgIHVwcGVyLnBvcCgpO1xuICAgICAgICBsb3dlci5wb3AoKTtcblxuICAgICAgICByZXR1cm4gdXBwZXIuY29uY2F0KGxvd2VyKTtcbiAgICB9O1xuXG59KSgpO1xuXG59LHtcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuLi9nZW9tZXRyeS9WZWN0b3JcIjoyOH1dLDMwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBNYXR0ZXIgPSBtb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4uL2NvcmUvTWF0dGVyJyk7XG5cbk1hdHRlci5Cb2R5ID0gX2RlcmVxXygnLi4vYm9keS9Cb2R5Jyk7XG5NYXR0ZXIuQ29tcG9zaXRlID0gX2RlcmVxXygnLi4vYm9keS9Db21wb3NpdGUnKTtcbk1hdHRlci5Xb3JsZCA9IF9kZXJlcV8oJy4uL2JvZHkvV29ybGQnKTtcblxuTWF0dGVyLkNvbnRhY3QgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vQ29udGFjdCcpO1xuTWF0dGVyLkRldGVjdG9yID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL0RldGVjdG9yJyk7XG5NYXR0ZXIuR3JpZCA9IF9kZXJlcV8oJy4uL2NvbGxpc2lvbi9HcmlkJyk7XG5NYXR0ZXIuUGFpcnMgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vUGFpcnMnKTtcbk1hdHRlci5QYWlyID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL1BhaXInKTtcbk1hdHRlci5RdWVyeSA9IF9kZXJlcV8oJy4uL2NvbGxpc2lvbi9RdWVyeScpO1xuTWF0dGVyLlJlc29sdmVyID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL1Jlc29sdmVyJyk7XG5NYXR0ZXIuU0FUID0gX2RlcmVxXygnLi4vY29sbGlzaW9uL1NBVCcpO1xuXG5NYXR0ZXIuQ29uc3RyYWludCA9IF9kZXJlcV8oJy4uL2NvbnN0cmFpbnQvQ29uc3RyYWludCcpO1xuTWF0dGVyLk1vdXNlQ29uc3RyYWludCA9IF9kZXJlcV8oJy4uL2NvbnN0cmFpbnQvTW91c2VDb25zdHJhaW50Jyk7XG5cbk1hdHRlci5Db21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xuTWF0dGVyLkVuZ2luZSA9IF9kZXJlcV8oJy4uL2NvcmUvRW5naW5lJyk7XG5NYXR0ZXIuRXZlbnRzID0gX2RlcmVxXygnLi4vY29yZS9FdmVudHMnKTtcbk1hdHRlci5Nb3VzZSA9IF9kZXJlcV8oJy4uL2NvcmUvTW91c2UnKTtcbk1hdHRlci5SdW5uZXIgPSBfZGVyZXFfKCcuLi9jb3JlL1J1bm5lcicpO1xuTWF0dGVyLlNsZWVwaW5nID0gX2RlcmVxXygnLi4vY29yZS9TbGVlcGluZycpO1xuTWF0dGVyLlBsdWdpbiA9IF9kZXJlcV8oJy4uL2NvcmUvUGx1Z2luJyk7XG5cblxuTWF0dGVyLkJvZGllcyA9IF9kZXJlcV8oJy4uL2ZhY3RvcnkvQm9kaWVzJyk7XG5NYXR0ZXIuQ29tcG9zaXRlcyA9IF9kZXJlcV8oJy4uL2ZhY3RvcnkvQ29tcG9zaXRlcycpO1xuXG5NYXR0ZXIuQXhlcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L0F4ZXMnKTtcbk1hdHRlci5Cb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcbk1hdHRlci5TdmcgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9TdmcnKTtcbk1hdHRlci5WZWN0b3IgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9WZWN0b3InKTtcbk1hdHRlci5WZXJ0aWNlcyA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlcnRpY2VzJyk7XG5cbk1hdHRlci5SZW5kZXIgPSBfZGVyZXFfKCcuLi9yZW5kZXIvUmVuZGVyJyk7XG5NYXR0ZXIuUmVuZGVyUGl4aSA9IF9kZXJlcV8oJy4uL3JlbmRlci9SZW5kZXJQaXhpJyk7XG5cbi8vIGFsaWFzZXNcblxuTWF0dGVyLldvcmxkLmFkZCA9IE1hdHRlci5Db21wb3NpdGUuYWRkO1xuTWF0dGVyLldvcmxkLnJlbW92ZSA9IE1hdHRlci5Db21wb3NpdGUucmVtb3ZlO1xuTWF0dGVyLldvcmxkLmFkZENvbXBvc2l0ZSA9IE1hdHRlci5Db21wb3NpdGUuYWRkQ29tcG9zaXRlO1xuTWF0dGVyLldvcmxkLmFkZEJvZHkgPSBNYXR0ZXIuQ29tcG9zaXRlLmFkZEJvZHk7XG5NYXR0ZXIuV29ybGQuYWRkQ29uc3RyYWludCA9IE1hdHRlci5Db21wb3NpdGUuYWRkQ29uc3RyYWludDtcbk1hdHRlci5Xb3JsZC5jbGVhciA9IE1hdHRlci5Db21wb3NpdGUuY2xlYXI7XG5NYXR0ZXIuRW5naW5lLnJ1biA9IE1hdHRlci5SdW5uZXIucnVuO1xuXG59LHtcIi4uL2JvZHkvQm9keVwiOjEsXCIuLi9ib2R5L0NvbXBvc2l0ZVwiOjIsXCIuLi9ib2R5L1dvcmxkXCI6MyxcIi4uL2NvbGxpc2lvbi9Db250YWN0XCI6NCxcIi4uL2NvbGxpc2lvbi9EZXRlY3RvclwiOjUsXCIuLi9jb2xsaXNpb24vR3JpZFwiOjYsXCIuLi9jb2xsaXNpb24vUGFpclwiOjcsXCIuLi9jb2xsaXNpb24vUGFpcnNcIjo4LFwiLi4vY29sbGlzaW9uL1F1ZXJ5XCI6OSxcIi4uL2NvbGxpc2lvbi9SZXNvbHZlclwiOjEwLFwiLi4vY29sbGlzaW9uL1NBVFwiOjExLFwiLi4vY29uc3RyYWludC9Db25zdHJhaW50XCI6MTIsXCIuLi9jb25zdHJhaW50L01vdXNlQ29uc3RyYWludFwiOjEzLFwiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2NvcmUvRW5naW5lXCI6MTUsXCIuLi9jb3JlL0V2ZW50c1wiOjE2LFwiLi4vY29yZS9NYXR0ZXJcIjoxNyxcIi4uL2NvcmUvTWV0cmljc1wiOjE4LFwiLi4vY29yZS9Nb3VzZVwiOjE5LFwiLi4vY29yZS9QbHVnaW5cIjoyMCxcIi4uL2NvcmUvUnVubmVyXCI6MjEsXCIuLi9jb3JlL1NsZWVwaW5nXCI6MjIsXCIuLi9mYWN0b3J5L0JvZGllc1wiOjIzLFwiLi4vZmFjdG9yeS9Db21wb3NpdGVzXCI6MjQsXCIuLi9nZW9tZXRyeS9BeGVzXCI6MjUsXCIuLi9nZW9tZXRyeS9Cb3VuZHNcIjoyNixcIi4uL2dlb21ldHJ5L1N2Z1wiOjI3LFwiLi4vZ2VvbWV0cnkvVmVjdG9yXCI6MjgsXCIuLi9nZW9tZXRyeS9WZXJ0aWNlc1wiOjI5LFwiLi4vcmVuZGVyL1JlbmRlclwiOjMxLFwiLi4vcmVuZGVyL1JlbmRlclBpeGlcIjozMn1dLDMxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5SZW5kZXJgIG1vZHVsZSBpcyBhIHNpbXBsZSBIVE1MNSBjYW52YXMgYmFzZWQgcmVuZGVyZXIgZm9yIHZpc3VhbGlzaW5nIGluc3RhbmNlcyBvZiBgTWF0dGVyLkVuZ2luZWAuXG4qIEl0IGlzIGludGVuZGVkIGZvciBkZXZlbG9wbWVudCBhbmQgZGVidWdnaW5nIHB1cnBvc2VzLCBidXQgbWF5IGFsc28gYmUgc3VpdGFibGUgZm9yIHNpbXBsZSBnYW1lcy5cbiogSXQgaW5jbHVkZXMgYSBudW1iZXIgb2YgZHJhd2luZyBvcHRpb25zIGluY2x1ZGluZyB3aXJlZnJhbWUsIHZlY3RvciB3aXRoIHN1cHBvcnQgZm9yIHNwcml0ZXMgYW5kIHZpZXdwb3J0cy5cbipcbiogQGNsYXNzIFJlbmRlclxuKi9cblxudmFyIFJlbmRlciA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcjtcblxudmFyIENvbW1vbiA9IF9kZXJlcV8oJy4uL2NvcmUvQ29tbW9uJyk7XG52YXIgQ29tcG9zaXRlID0gX2RlcmVxXygnLi4vYm9keS9Db21wb3NpdGUnKTtcbnZhciBCb3VuZHMgPSBfZGVyZXFfKCcuLi9nZW9tZXRyeS9Cb3VuZHMnKTtcbnZhciBFdmVudHMgPSBfZGVyZXFfKCcuLi9jb3JlL0V2ZW50cycpO1xudmFyIEdyaWQgPSBfZGVyZXFfKCcuLi9jb2xsaXNpb24vR3JpZCcpO1xudmFyIFZlY3RvciA9IF9kZXJlcV8oJy4uL2dlb21ldHJ5L1ZlY3RvcicpO1xudmFyIE1vdXNlID0gX2RlcmVxXygnLi4vY29yZS9Nb3VzZScpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX3JlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgZnVuY3Rpb24oY2FsbGJhY2speyB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soQ29tbW9uLm5vdygpKTsgfSwgMTAwMCAvIDYwKTsgfTtcblxuICAgICAgICBfY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHJlbmRlcmVyLiBUaGUgb3B0aW9ucyBwYXJhbWV0ZXIgaXMgYW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGFueSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0cy5cbiAgICAgKiBBbGwgcHJvcGVydGllcyBoYXZlIGRlZmF1bHQgdmFsdWVzLCBhbmQgbWFueSBhcmUgcHJlLWNhbGN1bGF0ZWQgYXV0b21hdGljYWxseSBiYXNlZCBvbiBvdGhlciBwcm9wZXJ0aWVzLlxuICAgICAqIFNlZSB0aGUgcHJvcGVydGllcyBzZWN0aW9uIGJlbG93IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiBvbiB3aGF0IHlvdSBjYW4gcGFzcyB2aWEgdGhlIGBvcHRpb25zYCBvYmplY3QuXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHJldHVybiB7cmVuZGVyfSBBIG5ldyByZW5kZXJlclxuICAgICAqL1xuICAgIFJlbmRlci5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFJlbmRlcixcbiAgICAgICAgICAgIGVuZ2luZTogbnVsbCxcbiAgICAgICAgICAgIGVsZW1lbnQ6IG51bGwsXG4gICAgICAgICAgICBjYW52YXM6IG51bGwsXG4gICAgICAgICAgICBtb3VzZTogbnVsbCxcbiAgICAgICAgICAgIGZyYW1lUmVxdWVzdElkOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgcGl4ZWxSYXRpbzogMSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzE4MTgxZCcsXG4gICAgICAgICAgICAgICAgd2lyZWZyYW1lQmFja2dyb3VuZDogJyMwZjBmMTMnLFxuICAgICAgICAgICAgICAgIGhhc0JvdW5kczogISFvcHRpb25zLmJvdW5kcyxcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpcmVmcmFtZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hvd1NsZWVwaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3dEZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0Jyb2FkcGhhc2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dWZWxvY2l0eTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0NvbGxpc2lvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dTZXBhcmF0aW9uczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0F4ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dQb3NpdGlvbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dBbmdsZUluZGljYXRvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0lkczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd1NoYWRvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dWZXJ0ZXhOdW1iZXJzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Q29udmV4SHVsbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dJbnRlcm5hbEVkZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93TW91c2VQb3NpdGlvbjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcmVuZGVyID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHJlbmRlci5jYW52YXMpIHtcbiAgICAgICAgICAgIHJlbmRlci5jYW52YXMud2lkdGggPSByZW5kZXIub3B0aW9ucy53aWR0aCB8fCByZW5kZXIuY2FudmFzLndpZHRoO1xuICAgICAgICAgICAgcmVuZGVyLmNhbnZhcy5oZWlnaHQgPSByZW5kZXIub3B0aW9ucy5oZWlnaHQgfHwgcmVuZGVyLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXIubW91c2UgPSBvcHRpb25zLm1vdXNlO1xuICAgICAgICByZW5kZXIuZW5naW5lID0gb3B0aW9ucy5lbmdpbmU7XG4gICAgICAgIHJlbmRlci5jYW52YXMgPSByZW5kZXIuY2FudmFzIHx8IF9jcmVhdGVDYW52YXMocmVuZGVyLm9wdGlvbnMud2lkdGgsIHJlbmRlci5vcHRpb25zLmhlaWdodCk7XG4gICAgICAgIHJlbmRlci5jb250ZXh0ID0gcmVuZGVyLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICByZW5kZXIudGV4dHVyZXMgPSB7fTtcblxuICAgICAgICByZW5kZXIuYm91bmRzID0gcmVuZGVyLmJvdW5kcyB8fCB7XG4gICAgICAgICAgICBtaW46IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXg6IHtcbiAgICAgICAgICAgICAgICB4OiByZW5kZXIuY2FudmFzLndpZHRoLFxuICAgICAgICAgICAgICAgIHk6IHJlbmRlci5jYW52YXMuaGVpZ2h0XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHJlbmRlci5vcHRpb25zLnBpeGVsUmF0aW8gIT09IDEpIHtcbiAgICAgICAgICAgIFJlbmRlci5zZXRQaXhlbFJhdGlvKHJlbmRlciwgcmVuZGVyLm9wdGlvbnMucGl4ZWxSYXRpbyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ29tbW9uLmlzRWxlbWVudChyZW5kZXIuZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJlbmRlci5lbGVtZW50LmFwcGVuZENoaWxkKHJlbmRlci5jYW52YXMpO1xuICAgICAgICB9IGVsc2UgaWYgKCFyZW5kZXIuY2FudmFzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIENvbW1vbi5sb2coJ1JlbmRlci5jcmVhdGU6IG9wdGlvbnMuZWxlbWVudCB3YXMgdW5kZWZpbmVkLCByZW5kZXIuY2FudmFzIHdhcyBjcmVhdGVkIGJ1dCBub3QgYXBwZW5kZWQnLCAnd2FybicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udGludW91c2x5IHVwZGF0ZXMgdGhlIHJlbmRlciBjYW52YXMgb24gdGhlIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGV2ZW50LlxuICAgICAqIEBtZXRob2QgcnVuXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqL1xuICAgIFJlbmRlci5ydW4gPSBmdW5jdGlvbihyZW5kZXIpIHtcbiAgICAgICAgKGZ1bmN0aW9uIGxvb3AodGltZSl7XG4gICAgICAgICAgICByZW5kZXIuZnJhbWVSZXF1ZXN0SWQgPSBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICAgICAgUmVuZGVyLndvcmxkKHJlbmRlcik7XG4gICAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuZHMgZXhlY3V0aW9uIG9mIGBSZW5kZXIucnVuYCBvbiB0aGUgZ2l2ZW4gYHJlbmRlcmAsIGJ5IGNhbmNlbGluZyB0aGUgYW5pbWF0aW9uIGZyYW1lIHJlcXVlc3QgZXZlbnQgbG9vcC5cbiAgICAgKiBAbWV0aG9kIHN0b3BcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICovXG4gICAgUmVuZGVyLnN0b3AgPSBmdW5jdGlvbihyZW5kZXIpIHtcbiAgICAgICAgX2NhbmNlbEFuaW1hdGlvbkZyYW1lKHJlbmRlci5mcmFtZVJlcXVlc3RJZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBpeGVsIHJhdGlvIG9mIHRoZSByZW5kZXJlciBhbmQgdXBkYXRlcyB0aGUgY2FudmFzLlxuICAgICAqIFRvIGF1dG9tYXRpY2FsbHkgZGV0ZWN0IHRoZSBjb3JyZWN0IHJhdGlvLCBwYXNzIHRoZSBzdHJpbmcgYCdhdXRvJ2AgZm9yIGBwaXhlbFJhdGlvYC5cbiAgICAgKiBAbWV0aG9kIHNldFBpeGVsUmF0aW9cbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBpeGVsUmF0aW9cbiAgICAgKi9cbiAgICBSZW5kZXIuc2V0UGl4ZWxSYXRpbyA9IGZ1bmN0aW9uKHJlbmRlciwgcGl4ZWxSYXRpbykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zLFxuICAgICAgICAgICAgY2FudmFzID0gcmVuZGVyLmNhbnZhcztcblxuICAgICAgICBpZiAocGl4ZWxSYXRpbyA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICBwaXhlbFJhdGlvID0gX2dldFBpeGVsUmF0aW8oY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucGl4ZWxSYXRpbyA9IHBpeGVsUmF0aW87XG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGl4ZWwtcmF0aW8nLCBwaXhlbFJhdGlvKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gb3B0aW9ucy53aWR0aCAqIHBpeGVsUmF0aW87XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCAqIHBpeGVsUmF0aW87XG4gICAgICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IG9wdGlvbnMud2lkdGggKyAncHgnO1xuICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgKyAncHgnO1xuICAgICAgICByZW5kZXIuY29udGV4dC5zY2FsZShwaXhlbFJhdGlvLCBwaXhlbFJhdGlvKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUG9zaXRpb25zIGFuZCBzaXplcyB0aGUgdmlld3BvcnQgYXJvdW5kIHRoZSBnaXZlbiBvYmplY3QgYm91bmRzLlxuICAgICAqIE9iamVjdHMgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBvZiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAgICogLSBgb2JqZWN0LmJvdW5kc2BcbiAgICAgKiAtIGBvYmplY3QucG9zaXRpb25gXG4gICAgICogLSBgb2JqZWN0Lm1pbmAgYW5kIGBvYmplY3QubWF4YFxuICAgICAqIC0gYG9iamVjdC54YCBhbmQgYG9iamVjdC55YFxuICAgICAqIEBtZXRob2QgbG9va0F0XG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IG9iamVjdHNcbiAgICAgKiBAcGFyYW0ge3ZlY3Rvcn0gW3BhZGRpbmddXG4gICAgICogQHBhcmFtIHtib29sfSBbY2VudGVyPXRydWVdXG4gICAgICovXG4gICAgUmVuZGVyLmxvb2tBdCA9IGZ1bmN0aW9uKHJlbmRlciwgb2JqZWN0cywgcGFkZGluZywgY2VudGVyKSB7XG4gICAgICAgIGNlbnRlciA9IHR5cGVvZiBjZW50ZXIgIT09ICd1bmRlZmluZWQnID8gY2VudGVyIDogdHJ1ZTtcbiAgICAgICAgb2JqZWN0cyA9IENvbW1vbi5pc0FycmF5KG9iamVjdHMpID8gb2JqZWN0cyA6IFtvYmplY3RzXTtcbiAgICAgICAgcGFkZGluZyA9IHBhZGRpbmcgfHwge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBmaW5kIGJvdW5kcyBvZiBhbGwgb2JqZWN0c1xuICAgICAgICB2YXIgYm91bmRzID0ge1xuICAgICAgICAgICAgbWluOiB7IHg6IEluZmluaXR5LCB5OiBJbmZpbml0eSB9LFxuICAgICAgICAgICAgbWF4OiB7IHg6IC1JbmZpbml0eSwgeTogLUluZmluaXR5IH1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSBvYmplY3RzW2ldLFxuICAgICAgICAgICAgICAgIG1pbiA9IG9iamVjdC5ib3VuZHMgPyBvYmplY3QuYm91bmRzLm1pbiA6IChvYmplY3QubWluIHx8IG9iamVjdC5wb3NpdGlvbiB8fCBvYmplY3QpLFxuICAgICAgICAgICAgICAgIG1heCA9IG9iamVjdC5ib3VuZHMgPyBvYmplY3QuYm91bmRzLm1heCA6IChvYmplY3QubWF4IHx8IG9iamVjdC5wb3NpdGlvbiB8fCBvYmplY3QpO1xuXG4gICAgICAgICAgICBpZiAobWluICYmIG1heCkge1xuICAgICAgICAgICAgICAgIGlmIChtaW4ueCA8IGJvdW5kcy5taW4ueClcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzLm1pbi54ID0gbWluLng7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF4LnggPiBib3VuZHMubWF4LngpXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kcy5tYXgueCA9IG1heC54O1xuXG4gICAgICAgICAgICAgICAgaWYgKG1pbi55IDwgYm91bmRzLm1pbi55KVxuICAgICAgICAgICAgICAgICAgICBib3VuZHMubWluLnkgPSBtaW4ueTtcblxuICAgICAgICAgICAgICAgIGlmIChtYXgueSA+IGJvdW5kcy5tYXgueSlcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzLm1heC55ID0gbWF4Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaW5kIHJhdGlvc1xuICAgICAgICB2YXIgd2lkdGggPSAoYm91bmRzLm1heC54IC0gYm91bmRzLm1pbi54KSArIDIgKiBwYWRkaW5nLngsXG4gICAgICAgICAgICBoZWlnaHQgPSAoYm91bmRzLm1heC55IC0gYm91bmRzLm1pbi55KSArIDIgKiBwYWRkaW5nLnksXG4gICAgICAgICAgICB2aWV3SGVpZ2h0ID0gcmVuZGVyLmNhbnZhcy5oZWlnaHQsXG4gICAgICAgICAgICB2aWV3V2lkdGggPSByZW5kZXIuY2FudmFzLndpZHRoLFxuICAgICAgICAgICAgb3V0ZXJSYXRpbyA9IHZpZXdXaWR0aCAvIHZpZXdIZWlnaHQsXG4gICAgICAgICAgICBpbm5lclJhdGlvID0gd2lkdGggLyBoZWlnaHQsXG4gICAgICAgICAgICBzY2FsZVggPSAxLFxuICAgICAgICAgICAgc2NhbGVZID0gMTtcblxuICAgICAgICAvLyBmaW5kIHNjYWxlIGZhY3RvclxuICAgICAgICBpZiAoaW5uZXJSYXRpbyA+IG91dGVyUmF0aW8pIHtcbiAgICAgICAgICAgIHNjYWxlWSA9IGlubmVyUmF0aW8gLyBvdXRlclJhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NhbGVYID0gb3V0ZXJSYXRpbyAvIGlubmVyUmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmFibGUgYm91bmRzXG4gICAgICAgIHJlbmRlci5vcHRpb25zLmhhc0JvdW5kcyA9IHRydWU7XG5cbiAgICAgICAgLy8gcG9zaXRpb24gYW5kIHNpemVcbiAgICAgICAgcmVuZGVyLmJvdW5kcy5taW4ueCA9IGJvdW5kcy5taW4ueDtcbiAgICAgICAgcmVuZGVyLmJvdW5kcy5tYXgueCA9IGJvdW5kcy5taW4ueCArIHdpZHRoICogc2NhbGVYO1xuICAgICAgICByZW5kZXIuYm91bmRzLm1pbi55ID0gYm91bmRzLm1pbi55O1xuICAgICAgICByZW5kZXIuYm91bmRzLm1heC55ID0gYm91bmRzLm1pbi55ICsgaGVpZ2h0ICogc2NhbGVZO1xuXG4gICAgICAgIC8vIGNlbnRlclxuICAgICAgICBpZiAoY2VudGVyKSB7XG4gICAgICAgICAgICByZW5kZXIuYm91bmRzLm1pbi54ICs9IHdpZHRoICogMC41IC0gKHdpZHRoICogc2NhbGVYKSAqIDAuNTtcbiAgICAgICAgICAgIHJlbmRlci5ib3VuZHMubWF4LnggKz0gd2lkdGggKiAwLjUgLSAod2lkdGggKiBzY2FsZVgpICogMC41O1xuICAgICAgICAgICAgcmVuZGVyLmJvdW5kcy5taW4ueSArPSBoZWlnaHQgKiAwLjUgLSAoaGVpZ2h0ICogc2NhbGVZKSAqIDAuNTtcbiAgICAgICAgICAgIHJlbmRlci5ib3VuZHMubWF4LnkgKz0gaGVpZ2h0ICogMC41IC0gKGhlaWdodCAqIHNjYWxlWSkgKiAwLjU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYWRkaW5nXG4gICAgICAgIHJlbmRlci5ib3VuZHMubWluLnggLT0gcGFkZGluZy54O1xuICAgICAgICByZW5kZXIuYm91bmRzLm1heC54IC09IHBhZGRpbmcueDtcbiAgICAgICAgcmVuZGVyLmJvdW5kcy5taW4ueSAtPSBwYWRkaW5nLnk7XG4gICAgICAgIHJlbmRlci5ib3VuZHMubWF4LnkgLT0gcGFkZGluZy55O1xuXG4gICAgICAgIC8vIHVwZGF0ZSBtb3VzZVxuICAgICAgICBpZiAocmVuZGVyLm1vdXNlKSB7XG4gICAgICAgICAgICBNb3VzZS5zZXRTY2FsZShyZW5kZXIubW91c2UsIHtcbiAgICAgICAgICAgICAgICB4OiAocmVuZGVyLmJvdW5kcy5tYXgueCAtIHJlbmRlci5ib3VuZHMubWluLngpIC8gcmVuZGVyLmNhbnZhcy53aWR0aCxcbiAgICAgICAgICAgICAgICB5OiAocmVuZGVyLmJvdW5kcy5tYXgueSAtIHJlbmRlci5ib3VuZHMubWluLnkpIC8gcmVuZGVyLmNhbnZhcy5oZWlnaHRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBNb3VzZS5zZXRPZmZzZXQocmVuZGVyLm1vdXNlLCByZW5kZXIuYm91bmRzLm1pbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyB2aWV3cG9ydCB0cmFuc2Zvcm1zIGJhc2VkIG9uIGByZW5kZXIuYm91bmRzYCB0byBhIHJlbmRlciBjb250ZXh0LlxuICAgICAqIEBtZXRob2Qgc3RhcnRWaWV3VHJhbnNmb3JtXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqL1xuICAgIFJlbmRlci5zdGFydFZpZXdUcmFuc2Zvcm0gPSBmdW5jdGlvbihyZW5kZXIpIHtcbiAgICAgICAgdmFyIGJvdW5kc1dpZHRoID0gcmVuZGVyLmJvdW5kcy5tYXgueCAtIHJlbmRlci5ib3VuZHMubWluLngsXG4gICAgICAgICAgICBib3VuZHNIZWlnaHQgPSByZW5kZXIuYm91bmRzLm1heC55IC0gcmVuZGVyLmJvdW5kcy5taW4ueSxcbiAgICAgICAgICAgIGJvdW5kc1NjYWxlWCA9IGJvdW5kc1dpZHRoIC8gcmVuZGVyLm9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBib3VuZHNTY2FsZVkgPSBib3VuZHNIZWlnaHQgLyByZW5kZXIub3B0aW9ucy5oZWlnaHQ7XG5cbiAgICAgICAgcmVuZGVyLmNvbnRleHQuc2NhbGUoMSAvIGJvdW5kc1NjYWxlWCwgMSAvIGJvdW5kc1NjYWxlWSk7XG4gICAgICAgIHJlbmRlci5jb250ZXh0LnRyYW5zbGF0ZSgtcmVuZGVyLmJvdW5kcy5taW4ueCwgLXJlbmRlci5ib3VuZHMubWluLnkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgYWxsIHRyYW5zZm9ybXMgb24gdGhlIHJlbmRlciBjb250ZXh0LlxuICAgICAqIEBtZXRob2QgZW5kVmlld1RyYW5zZm9ybVxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKi9cbiAgICBSZW5kZXIuZW5kVmlld1RyYW5zZm9ybSA9IGZ1bmN0aW9uKHJlbmRlcikge1xuICAgICAgICByZW5kZXIuY29udGV4dC5zZXRUcmFuc2Zvcm0ocmVuZGVyLm9wdGlvbnMucGl4ZWxSYXRpbywgMCwgMCwgcmVuZGVyLm9wdGlvbnMucGl4ZWxSYXRpbywgMCwgMCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgdGhlIGdpdmVuIGBlbmdpbmVgJ3MgYE1hdHRlci5Xb3JsZGAgb2JqZWN0LlxuICAgICAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciBhbGwgcmVuZGVyaW5nIGFuZCBzaG91bGQgYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIHNjZW5lIGNoYW5nZXMuXG4gICAgICogQG1ldGhvZCB3b3JsZFxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKi9cbiAgICBSZW5kZXIud29ybGQgPSBmdW5jdGlvbihyZW5kZXIpIHtcbiAgICAgICAgdmFyIGVuZ2luZSA9IHJlbmRlci5lbmdpbmUsXG4gICAgICAgICAgICB3b3JsZCA9IGVuZ2luZS53b3JsZCxcbiAgICAgICAgICAgIGNhbnZhcyA9IHJlbmRlci5jYW52YXMsXG4gICAgICAgICAgICBjb250ZXh0ID0gcmVuZGVyLmNvbnRleHQsXG4gICAgICAgICAgICBvcHRpb25zID0gcmVuZGVyLm9wdGlvbnMsXG4gICAgICAgICAgICBhbGxCb2RpZXMgPSBDb21wb3NpdGUuYWxsQm9kaWVzKHdvcmxkKSxcbiAgICAgICAgICAgIGFsbENvbnN0cmFpbnRzID0gQ29tcG9zaXRlLmFsbENvbnN0cmFpbnRzKHdvcmxkKSxcbiAgICAgICAgICAgIGJhY2tncm91bmQgPSBvcHRpb25zLndpcmVmcmFtZXMgPyBvcHRpb25zLndpcmVmcmFtZUJhY2tncm91bmQgOiBvcHRpb25zLmJhY2tncm91bmQsXG4gICAgICAgICAgICBib2RpZXMgPSBbXSxcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzID0gW10sXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIHZhciBldmVudCA9IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogZW5naW5lLnRpbWluZy50aW1lc3RhbXBcbiAgICAgICAgfTtcblxuICAgICAgICBFdmVudHMudHJpZ2dlcihyZW5kZXIsICdiZWZvcmVSZW5kZXInLCBldmVudCk7XG5cbiAgICAgICAgLy8gYXBwbHkgYmFja2dyb3VuZCBpZiBpdCBoYXMgY2hhbmdlZFxuICAgICAgICBpZiAocmVuZGVyLmN1cnJlbnRCYWNrZ3JvdW5kICE9PSBiYWNrZ3JvdW5kKVxuICAgICAgICAgICAgX2FwcGx5QmFja2dyb3VuZChyZW5kZXIsIGJhY2tncm91bmQpO1xuXG4gICAgICAgIC8vIGNsZWFyIHRoZSBjYW52YXMgd2l0aCBhIHRyYW5zcGFyZW50IGZpbGwsIHRvIGFsbG93IHRoZSBjYW52YXMgYmFja2dyb3VuZCB0byBzaG93XG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1pbic7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcblxuICAgICAgICAvLyBoYW5kbGUgYm91bmRzXG4gICAgICAgIGlmIChvcHRpb25zLmhhc0JvdW5kcykge1xuICAgICAgICAgICAgLy8gZmlsdGVyIG91dCBib2RpZXMgdGhhdCBhcmUgbm90IGluIHZpZXdcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhbGxCb2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYm9keSA9IGFsbEJvZGllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoQm91bmRzLm92ZXJsYXBzKGJvZHkuYm91bmRzLCByZW5kZXIuYm91bmRzKSlcbiAgICAgICAgICAgICAgICAgICAgYm9kaWVzLnB1c2goYm9keSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpbHRlciBvdXQgY29uc3RyYWludHMgdGhhdCBhcmUgbm90IGluIHZpZXdcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhbGxDb25zdHJhaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjb25zdHJhaW50ID0gYWxsQ29uc3RyYWludHNbaV0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHlBID0gY29uc3RyYWludC5ib2R5QSxcbiAgICAgICAgICAgICAgICAgICAgYm9keUIgPSBjb25zdHJhaW50LmJvZHlCLFxuICAgICAgICAgICAgICAgICAgICBwb2ludEFXb3JsZCA9IGNvbnN0cmFpbnQucG9pbnRBLFxuICAgICAgICAgICAgICAgICAgICBwb2ludEJXb3JsZCA9IGNvbnN0cmFpbnQucG9pbnRCO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJvZHlBKSBwb2ludEFXb3JsZCA9IFZlY3Rvci5hZGQoYm9keUEucG9zaXRpb24sIGNvbnN0cmFpbnQucG9pbnRBKTtcbiAgICAgICAgICAgICAgICBpZiAoYm9keUIpIHBvaW50QldvcmxkID0gVmVjdG9yLmFkZChib2R5Qi5wb3NpdGlvbiwgY29uc3RyYWludC5wb2ludEIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludEFXb3JsZCB8fCAhcG9pbnRCV29ybGQpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKEJvdW5kcy5jb250YWlucyhyZW5kZXIuYm91bmRzLCBwb2ludEFXb3JsZCkgfHwgQm91bmRzLmNvbnRhaW5zKHJlbmRlci5ib3VuZHMsIHBvaW50QldvcmxkKSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHMucHVzaChjb25zdHJhaW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdHJhbnNmb3JtIHRoZSB2aWV3XG4gICAgICAgICAgICBSZW5kZXIuc3RhcnRWaWV3VHJhbnNmb3JtKHJlbmRlcik7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBtb3VzZVxuICAgICAgICAgICAgaWYgKHJlbmRlci5tb3VzZSkge1xuICAgICAgICAgICAgICAgIE1vdXNlLnNldFNjYWxlKHJlbmRlci5tb3VzZSwge1xuICAgICAgICAgICAgICAgICAgICB4OiAocmVuZGVyLmJvdW5kcy5tYXgueCAtIHJlbmRlci5ib3VuZHMubWluLngpIC8gcmVuZGVyLmNhbnZhcy53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgeTogKHJlbmRlci5ib3VuZHMubWF4LnkgLSByZW5kZXIuYm91bmRzLm1pbi55KSAvIHJlbmRlci5jYW52YXMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBNb3VzZS5zZXRPZmZzZXQocmVuZGVyLm1vdXNlLCByZW5kZXIuYm91bmRzLm1pbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdHJhaW50cyA9IGFsbENvbnN0cmFpbnRzO1xuICAgICAgICAgICAgYm9kaWVzID0gYWxsQm9kaWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLndpcmVmcmFtZXMgfHwgKGVuZ2luZS5lbmFibGVTbGVlcGluZyAmJiBvcHRpb25zLnNob3dTbGVlcGluZykpIHtcbiAgICAgICAgICAgIC8vIGZ1bGx5IGZlYXR1cmVkIHJlbmRlcmluZyBvZiBib2RpZXNcbiAgICAgICAgICAgIFJlbmRlci5ib2RpZXMocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0NvbnZleEh1bGxzKVxuICAgICAgICAgICAgICAgIFJlbmRlci5ib2R5Q29udmV4SHVsbHMocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAvLyBvcHRpbWlzZWQgbWV0aG9kIGZvciB3aXJlZnJhbWVzIG9ubHlcbiAgICAgICAgICAgIFJlbmRlci5ib2R5V2lyZWZyYW1lcyhyZW5kZXIsIGJvZGllcywgY29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5zaG93Qm91bmRzKVxuICAgICAgICAgICAgUmVuZGVyLmJvZHlCb3VuZHMocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dBeGVzIHx8IG9wdGlvbnMuc2hvd0FuZ2xlSW5kaWNhdG9yKVxuICAgICAgICAgICAgUmVuZGVyLmJvZHlBeGVzKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5zaG93UG9zaXRpb25zKVxuICAgICAgICAgICAgUmVuZGVyLmJvZHlQb3NpdGlvbnMocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dWZWxvY2l0eSlcbiAgICAgICAgICAgIFJlbmRlci5ib2R5VmVsb2NpdHkocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dJZHMpXG4gICAgICAgICAgICBSZW5kZXIuYm9keUlkcyhyZW5kZXIsIGJvZGllcywgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1NlcGFyYXRpb25zKVxuICAgICAgICAgICAgUmVuZGVyLnNlcGFyYXRpb25zKHJlbmRlciwgZW5naW5lLnBhaXJzLmxpc3QsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNob3dDb2xsaXNpb25zKVxuICAgICAgICAgICAgUmVuZGVyLmNvbGxpc2lvbnMocmVuZGVyLCBlbmdpbmUucGFpcnMubGlzdCwgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1ZlcnRleE51bWJlcnMpXG4gICAgICAgICAgICBSZW5kZXIudmVydGV4TnVtYmVycyhyZW5kZXIsIGJvZGllcywgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2hvd01vdXNlUG9zaXRpb24pXG4gICAgICAgICAgICBSZW5kZXIubW91c2VQb3NpdGlvbihyZW5kZXIsIHJlbmRlci5tb3VzZSwgY29udGV4dCk7XG5cbiAgICAgICAgUmVuZGVyLmNvbnN0cmFpbnRzKGNvbnN0cmFpbnRzLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5zaG93QnJvYWRwaGFzZSAmJiBlbmdpbmUuYnJvYWRwaGFzZS5jb250cm9sbGVyID09PSBHcmlkKVxuICAgICAgICAgICAgUmVuZGVyLmdyaWQocmVuZGVyLCBlbmdpbmUuYnJvYWRwaGFzZSwgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0RlYnVnKVxuICAgICAgICAgICAgUmVuZGVyLmRlYnVnKHJlbmRlciwgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzQm91bmRzKSB7XG4gICAgICAgICAgICAvLyByZXZlcnQgdmlldyB0cmFuc2Zvcm1zXG4gICAgICAgICAgICBSZW5kZXIuZW5kVmlld1RyYW5zZm9ybShyZW5kZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgRXZlbnRzLnRyaWdnZXIocmVuZGVyLCAnYWZ0ZXJSZW5kZXInLCBldmVudCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGRlYnVnXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5kZWJ1ZyA9IGZ1bmN0aW9uKHJlbmRlciwgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQsXG4gICAgICAgICAgICBlbmdpbmUgPSByZW5kZXIuZW5naW5lLFxuICAgICAgICAgICAgd29ybGQgPSBlbmdpbmUud29ybGQsXG4gICAgICAgICAgICBtZXRyaWNzID0gZW5naW5lLm1ldHJpY3MsXG4gICAgICAgICAgICBvcHRpb25zID0gcmVuZGVyLm9wdGlvbnMsXG4gICAgICAgICAgICBib2RpZXMgPSBDb21wb3NpdGUuYWxsQm9kaWVzKHdvcmxkKSxcbiAgICAgICAgICAgIHNwYWNlID0gXCIgICAgXCI7XG5cbiAgICAgICAgaWYgKGVuZ2luZS50aW1pbmcudGltZXN0YW1wIC0gKHJlbmRlci5kZWJ1Z1RpbWVzdGFtcCB8fCAwKSA+PSA1MDApIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKG1ldHJpY3MudGltaW5nKSB7XG4gICAgICAgICAgICAgICAgdGV4dCArPSBcImZwczogXCIgKyBNYXRoLnJvdW5kKG1ldHJpY3MudGltaW5nLmZwcykgKyBzcGFjZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZW5kZXIuZGVidWdTdHJpbmcgPSB0ZXh0O1xuICAgICAgICAgICAgcmVuZGVyLmRlYnVnVGltZXN0YW1wID0gZW5naW5lLnRpbWluZy50aW1lc3RhbXA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVuZGVyLmRlYnVnU3RyaW5nKSB7XG4gICAgICAgICAgICBjLmZvbnQgPSBcIjEycHggQXJpYWxcIjtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMud2lyZWZyYW1lcykge1xuICAgICAgICAgICAgICAgIGMuZmlsbFN0eWxlID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC41KSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGMuZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC41KSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzcGxpdCA9IHJlbmRlci5kZWJ1Z1N0cmluZy5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BsaXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjLmZpbGxUZXh0KHNwbGl0W2ldLCA1MCwgNTAgKyBpICogMTgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGNvbnN0cmFpbnRzXG4gICAgICogQHBhcmFtIHtjb25zdHJhaW50W119IGNvbnN0cmFpbnRzXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmNvbnN0cmFpbnRzID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uc3RyYWludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb25zdHJhaW50ID0gY29uc3RyYWludHNbaV07XG5cbiAgICAgICAgICAgIGlmICghY29uc3RyYWludC5yZW5kZXIudmlzaWJsZSB8fCAhY29uc3RyYWludC5wb2ludEEgfHwgIWNvbnN0cmFpbnQucG9pbnRCKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgYm9keUEgPSBjb25zdHJhaW50LmJvZHlBLFxuICAgICAgICAgICAgICAgIGJvZHlCID0gY29uc3RyYWludC5ib2R5QixcbiAgICAgICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ7XG5cbiAgICAgICAgICAgIGlmIChib2R5QSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gVmVjdG9yLmFkZChib2R5QS5wb3NpdGlvbiwgY29uc3RyYWludC5wb2ludEEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IGNvbnN0cmFpbnQucG9pbnRBO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29uc3RyYWludC5yZW5kZXIudHlwZSA9PT0gJ3BpbicpIHtcbiAgICAgICAgICAgICAgICBjLmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGMuYXJjKHN0YXJ0LngsIHN0YXJ0LnksIDMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICBjLmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9keUIpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gVmVjdG9yLmFkZChib2R5Qi5wb3NpdGlvbiwgY29uc3RyYWludC5wb2ludEIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IGNvbnN0cmFpbnQucG9pbnRCO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGMuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgYy5tb3ZlVG8oc3RhcnQueCwgc3RhcnQueSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29uc3RyYWludC5yZW5kZXIudHlwZSA9PT0gJ3NwcmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gVmVjdG9yLnN1YihlbmQsIHN0YXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbCA9IFZlY3Rvci5wZXJwKFZlY3Rvci5ub3JtYWxpc2UoZGVsdGEpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaWxzID0gTWF0aC5jZWlsKENvbW1vbi5jbGFtcChjb25zdHJhaW50Lmxlbmd0aCAvIDUsIDEyLCAyMCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgY29pbHM7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gaiAlIDIgPT09IDAgPyAxIDogLTE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGMubGluZVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnggKyBkZWx0YS54ICogKGogLyBjb2lscykgKyBub3JtYWwueCAqIG9mZnNldCAqIDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQueSArIGRlbHRhLnkgKiAoaiAvIGNvaWxzKSArIG5vcm1hbC55ICogb2Zmc2V0ICogNFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGMubGluZVRvKGVuZC54LCBlbmQueSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb25zdHJhaW50LnJlbmRlci5saW5lV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBjLmxpbmVXaWR0aCA9IGNvbnN0cmFpbnQucmVuZGVyLmxpbmVXaWR0aDtcbiAgICAgICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gY29uc3RyYWludC5yZW5kZXIuc3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICAgICAgYy5zdHJva2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbnN0cmFpbnQucmVuZGVyLmFuY2hvcnMpIHtcbiAgICAgICAgICAgICAgICBjLmZpbGxTdHlsZSA9IGNvbnN0cmFpbnQucmVuZGVyLnN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgICAgIGMuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgYy5hcmMoc3RhcnQueCwgc3RhcnQueSwgMywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgIGMuYXJjKGVuZC54LCBlbmQueSwgMywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgIGMuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICAgICAgYy5maWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYm9keVNoYWRvd3NcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5ib2R5U2hhZG93cyA9IGZ1bmN0aW9uKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIGVuZ2luZSA9IHJlbmRlci5lbmdpbmU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHkucmVuZGVyLnZpc2libGUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChib2R5LmNpcmNsZVJhZGl1cykge1xuICAgICAgICAgICAgICAgIGMuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgYy5hcmMoYm9keS5wb3NpdGlvbi54LCBib2R5LnBvc2l0aW9uLnksIGJvZHkuY2lyY2xlUmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgYy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYy5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjLm1vdmVUbyhib2R5LnZlcnRpY2VzWzBdLngsIGJvZHkudmVydGljZXNbMF0ueSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBib2R5LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGMubGluZVRvKGJvZHkudmVydGljZXNbal0ueCwgYm9keS52ZXJ0aWNlc1tqXS55KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlWCA9IGJvZHkucG9zaXRpb24ueCAtIHJlbmRlci5vcHRpb25zLndpZHRoICogMC41LFxuICAgICAgICAgICAgICAgIGRpc3RhbmNlWSA9IGJvZHkucG9zaXRpb24ueSAtIHJlbmRlci5vcHRpb25zLmhlaWdodCAqIDAuMixcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGRpc3RhbmNlWCkgKyBNYXRoLmFicyhkaXN0YW5jZVkpO1xuXG4gICAgICAgICAgICBjLnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwwLDAsMC4xNSknO1xuICAgICAgICAgICAgYy5zaGFkb3dPZmZzZXRYID0gMC4wNSAqIGRpc3RhbmNlWDtcbiAgICAgICAgICAgIGMuc2hhZG93T2Zmc2V0WSA9IDAuMDUgKiBkaXN0YW5jZVk7XG4gICAgICAgICAgICBjLnNoYWRvd0JsdXIgPSAxICsgMTIgKiBNYXRoLm1pbigxLCBkaXN0YW5jZSAvIDEwMDApO1xuXG4gICAgICAgICAgICBjLmZpbGwoKTtcblxuICAgICAgICAgICAgYy5zaGFkb3dDb2xvciA9IG51bGw7XG4gICAgICAgICAgICBjLnNoYWRvd09mZnNldFggPSBudWxsO1xuICAgICAgICAgICAgYy5zaGFkb3dPZmZzZXRZID0gbnVsbDtcbiAgICAgICAgICAgIGMuc2hhZG93Qmx1ciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYm9kaWVzXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIuYm9kaWVzID0gZnVuY3Rpb24ocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgZW5naW5lID0gcmVuZGVyLmVuZ2luZSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucyxcbiAgICAgICAgICAgIHNob3dJbnRlcm5hbEVkZ2VzID0gb3B0aW9ucy5zaG93SW50ZXJuYWxFZGdlcyB8fCAhb3B0aW9ucy53aXJlZnJhbWVzLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIHBhcnQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgaztcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHkucmVuZGVyLnZpc2libGUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjb21wb3VuZCBwYXJ0c1xuICAgICAgICAgICAgZm9yIChrID0gYm9keS5wYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGsgPCBib2R5LnBhcnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgcGFydCA9IGJvZHkucGFydHNba107XG5cbiAgICAgICAgICAgICAgICBpZiAoIXBhcnQucmVuZGVyLnZpc2libGUpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1NsZWVwaW5nICYmIGJvZHkuaXNTbGVlcGluZykge1xuICAgICAgICAgICAgICAgICAgICBjLmdsb2JhbEFscGhhID0gMC41ICogcGFydC5yZW5kZXIub3BhY2l0eTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnQucmVuZGVyLm9wYWNpdHkgIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5nbG9iYWxBbHBoYSA9IHBhcnQucmVuZGVyLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBhcnQucmVuZGVyLnNwcml0ZSAmJiBwYXJ0LnJlbmRlci5zcHJpdGUudGV4dHVyZSAmJiAhb3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBhcnQgc3ByaXRlXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcHJpdGUgPSBwYXJ0LnJlbmRlci5zcHJpdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlID0gX2dldFRleHR1cmUocmVuZGVyLCBzcHJpdGUudGV4dHVyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYy50cmFuc2xhdGUocGFydC5wb3NpdGlvbi54LCBwYXJ0LnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgICAgICAgICBjLnJvdGF0ZShwYXJ0LmFuZ2xlKTtcblxuICAgICAgICAgICAgICAgICAgICBjLmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLndpZHRoICogLXNwcml0ZS54T2Zmc2V0ICogc3ByaXRlLnhTY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUuaGVpZ2h0ICogLXNwcml0ZS55T2Zmc2V0ICogc3ByaXRlLnlTY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUud2lkdGggKiBzcHJpdGUueFNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5oZWlnaHQgKiBzcHJpdGUueVNjYWxlXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmV2ZXJ0IHRyYW5zbGF0aW9uLCBob3BlZnVsbHkgZmFzdGVyIHRoYW4gc2F2ZSAvIHJlc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgYy5yb3RhdGUoLXBhcnQuYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICBjLnRyYW5zbGF0ZSgtcGFydC5wb3NpdGlvbi54LCAtcGFydC5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBwYXJ0IHBvbHlnb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQuY2lyY2xlUmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5hcmMocGFydC5wb3NpdGlvbi54LCBwYXJ0LnBvc2l0aW9uLnksIHBhcnQuY2lyY2xlUmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5tb3ZlVG8ocGFydC52ZXJ0aWNlc1swXS54LCBwYXJ0LnZlcnRpY2VzWzBdLnkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHBhcnQudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnQudmVydGljZXNbaiAtIDFdLmlzSW50ZXJuYWwgfHwgc2hvd0ludGVybmFsRWRnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5saW5lVG8ocGFydC52ZXJ0aWNlc1tqXS54LCBwYXJ0LnZlcnRpY2VzW2pdLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMubW92ZVRvKHBhcnQudmVydGljZXNbal0ueCwgcGFydC52ZXJ0aWNlc1tqXS55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydC52ZXJ0aWNlc1tqXS5pc0ludGVybmFsICYmICFzaG93SW50ZXJuYWxFZGdlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLm1vdmVUbyhwYXJ0LnZlcnRpY2VzWyhqICsgMSkgJSBwYXJ0LnZlcnRpY2VzLmxlbmd0aF0ueCwgcGFydC52ZXJ0aWNlc1soaiArIDEpICUgcGFydC52ZXJ0aWNlcy5sZW5ndGhdLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgYy5saW5lVG8ocGFydC52ZXJ0aWNlc1swXS54LCBwYXJ0LnZlcnRpY2VzWzBdLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmZpbGxTdHlsZSA9IHBhcnQucmVuZGVyLmZpbGxTdHlsZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQucmVuZGVyLmxpbmVXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMubGluZVdpZHRoID0gcGFydC5yZW5kZXIubGluZVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuc3Ryb2tlU3R5bGUgPSBwYXJ0LnJlbmRlci5zdHJva2VTdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjLmZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAnI2JiYic7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYy5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogT3B0aW1pc2VkIG1ldGhvZCBmb3IgZHJhd2luZyBib2R5IHdpcmVmcmFtZXMgaW4gb25lIHBhc3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYm9keVdpcmVmcmFtZXNcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5ib2R5V2lyZWZyYW1lcyA9IGZ1bmN0aW9uKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIHNob3dJbnRlcm5hbEVkZ2VzID0gcmVuZGVyLm9wdGlvbnMuc2hvd0ludGVybmFsRWRnZXMsXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgcGFydCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgaztcblxuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIC8vIHJlbmRlciBhbGwgYm9kaWVzXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbaV07XG5cbiAgICAgICAgICAgIGlmICghYm9keS5yZW5kZXIudmlzaWJsZSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIGNvbXBvdW5kIHBhcnRzXG4gICAgICAgICAgICBmb3IgKGsgPSBib2R5LnBhcnRzLmxlbmd0aCA+IDEgPyAxIDogMDsgayA8IGJvZHkucGFydHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBwYXJ0ID0gYm9keS5wYXJ0c1trXTtcblxuICAgICAgICAgICAgICAgIGMubW92ZVRvKHBhcnQudmVydGljZXNbMF0ueCwgcGFydC52ZXJ0aWNlc1swXS55KTtcblxuICAgICAgICAgICAgICAgIGZvciAoaiA9IDE7IGogPCBwYXJ0LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFydC52ZXJ0aWNlc1tqIC0gMV0uaXNJbnRlcm5hbCB8fCBzaG93SW50ZXJuYWxFZGdlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5saW5lVG8ocGFydC52ZXJ0aWNlc1tqXS54LCBwYXJ0LnZlcnRpY2VzW2pdLnkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5tb3ZlVG8ocGFydC52ZXJ0aWNlc1tqXS54LCBwYXJ0LnZlcnRpY2VzW2pdLnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnQudmVydGljZXNbal0uaXNJbnRlcm5hbCAmJiAhc2hvd0ludGVybmFsRWRnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubW92ZVRvKHBhcnQudmVydGljZXNbKGogKyAxKSAlIHBhcnQudmVydGljZXMubGVuZ3RoXS54LCBwYXJ0LnZlcnRpY2VzWyhqICsgMSkgJSBwYXJ0LnZlcnRpY2VzLmxlbmd0aF0ueSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjLmxpbmVUbyhwYXJ0LnZlcnRpY2VzWzBdLngsIHBhcnQudmVydGljZXNbMF0ueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjLmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAnI2JiYic7XG4gICAgICAgIGMuc3Ryb2tlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE9wdGltaXNlZCBtZXRob2QgZm9yIGRyYXdpbmcgYm9keSBjb252ZXggaHVsbCB3aXJlZnJhbWVzIGluIG9uZSBwYXNzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGJvZHlDb252ZXhIdWxsc1xuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmJvZHlDb252ZXhIdWxscyA9IGZ1bmN0aW9uKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICBwYXJ0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBrO1xuXG4gICAgICAgIGMuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgLy8gcmVuZGVyIGNvbnZleCBodWxsc1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHkucmVuZGVyLnZpc2libGUgfHwgYm9keS5wYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGMubW92ZVRvKGJvZHkudmVydGljZXNbMF0ueCwgYm9keS52ZXJ0aWNlc1swXS55KTtcblxuICAgICAgICAgICAgZm9yIChqID0gMTsgaiA8IGJvZHkudmVydGljZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjLmxpbmVUbyhib2R5LnZlcnRpY2VzW2pdLngsIGJvZHkudmVydGljZXNbal0ueSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGMubGluZVRvKGJvZHkudmVydGljZXNbMF0ueCwgYm9keS52ZXJ0aWNlc1swXS55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGMubGluZVdpZHRoID0gMTtcbiAgICAgICAgYy5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMiknO1xuICAgICAgICBjLnN0cm9rZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGJvZHkgdmVydGV4IG51bWJlcnMuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIHZlcnRleE51bWJlcnNcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci52ZXJ0ZXhOdW1iZXJzID0gZnVuY3Rpb24ocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBrO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IGJvZGllc1tpXS5wYXJ0cztcbiAgICAgICAgICAgIGZvciAoayA9IHBhcnRzLmxlbmd0aCA+IDEgPyAxIDogMDsgayA8IHBhcnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1trXTtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgcGFydC52ZXJ0aWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjLmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMiknO1xuICAgICAgICAgICAgICAgICAgICBjLmZpbGxUZXh0KGkgKyAnXycgKyBqLCBwYXJ0LnBvc2l0aW9uLnggKyAocGFydC52ZXJ0aWNlc1tqXS54IC0gcGFydC5wb3NpdGlvbi54KSAqIDAuOCwgcGFydC5wb3NpdGlvbi55ICsgKHBhcnQudmVydGljZXNbal0ueSAtIHBhcnQucG9zaXRpb24ueSkgKiAwLjgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIG1vdXNlIHBvc2l0aW9uLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBtb3VzZVBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7bW91c2V9IG1vdXNlXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLm1vdXNlUG9zaXRpb24gPSBmdW5jdGlvbihyZW5kZXIsIG1vdXNlLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dDtcbiAgICAgICAgYy5maWxsU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjgpJztcbiAgICAgICAgYy5maWxsVGV4dChtb3VzZS5wb3NpdGlvbi54ICsgJyAgJyArIG1vdXNlLnBvc2l0aW9uLnksIG1vdXNlLnBvc2l0aW9uLnggKyA1LCBtb3VzZS5wb3NpdGlvbi55IC0gNSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERyYXdzIGJvZHkgYm91bmRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGJvZHlCb3VuZHNcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5ib2R5Qm91bmRzID0gZnVuY3Rpb24ocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgZW5naW5lID0gcmVuZGVyLmVuZ2luZSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucztcblxuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXTtcblxuICAgICAgICAgICAgaWYgKGJvZHkucmVuZGVyLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBib2RpZXNbaV0ucGFydHM7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IHBhcnRzLmxlbmd0aCA+IDEgPyAxIDogMDsgaiA8IHBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gcGFydHNbal07XG4gICAgICAgICAgICAgICAgICAgIGMucmVjdChwYXJ0LmJvdW5kcy5taW4ueCwgcGFydC5ib3VuZHMubWluLnksIHBhcnQuYm91bmRzLm1heC54IC0gcGFydC5ib3VuZHMubWluLngsIHBhcnQuYm91bmRzLm1heC55IC0gcGFydC5ib3VuZHMubWluLnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLndpcmVmcmFtZXMpIHtcbiAgICAgICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjA4KSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwwLDAsMC4xKSc7XG4gICAgICAgIH1cblxuICAgICAgICBjLmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGMuc3Ryb2tlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERyYXdzIGJvZHkgYW5nbGUgaW5kaWNhdG9ycyBhbmQgYXhlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBib2R5QXhlc1xuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmJvZHlBeGVzID0gZnVuY3Rpb24ocmVuZGVyLCBib2RpZXMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgZW5naW5lID0gcmVuZGVyLmVuZ2luZSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucyxcbiAgICAgICAgICAgIHBhcnQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgaixcbiAgICAgICAgICAgIGs7XG5cbiAgICAgICAgYy5iZWdpblBhdGgoKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGJvZGllc1tpXSxcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IGJvZHkucGFydHM7XG5cbiAgICAgICAgICAgIGlmICghYm9keS5yZW5kZXIudmlzaWJsZSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0F4ZXMpIHtcbiAgICAgICAgICAgICAgICAvLyByZW5kZXIgYWxsIGF4ZXNcbiAgICAgICAgICAgICAgICBmb3IgKGogPSBwYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydHNbal07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBwYXJ0LmF4ZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBheGlzID0gcGFydC5heGVzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5tb3ZlVG8ocGFydC5wb3NpdGlvbi54LCBwYXJ0LnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5saW5lVG8ocGFydC5wb3NpdGlvbi54ICsgYXhpcy54ICogMjAsIHBhcnQucG9zaXRpb24ueSArIGF4aXMueSAqIDIwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gcGFydHMubGVuZ3RoID4gMSA/IDEgOiAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgcGFydC5heGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW5kZXIgYSBzaW5nbGUgYXhpcyBpbmRpY2F0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubW92ZVRvKHBhcnQucG9zaXRpb24ueCwgcGFydC5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMubGluZVRvKChwYXJ0LnZlcnRpY2VzWzBdLnggKyBwYXJ0LnZlcnRpY2VzW3BhcnQudmVydGljZXMubGVuZ3RoLTFdLngpIC8gMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwYXJ0LnZlcnRpY2VzWzBdLnkgKyBwYXJ0LnZlcnRpY2VzW3BhcnQudmVydGljZXMubGVuZ3RoLTFdLnkpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ2luZGlhbnJlZCc7XG4gICAgICAgICAgICBjLmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSc7XG4gICAgICAgICAgICBjLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdvdmVybGF5JztcbiAgICAgICAgICAgIGMubGluZVdpZHRoID0gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGMuc3Ryb2tlKCk7XG4gICAgICAgIGMuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRHJhd3MgYm9keSBwb3NpdGlvbnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgYm9keVBvc2l0aW9uc1xuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2JvZHlbXX0gYm9kaWVzXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmJvZHlQb3NpdGlvbnMgPSBmdW5jdGlvbihyZW5kZXIsIGJvZGllcywgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQsXG4gICAgICAgICAgICBlbmdpbmUgPSByZW5kZXIuZW5naW5lLFxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIHBhcnQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgaztcblxuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIC8vIHJlbmRlciBjdXJyZW50IHBvc2l0aW9uc1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBib2R5ID0gYm9kaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHkucmVuZGVyLnZpc2libGUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjb21wb3VuZCBwYXJ0c1xuICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IGJvZHkucGFydHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBwYXJ0ID0gYm9keS5wYXJ0c1trXTtcbiAgICAgICAgICAgICAgICBjLmFyYyhwYXJ0LnBvc2l0aW9uLngsIHBhcnQucG9zaXRpb24ueSwgMywgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjLmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMud2lyZWZyYW1lcykge1xuICAgICAgICAgICAgYy5maWxsU3R5bGUgPSAnaW5kaWFucmVkJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGMuZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC41KSc7XG4gICAgICAgIH1cbiAgICAgICAgYy5maWxsKCk7XG5cbiAgICAgICAgYy5iZWdpblBhdGgoKTtcblxuICAgICAgICAvLyByZW5kZXIgcHJldmlvdXMgcG9zaXRpb25zXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJvZHkgPSBib2RpZXNbaV07XG4gICAgICAgICAgICBpZiAoYm9keS5yZW5kZXIudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGMuYXJjKGJvZHkucG9zaXRpb25QcmV2LngsIGJvZHkucG9zaXRpb25QcmV2LnksIDIsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgYy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGMuZmlsbFN0eWxlID0gJ3JnYmEoMjU1LDE2NSwwLDAuOCknO1xuICAgICAgICBjLmZpbGwoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRHJhd3MgYm9keSB2ZWxvY2l0eVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBib2R5VmVsb2NpdHlcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtib2R5W119IGJvZGllc1xuICAgICAqIEBwYXJhbSB7UmVuZGVyaW5nQ29udGV4dH0gY29udGV4dFxuICAgICAqL1xuICAgIFJlbmRlci5ib2R5VmVsb2NpdHkgPSBmdW5jdGlvbihyZW5kZXIsIGJvZGllcywgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQ7XG5cbiAgICAgICAgYy5iZWdpblBhdGgoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV07XG5cbiAgICAgICAgICAgIGlmICghYm9keS5yZW5kZXIudmlzaWJsZSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgYy5tb3ZlVG8oYm9keS5wb3NpdGlvbi54LCBib2R5LnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgYy5saW5lVG8oYm9keS5wb3NpdGlvbi54ICsgKGJvZHkucG9zaXRpb24ueCAtIGJvZHkucG9zaXRpb25QcmV2LngpICogMiwgYm9keS5wb3NpdGlvbi55ICsgKGJvZHkucG9zaXRpb24ueSAtIGJvZHkucG9zaXRpb25QcmV2LnkpICogMik7XG4gICAgICAgIH1cblxuICAgICAgICBjLmxpbmVXaWR0aCA9IDM7XG4gICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAnY29ybmZsb3dlcmJsdWUnO1xuICAgICAgICBjLnN0cm9rZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBib2R5IGlkc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBib2R5SWRzXG4gICAgICogQHBhcmFtIHtyZW5kZXJ9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7Ym9keVtdfSBib2RpZXNcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIuYm9keUlkcyA9IGZ1bmN0aW9uKHJlbmRlciwgYm9kaWVzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBjID0gY29udGV4dCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBqO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghYm9kaWVzW2ldLnJlbmRlci52aXNpYmxlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBib2RpZXNbaV0ucGFydHM7XG4gICAgICAgICAgICBmb3IgKGogPSBwYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gcGFydHNbal07XG4gICAgICAgICAgICAgICAgYy5mb250ID0gXCIxMnB4IEFyaWFsXCI7XG4gICAgICAgICAgICAgICAgYy5maWxsU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwwLjUpJztcbiAgICAgICAgICAgICAgICBjLmZpbGxUZXh0KHBhcnQuaWQsIHBhcnQucG9zaXRpb24ueCArIDEwLCBwYXJ0LnBvc2l0aW9uLnkgLSAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2QgY29sbGlzaW9uc1xuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge3BhaXJbXX0gcGFpcnNcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmluZ0NvbnRleHR9IGNvbnRleHRcbiAgICAgKi9cbiAgICBSZW5kZXIuY29sbGlzaW9ucyA9IGZ1bmN0aW9uKHJlbmRlciwgcGFpcnMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zLFxuICAgICAgICAgICAgcGFpcixcbiAgICAgICAgICAgIGNvbGxpc2lvbixcbiAgICAgICAgICAgIGNvcnJlY3RlZCxcbiAgICAgICAgICAgIGJvZHlBLFxuICAgICAgICAgICAgYm9keUIsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgajtcblxuICAgICAgICBjLmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIC8vIHJlbmRlciBjb2xsaXNpb24gcG9zaXRpb25zXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFpciA9IHBhaXJzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIXBhaXIuaXNBY3RpdmUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IHBhaXIuY29sbGlzaW9uO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHBhaXIuYWN0aXZlQ29udGFjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGFjdCA9IHBhaXIuYWN0aXZlQ29udGFjdHNbal0sXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleCA9IGNvbnRhY3QudmVydGV4O1xuICAgICAgICAgICAgICAgIGMucmVjdCh2ZXJ0ZXgueCAtIDEuNSwgdmVydGV4LnkgLSAxLjUsIDMuNSwgMy41KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLndpcmVmcmFtZXMpIHtcbiAgICAgICAgICAgIGMuZmlsbFN0eWxlID0gJ3JnYmEoMjU1LDI1NSwyNTUsMC43KSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLmZpbGxTdHlsZSA9ICdvcmFuZ2UnO1xuICAgICAgICB9XG4gICAgICAgIGMuZmlsbCgpO1xuXG4gICAgICAgIGMuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgLy8gcmVuZGVyIGNvbGxpc2lvbiBub3JtYWxzXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFpciA9IHBhaXJzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIXBhaXIuaXNBY3RpdmUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IHBhaXIuY29sbGlzaW9uO1xuXG4gICAgICAgICAgICBpZiAocGFpci5hY3RpdmVDb250YWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vcm1hbFBvc1ggPSBwYWlyLmFjdGl2ZUNvbnRhY3RzWzBdLnZlcnRleC54LFxuICAgICAgICAgICAgICAgICAgICBub3JtYWxQb3NZID0gcGFpci5hY3RpdmVDb250YWN0c1swXS52ZXJ0ZXgueTtcblxuICAgICAgICAgICAgICAgIGlmIChwYWlyLmFjdGl2ZUNvbnRhY3RzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBub3JtYWxQb3NYID0gKHBhaXIuYWN0aXZlQ29udGFjdHNbMF0udmVydGV4LnggKyBwYWlyLmFjdGl2ZUNvbnRhY3RzWzFdLnZlcnRleC54KSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbFBvc1kgPSAocGFpci5hY3RpdmVDb250YWN0c1swXS52ZXJ0ZXgueSArIHBhaXIuYWN0aXZlQ29udGFjdHNbMV0udmVydGV4LnkpIC8gMjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uLmJvZHlCID09PSBjb2xsaXNpb24uc3VwcG9ydHNbMF0uYm9keSB8fCBjb2xsaXNpb24uYm9keUEuaXNTdGF0aWMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5tb3ZlVG8obm9ybWFsUG9zWCAtIGNvbGxpc2lvbi5ub3JtYWwueCAqIDgsIG5vcm1hbFBvc1kgLSBjb2xsaXNpb24ubm9ybWFsLnkgKiA4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjLm1vdmVUbyhub3JtYWxQb3NYICsgY29sbGlzaW9uLm5vcm1hbC54ICogOCwgbm9ybWFsUG9zWSArIGNvbGxpc2lvbi5ub3JtYWwueSAqIDgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGMubGluZVRvKG5vcm1hbFBvc1gsIG5vcm1hbFBvc1kpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMud2lyZWZyYW1lcykge1xuICAgICAgICAgICAgYy5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwxNjUsMCwwLjcpJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAnb3JhbmdlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGMubGluZVdpZHRoID0gMTtcbiAgICAgICAgYy5zdHJva2UoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2Qgc2VwYXJhdGlvbnNcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtwYWlyW119IHBhaXJzXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLnNlcGFyYXRpb25zID0gZnVuY3Rpb24ocmVuZGVyLCBwYWlycywgY29udGV4dCkge1xuICAgICAgICB2YXIgYyA9IGNvbnRleHQsXG4gICAgICAgICAgICBvcHRpb25zID0gcmVuZGVyLm9wdGlvbnMsXG4gICAgICAgICAgICBwYWlyLFxuICAgICAgICAgICAgY29sbGlzaW9uLFxuICAgICAgICAgICAgY29ycmVjdGVkLFxuICAgICAgICAgICAgYm9keUEsXG4gICAgICAgICAgICBib2R5QixcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBqO1xuXG4gICAgICAgIGMuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgLy8gcmVuZGVyIHNlcGFyYXRpb25zXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFpciA9IHBhaXJzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIXBhaXIuaXNBY3RpdmUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbiA9IHBhaXIuY29sbGlzaW9uO1xuICAgICAgICAgICAgYm9keUEgPSBjb2xsaXNpb24uYm9keUE7XG4gICAgICAgICAgICBib2R5QiA9IGNvbGxpc2lvbi5ib2R5QjtcblxuICAgICAgICAgICAgdmFyIGsgPSAxO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHlCLmlzU3RhdGljICYmICFib2R5QS5pc1N0YXRpYykgayA9IDAuNTtcbiAgICAgICAgICAgIGlmIChib2R5Qi5pc1N0YXRpYykgayA9IDA7XG5cbiAgICAgICAgICAgIGMubW92ZVRvKGJvZHlCLnBvc2l0aW9uLngsIGJvZHlCLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgYy5saW5lVG8oYm9keUIucG9zaXRpb24ueCAtIGNvbGxpc2lvbi5wZW5ldHJhdGlvbi54ICogaywgYm9keUIucG9zaXRpb24ueSAtIGNvbGxpc2lvbi5wZW5ldHJhdGlvbi55ICogayk7XG5cbiAgICAgICAgICAgIGsgPSAxO1xuXG4gICAgICAgICAgICBpZiAoIWJvZHlCLmlzU3RhdGljICYmICFib2R5QS5pc1N0YXRpYykgayA9IDAuNTtcbiAgICAgICAgICAgIGlmIChib2R5QS5pc1N0YXRpYykgayA9IDA7XG5cbiAgICAgICAgICAgIGMubW92ZVRvKGJvZHlBLnBvc2l0aW9uLngsIGJvZHlBLnBvc2l0aW9uLnkpO1xuICAgICAgICAgICAgYy5saW5lVG8oYm9keUEucG9zaXRpb24ueCArIGNvbGxpc2lvbi5wZW5ldHJhdGlvbi54ICogaywgYm9keUEucG9zaXRpb24ueSArIGNvbGxpc2lvbi5wZW5ldHJhdGlvbi55ICogayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LDE2NSwwLDAuNSknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYy5zdHJva2VTdHlsZSA9ICdvcmFuZ2UnO1xuICAgICAgICB9XG4gICAgICAgIGMuc3Ryb2tlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kIGdyaWRcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtncmlkfSBncmlkXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmdyaWQgPSBmdW5jdGlvbihyZW5kZXIsIGdyaWQsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGMgPSBjb250ZXh0LFxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zO1xuXG4gICAgICAgIGlmIChvcHRpb25zLndpcmVmcmFtZXMpIHtcbiAgICAgICAgICAgIGMuc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsMTgwLDAsMC4xKSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LDE4MCwwLDAuNSknO1xuICAgICAgICB9XG5cbiAgICAgICAgYy5iZWdpblBhdGgoKTtcblxuICAgICAgICB2YXIgYnVja2V0S2V5cyA9IENvbW1vbi5rZXlzKGdyaWQuYnVja2V0cyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWNrZXRLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYnVja2V0SWQgPSBidWNrZXRLZXlzW2ldO1xuXG4gICAgICAgICAgICBpZiAoZ3JpZC5idWNrZXRzW2J1Y2tldElkXS5sZW5ndGggPCAyKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgcmVnaW9uID0gYnVja2V0SWQuc3BsaXQoL0N8Ui8pO1xuICAgICAgICAgICAgYy5yZWN0KDAuNSArIHBhcnNlSW50KHJlZ2lvblsxXSwgMTApICogZ3JpZC5idWNrZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgMC41ICsgcGFyc2VJbnQocmVnaW9uWzJdLCAxMCkgKiBncmlkLmJ1Y2tldEhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5idWNrZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5idWNrZXRIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYy5saW5lV2lkdGggPSAxO1xuICAgICAgICBjLnN0cm9rZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZCBpbnNwZWN0b3JcbiAgICAgKiBAcGFyYW0ge2luc3BlY3Rvcn0gaW5zcGVjdG9yXG4gICAgICogQHBhcmFtIHtSZW5kZXJpbmdDb250ZXh0fSBjb250ZXh0XG4gICAgICovXG4gICAgUmVuZGVyLmluc3BlY3RvciA9IGZ1bmN0aW9uKGluc3BlY3RvciwgY29udGV4dCkge1xuICAgICAgICB2YXIgZW5naW5lID0gaW5zcGVjdG9yLmVuZ2luZSxcbiAgICAgICAgICAgIHNlbGVjdGVkID0gaW5zcGVjdG9yLnNlbGVjdGVkLFxuICAgICAgICAgICAgcmVuZGVyID0gaW5zcGVjdG9yLnJlbmRlcixcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZW5kZXIub3B0aW9ucyxcbiAgICAgICAgICAgIGJvdW5kcztcblxuICAgICAgICBpZiAob3B0aW9ucy5oYXNCb3VuZHMpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHNXaWR0aCA9IHJlbmRlci5ib3VuZHMubWF4LnggLSByZW5kZXIuYm91bmRzLm1pbi54LFxuICAgICAgICAgICAgICAgIGJvdW5kc0hlaWdodCA9IHJlbmRlci5ib3VuZHMubWF4LnkgLSByZW5kZXIuYm91bmRzLm1pbi55LFxuICAgICAgICAgICAgICAgIGJvdW5kc1NjYWxlWCA9IGJvdW5kc1dpZHRoIC8gcmVuZGVyLm9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICAgICAgYm91bmRzU2NhbGVZID0gYm91bmRzSGVpZ2h0IC8gcmVuZGVyLm9wdGlvbnMuaGVpZ2h0O1xuXG4gICAgICAgICAgICBjb250ZXh0LnNjYWxlKDEgLyBib3VuZHNTY2FsZVgsIDEgLyBib3VuZHNTY2FsZVkpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLXJlbmRlci5ib3VuZHMubWluLngsIC1yZW5kZXIuYm91bmRzLm1pbi55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gc2VsZWN0ZWRbaV0uZGF0YTtcblxuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoMC41LCAwLjUpO1xuICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwxNjUsMCwwLjkpJztcbiAgICAgICAgICAgIGNvbnRleHQuc2V0TGluZURhc2goWzEsMl0pO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuXG4gICAgICAgICAgICBjYXNlICdib2R5JzpcblxuICAgICAgICAgICAgICAgIC8vIHJlbmRlciBib2R5IHNlbGVjdGlvbnNcbiAgICAgICAgICAgICAgICBib3VuZHMgPSBpdGVtLmJvdW5kcztcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVjdChNYXRoLmZsb29yKGJvdW5kcy5taW4ueCAtIDMpLCBNYXRoLmZsb29yKGJvdW5kcy5taW4ueSAtIDMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJvdW5kcy5tYXgueCAtIGJvdW5kcy5taW4ueCArIDYpLCBNYXRoLmZsb29yKGJvdW5kcy5tYXgueSAtIGJvdW5kcy5taW4ueSArIDYpKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnY29uc3RyYWludCc6XG5cbiAgICAgICAgICAgICAgICAvLyByZW5kZXIgY29uc3RyYWludCBzZWxlY3Rpb25zXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gaXRlbS5wb2ludEE7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uYm9keUEpXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ID0gaXRlbS5wb2ludEI7XG4gICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmFyYyhwb2ludC54LCBwb2ludC55LCAxMCwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRleHQuc2V0TGluZURhc2goW10pO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLTAuNSwgLTAuNSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW5kZXIgc2VsZWN0aW9uIHJlZ2lvblxuICAgICAgICBpZiAoaW5zcGVjdG9yLnNlbGVjdFN0YXJ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSgwLjUsIDAuNSk7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LDE2NSwwLDAuNiknO1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgyNTUsMTY1LDAsMC4xKSc7XG4gICAgICAgICAgICBib3VuZHMgPSBpbnNwZWN0b3Iuc2VsZWN0Qm91bmRzO1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQucmVjdChNYXRoLmZsb29yKGJvdW5kcy5taW4ueCksIE1hdGguZmxvb3IoYm91bmRzLm1pbi55KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJvdW5kcy5tYXgueCAtIGJvdW5kcy5taW4ueCksIE1hdGguZmxvb3IoYm91bmRzLm1heC55IC0gYm91bmRzLm1pbi55KSk7XG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLTAuNSwgLTAuNSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5oYXNCb3VuZHMpXG4gICAgICAgICAgICBjb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb25cbiAgICAgKiBAbWV0aG9kIF9jcmVhdGVDYW52YXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7fSB3aWR0aFxuICAgICAqIEBwYXJhbSB7fSBoZWlnaHRcbiAgICAgKiBAcmV0dXJuIGNhbnZhc1xuICAgICAqL1xuICAgIHZhciBfY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBjYW52YXMub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH07XG4gICAgICAgIGNhbnZhcy5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfTtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGl4ZWwgcmF0aW8gb2YgdGhlIGNhbnZhcy5cbiAgICAgKiBAbWV0aG9kIF9nZXRQaXhlbFJhdGlvXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjYW52YXNcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHBpeGVsIHJhdGlvXG4gICAgICovXG4gICAgdmFyIF9nZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG4gICAgICAgICAgICBkZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICAgICAgICAgIGJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gPSBjb250ZXh0LndlYmtpdEJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHwgY29udGV4dC5tb3pCYWNraW5nU3RvcmVQaXhlbFJhdGlvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGNvbnRleHQubXNCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8IGNvbnRleHQub0JhY2tpbmdTdG9yZVBpeGVsUmF0aW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgY29udGV4dC5iYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICAgICAgcmV0dXJuIGRldmljZVBpeGVsUmF0aW8gLyBiYWNraW5nU3RvcmVQaXhlbFJhdGlvO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXF1ZXN0ZWQgdGV4dHVyZSAoYW4gSW1hZ2UpIHZpYSBpdHMgcGF0aFxuICAgICAqIEBtZXRob2QgX2dldFRleHR1cmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VQYXRoXG4gICAgICogQHJldHVybiB7SW1hZ2V9IHRleHR1cmVcbiAgICAgKi9cbiAgICB2YXIgX2dldFRleHR1cmUgPSBmdW5jdGlvbihyZW5kZXIsIGltYWdlUGF0aCkge1xuICAgICAgICB2YXIgaW1hZ2UgPSByZW5kZXIudGV4dHVyZXNbaW1hZ2VQYXRoXTtcblxuICAgICAgICBpZiAoaW1hZ2UpXG4gICAgICAgICAgICByZXR1cm4gaW1hZ2U7XG5cbiAgICAgICAgaW1hZ2UgPSByZW5kZXIudGV4dHVyZXNbaW1hZ2VQYXRoXSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWFnZVBhdGg7XG5cbiAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBiYWNrZ3JvdW5kIHRvIHRoZSBjYW52YXMgdXNpbmcgQ1NTLlxuICAgICAqIEBtZXRob2QgYXBwbHlCYWNrZ3JvdW5kXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3JlbmRlcn0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhY2tncm91bmRcbiAgICAgKi9cbiAgICB2YXIgX2FwcGx5QmFja2dyb3VuZCA9IGZ1bmN0aW9uKHJlbmRlciwgYmFja2dyb3VuZCkge1xuICAgICAgICB2YXIgY3NzQmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG5cbiAgICAgICAgaWYgKC8oanBnfGdpZnxwbmcpJC8udGVzdChiYWNrZ3JvdW5kKSlcbiAgICAgICAgICAgIGNzc0JhY2tncm91bmQgPSAndXJsKCcgKyBiYWNrZ3JvdW5kICsgJyknO1xuXG4gICAgICAgIHJlbmRlci5jYW52YXMuc3R5bGUuYmFja2dyb3VuZCA9IGNzc0JhY2tncm91bmQ7XG4gICAgICAgIHJlbmRlci5jYW52YXMuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcImNvbnRhaW5cIjtcbiAgICAgICAgcmVuZGVyLmN1cnJlbnRCYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICB9O1xuXG4gICAgLypcbiAgICAqXG4gICAgKiAgRXZlbnRzIERvY3VtZW50YXRpb25cbiAgICAqXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogRmlyZWQgYmVmb3JlIHJlbmRlcmluZ1xuICAgICpcbiAgICAqIEBldmVudCBiZWZvcmVSZW5kZXJcbiAgICAqIEBwYXJhbSB7fSBldmVudCBBbiBldmVudCBvYmplY3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC50aW1lc3RhbXAgVGhlIGVuZ2luZS50aW1pbmcudGltZXN0YW1wIG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50LnNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7fSBldmVudC5uYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEZpcmVkIGFmdGVyIHJlbmRlcmluZ1xuICAgICpcbiAgICAqIEBldmVudCBhZnRlclJlbmRlclxuICAgICogQHBhcmFtIHt9IGV2ZW50IEFuIGV2ZW50IG9iamVjdFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRpbWVzdGFtcCBUaGUgZW5naW5lLnRpbWluZy50aW1lc3RhbXAgb2YgdGhlIGV2ZW50XG4gICAgKiBAcGFyYW0ge30gZXZlbnQuc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0IG9mIHRoZSBldmVudFxuICAgICogQHBhcmFtIHt9IGV2ZW50Lm5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAgKi9cblxuICAgIC8qXG4gICAgKlxuICAgICogIFByb3BlcnRpZXMgRG9jdW1lbnRhdGlvblxuICAgICpcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBiYWNrLXJlZmVyZW5jZSB0byB0aGUgYE1hdHRlci5SZW5kZXJgIG1vZHVsZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb250cm9sbGVyXG4gICAgICogQHR5cGUgcmVuZGVyXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYE1hdHRlci5FbmdpbmVgIGluc3RhbmNlIHRvIGJlIHVzZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZW5naW5lXG4gICAgICogQHR5cGUgZW5naW5lXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCB3aGVyZSB0aGUgY2FudmFzIGlzIHRvIGJlIGluc2VydGVkIChpZiBgcmVuZGVyLmNhbnZhc2AgaGFzIG5vdCBiZWVuIHNwZWNpZmllZClcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBlbGVtZW50XG4gICAgICogQHR5cGUgSFRNTEVsZW1lbnRcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FudmFzIGVsZW1lbnQgdG8gcmVuZGVyIHRvLiBJZiBub3Qgc3BlY2lmaWVkLCBvbmUgd2lsbCBiZSBjcmVhdGVkIGlmIGByZW5kZXIuZWxlbWVudGAgaGFzIGJlZW4gc3BlY2lmaWVkLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGNhbnZhc1xuICAgICAqIEB0eXBlIEhUTUxDYW52YXNFbGVtZW50XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBvZiB0aGUgcmVuZGVyZXIuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9uc1xuICAgICAqIEB0eXBlIHt9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHdpZHRoIGluIHBpeGVscyBvZiB0aGUgYHJlbmRlci5jYW52YXNgIHRvIGJlIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9ucy53aWR0aFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDgwMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBoZWlnaHQgaW4gcGl4ZWxzIG9mIHRoZSBgcmVuZGVyLmNhbnZhc2AgdG8gYmUgY3JlYXRlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBvcHRpb25zLmhlaWdodFxuICAgICAqIEB0eXBlIG51bWJlclxuICAgICAqIEBkZWZhdWx0IDYwMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRoYXQgc3BlY2lmaWVzIGlmIGByZW5kZXIuYm91bmRzYCBzaG91bGQgYmUgdXNlZCB3aGVuIHJlbmRlcmluZy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBvcHRpb25zLmhhc0JvdW5kc1xuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQSBgQm91bmRzYCBvYmplY3QgdGhhdCBzcGVjaWZpZXMgdGhlIGRyYXdpbmcgdmlldyByZWdpb24uXG4gICAgICogUmVuZGVyaW5nIHdpbGwgYmUgYXV0b21hdGljYWxseSB0cmFuc2Zvcm1lZCBhbmQgc2NhbGVkIHRvIGZpdCB3aXRoaW4gdGhlIGNhbnZhcyBzaXplIChgcmVuZGVyLm9wdGlvbnMud2lkdGhgIGFuZCBgcmVuZGVyLm9wdGlvbnMuaGVpZ2h0YCkuXG4gICAgICogVGhpcyBhbGxvd3MgZm9yIGNyZWF0aW5nIHZpZXdzIHRoYXQgY2FuIHBhbiBvciB6b29tIGFyb3VuZCB0aGUgc2NlbmUuXG4gICAgICogWW91IG11c3QgYWxzbyBzZXQgYHJlbmRlci5vcHRpb25zLmhhc0JvdW5kc2AgdG8gYHRydWVgIHRvIGVuYWJsZSBib3VuZGVkIHJlbmRlcmluZy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBib3VuZHNcbiAgICAgKiBAdHlwZSBib3VuZHNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSAyZCByZW5kZXJpbmcgY29udGV4dCBmcm9tIHRoZSBgcmVuZGVyLmNhbnZhc2AgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjb250ZXh0XG4gICAgICogQHR5cGUgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3ByaXRlIHRleHR1cmUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdGV4dHVyZXNcbiAgICAgKiBAdHlwZSB7fVxuICAgICAqL1xuXG59KSgpO1xuXG59LHtcIi4uL2JvZHkvQ29tcG9zaXRlXCI6MixcIi4uL2NvbGxpc2lvbi9HcmlkXCI6NixcIi4uL2NvcmUvQ29tbW9uXCI6MTQsXCIuLi9jb3JlL0V2ZW50c1wiOjE2LFwiLi4vY29yZS9Nb3VzZVwiOjE5LFwiLi4vZ2VvbWV0cnkvQm91bmRzXCI6MjYsXCIuLi9nZW9tZXRyeS9WZWN0b3JcIjoyOH1dLDMyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuKiBUaGUgYE1hdHRlci5SZW5kZXJQaXhpYCBtb2R1bGUgaXMgYW4gZXhhbXBsZSByZW5kZXJlciB1c2luZyBwaXhpLmpzLlxuKiBTZWUgYWxzbyBgTWF0dGVyLlJlbmRlcmAgZm9yIGEgY2FudmFzIGJhc2VkIHJlbmRlcmVyLlxuKlxuKiBAY2xhc3MgUmVuZGVyUGl4aVxuKiBAZGVwcmVjYXRlZCB0aGUgTWF0dGVyLlJlbmRlclBpeGkgbW9kdWxlIHdpbGwgc29vbiBiZSByZW1vdmVkIGZyb20gdGhlIE1hdHRlci5qcyBjb3JlLlxuKiBJdCB3aWxsIGxpa2VseSBiZSBtb3ZlZCB0byBpdHMgb3duIHJlcG9zaXRvcnkgKGJ1dCBtYWludGVuYW5jZSB3aWxsIGJlIGxpbWl0ZWQpLlxuKi9cblxudmFyIFJlbmRlclBpeGkgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJQaXhpO1xuXG52YXIgQm91bmRzID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvQm91bmRzJyk7XG52YXIgQ29tcG9zaXRlID0gX2RlcmVxXygnLi4vYm9keS9Db21wb3NpdGUnKTtcbnZhciBDb21tb24gPSBfZGVyZXFfKCcuLi9jb3JlL0NvbW1vbicpO1xudmFyIEV2ZW50cyA9IF9kZXJlcV8oJy4uL2NvcmUvRXZlbnRzJyk7XG52YXIgVmVjdG9yID0gX2RlcmVxXygnLi4vZ2VvbWV0cnkvVmVjdG9yJyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHZhciBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxuICAgICAgICBfY2FuY2VsQW5pbWF0aW9uRnJhbWU7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgX3JlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgZnVuY3Rpb24oY2FsbGJhY2speyB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soQ29tbW9uLm5vdygpKTsgfSwgMTAwMCAvIDYwKTsgfTtcbiAgIFxuICAgICAgICBfY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWU7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgUGl4aS5qcyBXZWJHTCByZW5kZXJlclxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtSZW5kZXJQaXhpfSBBIG5ldyByZW5kZXJlclxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgUmVuZGVyUGl4aS5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIENvbW1vbi53YXJuKCdSZW5kZXJQaXhpLmNyZWF0ZTogTWF0dGVyLlJlbmRlclBpeGkgaXMgZGVwcmVjYXRlZCAoc2VlIGRvY3MpJyk7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgY29udHJvbGxlcjogUmVuZGVyUGl4aSxcbiAgICAgICAgICAgIGVuZ2luZTogbnVsbCxcbiAgICAgICAgICAgIGVsZW1lbnQ6IG51bGwsXG4gICAgICAgICAgICBmcmFtZVJlcXVlc3RJZDogbnVsbCxcbiAgICAgICAgICAgIGNhbnZhczogbnVsbCxcbiAgICAgICAgICAgIHJlbmRlcmVyOiBudWxsLFxuICAgICAgICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgICAgICAgc3ByaXRlQ29udGFpbmVyOiBudWxsLFxuICAgICAgICAgICAgcGl4aU9wdGlvbnM6IG51bGwsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZhZmFmYScsXG4gICAgICAgICAgICAgICAgd2lyZWZyYW1lQmFja2dyb3VuZDogJyMyMjInLFxuICAgICAgICAgICAgICAgIGhhc0JvdW5kczogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aXJlZnJhbWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3dTbGVlcGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaG93RGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dCcm9hZHBoYXNlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Qm91bmRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93VmVsb2NpdHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dDb2xsaXNpb25zOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93QXhlczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd1Bvc2l0aW9uczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0FuZ2xlSW5kaWNhdG9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SWRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93U2hhZG93czogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcmVuZGVyID0gQ29tbW9uLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyksXG4gICAgICAgICAgICB0cmFuc3BhcmVudCA9ICFyZW5kZXIub3B0aW9ucy53aXJlZnJhbWVzICYmIHJlbmRlci5vcHRpb25zLmJhY2tncm91bmQgPT09ICd0cmFuc3BhcmVudCc7XG5cbiAgICAgICAgLy8gaW5pdCBwaXhpXG4gICAgICAgIHJlbmRlci5waXhpT3B0aW9ucyA9IHJlbmRlci5waXhpT3B0aW9ucyB8fCB7XG4gICAgICAgICAgICB2aWV3OiByZW5kZXIuY2FudmFzLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRyYW5zcGFyZW50LFxuICAgICAgICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJhY2tncm91bmRcbiAgICAgICAgfTtcblxuICAgICAgICByZW5kZXIubW91c2UgPSBvcHRpb25zLm1vdXNlO1xuICAgICAgICByZW5kZXIuZW5naW5lID0gb3B0aW9ucy5lbmdpbmU7XG4gICAgICAgIHJlbmRlci5yZW5kZXJlciA9IHJlbmRlci5yZW5kZXJlciB8fCBuZXcgUElYSS5XZWJHTFJlbmRlcmVyKHJlbmRlci5vcHRpb25zLndpZHRoLCByZW5kZXIub3B0aW9ucy5oZWlnaHQsIHJlbmRlci5waXhpT3B0aW9ucyk7XG4gICAgICAgIHJlbmRlci5jb250YWluZXIgPSByZW5kZXIuY29udGFpbmVyIHx8IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgICAgICByZW5kZXIuc3ByaXRlQ29udGFpbmVyID0gcmVuZGVyLnNwcml0ZUNvbnRhaW5lciB8fCBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgcmVuZGVyLmNhbnZhcyA9IHJlbmRlci5jYW52YXMgfHwgcmVuZGVyLnJlbmRlcmVyLnZpZXc7XG4gICAgICAgIHJlbmRlci5ib3VuZHMgPSByZW5kZXIuYm91bmRzIHx8IHsgXG4gICAgICAgICAgICBtaW46IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgbWF4OiB7IFxuICAgICAgICAgICAgICAgIHg6IHJlbmRlci5vcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgICAgIHk6IHJlbmRlci5vcHRpb25zLmhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICBFdmVudHMub24ocmVuZGVyLmVuZ2luZSwgJ2JlZm9yZVVwZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgUmVuZGVyUGl4aS5jbGVhcihyZW5kZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYWNoZXNcbiAgICAgICAgcmVuZGVyLnRleHR1cmVzID0ge307XG4gICAgICAgIHJlbmRlci5zcHJpdGVzID0ge307XG4gICAgICAgIHJlbmRlci5wcmltaXRpdmVzID0ge307XG5cbiAgICAgICAgLy8gdXNlIGEgc3ByaXRlIGJhdGNoIGZvciBwZXJmb3JtYW5jZVxuICAgICAgICByZW5kZXIuY29udGFpbmVyLmFkZENoaWxkKHJlbmRlci5zcHJpdGVDb250YWluZXIpO1xuXG4gICAgICAgIC8vIGluc2VydCBjYW52YXNcbiAgICAgICAgaWYgKENvbW1vbi5pc0VsZW1lbnQocmVuZGVyLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZW5kZXIuZWxlbWVudC5hcHBlbmRDaGlsZChyZW5kZXIuY2FudmFzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIENvbW1vbi53YXJuKCdObyBcInJlbmRlci5lbGVtZW50XCIgcGFzc2VkLCBcInJlbmRlci5jYW52YXNcIiB3YXMgbm90IGluc2VydGVkIGludG8gZG9jdW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmV2ZW50IG1lbnVzIG9uIGNhbnZhc1xuICAgICAgICByZW5kZXIuY2FudmFzLm9uY29udGV4dG1lbnUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgICAgICByZW5kZXIuY2FudmFzLm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9O1xuXG4gICAgICAgIHJldHVybiByZW5kZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVvdXNseSB1cGRhdGVzIHRoZSByZW5kZXIgY2FudmFzIG9uIHRoZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBldmVudC5cbiAgICAgKiBAbWV0aG9kIHJ1blxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFJlbmRlclBpeGkucnVuID0gZnVuY3Rpb24ocmVuZGVyKSB7XG4gICAgICAgIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVuZGVyLmZyYW1lUmVxdWVzdElkID0gX3JlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgICAgIFJlbmRlclBpeGkud29ybGQocmVuZGVyKTtcbiAgICAgICAgfSkoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5kcyBleGVjdXRpb24gb2YgYFJlbmRlci5ydW5gIG9uIHRoZSBnaXZlbiBgcmVuZGVyYCwgYnkgY2FuY2VsaW5nIHRoZSBhbmltYXRpb24gZnJhbWUgcmVxdWVzdCBldmVudCBsb29wLlxuICAgICAqIEBtZXRob2Qgc3RvcFxuICAgICAqIEBwYXJhbSB7cmVuZGVyfSByZW5kZXJcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFJlbmRlclBpeGkuc3RvcCA9IGZ1bmN0aW9uKHJlbmRlcikge1xuICAgICAgICBfY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVuZGVyLmZyYW1lUmVxdWVzdElkKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBzY2VuZSBncmFwaFxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAgKiBAcGFyYW0ge1JlbmRlclBpeGl9IHJlbmRlclxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgUmVuZGVyUGl4aS5jbGVhciA9IGZ1bmN0aW9uKHJlbmRlcikge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gcmVuZGVyLmNvbnRhaW5lcixcbiAgICAgICAgICAgIHNwcml0ZUNvbnRhaW5lciA9IHJlbmRlci5zcHJpdGVDb250YWluZXI7XG5cbiAgICAgICAgLy8gY2xlYXIgc3RhZ2UgY29udGFpbmVyXG4gICAgICAgIHdoaWxlIChjb250YWluZXIuY2hpbGRyZW5bMF0pIHsgXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoY29udGFpbmVyLmNoaWxkcmVuWzBdKTsgXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciBzcHJpdGUgYmF0Y2hcbiAgICAgICAgd2hpbGUgKHNwcml0ZUNvbnRhaW5lci5jaGlsZHJlblswXSkgeyBcbiAgICAgICAgICAgIHNwcml0ZUNvbnRhaW5lci5yZW1vdmVDaGlsZChzcHJpdGVDb250YWluZXIuY2hpbGRyZW5bMF0pOyBcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBiZ1Nwcml0ZSA9IHJlbmRlci5zcHJpdGVzWydiZy0wJ107XG5cbiAgICAgICAgLy8gY2xlYXIgY2FjaGVzXG4gICAgICAgIHJlbmRlci50ZXh0dXJlcyA9IHt9O1xuICAgICAgICByZW5kZXIuc3ByaXRlcyA9IHt9O1xuICAgICAgICByZW5kZXIucHJpbWl0aXZlcyA9IHt9O1xuXG4gICAgICAgIC8vIHNldCBiYWNrZ3JvdW5kIHNwcml0ZVxuICAgICAgICByZW5kZXIuc3ByaXRlc1snYmctMCddID0gYmdTcHJpdGU7XG4gICAgICAgIGlmIChiZ1Nwcml0ZSlcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZEF0KGJnU3ByaXRlLCAwKTtcblxuICAgICAgICAvLyBhZGQgc3ByaXRlIGJhdGNoIGJhY2sgaW50byBjb250YWluZXJcbiAgICAgICAgcmVuZGVyLmNvbnRhaW5lci5hZGRDaGlsZChyZW5kZXIuc3ByaXRlQ29udGFpbmVyKTtcblxuICAgICAgICAvLyByZXNldCBiYWNrZ3JvdW5kIHN0YXRlXG4gICAgICAgIHJlbmRlci5jdXJyZW50QmFja2dyb3VuZCA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVzZXQgYm91bmRzIHRyYW5zZm9ybXNcbiAgICAgICAgY29udGFpbmVyLnNjYWxlLnNldCgxLCAxKTtcbiAgICAgICAgY29udGFpbmVyLnBvc2l0aW9uLnNldCgwLCAwKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYmFja2dyb3VuZCBvZiB0aGUgY2FudmFzIFxuICAgICAqIEBtZXRob2Qgc2V0QmFja2dyb3VuZFxuICAgICAqIEBwYXJhbSB7UmVuZGVyUGl4aX0gcmVuZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhY2tncm91bmRcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFJlbmRlclBpeGkuc2V0QmFja2dyb3VuZCA9IGZ1bmN0aW9uKHJlbmRlciwgYmFja2dyb3VuZCkge1xuICAgICAgICBpZiAocmVuZGVyLmN1cnJlbnRCYWNrZ3JvdW5kICE9PSBiYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICB2YXIgaXNDb2xvciA9IGJhY2tncm91bmQuaW5kZXhPZiAmJiBiYWNrZ3JvdW5kLmluZGV4T2YoJyMnKSAhPT0gLTEsXG4gICAgICAgICAgICAgICAgYmdTcHJpdGUgPSByZW5kZXIuc3ByaXRlc1snYmctMCddO1xuXG4gICAgICAgICAgICBpZiAoaXNDb2xvcikge1xuICAgICAgICAgICAgICAgIC8vIGlmIHNvbGlkIGJhY2tncm91bmQgY29sb3JcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBDb21tb24uY29sb3JUb051bWJlcihiYWNrZ3JvdW5kKTtcbiAgICAgICAgICAgICAgICByZW5kZXIucmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYmFja2dyb3VuZCBzcHJpdGUgaWYgZXhpc3RpbmdcbiAgICAgICAgICAgICAgICBpZiAoYmdTcHJpdGUpXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5jb250YWluZXIucmVtb3ZlQ2hpbGQoYmdTcHJpdGUpOyBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhbGlzZSBiYWNrZ3JvdW5kIHNwcml0ZSBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICBpZiAoIWJnU3ByaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gX2dldFRleHR1cmUocmVuZGVyLCBiYWNrZ3JvdW5kKTtcblxuICAgICAgICAgICAgICAgICAgICBiZ1Nwcml0ZSA9IHJlbmRlci5zcHJpdGVzWydiZy0wJ10gPSBuZXcgUElYSS5TcHJpdGUodGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIGJnU3ByaXRlLnBvc2l0aW9uLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICBiZ1Nwcml0ZS5wb3NpdGlvbi55ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmNvbnRhaW5lci5hZGRDaGlsZEF0KGJnU3ByaXRlLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlbmRlci5jdXJyZW50QmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb25cbiAgICAgKiBAbWV0aG9kIHdvcmxkXG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgUmVuZGVyUGl4aS53b3JsZCA9IGZ1bmN0aW9uKHJlbmRlcikge1xuICAgICAgICB2YXIgZW5naW5lID0gcmVuZGVyLmVuZ2luZSxcbiAgICAgICAgICAgIHdvcmxkID0gZW5naW5lLndvcmxkLFxuICAgICAgICAgICAgcmVuZGVyZXIgPSByZW5kZXIucmVuZGVyZXIsXG4gICAgICAgICAgICBjb250YWluZXIgPSByZW5kZXIuY29udGFpbmVyLFxuICAgICAgICAgICAgb3B0aW9ucyA9IHJlbmRlci5vcHRpb25zLFxuICAgICAgICAgICAgYm9kaWVzID0gQ29tcG9zaXRlLmFsbEJvZGllcyh3b3JsZCksXG4gICAgICAgICAgICBhbGxDb25zdHJhaW50cyA9IENvbXBvc2l0ZS5hbGxDb25zdHJhaW50cyh3b3JsZCksXG4gICAgICAgICAgICBjb25zdHJhaW50cyA9IFtdLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICBpZiAob3B0aW9ucy53aXJlZnJhbWVzKSB7XG4gICAgICAgICAgICBSZW5kZXJQaXhpLnNldEJhY2tncm91bmQocmVuZGVyLCBvcHRpb25zLndpcmVmcmFtZUJhY2tncm91bmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUmVuZGVyUGl4aS5zZXRCYWNrZ3JvdW5kKHJlbmRlciwgb3B0aW9ucy5iYWNrZ3JvdW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhhbmRsZSBib3VuZHNcbiAgICAgICAgdmFyIGJvdW5kc1dpZHRoID0gcmVuZGVyLmJvdW5kcy5tYXgueCAtIHJlbmRlci5ib3VuZHMubWluLngsXG4gICAgICAgICAgICBib3VuZHNIZWlnaHQgPSByZW5kZXIuYm91bmRzLm1heC55IC0gcmVuZGVyLmJvdW5kcy5taW4ueSxcbiAgICAgICAgICAgIGJvdW5kc1NjYWxlWCA9IGJvdW5kc1dpZHRoIC8gcmVuZGVyLm9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgICBib3VuZHNTY2FsZVkgPSBib3VuZHNIZWlnaHQgLyByZW5kZXIub3B0aW9ucy5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzQm91bmRzKSB7XG4gICAgICAgICAgICAvLyBIaWRlIGJvZGllcyB0aGF0IGFyZSBub3QgaW4gdmlld1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuICAgICAgICAgICAgICAgIGJvZHkucmVuZGVyLnNwcml0ZS52aXNpYmxlID0gQm91bmRzLm92ZXJsYXBzKGJvZHkuYm91bmRzLCByZW5kZXIuYm91bmRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZmlsdGVyIG91dCBjb25zdHJhaW50cyB0aGF0IGFyZSBub3QgaW4gdmlld1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFsbENvbnN0cmFpbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnN0cmFpbnQgPSBhbGxDb25zdHJhaW50c1tpXSxcbiAgICAgICAgICAgICAgICAgICAgYm9keUEgPSBjb25zdHJhaW50LmJvZHlBLFxuICAgICAgICAgICAgICAgICAgICBib2R5QiA9IGNvbnN0cmFpbnQuYm9keUIsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50QVdvcmxkID0gY29uc3RyYWludC5wb2ludEEsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50QldvcmxkID0gY29uc3RyYWludC5wb2ludEI7XG5cbiAgICAgICAgICAgICAgICBpZiAoYm9keUEpIHBvaW50QVdvcmxkID0gVmVjdG9yLmFkZChib2R5QS5wb3NpdGlvbiwgY29uc3RyYWludC5wb2ludEEpO1xuICAgICAgICAgICAgICAgIGlmIChib2R5QikgcG9pbnRCV29ybGQgPSBWZWN0b3IuYWRkKGJvZHlCLnBvc2l0aW9uLCBjb25zdHJhaW50LnBvaW50Qik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXBvaW50QVdvcmxkIHx8ICFwb2ludEJXb3JsZClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoQm91bmRzLmNvbnRhaW5zKHJlbmRlci5ib3VuZHMsIHBvaW50QVdvcmxkKSB8fCBCb3VuZHMuY29udGFpbnMocmVuZGVyLmJvdW5kcywgcG9pbnRCV29ybGQpKVxuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50cy5wdXNoKGNvbnN0cmFpbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0cmFuc2Zvcm0gdGhlIHZpZXdcbiAgICAgICAgICAgIGNvbnRhaW5lci5zY2FsZS5zZXQoMSAvIGJvdW5kc1NjYWxlWCwgMSAvIGJvdW5kc1NjYWxlWSk7XG4gICAgICAgICAgICBjb250YWluZXIucG9zaXRpb24uc2V0KC1yZW5kZXIuYm91bmRzLm1pbi54ICogKDEgLyBib3VuZHNTY2FsZVgpLCAtcmVuZGVyLmJvdW5kcy5taW4ueSAqICgxIC8gYm91bmRzU2NhbGVZKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdHJhaW50cyA9IGFsbENvbnN0cmFpbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIFJlbmRlclBpeGkuYm9keShyZW5kZXIsIGJvZGllc1tpXSk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnN0cmFpbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgUmVuZGVyUGl4aS5jb25zdHJhaW50KHJlbmRlciwgY29uc3RyYWludHNbaV0pO1xuXG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcihjb250YWluZXIpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uXG4gICAgICogQG1ldGhvZCBjb25zdHJhaW50XG4gICAgICogQHBhcmFtIHtlbmdpbmV9IGVuZ2luZVxuICAgICAqIEBwYXJhbSB7Y29uc3RyYWludH0gY29uc3RyYWludFxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgUmVuZGVyUGl4aS5jb25zdHJhaW50ID0gZnVuY3Rpb24ocmVuZGVyLCBjb25zdHJhaW50KSB7XG4gICAgICAgIHZhciBlbmdpbmUgPSByZW5kZXIuZW5naW5lLFxuICAgICAgICAgICAgYm9keUEgPSBjb25zdHJhaW50LmJvZHlBLFxuICAgICAgICAgICAgYm9keUIgPSBjb25zdHJhaW50LmJvZHlCLFxuICAgICAgICAgICAgcG9pbnRBID0gY29uc3RyYWludC5wb2ludEEsXG4gICAgICAgICAgICBwb2ludEIgPSBjb25zdHJhaW50LnBvaW50QixcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHJlbmRlci5jb250YWluZXIsXG4gICAgICAgICAgICBjb25zdHJhaW50UmVuZGVyID0gY29uc3RyYWludC5yZW5kZXIsXG4gICAgICAgICAgICBwcmltaXRpdmVJZCA9ICdjLScgKyBjb25zdHJhaW50LmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlID0gcmVuZGVyLnByaW1pdGl2ZXNbcHJpbWl0aXZlSWRdO1xuXG4gICAgICAgIC8vIGluaXRpYWxpc2UgY29uc3RyYWludCBwcmltaXRpdmUgaWYgbm90IGV4aXN0aW5nXG4gICAgICAgIGlmICghcHJpbWl0aXZlKVxuICAgICAgICAgICAgcHJpbWl0aXZlID0gcmVuZGVyLnByaW1pdGl2ZXNbcHJpbWl0aXZlSWRdID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgICAgICAvLyBkb24ndCByZW5kZXIgaWYgY29uc3RyYWludCBkb2VzIG5vdCBoYXZlIHR3byBlbmQgcG9pbnRzXG4gICAgICAgIGlmICghY29uc3RyYWludFJlbmRlci52aXNpYmxlIHx8ICFjb25zdHJhaW50LnBvaW50QSB8fCAhY29uc3RyYWludC5wb2ludEIpIHtcbiAgICAgICAgICAgIHByaW1pdGl2ZS5jbGVhcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHRvIHNjZW5lIGdyYXBoIGlmIG5vdCBhbHJlYWR5IHRoZXJlXG4gICAgICAgIGlmIChDb21tb24uaW5kZXhPZihjb250YWluZXIuY2hpbGRyZW4sIHByaW1pdGl2ZSkgPT09IC0xKVxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKHByaW1pdGl2ZSk7XG5cbiAgICAgICAgLy8gcmVuZGVyIHRoZSBjb25zdHJhaW50IG9uIGV2ZXJ5IHVwZGF0ZSwgc2luY2UgdGhleSBjYW4gY2hhbmdlIGR5bmFtaWNhbGx5XG4gICAgICAgIHByaW1pdGl2ZS5jbGVhcigpO1xuICAgICAgICBwcmltaXRpdmUuYmVnaW5GaWxsKDAsIDApO1xuICAgICAgICBwcmltaXRpdmUubGluZVN0eWxlKGNvbnN0cmFpbnRSZW5kZXIubGluZVdpZHRoLCBDb21tb24uY29sb3JUb051bWJlcihjb25zdHJhaW50UmVuZGVyLnN0cm9rZVN0eWxlKSwgMSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoYm9keUEpIHtcbiAgICAgICAgICAgIHByaW1pdGl2ZS5tb3ZlVG8oYm9keUEucG9zaXRpb24ueCArIHBvaW50QS54LCBib2R5QS5wb3NpdGlvbi55ICsgcG9pbnRBLnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJpbWl0aXZlLm1vdmVUbyhwb2ludEEueCwgcG9pbnRBLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvZHlCKSB7XG4gICAgICAgICAgICBwcmltaXRpdmUubGluZVRvKGJvZHlCLnBvc2l0aW9uLnggKyBwb2ludEIueCwgYm9keUIucG9zaXRpb24ueSArIHBvaW50Qi55KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByaW1pdGl2ZS5saW5lVG8ocG9pbnRCLngsIHBvaW50Qi55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaW1pdGl2ZS5lbmRGaWxsKCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGlvblxuICAgICAqIEBtZXRob2QgYm9keVxuICAgICAqIEBwYXJhbSB7ZW5naW5lfSBlbmdpbmVcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFJlbmRlclBpeGkuYm9keSA9IGZ1bmN0aW9uKHJlbmRlciwgYm9keSkge1xuICAgICAgICB2YXIgZW5naW5lID0gcmVuZGVyLmVuZ2luZSxcbiAgICAgICAgICAgIGJvZHlSZW5kZXIgPSBib2R5LnJlbmRlcjtcblxuICAgICAgICBpZiAoIWJvZHlSZW5kZXIudmlzaWJsZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZiAoYm9keVJlbmRlci5zcHJpdGUgJiYgYm9keVJlbmRlci5zcHJpdGUudGV4dHVyZSkge1xuICAgICAgICAgICAgdmFyIHNwcml0ZUlkID0gJ2ItJyArIGJvZHkuaWQsXG4gICAgICAgICAgICAgICAgc3ByaXRlID0gcmVuZGVyLnNwcml0ZXNbc3ByaXRlSWRdLFxuICAgICAgICAgICAgICAgIHNwcml0ZUNvbnRhaW5lciA9IHJlbmRlci5zcHJpdGVDb250YWluZXI7XG5cbiAgICAgICAgICAgIC8vIGluaXRpYWxpc2UgYm9keSBzcHJpdGUgaWYgbm90IGV4aXN0aW5nXG4gICAgICAgICAgICBpZiAoIXNwcml0ZSlcbiAgICAgICAgICAgICAgICBzcHJpdGUgPSByZW5kZXIuc3ByaXRlc1tzcHJpdGVJZF0gPSBfY3JlYXRlQm9keVNwcml0ZShyZW5kZXIsIGJvZHkpO1xuXG4gICAgICAgICAgICAvLyBhZGQgdG8gc2NlbmUgZ3JhcGggaWYgbm90IGFscmVhZHkgdGhlcmVcbiAgICAgICAgICAgIGlmIChDb21tb24uaW5kZXhPZihzcHJpdGVDb250YWluZXIuY2hpbGRyZW4sIHNwcml0ZSkgPT09IC0xKVxuICAgICAgICAgICAgICAgIHNwcml0ZUNvbnRhaW5lci5hZGRDaGlsZChzcHJpdGUpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgYm9keSBzcHJpdGVcbiAgICAgICAgICAgIHNwcml0ZS5wb3NpdGlvbi54ID0gYm9keS5wb3NpdGlvbi54O1xuICAgICAgICAgICAgc3ByaXRlLnBvc2l0aW9uLnkgPSBib2R5LnBvc2l0aW9uLnk7XG4gICAgICAgICAgICBzcHJpdGUucm90YXRpb24gPSBib2R5LmFuZ2xlO1xuICAgICAgICAgICAgc3ByaXRlLnNjYWxlLnggPSBib2R5UmVuZGVyLnNwcml0ZS54U2NhbGUgfHwgMTtcbiAgICAgICAgICAgIHNwcml0ZS5zY2FsZS55ID0gYm9keVJlbmRlci5zcHJpdGUueVNjYWxlIHx8IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJpbWl0aXZlSWQgPSAnYi0nICsgYm9keS5pZCxcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUgPSByZW5kZXIucHJpbWl0aXZlc1twcmltaXRpdmVJZF0sXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gcmVuZGVyLmNvbnRhaW5lcjtcblxuICAgICAgICAgICAgLy8gaW5pdGlhbGlzZSBib2R5IHByaW1pdGl2ZSBpZiBub3QgZXhpc3RpbmdcbiAgICAgICAgICAgIGlmICghcHJpbWl0aXZlKSB7XG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlID0gcmVuZGVyLnByaW1pdGl2ZXNbcHJpbWl0aXZlSWRdID0gX2NyZWF0ZUJvZHlQcmltaXRpdmUocmVuZGVyLCBib2R5KTtcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuaW5pdGlhbEFuZ2xlID0gYm9keS5hbmdsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHRvIHNjZW5lIGdyYXBoIGlmIG5vdCBhbHJlYWR5IHRoZXJlXG4gICAgICAgICAgICBpZiAoQ29tbW9uLmluZGV4T2YoY29udGFpbmVyLmNoaWxkcmVuLCBwcmltaXRpdmUpID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2hpbGQocHJpbWl0aXZlKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGJvZHkgcHJpbWl0aXZlXG4gICAgICAgICAgICBwcmltaXRpdmUucG9zaXRpb24ueCA9IGJvZHkucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHByaW1pdGl2ZS5wb3NpdGlvbi55ID0gYm9keS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgcHJpbWl0aXZlLnJvdGF0aW9uID0gYm9keS5hbmdsZSAtIHByaW1pdGl2ZS5pbml0aWFsQW5nbGU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJvZHkgc3ByaXRlXG4gICAgICogQG1ldGhvZCBfY3JlYXRlQm9keVNwcml0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtSZW5kZXJQaXhpfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcmV0dXJuIHtQSVhJLlNwcml0ZX0gc3ByaXRlXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICB2YXIgX2NyZWF0ZUJvZHlTcHJpdGUgPSBmdW5jdGlvbihyZW5kZXIsIGJvZHkpIHtcbiAgICAgICAgdmFyIGJvZHlSZW5kZXIgPSBib2R5LnJlbmRlcixcbiAgICAgICAgICAgIHRleHR1cmVQYXRoID0gYm9keVJlbmRlci5zcHJpdGUudGV4dHVyZSxcbiAgICAgICAgICAgIHRleHR1cmUgPSBfZ2V0VGV4dHVyZShyZW5kZXIsIHRleHR1cmVQYXRoKSxcbiAgICAgICAgICAgIHNwcml0ZSA9IG5ldyBQSVhJLlNwcml0ZSh0ZXh0dXJlKTtcblxuICAgICAgICBzcHJpdGUuYW5jaG9yLnggPSBib2R5LnJlbmRlci5zcHJpdGUueE9mZnNldDtcbiAgICAgICAgc3ByaXRlLmFuY2hvci55ID0gYm9keS5yZW5kZXIuc3ByaXRlLnlPZmZzZXQ7XG5cbiAgICAgICAgcmV0dXJuIHNwcml0ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJvZHkgcHJpbWl0aXZlXG4gICAgICogQG1ldGhvZCBfY3JlYXRlQm9keVByaW1pdGl2ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtSZW5kZXJQaXhpfSByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2JvZHl9IGJvZHlcbiAgICAgKiBAcmV0dXJuIHtQSVhJLkdyYXBoaWNzfSBncmFwaGljc1xuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgdmFyIF9jcmVhdGVCb2R5UHJpbWl0aXZlID0gZnVuY3Rpb24ocmVuZGVyLCBib2R5KSB7XG4gICAgICAgIHZhciBib2R5UmVuZGVyID0gYm9keS5yZW5kZXIsXG4gICAgICAgICAgICBvcHRpb25zID0gcmVuZGVyLm9wdGlvbnMsXG4gICAgICAgICAgICBwcmltaXRpdmUgPSBuZXcgUElYSS5HcmFwaGljcygpLFxuICAgICAgICAgICAgZmlsbFN0eWxlID0gQ29tbW9uLmNvbG9yVG9OdW1iZXIoYm9keVJlbmRlci5maWxsU3R5bGUpLFxuICAgICAgICAgICAgc3Ryb2tlU3R5bGUgPSBDb21tb24uY29sb3JUb051bWJlcihib2R5UmVuZGVyLnN0cm9rZVN0eWxlKSxcbiAgICAgICAgICAgIHN0cm9rZVN0eWxlSW5kaWNhdG9yID0gQ29tbW9uLmNvbG9yVG9OdW1iZXIoYm9keVJlbmRlci5zdHJva2VTdHlsZSksXG4gICAgICAgICAgICBzdHJva2VTdHlsZVdpcmVmcmFtZSA9IENvbW1vbi5jb2xvclRvTnVtYmVyKCcjYmJiJyksXG4gICAgICAgICAgICBzdHJva2VTdHlsZVdpcmVmcmFtZUluZGljYXRvciA9IENvbW1vbi5jb2xvclRvTnVtYmVyKCcjQ0Q1QzVDJyksXG4gICAgICAgICAgICBwYXJ0O1xuXG4gICAgICAgIHByaW1pdGl2ZS5jbGVhcigpO1xuXG4gICAgICAgIC8vIGhhbmRsZSBjb21wb3VuZCBwYXJ0c1xuICAgICAgICBmb3IgKHZhciBrID0gYm9keS5wYXJ0cy5sZW5ndGggPiAxID8gMSA6IDA7IGsgPCBib2R5LnBhcnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBwYXJ0ID0gYm9keS5wYXJ0c1trXTtcblxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLndpcmVmcmFtZXMpIHtcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuYmVnaW5GaWxsKGZpbGxTdHlsZSwgMSk7XG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmxpbmVTdHlsZShib2R5UmVuZGVyLmxpbmVXaWR0aCwgc3Ryb2tlU3R5bGUsIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuYmVnaW5GaWxsKDAsIDApO1xuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5saW5lU3R5bGUoMSwgc3Ryb2tlU3R5bGVXaXJlZnJhbWUsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcmltaXRpdmUubW92ZVRvKHBhcnQudmVydGljZXNbMF0ueCAtIGJvZHkucG9zaXRpb24ueCwgcGFydC52ZXJ0aWNlc1swXS55IC0gYm9keS5wb3NpdGlvbi55KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBwYXJ0LnZlcnRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmxpbmVUbyhwYXJ0LnZlcnRpY2VzW2pdLnggLSBib2R5LnBvc2l0aW9uLngsIHBhcnQudmVydGljZXNbal0ueSAtIGJvZHkucG9zaXRpb24ueSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByaW1pdGl2ZS5saW5lVG8ocGFydC52ZXJ0aWNlc1swXS54IC0gYm9keS5wb3NpdGlvbi54LCBwYXJ0LnZlcnRpY2VzWzBdLnkgLSBib2R5LnBvc2l0aW9uLnkpO1xuXG4gICAgICAgICAgICBwcmltaXRpdmUuZW5kRmlsbCgpO1xuXG4gICAgICAgICAgICAvLyBhbmdsZSBpbmRpY2F0b3JcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dBbmdsZUluZGljYXRvciB8fCBvcHRpb25zLnNob3dBeGVzKSB7XG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmJlZ2luRmlsbCgwLCAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLndpcmVmcmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpbWl0aXZlLmxpbmVTdHlsZSgxLCBzdHJva2VTdHlsZVdpcmVmcmFtZUluZGljYXRvciwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpbWl0aXZlLmxpbmVTdHlsZSgxLCBzdHJva2VTdHlsZUluZGljYXRvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLm1vdmVUbyhwYXJ0LnBvc2l0aW9uLnggLSBib2R5LnBvc2l0aW9uLngsIHBhcnQucG9zaXRpb24ueSAtIGJvZHkucG9zaXRpb24ueSk7XG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmxpbmVUbygoKHBhcnQudmVydGljZXNbMF0ueCArIHBhcnQudmVydGljZXNbcGFydC52ZXJ0aWNlcy5sZW5ndGgtMV0ueCkgLyAyIC0gYm9keS5wb3NpdGlvbi54KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKHBhcnQudmVydGljZXNbMF0ueSArIHBhcnQudmVydGljZXNbcGFydC52ZXJ0aWNlcy5sZW5ndGgtMV0ueSkgLyAyIC0gYm9keS5wb3NpdGlvbi55KSk7XG5cbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuZW5kRmlsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVxdWVzdGVkIHRleHR1cmUgKGEgUElYSS5UZXh0dXJlKSB2aWEgaXRzIHBhdGhcbiAgICAgKiBAbWV0aG9kIF9nZXRUZXh0dXJlXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1JlbmRlclBpeGl9IHJlbmRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVBhdGhcbiAgICAgKiBAcmV0dXJuIHtQSVhJLlRleHR1cmV9IHRleHR1cmVcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIHZhciBfZ2V0VGV4dHVyZSA9IGZ1bmN0aW9uKHJlbmRlciwgaW1hZ2VQYXRoKSB7XG4gICAgICAgIHZhciB0ZXh0dXJlID0gcmVuZGVyLnRleHR1cmVzW2ltYWdlUGF0aF07XG5cbiAgICAgICAgaWYgKCF0ZXh0dXJlKVxuICAgICAgICAgICAgdGV4dHVyZSA9IHJlbmRlci50ZXh0dXJlc1tpbWFnZVBhdGhdID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZShpbWFnZVBhdGgpO1xuXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgIH07XG5cbn0pKCk7XG5cbn0se1wiLi4vYm9keS9Db21wb3NpdGVcIjoyLFwiLi4vY29yZS9Db21tb25cIjoxNCxcIi4uL2NvcmUvRXZlbnRzXCI6MTYsXCIuLi9nZW9tZXRyeS9Cb3VuZHNcIjoyNixcIi4uL2dlb21ldHJ5L1ZlY3RvclwiOjI4fV19LHt9LFszMF0pKDMwKVxufSk7IiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaCAoZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG4iLCJpbXBvcnQgeyBCb2RpZXMsIEVuZ2luZSwgUmVuZGVyLCBXb3JsZCwgTW91c2UsIE1vdXNlQ29uc3RyYWludCwgQ29uc3RyYWludCB9IGZyb20gXCJtYXR0ZXItanNcIlxuXG5cbmNvbnN0IGNyZWF0ZU1hcCA9ICgpID0+IHtcblx0Y29uc3QgdyA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMClcblx0Y29uc3QgaCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKVxuXHRjb25zdCBlbmdpbmUgPSBFbmdpbmUuY3JlYXRlKClcblx0Y29uc3QgcmVuZGVyID0gUmVuZGVyLmNyZWF0ZSh7XG5cdFx0ZWxlbWVudDogZG9jdW1lbnQuYm9keSxcblx0XHRlbmdpbmUsXG5cdH0pXG5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVDaXJjbGUoKSB7XG5cdFx0Y29uc3QgY2lyY2xlID0gKEJvZGllcy5jaXJjbGUoNDAwLCA0MDAsIDEwKSlcblx0XHRXb3JsZC5hZGQoZW5naW5lLndvcmxkLCBbY2lyY2xlXSlcblx0fVxuXG5cdHNldEludGVydmFsKCgpID0+IGdlbmVyYXRlQ2lyY2xlKCksIDUwKVxuXG5cdGNvbnN0IGdyb3VuZCA9IEJvZGllcy5yZWN0YW5nbGUoMCwgMCwgdywgMTAsIHsgaXNTdGF0aWM6IHRydWUgfSlcblxuXHRXb3JsZC5hZGQoZW5naW5lLndvcmxkLCBbZ3JvdW5kXSlcblxuXHRFbmdpbmUucnVuKGVuZ2luZSlcblx0UmVuZGVyLnJ1bihyZW5kZXIpXG5cdGNvbnN0IG1vdXNlID0gTW91c2UuY3JlYXRlKHJlbmRlci5jYW52YXMpO1xuXHRjb25zdCBtb3VzZUNvbnN0cmFpbnQgPSBNb3VzZUNvbnN0cmFpbnQuY3JlYXRlKGVuZ2luZSwge1xuXHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdHJlbmRlcjoge1xuXHRcdFx0XHR2aXNpYmxlOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHRzdGlmZm5lc3M6IDAuOSxcblx0XHR9IGFzIENvbnN0cmFpbnQsXG5cdFx0bW91c2UsXG5cdH0pXG5cdFdvcmxkLmFkZChlbmdpbmUud29ybGQsIG1vdXNlQ29uc3RyYWludClcblx0cmVuZGVyLm1vdXNlID0gbW91c2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRjcmVhdGVNYXAsXG59XG4iLCJpbXBvcnQgTWFwcGVyIGZyb20gJy4vTWFwcGVyJ1xuaW1wb3J0IFNvZnRCb2RpZXMgZnJvbSBcIi4vU29mdEJvZGllc1wiO1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcblx0TWFwcGVyLmNyZWF0ZU1hcCgpXG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRzdGFydCxcbn1cbiIsImltcG9ydCBhcHAgZnJvbSAnLi9hcHAnXG5hcHAuc3RhcnQoKVxuXG4vLyBydW4gdGhlIFwic29mdCBib2RpZXNcIiBleGFtcGxlXG4vLyBpbXBvcnQgc29mdEJvZGllcyBmcm9tICcuL3NvZnQtYm9kaWVzJ1xuLy8gc29mdEJvZGllcygpXG4iXSwic291cmNlUm9vdCI6IiJ9