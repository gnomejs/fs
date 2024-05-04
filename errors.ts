import { SystemError } from "jsr:@gnome/errors@^0.0.0";

export class AlreadyExistsError extends SystemError {
    constructor(message: string, innerError?: Error) {
        super(message, innerError);
        this.name = "AlreadyExistsError";
    }
}

/**
 * Error thrown in {@linkcode move} or {@linkcode moveSync} when the
 * destination is a subdirectory of the source.
 */
export class SubdirectoryMoveError extends Error {
    /** Constructs a new instance. */
    constructor(src: string | URL, dest: string | URL) {
        super(
            `Cannot move '${src}' to a subdirectory of itself, '${dest}'.`,
        );
        this.name = this.constructor.name;
    }
}
