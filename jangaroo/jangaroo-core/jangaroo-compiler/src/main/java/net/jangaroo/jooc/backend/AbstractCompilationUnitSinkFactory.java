package net.jangaroo.jooc.backend;

import net.jangaroo.jooc.Jooc;
import net.jangaroo.jooc.PackageDeclaration;
import net.jangaroo.jooc.IdeDeclaration;
import net.jangaroo.jooc.config.JoocOptions;

import java.io.File;

/**
 * Abstract base class for merged and single file compilation unit sink factories.
 */
public abstract class AbstractCompilationUnitSinkFactory implements CompilationUnitSinkFactory {
  protected File outputDir = null;
  JoocOptions options;

  public AbstractCompilationUnitSinkFactory(JoocOptions options, File outputDir) {
    this.outputDir = outputDir;
    this.options = options;
  }

  public File getOutputDir() {
    return outputDir;
  }

  public JoocOptions getOptions() {
    return options;
  }

  protected void createOutputDirs(File outputFile) {
    File parentDir = outputFile.getAbsoluteFile().getParentFile();
    if (!parentDir.exists() && !parentDir.mkdirs()) {
      throw Jooc.error("cannot create directories '" + parentDir.getAbsolutePath() + "'");
    }
  }

  public abstract CompilationUnitSink createSink(PackageDeclaration packageDeclaration,
                               IdeDeclaration primaryDeclaration, File sourceFile,
                               boolean verbose);
}
