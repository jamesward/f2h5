package net.jangaroo.jooc.input;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class FileInputSource extends DirectoryInputSource {

  private File sourceDir;
  private File file;
  private List<InputSource> children;

  public FileInputSource(final File sourceDir, final File file) {
    super();
    this.sourceDir = sourceDir;
    this.file = file;
  }

  public FileInputSource(final File file) {
    this(file, null);
  }

  @Override
  public String getName() {
    return file.getName();
  }

  @Override
  public String getPath() {
    return file.getAbsolutePath();
  }

  @Override
  public InputStream getInputStream() throws IOException {
    return isDirectory() ? super.getInputStream() : new FileInputStream(file);
  }

  @Override
  public String getRelativePath() {
    try {
      return sourceDir == null ? file.getCanonicalPath() :
        file.getCanonicalPath().substring(sourceDir.getCanonicalPath().length() + 1);
    } catch (IOException e) {
      return null;
    }
  }

  @Override
  public void close() {
  }

  public File getFile() {
    return file;
  }

  @Override
  public char getFileSeparatorChar() {
    return File.separatorChar;
  }

  @Override
  public InputSource getParent() {
    return new FileInputSource(sourceDir, file.getParentFile());
  }

  @Override
  public boolean isDirectory() {
    return file.isDirectory();
  }

  @Override
  public List<InputSource> list() {
    if (!isDirectory()) {
      throw new UnsupportedOperationException("list() not supported for non-directory input sources");
    }
    if (children == null) {
      children = new ArrayList<InputSource>();
      File[] childFiles = file.listFiles();
      for (File childFile : childFiles) {
        children.add(new FileInputSource(sourceDir, childFile));
      }
    }
    return children;
  }

  @Override
  public InputSource getChild(final String path) {
    File sourceFile = new File(file, path);
    return sourceFile.exists()
      ? new FileInputSource(sourceDir, sourceFile)
      : null;
  }

}
