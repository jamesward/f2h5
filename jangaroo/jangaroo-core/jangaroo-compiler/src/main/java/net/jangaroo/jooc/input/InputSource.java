package net.jangaroo.jooc.input;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface InputSource {

  String getName();
  String getPath();
  String getRelativePath();

  boolean isDirectory();
  List<InputSource> list() ;
  InputSource getChild(String path);

  InputStream getInputStream() throws IOException;
  void close() throws IOException;
  char getFileSeparatorChar();

  InputSource getParent();
}
