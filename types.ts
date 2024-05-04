export interface FsError extends Error {
    code: string;
    address?: string;
    dest?: string;
    errno?: number;
}

export interface DirectoryInfo {
    name: string;
    isFile: boolean;
    isDirectory: boolean;
    isSymlink: boolean;
}

export interface WalkEntry extends DirectoryInfo {
    /** Full path of the entry. */
    path: string;
}

export type X = Deno.DirEntry;

export interface RemoveOptions {
    recursive?: boolean;
}

export interface CreateDirectoryOptions {
    recursive?: boolean;
    mode?: number;
}

/** Options for {@linkcode exists} and {@linkcode existsSync.} */
export interface ExistsOptions {
    /**
     * When `true`, will check if the path is readable by the user as well.
     *
     * @default {false}
     */
    isReadable?: boolean;
    /**
     * When `true`, will check if the path is a directory as well. Directory
     * symlinks are included.
     *
     * @default {false}
     */
    isDirectory?: boolean;
    /**
     * When `true`, will check if the path is a file as well. File symlinks are
     * included.
     *
     * @default {false}
     */
    isFile?: boolean;
}

/**
 * Options which can be set when using {@linkcode Deno.makeTempDir},
 * {@linkcode Deno.makeTempDirSync}, {@linkcode Deno.makeTempFile}, and
 * {@linkcode Deno.makeTempFileSync}.
 *
 * @category File System */
export interface MakeTempOptions {
    /** Directory where the temporary directory should be created (defaults to
     * the env variable `TMPDIR`, or the system's default, usually `/tmp`).
     *
     * Note that if the passed `dir` is relative, the path returned by
     * `makeTempFile()` and `makeTempDir()` will also be relative. Be mindful of
     * this when changing working directory. */
    dir?: string;
    /** String that should precede the random portion of the temporary
     * directory's name. */
    prefix?: string;
    /** String that should follow the random portion of the temporary
     * directory's name. */
    suffix?: string;
}

export interface CopyOptions {
    overwrite?: boolean;
    preserveTimestamps?: boolean;
}

export interface MoveOptions {
    overwrite?: boolean;
}

export interface WriteOptions {
    append?: boolean;
    create?: boolean;
    signal?: AbortSignal;
    mode?: number;
}

export interface ReadOptions {
    /**
     * An abort signal to allow cancellation of the file read operation.
     * If the signal becomes aborted the readFile operation will be stopped
     * and the promise returned will be rejected with an AbortError.
     */
    signal?: AbortSignal;
}

/** Provides information about a file and is returned by
 * {@linkcode Deno.stat}, {@linkcode Deno.lstat}, {@linkcode Deno.statSync},
 * and {@linkcode Deno.lstatSync} or from calling `stat()` and `statSync()`
 * on an {@linkcode Deno.FsFile} instance.
 *
 * @category File System
 */
export interface FileInfo {
    name: string;

    path?: string;

    /** True if this is info for a regular file. Mutually exclusive to
     * `FileInfo.isDirectory` and `FileInfo.isSymlink`. */
    isFile: boolean;
    /** True if this is info for a regular directory. Mutually exclusive to
     * `FileInfo.isFile` and `FileInfo.isSymlink`. */
    isDirectory: boolean;
    /** True if this is info for a symlink. Mutually exclusive to
     * `FileInfo.isFile` and `FileInfo.isDirectory`. */
    isSymlink: boolean;
    /** The size of the file, in bytes. */
    size: number;
    /** The last modification time of the file. This corresponds to the `mtime`
     * field from `stat` on Linux/Mac OS and `ftLastWriteTime` on Windows. This
     * may not be available on all platforms. */
    mtime: Date | null;
    /** The last access time of the file. This corresponds to the `atime`
     * field from `stat` on Unix and `ftLastAccessTime` on Windows. This may not
     * be available on all platforms. */
    atime: Date | null;
    /** The creation time of the file. This corresponds to the `birthtime`
     * field from `stat` on Mac/BSD and `ftCreationTime` on Windows. This may
     * not be available on all platforms. */
    birthtime: Date | null;
    /** ID of the device containing the file. */
    dev: number;
    /** Inode number.
     *
     * _Linux/Mac OS only._ */
    ino: number | null;
    /** The underlying raw `st_mode` bits that contain the standard Unix
     * permissions for this file/directory.
     *
     * _Linux/Mac OS only._ */
    mode: number | null;
    /** Number of hard links pointing to this file.
     *
     * _Linux/Mac OS only._ */
    nlink: number | null;
    /** User ID of the owner of this file.
     *
     * _Linux/Mac OS only._ */
    uid: number | null;
    /** Group ID of the owner of this file.
     *
     * _Linux/Mac OS only._ */
    gid: number | null;
    /** Device ID of this file.
     *
     * _Linux/Mac OS only._ */
    rdev: number | null;
    /** Blocksize for filesystem I/O.
     *
     * _Linux/Mac OS only._ */
    blksize: number | null;
    /** Number of blocks allocated to the file, in 512-byte units.
     *
     * _Linux/Mac OS only._ */
    blocks: number | null;
    /**  True if this is info for a block device.
     *
     * _Linux/Mac OS only._ */
    isBlockDevice: boolean | null;
    /**  True if this is info for a char device.
     *
     * _Linux/Mac OS only._ */
    isCharDevice: boolean | null;
    /**  True if this is info for a fifo.
     *
     * _Linux/Mac OS only._ */
    isFifo: boolean | null;
    /**  True if this is info for a socket.
     *
     * _Linux/Mac OS only._ */
    isSocket?: boolean | null;
}

export interface WriteJsonOptions extends WriteOptions {
    spaces: number;
}

/** Options that can be used with {@linkcode symlink} and
 * {@linkcode symlinkSync}.
 *
 * @category File System */
export interface SymlinkOptions {
    /** If the symbolic link should be either a file or directory. This option
     * only applies to Windows and is ignored on other operating systems. */
    type: "file" | "dir";
}

export interface FsFile {
    writeSync(p: Uint8Array): number;
    write(p: Uint8Array): Promise<number>;
    readSync(p: Uint8Array): number | null;
    read(p: Uint8Array): Promise<number | null>;
}

export interface FileSystem {
    chmod(path: string | URL, mode: number): Promise<void>;

    chmodSync(path: string | URL, mode: number): void;

    chown(
        path: string | URL,
        uid: number,
        gid: number,
    ): Promise<void>;

    chownSync(path: string | URL, uid: number, gid: number): void;

    cwd(): string;

    copyFile(
        from: string | URL,
        to: string | URL,
    ): Promise<void>;

    copyFileSync(
        from: string | URL,
        to: string | URL,
    ): void;

    isDir(path: string | URL): Promise<boolean>;

    isDirSync(path: string | URL): boolean;

    isFile(path: string | URL): Promise<boolean>;

    isFileSync(path: string | URL): boolean;

    isAlreadyExistsError(err: unknown): boolean;

    isNotFoundError(err: unknown): boolean;

    link(oldPath: string | URL, newPath: string | URL): Promise<void>;

    linkSync(oldPath: string | URL, newPath: string | URL): void;

    lstat(path: string | URL): Promise<FileInfo>;

    lstatSync(path: string | URL): FileInfo;

    makeDir(
        path: string | URL,
        options?: CreateDirectoryOptions | undefined,
    ): Promise<void>;

    makeDirSync(
        path: string | URL,
        options?: CreateDirectoryOptions | undefined,
    ): void;

    makeTempDirSync(options?: MakeTempOptions): string;

    makeTempDir(options?: MakeTempOptions): Promise<string>;

    readDir(
        path: string | URL,
    ): AsyncIterable<DirectoryInfo>;

    readDirSync(
        path: string | URL,
    ): Iterable<DirectoryInfo>;

    readFile(path: string | URL, options?: ReadOptions): Promise<Uint8Array>;

    readFileSync(path: string | URL): Uint8Array;

    readLink(path: string | URL): Promise<string>;

    readLinkSync(path: string | URL): string;

    readTextFileSync(path: string | URL): string;

    readTextFile(path: string | URL, options?: ReadOptions): Promise<string>;

    realPath(path: string | URL): Promise<string>;

    realPathSync(path: string | URL): string;

    remove(
        path: string | URL,
        options?: RemoveOptions,
    ): Promise<void>;

    removeSync(path: string | URL, options?: RemoveOptions): void;

    rename(
        oldPath: string | URL,
        newPath: string | URL,
    ): Promise<void>;

    renameSync(oldPath: string | URL, newPath: string | URL): void;

    stat(path: string | URL): Promise<FileInfo>;

    statSync(path: string | URL): FileInfo;

    symlink(
        target: string | URL,
        path: string | URL,
        type?: SymlinkOptions,
    ): Promise<void>;

    symlinkSync(
        target: string | URL,
        path: string | URL,
        type?: SymlinkOptions,
    ): void;

    writeTextFileSync(
        path: string | URL,
        data: string,
        options?: WriteOptions,
    ): void;

    writeTextFile(
        path: string | URL,
        data: string,
        options?: WriteOptions,
    ): Promise<void>;

    writeFile(
        path: string | URL,
        data: Uint8Array | ReadableStream<Uint8Array>,
        options?: WriteOptions | undefined,
    ): Promise<void>;

    writeFileSync(
        path: string | URL,
        data: Uint8Array,
        options?: WriteOptions | undefined,
    ): void;

    utime(
        path: string | URL,
        atime: number | Date,
        mtime: number | Date,
    ): Promise<void>;

    utimeSync(
        path: string | URL,
        atime: number | Date,
        mtime: number | Date,
    ): void;
}
