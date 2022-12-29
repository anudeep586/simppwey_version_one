(function(exports) {
    exports.PJV = {
        packageFormat: /^[a-zA-Z0-9@\/][a-zA-Z0-9@\/\.\-_]*$/,
        versionFormat: /^[0-9]+\.[0-9]+[0-9+a-zA-Z\.\-]+$/,
        urlFormat    : /^https*:\/\/[a-z.\-0-9]+/,
        emailFormat  : /\S+@\S+/ 
    };

    var PJV = exports.PJV;

    PJV.getSpecMap = function (specName:any) {

        if (specName == "npm") {
            return {
                "name":         {"type": "string", required: true, format: PJV.packageFormat},
                "version":      {"type": "string", required: true, format: PJV.versionFormat},
                "description":  {"type": "string", warning: true},
                "keywords":     {"type": "array", warning: true},
                "homepage":     {"type": "string", recommended: true, format: PJV.urlFormat},
                "bugs":         {warning: true, validate: PJV.validateUrlOrMailto},
                "licenses":     {"type": "array", warning: true, validate: PJV.validateUrlTypes, or: "license"},
                "license":      {"type": "string"},
                "author":       {warning: true, validate: PJV.validatePeople},
                "contributors": {warning: true, validate: PJV.validatePeople},
                "files":        {"type": "array"},
                "main":         {"type": "string"},
                "bin":          {"types": ["string", "object"]},
                "man":          {"types": ["string", "array"]},
                "directories":  {"type": "object"},
                "repository":   {"types": ["string", "object"], warning: true, validate: PJV.validateUrlTypes, or: "repositories"},
                "scripts":      {"type": "object"},
                "config":       {"type": "object"},
                "dependencies": {"type": "object", recommended: true, validate: PJV.validateDependencies},
                "devDependencies": {"type": "object", validate: PJV.validateDependencies},
                "bundledDependencies": {"type": "array"},
                "bundleDependencies": {"type": "array"},
                "optionalDependencies": {"type": "object", validate: PJV.validateDependencies},
                "engines":      {"type": "object", recommended: true},
                "engineStrict": {"type": "boolean"},
                "os":           {"type": "array"},
                "cpu":          {"type": "array"},
                "preferGlobal": {"type": "boolean"},
                "private":      {"type": "boolean"},
                "publishConfig": {"type": "object"}
            };

        } else if (specName == "commonjs_1.0") {
            return {
                "name":         {"type": "string", required: true, format: PJV.packageFormat},
                "description":  {"type": "string", required: true},
                "version":      {"type": "string", required: true, format: PJV.versionFormat},
                "keywords":     {"type": "array", required: true},
                "maintainers":  {"type": "array", required: true, validate: PJV.validatePeople},
                "contributors": {"type": "array", required: true, validate: PJV.validatePeople},
                "bugs":         {"type": "string", required: true, validate: PJV.validateUrlOrMailto},
                "licenses":     {"type": "array", required: true, validate: PJV.validateUrlTypes},
                "repositories": {"type": "object", required: true, validate: PJV.validateUrlTypes},
                "dependencies": {"type": "object", required: true, validate: PJV.validateDependencies},

                "homepage":     {"type": "string", format: PJV.urlFormat},
                "os":           {"type": "array"},
                "cpu":          {"type": "array"},
                "engine":       {"type": "array"},
                "builtin":      {"type": "boolean"},
                "directories":  {"type": "object"},
                "implements":   {"type": "array"},
                "scripts":      {"type": "object"},
                "checksums":    {"type": "object"}
            };

        } else if (specName == "commonjs_1.1") {
            return {
                "name":         {"type": "string", required: true, format: PJV.packageFormat},
                "version":      {"type": "string", required: true, format: PJV.versionFormat},
                "main":         {"type": "string", required: true},
                "directories":  {"type": "object", required: true},

                "maintainers":  {"type": "array", warning: true, validate: PJV.validatePeople},
                "description":  {"type": "string", warning: true},
                "licenses":     {"type": "array", warning: true, validate: PJV.validateUrlTypes},
                "bugs":         {"type": "string", warning: true, validate: PJV.validateUrlOrMailto},
                "keywords":     {"type": "array"},
                "repositories": {"type": "array", validate: PJV.validateUrlTypes},
                "contributors": {"type": "array", validate: PJV.validatePeople},
                "dependencies": {"type": "object", validate: PJV.validateDependencies},
                "homepage":     {"type": "string", warning: true, format: PJV.urlFormat},
                "os":           {"type": "array"},
                "cpu":          {"type": "array"},
                "engine":       {"type": "array"},
                "builtin":      {"type": "boolean"},
                "implements":   {"type": "array"},
                "scripts":      {"type": "object"},
                "overlay":      {"type": "object"},
                "checksums":    {"type": "object"}
            };

        } else {
            return false;
        }

    };

    PJV.parse = function (data:any) {
        if (typeof data != "string") {
            return "Invalid data - Not a string";
        }
        var parsed;
        try {
            parsed = JSON.parse(data);
        } catch (e) {
            return "Invalid JSON - " + e.toString();
        }

        if (typeof parsed != "object" || parsed === null || parsed instanceof Array) {
            return "Invalid JSON - not an an object " + typeof parsed;
        }

        return parsed;
    };

    PJV.validate = function (data:any, specName:any, options:any) {
        options = options || {};
        specName = specName || "npm";
        var parsed = PJV.parse(data),
            out:any = {"valid": false};


        if (typeof parsed == "string") {
            out.critical = parsed;
            return out;
        }

        var map = PJV.getSpecMap(specName);
        if (specName === false) {
            out.critical = {"Invalid specification": specName};
            return out;
        }
        var errors:any = [],
            warnings = [],
            recommendations = [];

        for (var name in map) {
            var field = map[name];

            if (parsed[name] === undefined && (!field.or || field.or && parsed[field.or] === undefined)) {
                if (field.required) {
                    errors.push("Missing required field: " + name);
                } else if (field.warning) {
                    warnings.push("Missing recommended field: " + name);
                } else if (field.recommended) {
                    recommendations.push("Missing optional field: " + name);
                }
                continue;
            } else if (parsed[name] === undefined) {
                continue;
            }

            if (field.types || field.type) {
                var typeErrors = PJV.validateType(name, field, parsed[name]);
                if(typeErrors.length > 0) {
                    errors = errors.concat(typeErrors);
                    continue;
                }
            }

            if (field.format && !field.format.test(parsed[name])) {
                errors.push("Value for field " + name + ", " + parsed[name] + " does not match format: " + field.format.toString());
            }

            if (typeof field.validate == "function") {
                errors = errors.concat(field.validate(name, parsed[name]));
            }
        }

        out.valid = errors.length > 0 ? false : true;
        if (errors.length > 0) {
            out.errors = errors;
        }
        if (options.warnings !== false && warnings.length > 0) {
            out.warnings = warnings;
        }
        if (options.recommendations !== false && recommendations.length > 0) {
            out.recommendations = recommendations;
        }

        return out;
    };

    PJV.validateType = function(name:any, field:any, value:any) {
        var errors = [];
        var validFieldTypes = field.types || [field.type];
        var valueType = value instanceof Array ? "array" : typeof value;
        if(validFieldTypes.indexOf(valueType) == -1) {
            errors.push("Type for field " + name + ", was expected to be " + validFieldTypes.join(" or ") + ", not " + typeof value);
        }
        return errors;
    };

    // Validates dependencies, making sure the object is a set of key value pairs
    // with package names and versions
    PJV.validateDependencies = function (name:any, deps:any) {
        var errors = [];
        for (var pkg in deps) {
            if (! PJV.packageFormat.test(pkg)) {
                errors.push("Invalid dependency package name: " + pkg);
            }

            if (!PJV.isValidVersionRange(deps[pkg])) {
                errors.push("Invalid version range for dependency " + pkg + ": " + deps[pkg]);
            }
        }
        return errors;
    };

    PJV.isValidVersionRange = function (v:any) {
        // https://github.com/isaacs/npm/blob/master/doc/cli/json.md#dependencies
        return  (/^[\^<>=~]{0,2}[0-9.x]+/).test(v) ||
                PJV.urlFormat.test(v) ||
                v == "*" ||
                v === "" ||
                v === "latest" ||
                (v.indexOf && v.indexOf("git") === 0) ||
                false;
    };

    PJV.validateUrlOrMailto = function (name:any, obj:any) {
        var errors = [];
        if (typeof obj == "string") {
            if (!PJV.urlFormat.test(obj) && !PJV.emailFormat.test(obj)) {
                errors.push(name + " should be an email or a url");
            }
        } else if (typeof obj == "object") {
            if (!obj.email && !obj.url && !obj.mail && !obj.web) {
                errors.push(name + " field should have one of: email, url, mail, web");
            } else {
                if (obj.email && !PJV.emailFormat.test(obj.email)) {
                    errors.push("Email not valid for " + name + ": " + obj.email);
                }
                if (obj.mail && !PJV.emailFormat.test(obj.mail)) {
                    errors.push("Email not valid for " + name + ": " + obj.mail);
                }
                if (obj.url && !PJV.urlFormat.test(obj.url)) {
                    errors.push("Url not valid for " + name + ": " + obj.url);
                }
                if (obj.web && !PJV.urlFormat.test(obj.web)) {
                    errors.push("Url not valid for " + name + ": " + obj.web);
                }
            }
        } else {
            errors.push("Type for field " + name + " should be a string or an object");
        }
        return errors;
    };
    PJV.validatePeople = function (name:any, obj:any) {
        var errors:any = [];

        function validatePerson(obj:any) {
            /* jshint maxcomplexity: 10 */
            if (typeof obj == "string") {
                var authorRegex = /^([^<\(\s]+[^<\(]*)?(\s*<(.*?)>)?(\s*\((.*?)\))?/;
                var authorFields = authorRegex.exec(obj);
                var authorName = authorFields[1],
                    authorEmail = authorFields[3],
                    authorUrl = authorFields[5];
                validatePerson({"name": authorName, "email": authorEmail, "url": authorUrl});
            } else if (typeof obj == "object") {
                if (!obj.name) {
                    errors.push(name + " field should have name");
                }
                if (obj.email && !PJV.emailFormat.test(obj.email)) {
                    errors.push("Email not valid for " + name + ": " + obj.email);
                }
                if (obj.url && !PJV.urlFormat.test(obj.url)) {
                    errors.push("Url not valid for " + name + ": " + obj.url);
                }
                if (obj.web && !PJV.urlFormat.test(obj.web)) {
                    errors.push("Url not valid for " + name + ": " + obj.web);
                }
            } else {
                errors.push("People field must be an object or a string");
            }
        }

        if (obj instanceof Array) {
            for (var i = 0; i < obj.length; i++) {
                validatePerson(obj[i]);
            }
        } else {
            validatePerson(obj);
        }
        return errors;
    };
    PJV.validateUrlTypes = function (name:any, obj:any) {
        var errors = [];
        function validateUrlType(obj:any) {
            if (!obj.type) {
                errors.push(name + " field should have type");
            }
            if (!obj.url) {
                errors.push(name + " field should have url");
            }
        }

        if (typeof obj == "string") {
            if (! PJV.urlFormat.test(obj)) {
                errors.push("Url not valid for " + name + ": " + obj);
            }
        } else if (obj instanceof Array) {
            for (var i = 0; i < obj.length; i++) {
                validateUrlType(obj[i]);
            }
        } else if (typeof obj == "object") {
            validateUrlType(obj);
        } else {
            errors.push("Type for field " + name + " should be a string or an object");
        }

        return errors;
    };

})(typeof exports === 'undefined' ? this : exports);


