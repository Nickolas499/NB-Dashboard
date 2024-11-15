import os
import tkinter as tk
from tkinter import filedialog, messagebox

def read_file_content(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, 'r', encoding='latin-1') as file:
                return file.read()
        except:
            return "[Contenido binario o codificación no soportada]"
    except Exception as e:
        return f"[Error al leer el archivo: {str(e)}]"

def is_text_file(file_path, allowed_extensions):
    if any(file_path.endswith(ext) for ext in allowed_extensions):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                file.read(1024)  # Intenta leer los primeros 1024 bytes
            return True
        except:
            return False
    return False

def generate_markdown(file_path, allowed_extensions):
    markdown_content = f"""
    ### Aqui te presento mi proyecto.  
    # Estructura del fichero:\n\n"""
    
    # Agregar la estructura de directorios
    for root, dirs, files in os.walk(file_path):
        level = root.replace(file_path, '').count(os.sep)
        indent = ' ' * 4 * (level)
        markdown_content += f"{indent}{os.path.basename(root)}/\n"
        sub_indent = ' ' * 4 * (level + 1)
        for file in files:
            markdown_content += f"{sub_indent}{file}\n"
    
    markdown_content += "\n"

    # Agregar el contenido de cada archivo
    for root, dirs, files in os.walk(file_path):
        for file in files:
            file_path = os.path.join(root, file)
            markdown_content += f"========================[ {file} ]========================\n"
            if is_text_file(file_path, allowed_extensions):
                markdown_content += f"```\n{read_file_content(file_path)}\n```\n"
            else:
                markdown_content += "[Archivo binario o no legible]\n\n"

    return markdown_content

def save_markdown(content):
    file_path = filedialog.asksaveasfilename(defaultextension=".md", filetypes=[("Markdown files", "*.md")])
    if file_path:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        messagebox.showinfo("Éxito", f"Archivo Markdown guardado en: {file_path}")
    else:
        messagebox.showwarning("Advertencia", "No se guardó el archivo Markdown.")

class Application(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.master.title("Conversor de Directorio a Markdown")
        self.master.geometry("400x300")
        self.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        self.create_widgets()
        self.directory = None
        self.allowed_extensions = []

    def create_widgets(self):
        self.select_button = tk.Button(self)
        self.select_button["text"] = "Seleccionar Directorio"
        self.select_button["command"] = self.select_directory
        self.select_button.pack(fill=tk.X, pady=10)

        self.file_types_frame = tk.LabelFrame(self, text="Tipos de archivos a incluir", padx=10, pady=10)
        self.file_types_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        self.file_types = [('.css', 'CSS'), ('.py', 'Python'), ('.js', 'JavaScript'),
                           ('.html', 'HTML'), ('.jsx', 'JSX'), ('.tsx', 'TSX'),
                           ('.ts', 'TypeScript'), ('.json', 'JSON'), ('.svg', 'SVG'),
                           ('.md', 'Markdown'), ('.ico', 'ICO'), ('.png', 'PNG'),
                           ('.jpeg', 'JPEG'), ('.jpg', 'JPG')]

        self.check_vars = []
        for ext, name in self.file_types:
            var = tk.BooleanVar()
            chk = tk.Checkbutton(self.file_types_frame, text=name, variable=var)
            chk.pack(anchor=tk.W)
            self.check_vars.append((var, ext))

        self.convert_button = tk.Button(self)
        self.convert_button["text"] = "Convertir a Markdown"
        self.convert_button["command"] = self.convert_to_markdown
        self.convert_button.pack(fill=tk.X, pady=10)

        self.quit_button = tk.Button(self, text="Salir", fg="red",
                                     command=self.master.destroy)
        self.quit_button.pack(fill=tk.X, pady=10)

    def select_directory(self):
        self.directory = filedialog.askdirectory()
        if self.directory:
            messagebox.showinfo("Directorio seleccionado", f"Se ha seleccionado: {self.directory}")
        else:
            messagebox.showwarning("Advertencia", "No se seleccionó ningún directorio.")

    def convert_to_markdown(self):
        self.allowed_extensions = [ext for var, ext in self.check_vars if var.get()]
        if self.directory and self.allowed_extensions:
            markdown_content = generate_markdown(self.directory, self.allowed_extensions)
            save_markdown(markdown_content)
        else:
            messagebox.showerror("Error", "Por favor, seleccione un directorio y al menos un tipo de archivo.")

def main():
    root = tk.Tk()
    app = Application(master=root)
    app.mainloop()

if __name__ == "__main__":
    main()
